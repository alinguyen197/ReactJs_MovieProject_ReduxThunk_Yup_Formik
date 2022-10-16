import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import style from "./sidebar.module.scss";
import { featureList } from "../../helper/featureList";

export const mainListItems = () => {
  return (
    <>
      {featureList.map((feature, i) => {
        return (
          <NavLink
            key={i}
            className={style.sidebar__link}
            activeClassName={`${style.sidebar__link__active}`}
            to={feature.url}
          >
            <ListItem button>
              <ListItemIcon>{feature.icon}</ListItemIcon>
              <ListItemText primary={feature.title_VN} />
            </ListItem>
          </NavLink>
        );
      })}
    </>
  );
};
