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
  Alert,
  Dimensions,
  PermissionsAndroid
} from 'react-native';

import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import { 
  View,
  Text
} from '../../component/Themed';
import { 
  Button,
  Carousel,
  // NavigationBar,
  Theme,
  ListRow,
  Toast,
  Input
} from '../../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";
import { edit_user_info, get_user_info } from "../../api/user";
import { upload_file } from "../../api/common";
import HttpUtils from '../../utils/request';
import UploadFile from '../../component/UploadFile';

import axios from "axios";

var ScreenObj = Dimensions.get('window');

const EditUserInfo = ({AppStore,navigation}:any) => {
    
  const colorScheme = useColorScheme();
  let [formData,setFormData] = useState({
    nickname: "",
    avatar: ''
  });
  let [qiniuConfig,setQiniuConfig] = useState({
    static_host: "",
    upload_token: "",
  });
  let [submiting,setSubmiting] = useState(false);
  let [loadingFinish,setLoadingFinish] = useState(false);


  useEffect(()=>{
    // getUserInfo()
    setFormData({
      avatar:AppStore.userInfo.avatar,
      nickname:AppStore.userInfo.nickname
    })
  },[]);

  async function getUserInfo() {
    try{
      let result:any = await get_user_info({
        navigation
      });
      if (!result) return;
      setFormData({
        avatar:result.avatar,
        nickname:result.nickname
      })
      AppStore.setUserInfo(result);

      setLoadingFinish(true)
    }catch(err:any){
      console.log(err.message)
    }
  }

  async function onEditUserInfo() {
    if (!formData.nickname) return Toast.message("用户名不能为空");
    setSubmiting(true);
    await edit_user_info(formData);
    setSubmiting(false);
    getUserInfo();
  }

  return <View style={styles.container}>
    <CustomListRow 
    accessory="none"
    bottomSeparator="indent" 
    title={'用户名'} 
    detail={<View>
      <View style={styles.inputWrapper}>
        <Input 
        value={formData.nickname} 
        clearButtonMode="never"
        style={{
          ...styles.input,
          color:colorScheme=="dark"?'#fff':'#000'
        }}
        placeholderTextColor="#999"
        selectionColor={Theme.primaryColor}
        maxLength={8}
        keyboardType="default"
        placeholder="请输入用户名"
        onSubmitEditing={(_e:any)=>{
          // console.log(e.nativeEvent.text)
          // onToRecharge()
        }}
        onChangeText={(val:any)=>{
          // formData.nickname = val;
          setFormData({
            ...formData,
            nickname:val
          });
        }}
        autoFocus={false}
        onChange={(e:any)=>{
          let val = e.nativeEvent.text;
        }}/>

        <Ionicons 
          name={'ios-close-circle-sharp'} 
          style={styles.iosCloseCircleSharp}
          size={30} 
          color={colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor} 
          onPress={(e)=>{
            setFormData({
              ...formData,
              nickname:''
            })
          }}/>
        
      </View>
      
    </View>} />

    <CustomListRow 
    accessory="none"
    bottomSeparator="indent" 
    title={'头像'} 
    detail={<UploadFile borderRadius={50} 
    fileList={[{uri:AppStore.userInfo.avatar}]}
    onUpload={async (file)=>{
      console.log('file---->>onUpload',file)
      let obj_file = { uri: '', type: 'multipart/form-data', name: 'image.jpg' }
      const formData = new FormData()
      for(const item of file){
        obj_file.uri = item.uri
        formData.append('file', obj_file);
      }
      // HttpUtils({
      //   url: "http://192.168.0.26:7002/uploadFile",
      //   method: "POST",
      //   data: formData,
      //   headers:{
      //     "Content-Type": "multipart/form-data",
      //     // 'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      // })
      
      const result = await upload_file(formData);
      console.log('result------>>',result);

    }}
    />} />

    <Button
      style={styles.btnRecharge}
      title={'保存'}
      type="primary"
      size="lg"
      disabled={submiting}
      onPress={() => {
        onEditUserInfo();
      }}
    />
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  inputWrapper:{
    width:ScreenObj.width - 120,
    position:'relative',
    // backgroundColor:'#ccc'
  },
  input:{
    width:'100%',
    height:50,
    fontSize:18,
    fontWeight:'bold',
    backgroundColor:'transparent',
    borderColor:'transparent'
  },
  iosCloseCircleSharp:{
    position:'absolute',
    right:10,
    top:9,
  },
  btnRecharge:{
    marginHorizontal:10,
    marginTop:ScreenObj.height - ScreenObj.height/1.8
  }
});

export default inject("AppStore")(observer(EditUserInfo));
