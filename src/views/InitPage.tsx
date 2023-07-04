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
  Dimensions
} from 'react-native';

import WebView from 'react-native-webview';


import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import { 
  View,
  Text
} from '../component/Themed';
import { 
  Button,
  Carousel,
  // NavigationBar,
  Theme,
  ListRow,
  Toast,
  Input
} from '../component/teaset/index';
import PropTypes, { number, string } from 'prop-types';
import { get_film_hot } from '../api/film';
import CustomListRow from '../component/CustomListRow';
import NavigationBar from '../component/NavigationBar';
import { login_out } from "../api/user";
import { edit_user_info, get_user_info } from "../api/user";
var ScreenObj = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitPage = ({app,navigation,route}:any) => {
  let [time,setTime] = useState(10);
  useEffect(()=>{

    
    getStorage();

    let timer = setInterval(() => {
      if(time<=0) {
        clearInterval(timer);
        navigation.replace('AppTabBar');
      };
      time -= 1;
      setTime(time)
    }, 1000);
    return ()=>{
      clearInterval(timer);
    }
  },[]);

  const getStorage = useCallback(async()=>{
    let res:string|null = await AsyncStorage.getItem('locationInfo');
    if(!res) return;
    let _res:{city_id:number,city_name:string} = JSON.parse(res)
    app.setLocationInfo({
      city_id: _res.city_id, //默认城市编码
      city_name: _res.city_name, //默认城市广州
    })
  },[])
  
  return <View style={styles.container}>
    <View style={styles.headContainer}>
      <Text></Text>
      <Text 
      style={{
        borderWidth:1,
        borderColor:'#eee',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:15
      }}
      onPress={()=>{
        console.log('12345')
        navigation.replace('AppTabBar');
      }}>跳过{time}</Text>
    </View>
    <Text style={{textAlign:'center',marginTop:100}}>欢迎光临，售票宝app</Text>
    <Text style={{textAlign:'center',marginTop:100}}>
      售票宝app是用来学习和欣赏的没有任何商用，此售票宝app不会向您收取任何费用接口，购买的所有订单均不是真实的订单都是模拟出来的订单数据，如有侵权联系删除。
    </Text>
    <Text style={{textAlign:'center'}}>
      qq：2930638161
    </Text>
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  headContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 40,
    paddingTop:50
  }
  
});

export default inject("AppStore")(observer(InitPage));
