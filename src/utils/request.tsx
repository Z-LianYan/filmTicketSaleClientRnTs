


import axios from "axios";
import {
  Platform,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { useState } from 'react';

import config from '../config/index';
import { TopView, Toast,ModalIndicator } from '../component/teaset/index';
import app from '../store/AppStore';

// let routerNavigation:any = null;

function isLoading(text?:string){
  if(text){
    ModalIndicator.hide()
    ModalIndicator.show(text)
  }
}
function hideLoading(){
  ModalIndicator.hide()
}
axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL: config.HOST, // api的base_url
  timeout: 10000, //1m request timeout
  headers: {
    platform: Platform.OS=='ios'?'rnIos':'rnAndroid',
    "Content-Type": "application/json;charset=UTF-8",
  },
  // withCredentials: true
});

export default service;
service.interceptors.request.use(
  (config:any) => {
    // config.headers['token'] = getToken()
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.data.error === 401) {
      return response;
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export function post(url:string, data?:any, text?:string,headers={}) {
  return new Promise((resolve, reject) => {
    if (text) isLoading(text);
    service({
      url: url,
      method: "POST",
      data: data,
      headers,
    })
      .then((res) => {
        resolve(res.data);
        if (text) hideLoading();
        if(res.data.error==401){
          data.navigation && data.navigation.navigate('HomePage');
          app.setUserInfo(null);
        }
      })
      .catch((err) => {
        reject(err);
        if (text) hideLoading();
      });
  });
}

export function get(url:string, params?:any, text?:string, headers={}) {
  return new Promise((resolve, reject) => {
    if (text) isLoading(text);
    service({
      url: url,
      method: "GET",
      params: params,
      headers,
    })
      .then((res) => {
        resolve(res.data);
        if (text) hideLoading();
        if(res.data.error==401){
          params.navigation && params.navigation.navigate('HomePage');
          app.setUserInfo(null);
        }
      })
      .catch((err) => {
        reject(err);
        if (text) hideLoading();
      });
  });
}
