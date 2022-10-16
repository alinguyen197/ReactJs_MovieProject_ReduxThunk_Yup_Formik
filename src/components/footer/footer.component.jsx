import React from "react";
import s from "./footer.module.scss";
import logo1 from "../../asset/image/logo-1.png";
import logo2 from "../../asset/image/logo-2.png";
import logo3 from "../../asset/image/logo-3.png";
import logo4 from "../../asset/image/logo-4.png";
import logo5 from "../../asset/image/logo-5.png";
import logo6 from "../../asset/image/logo-6.png";
import logo7 from "../../asset/image/logo-7.png";
import logo8 from "../../asset/image/logo-8.png";
import logo9 from "../../asset/image/logo-9.png";
import logo10 from "../../asset/image/logo-10.png";
import logo11 from "../../asset/image/logo-11.png";
import logo12 from "../../asset/image/logo-12.png";
import logo13 from "../../asset/image/logo-13.png";
import logo14 from "../../asset/image/logo-14.png";
import logo15 from "../../asset/image/logo-15.png";
import logo16 from "../../asset/image/logo-16.png";
import logo17 from "../../asset/image/logo-17.png";
import logo18 from "../../asset/image/logo-18.png";
import logo19 from "../../asset/image/logo-19.png";
import logo20 from "../../asset/image/logo-20.png";
import apple from "../../asset/image/apple-logo.png";
import android from "../../asset/image/android-logo.png";
import facebook from "../../asset/image/facebook-logo.png";
import zalo from "../../asset/image/zalo-logo.png";
import zion from "../../asset/image/zion-logo.jpg";

const logoArray = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
  logo14,
  logo15,
  logo16,
  logo17,
  logo18,
  logo19,
  logo20
];

const Footer = () => {
  return (
    <section className={s.footer__section}>
      <div className={s.footer__wrapper}>
        <div className={s.footer__content}>
          <div className={`row m-0 ${s.footer__info}`}>
            <div
              className={`${s.info__item} ${s.left} text-center text-sm-left col-12 col-sm-4 pb-5`}
            >
              <h4 className="col-md-12 mb-3 p-0 m-0 text-white">TIX</h4>
              <ul className="row m-0 w-100 p-0">
                <li className="col-lg-6 col-md-12 col-12 p-0">
                  <a href="#">FAQ</a>
                </li>
                <li className="col-lg-6 col-md-12 col-12 p-0">
                  <a href="#">Thỏa thuận sử dụng</a>
                </li>
                <li className="col-lg-6 col-md-12 col-12 p-0">
                  <a href="#">Brand Guidelines</a>
                </li>
                <li className="col-lg-6 col-md-12 col-12 p-0">
                  <a href="#">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
            <div
              className={`${s.info__item} ${s.middle} text-center text-sm-left col-12 col-sm-4 pb-5`}
            >
              <h4 className="col-md-12 mb-3 pl-0 m-0 text-white">ĐỐI TÁC</h4>
              <div className="row m-0">
                {logoArray.map((l, i) => (
                  <div key={i} className={s.logo__link}>
                    <a className="bg-white p-0 m-auto m-sm-0" href="#">
                      <img src={l} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`${s.info__item} ${s.right} row m-0 col-sm-4 col-12`}
            >
              <div className="col-6 mb-3 m-0">
                <h4 className="col-12 m-0 text-white text-center">APPs</h4>
                <div className="col-12 d-flex justify-content-center">
                  <a href="#">
                    <img src={apple} />
                  </a>
                  <a href="#">
                    <img src={android} />
                  </a>
                </div>
              </div>
              <div className="col-6 mb-3 m-0">
                <h4 className="col-12 m-0 text-white text-center">SOCIAL</h4>
                <div className="col-12 d-flex justify-content-center">
                  <a href="#">
                    <img src={facebook} />
                  </a>
                  <a href="#">
                    <img src={zalo} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`row m-0 ${s.footer__copyright}`}>
            <div className="col-md-1 col-sm-12 p-0 text-center">
              <img className={s.logo} src={zion} />
            </div>
            <div className="col-md-9 mb-3">
              <h4>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h4>
              <p>
                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
                Chí Minh, Việt Nam.
              </p>
              <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
              <p>
                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
                hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
              </p>
              <p>Số Điện Thoại (Hotline): 1900 545 436</p>
              <p>
                Email:{" "}
                <a target="_blank" href="mailto:support@tix.vn">
                  support@tix.vn
                </a>
              </p>
            </div>
            <div className="col-md-2 col-sm-12 text-md-right text-center p-0">
              <a
                target="_blank"
                href="http://online.gov.vn/Home/WebDetails/62782"
              >
                <img
                  className={s.certificate}
                  src="https://s3img.vcdn.vn/123phim/2020/03/d1e6bd560daa9e20131ea8a0f62e87f8.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
