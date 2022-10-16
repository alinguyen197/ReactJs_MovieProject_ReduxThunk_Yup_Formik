import { STOP_LOADING, START_LOADING } from "../constant/common.constant";

const initialState = {
  isLoading: true
};

export const CommonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
