import React from "react";
import { useFormik } from "formik";
import {
  Grid,
  makeStyles,
  IconButton,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Backdrop,
  Modal,
  Slide,
  Paper,
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import { userValidationSchema } from "../../helper/userValidationSchema";

const useStyles = makeStyles((theme) => ({
  buttonOutlineNone: {
    "&:focus": {
      outline: "none"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "-150px!important"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40%"
  },
  formControl: {
    width: "100%",
    padding: theme.spacing(0, 1)
  }
}));

const UserModal = ({ openModal, handleClose, handleAction, isUpdating }) => {
  const classes = useStyles();

  const { taiKhoan, matKhau, email, soDt, maLoaiNguoiDung, hoTen } =
    useSelector((state) => state.user.userDetail);

  const formik = useFormik({
    initialValues: {
      taiKhoan,
      matKhau,
      email,
      soDt,
      maNhom: "GP01",
      maLoaiNguoiDung,
      hoTen
    },
    onSubmit: async (values, { resetForm }) => {
      if (await handleAction(values)) {
        setTimeout(resetForm, 1000);
      }
    },
    validationSchema: userValidationSchema,
    enableReinitialize: true
  });

  const handleCloseModal = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <Modal
      className={classes.modal}
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Slide direction="down" in={openModal}>
        <Paper className={classes.paper}>
          <Grid container justify="space-between">
            <h2 id="transition-modal-title" style={{ paddingLeft: "8px" }}>
              {isUpdating ? "Cập nhật" : "Thêm mới"} người dùng
            </h2>
            <IconButton
              onClick={handleCloseModal}
              className={classes.buttonOutlineNone}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item container xs={12} justify="space-between">
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Tài khoản"
                      name="taiKhoan"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.taiKhoan}
                      error={formik.touched.taiKhoan && formik.errors.taiKhoan}
                      helperText={
                        formik.touched.taiKhoan ? formik.errors.taiKhoan : ""
                      }
                      disabled={isUpdating}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Mật khẩu"
                      name="matKhau"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.matKhau}
                      error={formik.touched.matKhau && formik.errors.matKhau}
                      helperText={
                        formik.touched.matKhau ? formik.errors.matKhau : ""
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item container xs={12} justify="space-between">
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Họ tên"
                      name="hoTen"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.hoTen}
                      error={formik.touched.hoTen && formik.errors.hoTen}
                      helperText={
                        formik.touched.hoTen ? formik.errors.hoTen : ""
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Số điện thoại"
                      name="soDt"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.soDt}
                      error={formik.touched.soDt && formik.errors.soDt}
                      helperText={formik.touched.soDt ? formik.errors.soDt : ""}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                    helperText={formik.touched.email ? formik.errors.email : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    style={{ left: "8px" }}
                    id="demo-simple-select-label"
                  >
                    Loại người dùng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="maLoaiNguoiDung"
                    onChange={formik.handleChange}
                    value={formik.values.maLoaiNguoiDung}
                  >
                    <MenuItem value="KhachHang">Khách hàng</MenuItem>
                    <MenuItem value="QuanTri">Quản Trị</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <Button
                      className={classes.buttonOutlineNone}
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      {isUpdating ? "Cập nhật" : "Thêm"}
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <Button
                      className={classes.buttonOutlineNone}
                      color="secondary"
                      variant="contained"
                      onClick={handleCloseModal}
                    >
                      Hủy
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Slide>
    </Modal>
  );
};

export default UserModal;
