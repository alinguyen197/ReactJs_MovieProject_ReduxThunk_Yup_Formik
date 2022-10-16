import React from "react";
import style from "./sign-up.module.scss";
import logo from "../../asset/image/group@2x.png";
import { NavLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { userValidationSchema } from "../../admin/helper/userValidationSchema";
import { useDispatch } from "react-redux";
import { signInSignUpAction } from "../../store/action/user.action";
import swal from "sweetalert";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "KhachHang",
      hoTen: ""
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
    },
    validationSchema: userValidationSchema,
    enableReinitialize: true
  });

  const handleSubmit = (values) => {
    dispatch(signInSignUpAction(values, false)).then((r) => {
      if (r.status === 200) {
        swal({
          title: "Đăng ký thành công!",
          text: "Chào mừng bạn đến với TIX.VN",
          icon: "success",
          button: false,
          timer: 2000
        }).then(() => {
          history.push("/home");
        });
        return true;
      } else {
        swal({
          title: "Đăng ký thất bại!",
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
        <div className={style.signUp__content}>
          <div onClick={handleESC} className={style.esc__button}></div>
          <div className={style.content__header}>
            <NavLink to="/home">
              <img className={style.content__image} src={logo} alt="" />
            </NavLink>
          </div>
          <div className={style.content__body}>
            <p className="text-white text-center">
              Đăng ký để được nhiều ưu đãi, mua vé và bảo mật thông tin!
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className={style.form__content}>
                <div className={style.formField}>
                  <input
                    className={style.formInput}
                    error={formik.touched.taiKhoan && formik.errors.taiKhoan}
                    type="text"
                    placeholder=" "
                    name="taiKhoan"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label className={style.formLabel}>Tài Khoản</label>
                  <label className={style.errorText}>
                    {formik.touched.taiKhoan ? formik.errors.taiKhoan : ""}
                  </label>
                </div>
                <div className={style.formField}>
                  <input
                    className={style.formInput}
                    error={formik.touched.matKhau && formik.errors.matKhau}
                    type="password"
                    placeholder=" "
                    name="matKhau"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label className={style.formLabel}>Mật Khẩu</label>
                  <label className={style.errorText}>
                    {formik.touched.matKhau ? formik.errors.matKhau : ""}
                  </label>
                </div>
                <div className={style.formField}>
                  <input
                    className={style.formInput}
                    error={formik.touched.hoTen && formik.errors.hoTen}
                    type="text"
                    placeholder=" "
                    name="hoTen"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label className={style.formLabel}>Họ và tên</label>
                  <label className={style.errorText}>
                    {formik.touched.hoTen ? formik.errors.hoTen : ""}
                  </label>
                </div>
                <div className={style.formField}>
                  <input
                    className={style.formInput}
                    error={formik.touched.soDt && formik.errors.soDt}
                    type="text"
                    placeholder=" "
                    name="soDt"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label className={style.formLabel}>Số điện thoại</label>
                  <label className={style.errorText}>
                    {formik.touched.soDt ? formik.errors.soDt : ""}
                  </label>
                </div>
                <div className={`${style.formField} ${style.w100}`}>
                  <input
                    className={style.formInput}
                    error={formik.touched.email && formik.errors.email}
                    type="text"
                    placeholder=" "
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label className={style.formLabel}>Địa chỉ Email</label>
                  <label className={style.errorText}>
                    {formik.touched.email ? formik.errors.email : ""}
                  </label>
                </div>
                <div className={`${style.formField} ${style.w100}`}>
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className={style.formButton}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </form>
            <div style={{ textAlign: "center" }}>
              <NavLink to="/sign-in" className={style.signUp__link}>
                Bạn đã có tài khoản?
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
