import User from "../page/user/user.page";
import Movie from "../page/movie/movie.page";
// import Showtime from "../page/showtime/showtime.page";
import PeopleIcon from "@material-ui/icons/People";
import MovieIcon from "@material-ui/icons/Movie";
// import TheatersIcon from "@material-ui/icons/Theaters";

export const featureList = [
  {
    id: "user",
    title: "User management",
    title_VN: "Quản lý Người dùng",
    url: "/admin/user",
    component: <User />,
    icon: <PeopleIcon />
  },
  {
    id: "movie",
    title: "Movie management",
    title_VN: "Quản lý Phim",
    url: "/admin/movie",
    component: <Movie />,
    icon: <MovieIcon />
  }
  // {
  //   id: "showtime",
  //   title: "Showtime management",
  //   title_VN: "Quản lý Lịch chiếu",
  //   url: "/admin/showtime",
  //   component: <Showtime />,
  //   icon: <TheatersIcon />
  // }
];
