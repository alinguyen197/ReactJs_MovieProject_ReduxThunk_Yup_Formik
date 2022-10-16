import axios from "axios";
import { DOMAIN } from "../global/constant";

class CinemaService {
  getCinemaSystemList = () =>
    axios({
      url: `${DOMAIN}/api/QuanLyRap/LayThongTinHeThongRap`,
      method: "GET"
    });

  getCinemaGroupList = (maHeThongRap) =>
    axios({
      url: `${DOMAIN}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: "GET"
    });
}

export const cinemaService = new CinemaService();
