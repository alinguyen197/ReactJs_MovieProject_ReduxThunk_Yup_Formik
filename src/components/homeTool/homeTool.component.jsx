import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListMovie } from "../../store/action/movie.action";
import { getShowtimeByMovieAction } from "../../store/action/showtime.action";
import style from "./homeTool.module.scss";
import * as DayJS from "dayjs";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const HomeTool = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const movieList = useSelector((state) => state.movie.list_movie);
  const cinemaSystemList = useSelector(
    (state) => state.showtime.showtimeByMovie.heThongRapChieu
  );
  const [movie, setMovie] = useState(null);
  const [cinemaSystem, setCinemaSystem] = useState(null);
  const [cinemaGroup, setCinemaGroup] = useState(null);
  const [showtime, setShowtime] = useState(null);

  const cinemaGroupList = cinemaSystem?.cumRapChieu;
  const showtimeList = cinemaGroup?.lichChieuPhim;

  const handleChooseMovie = (movieCode, movieName) => {
    dispatch(getShowtimeByMovieAction(movieCode));
    setMovie(movieName);
    setCinemaSystem(null);
    setCinemaGroup(null);
    setShowtime(null);
  };

  const handleChooseCinemaSystem = (cinemaSystemCode) => {
    setCinemaSystem(
      cinemaSystemList.find((s) => s.maHeThongRap === cinemaSystemCode)
    );
  };

  const handleChooseCinemaGroup = (cinemaGroupCode) => {
    setCinemaGroup(cinemaGroupList.find((g) => g.maCumRap === cinemaGroupCode));
  };

  const handleChooseShowtime = (showtime) => {
    setShowtime(showtime);
  };

  const handleClickBooking = () => {
    if (JSON.parse(localStorage.getItem("hoTen"))) {
      history.push(`/chairing/${showtime.maLichChieu}`);
    } else {
      swal({
        title: "Bạn chưa đăng nhập!!!",
        text: "Bạn cần đăng nhập để tiếp tục đặt vé!",
        icon: "warning",
        buttons: ["Hủy", "Đăng nhập"],
        dangerMode: true,
        className: "custom__swal"
      }).then((willSignIn) => {
        if (willSignIn) {
          history.push(`/sign-in`);
        }
      });
    }
  };

  const renderMovieList = () => {
    return movieList.map((m, i) => {
      return (
        <li
          key={i}
          onClick={() => handleChooseMovie(m.maPhim, m.tenPhim)}
          className={style.menu__item}
        >
          {m.tenPhim}
        </li>
      );
    });
  };

  const renderCinemaSystemList = () => {
    return cinemaSystemList?.map((s, i) => {
      return (
        <li
          key={i}
          onClick={() => handleChooseCinemaSystem(s.maHeThongRap)}
          className={style.menu__item}
        >
          {s.tenHeThongRap}
        </li>
      );
    });
  };

  const renderCinemaGroupList = () => {
    return cinemaGroupList?.map((g, i) => {
      return (
        <li
          key={i}
          onClick={() => handleChooseCinemaGroup(g.maCumRap)}
          className={style.menu__item}
        >
          {g.tenCumRap}
        </li>
      );
    });
  };

  const renderShowtimeList = () => {
    return showtimeList?.map((st, i) => {
      return (
        <li
          key={i}
          onClick={() => handleChooseShowtime(st)}
          className={style.menu__item}
        >
          {st.tenRap} -
          {DayJS(st.ngayChieuGioChieu).format(" lúc HH:mm ngày DD/MM/YYYY")}
        </li>
      );
    });
  };

  useEffect(() => {
    dispatch(getListMovie);
  });
  return (
    <div className={style.home__tool}>
      <div className={style.tool__movie}>
        <div
          type="button"
          className={`${style.tool__dropdown} dropdown-toggle`}
          data-toggle="dropdown"
        >
          {movie ? movie : "Phim"}
        </div>
        <ul className={`${style.tool__menu} dropdown-menu`}>
          {renderMovieList()}
        </ul>
      </div>
      <div className={style.tool__cinema}>
        <div
          type="button"
          className={`${style.tool__dropdown} dropdown-toggle`}
          data-toggle="dropdown"
        >
          {cinemaSystem ? cinemaSystem.tenHeThongRap : "Hệ thống rạp"}
        </div>
        <ul className={`${style.tool__menu} dropdown-menu`}>
          {renderCinemaSystemList()}
        </ul>
      </div>
      <div className={style.tool__date}>
        <div
          type="button"
          className={`${style.tool__dropdown} dropdown-toggle`}
          data-toggle="dropdown"
        >
          {cinemaGroup ? cinemaGroup.tenCumRap : "Rạp"}
        </div>
        <ul className={`${style.tool__menu} dropdown-menu`}>
          {renderCinemaGroupList()}
        </ul>
      </div>
      <div className={style.tool__showtime}>
        <div
          type="button"
          className={`${style.tool__dropdown} dropdown-toggle`}
          data-toggle="dropdown"
        >
          {showtime
            ? `${showtime.tenRap} - ${DayJS(showtime.ngayChieuGioChieu).format(
                " lúc HH:mm ngày DD/MM/YYYY"
              )}`
            : "Suất chiếu"}
        </div>
        <ul className={`${style.tool__menu} dropdown-menu`}>
          {renderShowtimeList()}
        </ul>
      </div>
      <div className={style.tool__booking}>
        <button
          disabled={showtime === null}
          className="btn btn-secondary text-uppercase"
          onClick={handleClickBooking}
        >
          Mua vé ngay
        </button>
      </div>
    </div>
  );
};

export default HomeTool;
