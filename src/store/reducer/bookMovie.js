import { CHOISE_CHAIR, GET_LIST_CHAIR } from "../constant/cinema.constant";

const initailState = {
  list_chair: [],
  showtimeInfo: {}
};

export const BookingMovie = (state = initailState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_CHAIR: {
      state.list_chair = payload.danhSachGhe;
      state.showtimeInfo = payload.thongTinPhim;
      return { ...state };
    }
    case CHOISE_CHAIR: {
      let DS = [...state.list_chair];
      let index = DS.findIndex((Ghe) => Ghe.maGhe === payload);
      if (index !== -1) {
        let chairOld = DS[index];
        let chairNew = { ...chairOld, onPick: !chairOld.onPick };
        DS[index] = chairNew;
      }
      return { ...state, list_chair: [...DS] };
    }
    default: {
      return state;
    }
  }
};
