import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCumRap, getListRap } from "../../store/action/cinema.action";
import style from "./cinema.module.scss";
import * as DayJS from "dayjs";
import clsx from "clsx";
import { renderImageUrl } from "../../core/helper/renderImageURL";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { getMovie } from "../../store/action/movie.action";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Cinema = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cinemaSystemList = useSelector((state) => state.movie.list_rap);
  const cinemaGroupList = useSelector(
    (state) => state.movie.list_cum_rap?.lstCumRap
  );
  const movieList = useSelector((state) => state.movie.list_phim);

  const [currentLogo, setCurrentLogo] = useState("");

  const handleChangeCinemaSystem = (e, code) => {
    const logo = e.target.querySelector("img").getAttribute("src");
    setCurrentLogo(logo);
    dispatch(getListCumRap(code, "GP01"));
  };

  const handleChangeCinemaGroup = (event, code) => {
    dispatch(getMovie(code));
  };

  const handleShowtimeClick = (maLichChieu) => {
    if (JSON.parse(localStorage.getItem("hoTen"))) {
      history.push(`/chairing/${maLichChieu}`);
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

  const renderCinemaSystem = () => {
    return cinemaSystemList.map((system, index) => {
      return (
        <li key={index} className="nav-item">
          <button
            className={clsx({ "nav-link": true, active: index === 0 })}
            data-toggle="pill"
            onClick={(event) =>
              handleChangeCinemaSystem(event, system.maHeThongRap)
            }
          >
            <div className="d-flex align-items-center">
              <img
                src={renderImageUrl(system.logo)}
                alt={system.maHeThongRap}
              />
            </div>
          </button>
        </li>
      );
    });
  };

  const renderCinemaGroup = () => {
    return cinemaGroupList?.map((group, index) => {
      return (
        <a
          key={index}
          className={clsx({
            "nav-link": true,
            active: index === 0
          })}
          data-toggle="pill"
          role="tab"
          onClick={(event) => handleChangeCinemaGroup(event, group.maCumRap)}
        >
          <div className={style.details}>
            <div className={style.cinema__image}>
              <img
                src={renderImageUrl(currentLogo)}
                className={style.image}
                alt={group.maCumRap}
              />
            </div>
            <div className={style.describe}>
              <p className={style.name}>{group.tenCumRap}</p>
              <p className={style.address}>{group.diaChi}</p>
              <p className={style.moreInfo}>Chi tiết</p>
            </div>
          </div>
        </a>
      );
    });
  };

  const renderMovie = () => {
    return movieList?.map((movie, i) => {
      let check = false;
      // filter all movies that not have upcoming showtime
      if (
        movie.lstLichChieuTheoPhim.filter(
          (s) => Date.parse(s.ngayChieuGioChieu) > Date.now()
        ).length > 0
      )
        check = true;
      return check ? (
        <div key={i} className={`${style.movie__details}`}>
          <div className={`${style.movie__info} d-flex`}>
            <div className={style.image}>
              <img src={renderImageUrl(movie.hinhAnh)} alt={movie.biDanh} />
            </div>
            <div className={style.info}>
              <span className={style.rated}>P</span>
              <p className={style.title}>{movie.tenPhim}</p>
              <p className={style.subInfo}>100 phút - TIX 9 - IMDb 8</p>
            </div>
          </div>
          <div className={style.movie__showtime}>
            {renderShowtime(movie.lstLichChieuTheoPhim)}
          </div>
        </div>
      ) : (
        ""
      );
    });
  };

  const renderShowtime = (showtimeList) => {
    // filter all showtimes that not have upcoming show
    // after that sort showtime
    return showtimeList
      .filter((s) => Date.parse(s.ngayChieuGioChieu) > Date.now())
      .sort((a, b) => {
        if (a.ngayChieuGioChieu > b.ngayChieuGioChieu) return 1;
        if (b.ngayChieuGioChieu > a.ngayChieuGioChieu) return -1;
        return 0;
      })
      .map((l, i) => {
        return (
          <a key={i} onClick={() => handleShowtimeClick(l.maLichChieu)}>
            <span className={style.date}>
              {DayJS(l.ngayChieuGioChieu).format("MMM D, YYYY")}
            </span>
            <span className={style.time}>
              {DayJS(l.ngayChieuGioChieu).format("HH:mm")}
            </span>
          </a>
        );
      });
  };

  useEffect(() => {
    dispatch(getListRap());
  }, []);
  useEffect(() => {
    setCurrentLogo(cinemaSystemList[0]?.logo);
    dispatch(getListCumRap(cinemaSystemList[0]?.maHeThongRap, "GP01"));
  }, [cinemaSystemList]);

  return (
    <section id="cinemaBlock" className={style.cinema__section}>
      <div
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="600"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center"
        className={style.wrapper}
      >
        <div className="row m-0">
          <div className={`col-md-1 col-sm-12 ${style.cinema__system}`}>
            <ul className="nav nav-pills">{renderCinemaSystem()}</ul>
          </div>
          <div className={`col-md-4 col-sm-12 ${style.cinema__group}`}>
            <div className="nav nav-pills" role="tablist">
              {renderCinemaGroup()}
            </div>
          </div>
          <div className={`col-md-7 col-sm-12 ${style.cinema__movie}`}>
            <div className="tab-pane active">{renderMovie()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cinema;
