import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import style from "./homeMovie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getListMovie } from "../../store/action/movie.action";
import { useHistory } from "react-router-dom";
import { Fade, makeStyles, Modal } from "@material-ui/core";
import { renderImageUrl } from "../../core/helper/renderImageURL";

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Navigation, Controller, Autoplay } from "swiper/core";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

SwiperCore.use([Navigation, Controller, Autoplay]);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const HomeMovie = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [trailer, setTrailer] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (trailer) => {
    setTrailer(trailer);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const list_movie = useSelector((state) => {
    return state.movie.list_movie;
  });

  const nowShowingList = list_movie.slice(21, 41);
  const upComingList = list_movie.slice(41, 61);

  const swiperSettings = {
    className: style.films__container,
    grabCursor: true,
    slidesPerColumn: 2,
    slideToClickedSlide: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerColumn: 1
      },
      320: {
        slidesPerView: 1,
        slidesPerColumn: 1
      },
      425: {
        slidesPerView: 2,
        slidesPerColumn: 1
      },
      768: {
        slidesPerView: 3,
        slidesPerColumn: 1
      },
      1024: {
        slidesPerView: 4,
        slidesPerColumn: 2
      },
      1440: {
        slidesPerView: 5,
        slidesPerColumn: 2
      }
    }
  };

  const renderMovies = (movieList) => {
    return movieList?.map((movie, index) => {
      return (
        <SwiperSlide key={index} className={style.films__slide}>
          <div className={style.film__item}>
            <a target="_blank">
              <div
                className={style.film__image}
                style={{
                  backgroundImage: `url('${renderImageUrl(movie.hinhAnh)}')`
                }}
              >
                <span className={style.point}>
                  <span>{movie.danhGia}</span>
                  <div>
                    <span className={style.star}></span>
                    <span className={style.star}></span>
                    <span className={style.star}></span>
                    <span className={style.star}></span>
                    <span className={style.half}></span>
                  </div>
                </span>
                <div className={style.overlay}>
                  <button
                    onClick={() => handleOpenModal(movie.trailer)}
                    className={style.play}
                  ></button>
                </div>
              </div>
            </a>
            <div className={style.film__info}>
              <div className={style.title}>
                <span className={style.rated}>P</span>
                {movie.tenPhim}
              </div>
              <div className={style.length}>
                100 Phút - IMDb - [
                {Math.round((Math.random() * 5 + 5) * 10) / 10}]
              </div>
              <a
                className={style.book}
                onClick={() => {
                  history.push(`/detail/${movie.maPhim}`);
                }}
              >
                Mua vé
              </a>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  useEffect(() => {
    dispatch(getListMovie());
  }, []);
  return (
    <section id="filmsBlock" className={style.films__section}>
      <div
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="600"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center"
        className={style.films__content}
      >
        <div className={`nav nav-tabs ${style.films__header}`}>
          <button
            name="nowShowing"
            className={`${style.header__tab} active`}
            data-target="#nowShowing"
            data-toggle="tab"
          >
            Đang chiếu
          </button>
          <button
            name="upComing"
            className={style.header__tab}
            data-target="#upComing"
            data-toggle="tab"
          >
            Sắp chiếu
          </button>
        </div>
        <div className={`tab-content ${style.films__body}`}>
          <div id="nowShowing" className="tab-pane fade active show nowShowing">
            <Swiper {...swiperSettings}>{renderMovies(nowShowingList)}</Swiper>
          </div>
          <div id="upComing" className="tab-pane fade active upComing">
            <Swiper {...swiperSettings}>{renderMovies(upComingList)}</Swiper>
          </div>
          <div className={style.content}></div>
        </div>
      </div>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <iframe
            className={style.video}
            src={`${trailer}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Fade>
      </Modal>
    </section>
  );
};

export default HomeMovie;
