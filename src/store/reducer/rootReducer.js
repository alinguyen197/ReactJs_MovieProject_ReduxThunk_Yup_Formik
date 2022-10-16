import { ReducerMovie } from "./reducerMovie";
import { combineReducers } from "redux";
import { UserReducer } from "./user.reducer";
import { BookingMovie } from "./bookMovie";
import { CinemaReducer } from "./cinema.reducer";
import { ShowtimeReducer } from "./showtime.reducer";
import { CommonReducer } from "./common.reducer";

export const RootReducer = combineReducers({
  movie: ReducerMovie,
  booking: BookingMovie,
  user: UserReducer,
  cinema: CinemaReducer,
  showtime: ShowtimeReducer,
  common: CommonReducer
});
