import { Divider, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getDetailMovie } from "../../../store/action/movie.action";
import { DataGrid } from "@material-ui/data-grid";
import * as dayjs from "dayjs";
import ShowtimeForm from "../../components/showtime-form/showtimeForm";
import swal from "sweetalert";
import { createShowtimeAction } from "../../../store/action/showtime.action";

const useStyles = makeStyles((theme) => ({
  title: {
    textTransform: "uppercase",
    marginBottom: theme.spacing(2)
  }
}));

const Showtime = () => {
  const dispatch = useDispatch();
  const { lichChieu, tenPhim } = useSelector(
    (state) => state.movie.detail_movie
  );

  const classes = useStyles();
  const { maPhim } = useParams();

  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    { field: "maLichChieu", headerName: "Mã lịch chiếu", flex: 1.4 },
    { field: "heThongRap", headerName: "Hệ thống rạp", flex: 1.4 },
    { field: "cumRap", headerName: "Cụm rạp", flex: 2 },
    { field: "rap", headerName: "Rạp", flex: 0.9 },
    {
      field: "ngayChieuGioChieu",
      headerName: "Lịch chiếu",
      flex: 2.2,
      valueFormatter: (params) => {
        return dayjs(params.value).format("HH:mm - DD/MM/YYYY");
      }
    },
    { field: "giaVe", headerName: "Giá vé", flex: 1 },
    { field: "thoiLuong", headerName: "Thời lượng", flex: 1.5 }
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1.5,
    //   renderCell: (params) => {
    //     const onClick = () => {
    //       handleEdit(params.getValue(params.id, "maLichChieu"));
    //     };
    //     return (
    //       <Button
    //         disabled
    //         onClick={onClick}
    //         color="secondary"
    //         variant="contained"
    //       >
    //         Sửa
    //       </Button>
    //     );
    //   }
    // }
  ];

  const renderShowtime = () => {
    return lichChieu?.map((l, index) => {
      return {
        id: index,
        maLichChieu: l.maLichChieu,
        heThongRap: l.thongTinRap.tenHeThongRap,
        cumRap: l.thongTinRap.tenCumRap,
        rap: l.thongTinRap.tenRap,
        ngayChieuGioChieu: l.ngayChieuGioChieu,
        giaVe: l.giaVe,
        thoiLuong: l.thoiLuong
      };
    });
  };

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
        "DD/MM/YYYY HH:mm:ss"
      )
    };
    return await dispatch(createShowtimeAction(data)).then((r) => {
      console.log(r);
      if (r.status === 200) {
        swal({
          title: "Success!",
          text: "Thêm phim thành công",
          icon: "success",
          button: false,
          timer: 2000
        });
        dispatch(getDetailMovie(maPhim));
        return true;
      } else {
        swal({
          title: "Unsuccess!",
          text: r.data,
          icon: "error",
          buttons: "OK",
          dangerMode: true
        });
        return false;
      }
    });
  };

  // const handleEdit = (maLichChieu) => {
  //   const showtime = lichChieu.find((l) => l.maLichChieu === maLichChieu);
  //   dispatch(setShowtimeDetail(showtime));
  // };

  useEffect(() => {
    dispatch(getDetailMovie(maPhim));
  }, []);

  return (
    <div>
      <Typography
        className={classes.title}
        variant="h4"
        align="center"
        color="secondary"
      >
        Thông tin lịch chiếu của phim {tenPhim}
      </Typography>

      <Divider />

      <ShowtimeForm maPhim={maPhim} handleSubmit={handleSubmit} />

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={lichChieu ? renderShowtime() : []}
          columns={columns}
          pageSize={5}
          rowHeight={35}
          disableColumnMenu
        />
      </div>
    </div>
  );
};

export default Showtime;
