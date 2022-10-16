import {
  GET_DETAIL_MOVIE,
  GET_LIST_MOVIE,
  GET_MOVIE,
  GET_MOVIE_LIST_PAGINATION,
  SET_MOVIE_DETAIL
} from "../constant/movie.constant";
import { api } from "../../core/service/api.service";
import { movieService } from "../../core/service/movie.service";

export const getListMovie = () => {
  let url = "api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01";
  let method = "GET";
  return async (dispatch) => {
    try {
      const res = await api.get(url, method);
      dispatch({
        type: GET_LIST_MOVIE,
        payload: res.data
      });
    } catch (err) {
      console.log(err.status);
    }
  };
};

export const getMovie = (maCumRap) => {
  return {
    type: GET_MOVIE,
    payload: maCumRap
  };
};

export const getDetailMovie = (maPhim) => {
  let url = `api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
  let method = "GET";
  return async (dispatch) => {
    try {
      const res = await api.get(url, method);
      dispatch({
        type: GET_DETAIL_MOVIE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * Author: TanHN
 * Date: 03/07/2021
 * Name: getMovieListPaginationAction
 */

export const getMovieListPaginationAction = (
  groupID,
  pageNumber,
  itemPerPageNumber
) => {
  return async (dispatch) => {
    try {
      const response = await movieService.getMovieListPagination(
        groupID,
        pageNumber,
        itemPerPageNumber
      );
      dispatch({
        type: GET_MOVIE_LIST_PAGINATION,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addMovieAction = (movie) => {
  return async () => {
    try {
      return await movieService.addMovie(movie);
    } catch (error) {
      return error.response;
    }
  };
};

export const deleteMovieAction = (maPhim) => {
  return async () => {
    try {
      return await movieService.deleteMovie(maPhim);
    } catch (error) {
      return error.response;
    }
  };
};

export const setMovieDetailAction = (movie) => {
  return { type: SET_MOVIE_DETAIL, payload: movie };
};

export const updateMovieAction = (movie) => {
  return async () => {
    try {
      return await movieService.updateMovie(movie);
    } catch (error) {
      return error.response;
    }
  };
};
