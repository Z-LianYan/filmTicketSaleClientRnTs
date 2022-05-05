import * as HttpUtils from "@/utils/request";
import * as Api from "@/api/constant";
import { Toast } from "antd-mobile";

export function get_cinema_list(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_CINEMA_LIST, params, "努力加载中...").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          Toast.show({
            icon: "fail",
            duration: 2000,
            content: res.message,
          });
          reject(res.data);
          break;
      }
    });
  });
}
export function get_cinema_detail(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_CINEMA_DETAIL, params, "努力加载中...").then(
      (res) => {
        switch (res.error) {
          case 0:
            resolve(res.data);
            break;
          default:
            Toast.show({
              icon: "fail",
              duration: 2000,
              content: res.message,
            });
            reject(res.data);
            break;
        }
      }
    );
  });
}
export function get_date_schedule(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_DATE_SCHEDULE, params, "").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          Toast.show({
            icon: "fail",
            duration: 2000,
            content: res.message,
          });
          reject(res.data);
          break;
      }
    });
  });
}

export function get_film_in_schedule_dates(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_FILM_IN_SCHEDULE_DATES, params, "").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          Toast.show({
            icon: "fail",
            duration: 2000,
            content: res.message,
          });
          reject(res.data);
          break;
      }
    });
  });
}
