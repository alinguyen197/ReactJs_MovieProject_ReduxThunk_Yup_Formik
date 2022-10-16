import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import img1 from "../../asset/image/trangTi.png";
import img2 from "../../asset/image/latMat.png";
import img3 from "../../asset/image/banTayDietQuy.png";
import style from "./carousel.module.scss";
import HomeTool from "../homeTool/homeTool.component";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Carousel = () => {
  return (
    <section className={style.carousel__section}>
      <div className={style.carousel__wrapper}>
        <Swiper
          className={style.carousel__swiper}
          spaceBetween={0}
          speed={1000}
          slidesPerView={1}
          loop={true}
          autoplay={{
            disableOnInteraction: false
          }}
          pagination={{
            clickableClass: style.swiper__pagination,
            clickable: true,
            bulletClass: style.pagination__bullet,
            bulletActiveClass: style.pagination__bullet__active
          }}
          navigation={{
            prevEl: `.${style.button__prev}`,
            nextEl: `.${style.button__next}`
          }}
        >
          <div className={style.button__prev}></div>
          <div className={style.button__next}></div>
          <SwiperSlide>
            <div
              className={style.carousel__image}
              style={{ backgroundImage: `url('${img1}')` }}
              alt=""
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={style.carousel__image}
              style={{ backgroundImage: `url('${img2}')` }}
              alt=""
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={style.carousel__image}
              style={{ backgroundImage: `url('${img3}')` }}
              alt=""
            ></div>
          </SwiperSlide>
        </Swiper>
      </div>
      <HomeTool />
    </section>
  );
};

export default Carousel;
