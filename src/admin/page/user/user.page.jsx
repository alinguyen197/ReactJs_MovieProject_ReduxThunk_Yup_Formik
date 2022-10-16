import React, { useEffect, useState } from "react";
import { Divider } from "@material-ui/core";
import { userFieldList } from "../../helper/userFieldList";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAction,
  deleteUserAction,
  searchUserPaginationAction,
  getUserListPaginationAction,
  updateUserAction,
  setUserDetailAction
} from "../../../store/action/user.action";
import UserModal from "../../components/user-modal/userModal.component";
import CommonPagination from "../../components/pagination/pagination.component";
import DataTable from "../../components/data-table/dataTable.component";
import TableTopToolbar from "../../components/table-top-toolbar/tableTopToolbar.component";
import swal from "sweetalert";

const User = () => {
  const dispatch = useDispatch();

  const userListPagination = useSelector(
    (state) => state.user.userListPagination
  );

  const totalPages = useSelector((state) => state.user.totalPages);

  const [itemPerPageNumber, setItemPerPageNumber] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [isSearching, setIsSearching] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [searchString, setSearchString] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsUpdating(false);
    dispatch(setUserDetailAction({}));
  };

  const hanldeChangePage = (event, value) => {
    setCurrentPage(value);
    isSearching
      ? dispatch(
          searchUserPaginationAction(
            searchString,
            "GP01",
            value,
            itemPerPageNumber
          )
        )
      : dispatch(getUserListPaginationAction("GP01", value, itemPerPageNumber));
  };

  const handleChangeItem = (event) => {
    setItemPerPageNumber(event.target.value);
  };

  const handleAddUser = async (user) => {
    return await dispatch(addUserAction(user)).then((r) => {
      if (r.status === 200) {
        swal({
          title: "Success!",
          text: "Thêm người dùng thành công",
          icon: "success",
          button: false,
          timer: 2000
        });
        setOpenModal(false);
        setCurrentPage(1);
        dispatch(getUserListPaginationAction("GP01", 1, itemPerPageNumber));
        return true;
      } else {
        swal({
          title: "Unsuccess!",
          text: r.data,
          icon: "error",
          buttons: "OK",
          dangerMode: true
        });
        return false;
      }
    });
  };

  const handleDeleteUser = (taiKhoan) => {
    swal({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn xóa người dùng này?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUserAction(taiKhoan)).then((r) => {
          if (r.status === 200) {
            swal({
              title: "Success!",
              text: r.data,
              icon: "success",
              button: false,
              timer: 2000
            });
            dispatch(
              getUserListPaginationAction(
                "GP01",
                currentPage,
                itemPerPageNumber
              )
            );
          } else {
            swal({
              title: "Unsuccess!",
              text: r.data,
              icon: "error",
              buttons: "OK",
              dangerMode: true
            });
          }
        });
      }
    });
  };

  const handleSearchUser = (event) => {
    if (event.target.value === "") {
      setIsSearching(false);
      setCurrentPage(1);
      dispatch(getUserListPaginationAction("GP01", 1, itemPerPageNumber));
      return;
    }

    setSearchString(event.target.value);
    setIsSearching(true);
    dispatch(
      searchUserPaginationAction(
        event.target.value,
        "GP01",
        1,
        itemPerPageNumber
      )
    );
  };

  const handleEditUser = (user) => {
    dispatch(setUserDetailAction(user));
    setIsUpdating(true);
    setOpenModal(true);
  };

  const handleUpdateUser = (user) => {
    dispatch(updateUserAction(user)).then((r) => {
      if (r.status === 200) {
        swal({
          title: "Success!",
          text: "Cập nhật thành công!",
          icon: "success",
          button: false,
          timer: 2000
        });
        setOpenModal(false);
        setIsUpdating(false);
        dispatch(setUserDetailAction({}));
        dispatch(
          getUserListPaginationAction("GP01", currentPage, itemPerPageNumber)
        );
      } else {
        swal({
          title: "Unsuccess!",
          text: r.data,
          icon: "error",
          buttons: "OK",
          dangerMode: true
        });
      }
    });
  };

  useEffect(() => {
    setCurrentPage(1);
    dispatch(getUserListPaginationAction("GP01", 1, itemPerPageNumber));
  }, [itemPerPageNumber]);

  return (
    <div>
      {/* Top toolbar */}
      <TableTopToolbar
        handleOpenModal={handleOpenModal}
        handleSearch={handleSearchUser}
      />

      <Divider />

      {/* Table */}
      <DataTable
        dataFieldList={userFieldList}
        dataListPagination={userListPagination}
        handleDelete={handleDeleteUser}
        deleteObjectKey="taiKhoan"
        handleEdit={handleEditUser}
      />

      {/* Pagination */}
      <CommonPagination
        hanldeChangePage={hanldeChangePage}
        handleChangeItem={handleChangeItem}
        totalPages={totalPages}
        currentPage={currentPage}
      />

      {/* Modal */}
      <UserModal
        openModal={openModal}
        handleClose={handleCloseModal}
        handleAction={isUpdating ? handleUpdateUser : handleAddUser}
        isUpdating={isUpdating}
      />
    </div>
  );
};

export default User;
