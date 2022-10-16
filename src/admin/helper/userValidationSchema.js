import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required("(*) Tài khoản không được để trống"),
  matKhau: Yup.string().required("(*) Mật khẩu không được để trống"),
  email: Yup.string()
    .required("(*) Email không được để trống")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "(*) Email chưa đúng định dạng"
    ),
  soDt: Yup.string()
    .required("(*) Số điện thoại không được để trống")
    .matches(/^[0-9]+$/, "(*) Vui lòng nhập số"),
  hoTen: Yup.string().required("(*) Họ tên không được để trống")
});
