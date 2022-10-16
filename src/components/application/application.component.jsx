import React from "react";
import style from "./application.module.scss";
import mobile from "../../asset/image/mobile.png";
import slide1 from "../../asset/image/slide/slide1.jpg";
import slide2 from "../../asset/image/slide/slide2.jpg";
import slide3 from "../../asset/image/slide/slide3.jpg";
import slide4 from "../../asset/image/slide/slide4.jpg";
import slide5 from "../../asset/image/slide/slide5.jpg";
import slide6 from "../../asset/image/slide/slide6.jpg";
import slide7 from "../../asset/image/slide/slide7.jpg";
import slide8 from "../../asset/image/slide/slide8.jpg";
import slide9 from "../../asset/image/slide/slide9.jpg";
import slide10 from "../../asset/image/slide/slide10.jpg";
import slide11 from "../../asset/image/slide/slide11.jpg";
import slide12 from "../../asset/image/slide/slide12.jpg";
import slide13 from "../../asset/image/slide/slide13.jpg";
import slide14 from "../../asset/image/slide/slide14.jpg";
import slide15 from "../../asset/image/slide/slide15.jpg";
import slide16 from "../../asset/image/slide/slide16.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper/core";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const slideArray = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
  slide11,
  slide12,
  slide13,
  slide14,
  slide15,
  slide16
];

SwiperCore.use([Autoplay]);

const Application = () => {
  return (
    <section id="appBlock" className={style.app__section}>
      <div
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="600"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center"
        className={style.app__wrapper}
      >
        <div className={style.app__content}>
          <div className="row m-0">
            <div className={`col-lg-6 col-12 text-white ${style.app__left}`}>
              <div>
                <h1>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
                <p className="my-5">
                  Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                  và đổi quà hấp dẫn.
                </p>
                <button className="btn text-white">
                  App miễn phí - Tải về ngay!
                </button>
                <p className={style.download}>
                  TIX có hai phiên bản{" "}
                  <a href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8">
                    iOS
                  </a>{" "}
                  &amp;{" "}
                  <a href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                    Android
                  </a>
                </p>
              </div>
            </div>
            <div className={`col-lg-6 col-12 p-0 ${style.app__right}`}>
              <img
                className="my-0 mx-auto d-block"
                src={mobile}
                alt="mobile__app"
              />
              <div className={style.app__slide}>
                <Swiper
                  spaceBetween={0}
                  centeredSlides={true}
                  speed={1000}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                  }}
                  className={style.slide__container}
                >
                  {slideArray.map((s, index) => (
                    <SwiperSlide key={index} className={style.slide}>
                      <img src={s} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Application;
