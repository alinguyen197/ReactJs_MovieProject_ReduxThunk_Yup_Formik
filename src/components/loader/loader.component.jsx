import s from "./loader.module.scss";
import loading from "../../asset/image/loading.png";
import React from "react";

const Loader = () => {
  return (
    <div className={s.loading}>
      <div className={s.loading__content}>
        <img src={loading} className={s.tada} />
        <img src={loading} className={s.tada} />
        <img src={loading} className={s.tada} />
        <img src={loading} className={s.tada} />
        <img src={loading} className={s.tada} />
      </div>
    </div>
  );
};

export default Loader;
