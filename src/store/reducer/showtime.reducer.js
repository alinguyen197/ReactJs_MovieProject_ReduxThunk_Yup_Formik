import {
  GET_SHOWTIME_BY_MOVIE,
  SET_SHOWTIME_DETAIL
} from "../constant/showtime.constant";

const initialState = {
  showtimeDetail: {},
  showtimeByMovie: {}
};

export const ShowtimeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SHOWTIME_DETAIL:
      return { ...state, showtimeDetail: payload };
    case GET_SHOWTIME_BY_MOVIE:
      return { ...state, showtimeByMovie: payload };
    default:
      return state;
  }
};
