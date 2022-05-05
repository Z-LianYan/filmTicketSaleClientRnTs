import * as HttpUtils from "@/utils/request";
import * as Api from "@/api/constant";

export function get_city_list(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_CITY_LIST, params, "努力加载中...").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          reject(res.data);
          break;
      }
    });
  });
}

export function get_by_city(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_BY_CITY, params, "").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          reject(res.data);
          break;
      }
    });
  });
}

export function get_city_district_list(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_CITY_DISTRICT_LIST, params, "").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          reject(res.data);
          break;
      }
    });
  });
}
