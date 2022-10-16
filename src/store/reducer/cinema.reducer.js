import {
  GET_CINEMA_GROUP_LIST,
  GET_CINEMA_LIST,
  GET_CINEMA_SYSTEM_LIST
} from "../constant/cinema.constant";

const initialState = {
  cinemaSystemList: [],
  cinemaGroupList: [],
  cinemaList: []
};

export const CinemaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CINEMA_SYSTEM_LIST:
      return { ...state, cinemaSystemList: [...payload] };
    case GET_CINEMA_GROUP_LIST:
      return { ...state, cinemaGroupList: [...payload] };
    case GET_CINEMA_LIST:
      const cinemaList = state.cinemaGroupList.find(
        (g) => g.maCumRap === payload
      )?.danhSachRap;
      return { ...state, cinemaList: [...(cinemaList ? cinemaList : [])] };
    default:
      return state;
  }
};
