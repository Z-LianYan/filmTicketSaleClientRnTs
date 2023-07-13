/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState,useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { observer, inject } from 'mobx-react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Platform,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View as Viw,
  Text as Txt,
  PermissionsAndroid,
  Alert
} from 'react-native';

import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import { 
  View,
  Text
} from './Themed';
import { 
  Button,
  Carousel,
  NavigationBar,
  Theme,
  Overlay,
  Checkbox,
} from './teaset/index';
import PropTypes, { number } from 'prop-types';
import { 
  FIlM_ICON,
  FIlM_ACTIVE_ICON, 
  CINEMA_ICON,
  CINEMA_ACTIVE_ICON,
  MINE_ICON,
  MINE_ACTIVE_ICON,
} from '../assets/image/index';

import { scaleView as sv, scaleText as st } from '../utils/scaleSize';

import { get_film_hot } from '../api/film';
import CustomListRow from './CustomListRow';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { upload_file } from "../api/common";
import HttpUtils from "../utils/request";
import * as Api from '../api/constant';
import { result } from 'lodash';


type TypeProps = {
  onBeforeUpload?:(val:any[])=> any
  onAfterUpload?:(val:any[])=> void
  width?: number
  height?: number,
  borderRadius?: number,
  fileList?: any[]
}
const UploadFile = ({
  width=100,
  height=100,
  borderRadius=5,
  fileList = [],
  onBeforeUpload,
  onAfterUpload,
}:TypeProps) => {
  const colorScheme = useColorScheme();
  // const [overlay_view,set_overlay_view] = useState(null)
  const [file_list,set_file_list] = useState(fileList)

console.log('fileList---->>>',fileList);

  useEffect(()=>{
  },[file_list])

  const uploadImage = useCallback(async (_file,callBack)=>{
    try{

      const file = onBeforeUpload ? await onBeforeUpload(_file): _file;
      
      const formData = new FormData()
      for(const item of file){
        formData.append('file', { uri: item.uri, type: 'multipart/form-data', name: item.fileName });
      }
      console.log('上传----》〉》FormData',formData);
      // const result:any = await upload_file(formData);

      const _result:any = await HttpUtils({
        url: Api.UPLOAD_FILE,
        method: "POST",
        data: formData,
        headers:{
          "Content-Type": "multipart/form-data"
        },
      });
      const result = _result.data.data

      console.log('上传----》〉》',result)
      if(result && result.file_list.length) {
        const fileList = []
        for(const item of result.file_list){
          fileList.push({
            uri: item.url
          });
        }
        onAfterUpload && onAfterUpload(fileList);
      }
    }catch(err){
      console.log('上传catch------》〉',err)
    }finally{
      callBack && callBack();
    }
    
  },[])

  const handLaunchCamera = useCallback(async (callBack)=>{
    

    try{

      let granted = null
      if(Platform.OS === "android"){
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "应用程序摄像头权限",
            message:"应用程序需要访问您的相机",
            buttonNeutral: "稍后询问我",
            buttonNegative: "关闭",
            buttonPositive: "授权"
          }
        );
      }
      if(granted && granted !== PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("Camera permission denied");
        Alert.alert(
          "摄像头权限被禁止！！！",
          "",
          [
            {
              text: "",
              onPress: () => {

              },
              style: "cancel"
            },
            { text: "确定", onPress: async () => {
              
            }}
          ]
        );
        return;
      };

      const result:any = await launchCamera({
        mediaType: 'mixed'
      });
      console.log('result----->>launchCamera',result);
      // {"assets": [{
      //   "fileName": "rn_image_picker_lib_temp_29579321-a2c6-41d5-ad5c-cee45dcb270b.png", 
      //   "fileSize": 51378, 
      //   "height": 1200, 
      //   "type": "image/png", 
      //   "uri": "file:///data/user/0/com.filmticketsaleclientrnts/cache/rn_image_picker_lib_temp_29579321-a2c6-41d5-ad5c-cee45dcb270b.png", 
      //   "width": 1920}]}
      if(result && result.assets) {
        set_file_list(result.assets);
        console.log('------23456')

        await uploadImage(result.assets,callBack);

        console.log('23456')
      }
    }catch(err:any){
      Alert.alert(
        "错误提示",
        err.message,
        [
          {
            text: "",
            onPress: () => {

            },
            style: "cancel"
          },
          { text: "确定", onPress: async () => {
            
          }}
        ]
      );
    } finally {
      callBack && callBack();
    }
    
    
  },[]);

  const handLaunchImageLibrary = useCallback(async (callBack)=>{
    try{

      const result:any = await launchImageLibrary({
        mediaType: 'mixed',
        quality: 1,
        selectionLimit: 1
      });
      console.log('result----->>',result);
      // {"assets": [{
      //   "fileName": "rn_image_picker_lib_temp_29579321-a2c6-41d5-ad5c-cee45dcb270b.png", 
      //   "fileSize": 51378, 
      //   "height": 1200, 
      //   "type": "image/png", 
      //   "uri": "file:///data/user/0/com.filmticketsaleclientrnts/cache/rn_image_picker_lib_temp_29579321-a2c6-41d5-ad5c-cee45dcb270b.png", 
      //   "width": 1920}]}
      if(result && result.assets) {
        set_file_list(result.assets);
        await uploadImage(result.assets,callBack)
      }
    }finally{
      callBack && callBack()
    }
    
  },[]);

  const overlay_pullview = useCallback((callBack)=>{
    return <Overlay.PopView 
    modal={false}
    style={{alignItems: 'center', justifyContent: 'center'}}
    containerStyle={{
      minWidth: sv(400),
      borderRadius:sv(10),
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
      padding: sv(20)
    }}>
      <CustomListRow
      accessory="indicator"
      bottomSeparator="indent" 
      title={'打开照相机'}
      onPress={()=>{
        handLaunchCamera(callBack)
      }}/>
      <CustomListRow
      accessory="indicator"
      bottomSeparator="none" 
      title={'从文件中选择'}
      onPress={()=>{
        handLaunchImageLibrary(callBack)
      }}/>
    </Overlay.PopView>
  },[])

  return <TouchableOpacity activeOpacity={0.8} style={{
      borderColor: colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor,
      borderWidth: sv(1),
      width: sv(width),
      height: sv(height),
      justifyContent:'center',
      alignItems: 'center',
      borderRadius: borderRadius,
      position:'relative'
    }}
    onPress={()=>{
      let ol = Overlay.show(overlay_pullview(()=>{
        Overlay.hide(ol);
      }));

    }}>
      {
        file_list.map((item:any,index)=>{
          if(!item.uri) return;
          return <Image
          style={{width: sv(width-2), height: sv(height -2)}}
          resizeMode="cover"
          borderRadius={borderRadius}
          source={{uri:item.uri}}
          // onLoadEnd={() => this.checkLeftRight()}
          key={"avatar"+index}
        />})
      }
      {
        !file_list.length && <Ionicons 
        name={'add'} 
        size={sv(30)} 
        color={colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor} />
      }
  </TouchableOpacity>
};

const styles = StyleSheet.create({
  
});

export default UploadFile;
