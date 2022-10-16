import {
  GET_CINEMA_GROUP_LIST,
  GET_CINEMA_LIST,
  GET_CINEMA_SYSTEM_LIST,
  GET_LIST_CHAIR,
  GET_LIST_CUM_RAP,
  GET_LIST_RAP
} from "../constant/cinema.constant";
import { api } from "../../core/service/api.service";
import { STATUS_CODE } from "../../core/global/constant";
import { cinemaService } from "../../core/service/cinema.service";
import { startLoadingAction, stopLoadingAction } from "./common.action";

export const getListRap = () => {
  let url = "api/QuanLyRap/LayThongTinHeThongRap";
  let method = "GET";
  return async (dispatch) => {
    try {
      const { data, status } = await api.get(url, method);
      if (STATUS_CODE.SUCCESS === status) {
        dispatch({
          type: GET_LIST_RAP,
          payload: data
        });
      }
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getListCumRap = (maHeThongRap, maNhom) => {
  let url = `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`;
  let method = "GET";
  return async (dispatch) => {
    try {
      const res = await api.get(url, method);
      dispatch({
        type: GET_LIST_CUM_RAP,
        payload: res.data[0]
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getListChair = (id) => {
  let url = `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`;
  let method = "GET";
  return async (dispatch) => {
    dispatch(startLoadingAction());
    try {
      const res = await api.get(url, method);
      dispatch({
        type: GET_LIST_CHAIR,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      dispatch(stopLoadingAction());
    }, 700);
  };
};

export const getCinemaSystemListAction = () => {
  return async (dispatch) => {
    try {
      const response = await cinemaService.getCinemaSystemList();
      dispatch({
        type: GET_CINEMA_SYSTEM_LIST,
        payload: response.data
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const BookingChair = (maLichChieu, danhSachVe) => {
  let url = "api/QuanLyDatVe/DatVe";
  let method = "POST";
  const taiKhoanNguoiDung = JSON.parse(localStorage.getItem("taiKhoan"));
  let data = {
    maLichChieu,
    danhSachVe,
    taiKhoanNguoiDung
  };

  return async (dispatch) => {
    dispatch(startLoadingAction());
    try {
      return await api.post(url, method, data);
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getCinemaGroupListAction = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const response = await cinemaService.getCinemaGroupList(maHeThongRap);
      dispatch({
        type: GET_CINEMA_GROUP_LIST,
        payload: response.data
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getCinemaListAction = (maCumRap) => {
  return {
    type: GET_CINEMA_LIST,
    payload: maCumRap
  };
};
