import * as HttpUtils from '@/utils/request';
import * as Api from '@/api/constant';
import {Toast} from '../component/teaset/index';

export function get_order_list(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_ORDER_LIST, params, '努力加载中...').then(res => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          reject(res);
          Toast.fail(res.message);
          break;
      }
    });
  });
}
export function create_order(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.CREATE_ORDER, params, '努力加载中...').then(res => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          reject(res);
          Toast.fail(res.message);
          break;
      }
    });
  });
}

export function get_buy_ticket_detail(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_BUY_TICKET_DETAIL, params, '努力加载中...').then(
      res => {
        switch (res.error) {
          case 0:
            resolve(res.data);
            break;
          default:
            reject(res);
            Toast.fail(res.message);
            break;
        }
      },
    );
  });
}

export function cancle_order(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.CANCLE_ORDER, params, '').then(res => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          reject(res);
          Toast.fail(res.message);
          break;
      }
    });
  });
}

export function get_order_detail(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.get(Api.GET_ORDER_DETAIL, params, '努力加载中...').then(res => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          break;
        default:
          reject(res);
          Toast.fail(res.message);
          break;
      }
    });
  });
}

export function pay_order(params) {
  return new Promise((resolve, reject) => {
    HttpUtils.post(Api.PAY_ORDER, params, '支付中...').then(res => {
      switch (res.error) {
        case 0:
          resolve(res.data);
          Toast.success(res.message);
          break;
        case 'noBalance':
          reject(res);
          break;
        default:
          reject(res);
          Toast.fail(res.message);
          break;
      }
    });
  });
}
