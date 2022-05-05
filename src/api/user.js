import * as HttpUtils from "@/utils/request";
import * as Api from "@/api/constant";
import { Toast } from "antd-mobile";
import store from "@/store/index";

export function phone_register(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.PHONE_REGISTER, params, "努力加载中...").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          Toast.show({
            icon: "success",
            duration: 2000,
            content: res.message,
          });
          break;
        default:
          reject(res);
          Toast.show({
            icon: "fail",
            duration: 2000,
            content: res.message,
          });
          break;
      }
    });
  });
}

export function send_verify_code(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.SEND_VERIFY_CODE, params, "努力加载中...").then(
      (res) => {
        switch (res.error) {
          case 0:
            resolve(res.data);
            Toast.show({
              icon: "success",
              duration: 2000,
              content: res.message,
            });
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

export function get_user_info(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.GET_USER_INFO, params, "").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          // Toast.show({
          //   icon: "fail",
          //   duration: 2000,
          //   content: res.message,
          // });
          // reject(res.data);
          break;
      }
    });
  });
}

export function login_out(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.LOGIN_OUT, params, "").then((res) => {
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


export function user_recharge(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.USER_RECHARGE, params, "充值中...").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          Toast.show({
            icon: "success",
            duration: 2000,
            content: res.message,
          });
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

export function edit_user_info(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.EDIT_USER_INFO, params, "修改中...").then((res) => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          Toast.show({
            icon: "success",
            duration: 2000,
            content: res.message,
          });
          break;
        default:
          Toast.show({
            icon: "fail",
            duration: 2000,
            content: res.message,
          });
          reject(res);
          break;
      }
    });
  });
}


