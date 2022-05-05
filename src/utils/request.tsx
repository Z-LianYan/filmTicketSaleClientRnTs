


import axios from "axios";
import {
  Platform
} from 'react-native';

import {
  Dialog
} from '@rneui/themed';
import { useState } from 'react';

function Loading(){
  let [visible,setVisible] = useState(false)
  return <Dialog 
  isVisible={visible} 
  onBackdropPress={()=>setVisible(!visible)}>
    <Dialog.Loading />
  </Dialog>
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
    if (text)
      // Toast.show({
      //   icon: "loading",
      //   duration: 2000,
      //   content: text,
      // });
    service({
      url: url,
      method: "POST",
      data: data,
      headers: {},
    })
      .then((res) => {
        resolve(res.data);
        // if (text) Toast.clear();
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
    if (text)
      // Toast.show({
      //   icon: "loading",
      //   duration: 2000,
      //   content: text,
      // });
    service({
      url: 'http://192.168.0.102:7002'+url,
      method: "GET",
      params: params,
      headers: {},
    })
      .then((res) => {
        resolve(res.data);
        // if (text) Toast.clear();
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
