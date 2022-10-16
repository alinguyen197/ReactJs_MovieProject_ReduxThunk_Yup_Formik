import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  addMovieAction,
  deleteMovieAction,
  getMovieListPaginationAction,
  setMovieDetailAction,
  updateMovieAction
} from "../../../store/action/movie.action";
import DataTable from "../../components/data-table/dataTable.component";
import MovieModal from "../../components/movie-modal/movieModal.component";
import CommonPagination from "../../components/pagination/pagination.component";
import TableTopToolbar from "../../components/table-top-toolbar/tableTopToolbar.component";
import { movieFieldList } from "../../helper/movieFieldList";

const Movie = () => {
  const dispatch = useDispatch();

  const movieListPagination = useSelector(
    (state) => state.movie.movieListPagination
  );

  const totalPages = useSelector((state) => state.movie.totalPages);

  const [itemPerPageNumber, setItemPerPageNumber] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangeItem = (event) => {
    setItemPerPageNumber(event.target.value);
  };

  const hanldeChangePage = (event, value) => {
    setCurrentPage(value);
    dispatch(getMovieListPaginationAction("GP01", value, itemPerPageNumber));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsUpdating(false);
    dispatch(setMovieDetailAction({}));
  };

  const handleAddMovie = async (movie) => {
    return await dispatch(addMovieAction(movie)).then((r) => {
      if (r.status === 200) {
        swal({
          title: "Success!",
          text: "Thêm phim thành công",
          icon: "success",
          button: false,
          timer: 2000
        });
        setOpenModal(false);
        setCurrentPage(1);
        dispatch(getMovieListPaginationAction("GP01", 1, itemPerPageNumber));
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

  const handleDeleteMovie = (maPhim) => {
    swal({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn xóa phim này?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteMovieAction(maPhim)).then((r) => {
          if (r.status === 200) {
            swal({
              title: "Success!",
              text: r.data,
              icon: "success",
              button: false,
              timer: 2000
            });
            dispatch(
              getMovieListPaginationAction(
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

  const handleEditMovie = (movie) => {
    dispatch(setMovieDetailAction(movie));
    setOpenModal(true);
    setIsUpdating(true);
  };

  const handleUpdateMovie = (movie) => {
    dispatch(updateMovieAction(movie)).then((r) => {
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
        dispatch(setMovieDetailAction({}));
        dispatch(
          getMovieListPaginationAction("GP01", currentPage, itemPerPageNumber)
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
    dispatch(getMovieListPaginationAction("GP01", 1, itemPerPageNumber));
  }, [itemPerPageNumber]);

  return (
    <div>
      <TableTopToolbar handleOpenModal={handleOpenModal} />
      <Divider />
      <DataTable
        dataFieldList={movieFieldList}
        dataListPagination={movieListPagination}
        handleDelete={handleDeleteMovie}
        deleteObjectKey="maPhim"
        handleEdit={handleEditMovie}
        isMovie={true}
      />
      <CommonPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleChangeItem={handleChangeItem}
        hanldeChangePage={hanldeChangePage}
      />

      <MovieModal
        openModal={openModal}
        handleClose={handleCloseModal}
        handleAction={isUpdating ? handleUpdateMovie : handleAddMovie}
        isUpdating={isUpdating}
      />
    </div>
  );
};

export default Movie;
