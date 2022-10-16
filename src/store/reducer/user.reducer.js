import {
  SET_USER_DETAIL,
  GET_USER_LIST_PAGINATION
} from "../constant/user.constant";

const initialState = {
  userListPagination: [],
  totalPages: 10,
  userDetail: {}
};

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_LIST_PAGINATION:
      state.userListPagination = [...payload.items];
      state.totalPages = payload.totalPages;
      return { ...state };
    case SET_USER_DETAIL:
      state.userDetail = { ...payload };
      return { ...state };
    default:
      return state;
  }
};
