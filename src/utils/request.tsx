


import axios from "axios";
import {
  Platform,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { useState } from 'react';

let host = process.env.NODE_ENV=='development'?'http://192.168.0.102:7002':'http://film.imgresource.com.cn'
// let host = process.env.NODE_ENV=='development'?'http://film.imgresource.com.cn':'http://film.imgresource.com.cn'
import { TopView, Toast,ModalIndicator } from '../component/teaset/index';
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
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 * 200, //1m request timeout
  headers: {
    // platform: 'web',
    platform: Platform.OS,
    "Content-Type": "application/json;charset=UTF-8",
  },
  // withCredentials: true
});

export default service;
service.interceptors.request.use(
  (config) => {
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
export function post(url:string, data:object, text:string) {
  return new Promise((resolve, reject) => {
    if (text) isLoading(text);

    

      // Toast.show({
      //   icon: "loading",
      //   duration: 2000,
      //   content: text,
      // });
    service({
      url: host+url,
      method: "POST",
      data: data,
      headers: {},
    })
      .then((res) => {
        resolve(res.data);
        if (text) hideLoading();
      })
      .catch((err) => {
        reject(err);
        // Toast.show({
        //   icon: "fail",
        //   duration: 2000,
        //   content: err.message,
        // });
      });
  });
}

export function get(url:string, params?:object, text?:string) {
  return new Promise((resolve, reject) => {
    if (text) isLoading(text);
    // Toast.success('Toast success');
    // Toast.smile('Toast smile');
    // Toast.stop('Toast stop');
    // ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
    
    service({
      url: host+url,
      method: "GET",
      params: params,
      headers: {},
    })
      .then((res) => {
        resolve(res.data);
        if (text) hideLoading();
      })
      .catch((err) => {
        reject(err);
        // Toast.show({
        //   icon: "fail",
        //   duration: 2000,
        //   content: err.message,
        // });
      });
  });
}
