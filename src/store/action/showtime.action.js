import { showtimeService } from "../../core/service/showtime.service";
import {
  GET_SHOWTIME_BY_MOVIE,
  SET_SHOWTIME_DETAIL
} from "../constant/showtime.constant";
import { startLoadingAction, stopLoadingAction } from "./common.action";

export const createShowtimeAction = (showtime) => {
  return async () => {
    try {
      return await showtimeService.createShowtime(showtime);
    } catch (error) {
      return error.response;
    }
  };
};

export const setShowtimeDetailAction = (payload) => {
  return {
    type: SET_SHOWTIME_DETAIL,
    payload
  };
};

export const getShowtimeByMovieAction = (movieCode) => {
  return async (dispatch) => {
    dispatch(startLoadingAction());
    try {
      const response = await showtimeService.getShowtimeByMovie(movieCode);
      dispatch({
        type: GET_SHOWTIME_BY_MOVIE,
        payload: response.data
      });
    } catch (error) {
      console.log(error.response);
    }
    setTimeout(() => {
      dispatch(stopLoadingAction());
    }, 1000);
  };
};
