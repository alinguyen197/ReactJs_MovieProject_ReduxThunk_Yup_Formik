import axios from "axios";
import { DOMAIN } from "../global/constant";

// temp
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGFuaG4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJRdWFuVHJpIiwibmJmIjoxNjI1MDM2NTI5LCJleHAiOjE2MjUwNDAxMjl9.3-NV6J-FhB0p2bhAjFOvBCQKIdBdc3EONir5RXq-7Ug";

class UserService {
  getUserListPagination = (groupID, pageNumber, itemPerPageNumber) =>
    axios({
      url: `${DOMAIN}/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${groupID}&soTrang=${pageNumber}&soPhanTuTrenTrang=${itemPerPageNumber}`,
      method: "GET"
    });

  addUser = (data) =>
    axios({
      url: `${DOMAIN}/api/QuanLyNguoiDung/ThemNguoiDung`,
      method: "POST",
      data
    });

  deleteUser = (taiKhoan) =>
    axios({
      url: `${DOMAIN}/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      method: "DELETE"
    });

  updateUser = (data) =>
    axios({
      url: `${DOMAIN}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "PUT",
      data
    });

  searchUserPagination = (
    searchString,
    groupID,
    pageNumber,
    itemPerPageNumber
  ) =>
    axios({
      url: `${DOMAIN}/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${groupID}&tuKhoa=${searchString}&soTrang=${pageNumber}&soPhanTuTrenTrang=${itemPerPageNumber}`,
      method: "GET"
    });

  signIn = (data) =>
    axios({
      url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data
    });

  signUp = (data) =>
    axios({
      url: `${DOMAIN}/api/QuanLyNguoiDung/DangKy`,
      method: "POST",
      data
    });
}

export const userService = new UserService();
