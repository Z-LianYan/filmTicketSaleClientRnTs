import React,{useState,useEffect,useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Dimensions,
  Platform,
  View as Viw,
  Text as Txt
} from 'react-native';
import { observer, inject } from 'mobx-react'
import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  Button,
  Carousel,
  Theme,
  Label,
  Drawer,
  ActionSheet,
  Input,
  Toast
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import { get_cinema_list } from '../../api/cinema';
import { get_order_list } from "../../api/order";

var ScreenWidth = Dimensions.get('window').width;
import { get_city_list } from "../../api/citys";
import CustomListRow from '../../component/CustomListRow';
import ServerDetial from '../CinemaDetail/ServerDetial';
import CitysPageContent from './content';


const CitysPage = ({app,navigation,route}:any) => {
  const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  const onSetOptions = useCallback(()=>{
    navigation.setOptions({
      title: '当前城市-'+app.locationInfo.city_name,
    });
  },[]);
  useEffect(()=>{
    onSetOptions()
  },[])

  return <CitysPageContent 
  colorScheme={colorScheme} 
  navigation={navigation} 
  app={app}/>
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
});

export default inject("app")(observer(CitysPage));
