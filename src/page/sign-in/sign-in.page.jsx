import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import style from "./sign-in.module.scss";
import logo from "../../asset/image/group@2x.png";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signInSignUpAction } from "../../store/action/user.action";
import swal from "sweetalert";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: ""
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });

  const handleSubmit = (values) => {
    // dispatch(signInAction(values));
    dispatch(signInSignUpAction(values, true)).then((r) => {
      if (r.status === 200) {
        swal({
          title: "Đăng nhập thành công!",
          text: "Chào mừng bạn đến với TIX.VN",
          icon: "success",
          button: false,
          timer: 2000
        }).then(() => {
          // history.push("/home");
          history.goBack();
        });
        return true;
      } else {
        swal({
          title: "Đăng nhập thất bại!",
          text: r.data,
          icon: "error",
          buttons: "OK",
          dangerMode: true
        });
        return false;
      }
    });
  };

  const handleESC = () => {
    history.push("/home");
  };

  return (
    <div className={style.signIn__section}>
      <div className={style.signIn__container}>
        <div className={style.signIn__content}>
          <div onClick={handleESC} className={style.esc__button}></div>
          <div className={style.content__header}>
            <NavLink to="/home">
              <img className={style.content__image} src={logo} alt="" />
            </NavLink>
          </div>
          <div className={style.content__body}>
            <p className="text-white text-center">
              Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className={style.formField}>
                <input
                  className={style.formInput}
                  type="text"
                  placeholder=" "
                  name="taiKhoan"
                  onChange={formik.handleChange}
                ></input>
                <label className={style.formLabel}>Tài Khoản</label>
              </div>
              <div className={style.formField}>
                <input
                  className={style.formInput}
                  type="text"
                  placeholder=" "
                  type="password"
                  name="matKhau"
                  onChange={formik.handleChange}
                ></input>
                <label className={style.formLabel}>Mật Khẩu</label>
              </div>
              <div className={style.formField}>
                <button type="submit" className={style.formButton}>
                  Đăng nhập
                </button>
              </div>
            </form>
            <div style={{ textAlign: "center" }}>
              <NavLink to="/sign-up" className={style.signUp__link}>
                Bạn chưa có tài khoản?
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
