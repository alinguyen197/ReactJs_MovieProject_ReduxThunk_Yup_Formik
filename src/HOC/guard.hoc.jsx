import React from "react";
import { Redirect } from "react-router-dom";

const Guard = (props) => {
  const maLoaiNguoiDung = JSON.parse(localStorage.getItem("maLoaiNguoiDung"));
  return maLoaiNguoiDung === "QuanTri" ? (
    props.children
  ) : (
    <Redirect to="/home" />
  );
};

export default Guard;

export const GuardBooking = (props) => {
  const hoTen = JSON.parse(localStorage.getItem("hoTen"));
  return hoTen === null ? <Redirect to="/sign-in" /> : props.children;
};
