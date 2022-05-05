import * as HttpUtils from "@/utils/request";
import * as Api from "@/api/constant";
import { Toast } from "antd-mobile";

export function get_upload_qiuniu_config(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_UPLOAD_QINIU_CONFIG, params, "").then((res) => {
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
          reject(res);
          break;
      }
    });
  });
}