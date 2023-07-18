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
import UploadFile from '../../component/UploadFile';

import dayjs from 'dayjs';

import * as qiniu from 'qiniu-js';

import { conformsTo } from 'lodash';

var ScreenObj = Dimensions.get('window');


const EditUserInfo = ({AppStore,navigation}:any) => {
    
  const colorScheme = useColorScheme();
  let [formData,setFormData] = useState({
    nickname: "",
    avatar: '',
    random: "20230714112136111"
  });
  let [qiniuConfig,setQiniuConfig] = useState({
    static_host: "",
    upload_token: "",
  });
  let [submiting,setSubmiting] = useState(false);
  let [loadingFinish,setLoadingFinish] = useState(false);


  useEffect(()=>{
      // let isMounted = true;// 防止报 Can't perform a React state update on an unmounted component.
      // if(isMounted){
        setFormData({
          avatar:AppStore.userInfo && AppStore.userInfo.avatar,
          nickname:AppStore.userInfo.nickname,
          random: dayjs().format('YYYYMMDDHHmmssSSS')
        });
      // }
      getUserInfo();
    return ()=>{
      // isMounted = false
    }
  },[]);

  async function getUserInfo() {
    return new Promise(async (resolve,reject)=>{
      let result:any = await get_user_info({
        navigation
      });
      if (!result) return;
      // if(!isMounted) return;
      setFormData({
        avatar:result.avatar,
        nickname:result.nickname,
        random: dayjs().format('YYYYMMDDHHmmssSSS')
      })
      AppStore.setUserInfo(result);
      // setLoadingFinish(true)

      resolve('ok');
    });
      
  }

  async function onEditUserInfo() {
    if (!formData.nickname) return Toast.message("用户名不能为空");
    setSubmiting(true);
    await edit_user_info(formData);
    setSubmiting(false);
    await getUserInfo();
    navigation.goBack()
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
    detail={<UploadFile 
      borderRadius={50} 
      key={formData?.random}
      fileList={[{uri:formData?.avatar}]}
      onBeforeUpload={async (file)=>{
        return new Promise(async (resolve, reject)=>{
          // const res = await fetch(`${file[0].uri}`);
          // const blobData:any = await res.blob()
          // qiniu.compressImage(blobData._data, {
          //   quality: 0.92,
          //   noCompressIfLarger: true
          // }).then(data=>{
          //   console.log('压缩----》〉data',data)
          //   // resolve([data])
          // }); 
          resolve(file)
        })
      }}
      onAfterUpload={(file)=>{
        console.log('afterUpload----->>>',file);
        formData.avatar = file[0].uri;
        setFormData(formData);
      }}
      onUploadFail={(err)=>{
        console.log('onUploadFail------>>>',err)
        // getUserInfo()
        setFormData({
          avatar: AppStore?.userInfo?.avatar,
          nickname: AppStore?.userInfo?.nickname,
          random: dayjs().format('YYYYMMDDHHmmssSSS')
        })
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
