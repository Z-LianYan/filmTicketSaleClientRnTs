import React, {Component, useState,useEffect, useCallback } from 'react';
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
  View as Viw,
  Text as Txt,
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
  Input,
  Overlay
} from '../../component/teaset/index';
import PropTypes, { any, number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";

import service from '../../utils/request';
import dayjs from 'dayjs';

import {
  create_order,
  pay_order,
  cancle_order,
  get_buy_ticket_detail,
} from "../../api/order";
import { get_user_info } from "../../api/user";
var ScreenObj = Dimensions.get('window');
import ContentCom from "./ContentCom";


const BuyTicket = ({AppStore,navigation,route}:any) => {
  const colorScheme = useColorScheme();
  return <ContentCom 
  useColorScheme={colorScheme} 
  navigation={navigation}
  route={route}
  AppStore={AppStore}/>
};
export default inject("AppStore")(observer(BuyTicket));

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  headBox:{
    paddingHorizontal:12,
    paddingTop:12,
    paddingBottom:50,
    // backgroundColor:Theme.primaryColor,
    flexDirection:'row',
  },
  headBoxImage:{
    width:72,
    height:100,
    marginRight:10
  },
  headBoxRight:{
    flex:1
  },
  headBoxRightFilmNameWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  filmName:{
    color:'#fff',
    fontSize:20,
    flex:1
  },
  numPrice:{
    fontSize:12,
    width:100,
    color:'#fff',
    textAlign:'right'
  },
  timeLanguage:{
    // fontSize:14,
    color:'#fff',
  },
  cinemaName:{
    color:'#fff',
  },

  bottomContentBox:{
    flex:1,
    position:'relative'
  },
  bottomContentBoxTop:{
    position:'absolute',
    left:0,
    right:0,
    top:-20,
    height:20,
    // transform:[{translateY: -30}],
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  bottomBox:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderTopWidth:1
  },
  bottomBoxLeft:{
    color:Theme.primaryColor,
    fontWeight:'bold'
  },
  bottomBoxRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailText:{
    display:'flex',
    justifyContent:'center',
    marginRight:10
  }
  
});
