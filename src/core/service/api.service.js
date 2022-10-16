import axios from "axios";
import { DOMAIN } from "../global/constant";

class ApiService {
  get = function (url, method) {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: `${method}`
    });
  };
  post = function (url, method, info, token) {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: method,
      data: info
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    });
  };
}

export let api = new ApiService();
