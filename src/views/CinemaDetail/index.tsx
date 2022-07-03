import React,{useState,useEffect,useRef,useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
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
  ActionSheet
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import BottomLoading from '../../component/BottomLoading';
import CinemaListItem from './CinemaListItem';

import { get_cinema_list,get_film_in_schedule_dates } from '../../api/cinema';
import { get_city_district_list } from '../../api/citys';
import { get_film_detail } from "../../api/film";
import DropdownMenu from '../../component/DropdownMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CinemaDetailPage = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();
  useEffect(()=>{

  },[]);
  

  
  


  

 



  return (<View style={styles.container}>
    <Text>CinemaDetailPage</Text>
  </View>);
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default inject("app")(observer(CinemaDetailPage));
