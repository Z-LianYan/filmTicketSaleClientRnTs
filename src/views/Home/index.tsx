import React, { useState,useEffect,useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import { observer, inject } from 'mobx-react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Platform,
  ActivityIndicator,
  Image,
  View,
  Text,
  RefreshControl,
  Dimensions,
  FlatList
} from 'react-native';

import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
// import { 
//   View,
//   Text
// } from '../../component/Themed';
import { get_banner } from '../../api/film';
import { 
  Button,
  Carousel,
  TabView,
  TransformView,
  Theme
} from '../../component/teaset/index';


import { get_film_hot } from '../../api/film';

import NavigationBar from '../../component/NavigationBar';
import RenderCityName from './RenderCityName';
import Swiper from './Swiper';
import CustomTabView from './CustomTabView';

import Hot from './Hot';
import SoonShow from './SoonShow';



const Home = (props:any) => {
  const hotRef:{current:any} = useRef();
  const soonShowRef:{current:any} = useRef();
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  useEffect(() => {
    
    return ()=>{
    }
  },[])

  return (<View style={styles.container}>
    <NavigationBar 
      style={{
        zIndex:1000
      }}
      backgroundColor='transparent'
      position='absolute'
      leftView={<View>
        <RenderCityName/>
      </View>}/>
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={()=>{
        setRefreshing(true)
        setTimeout(() => {
          setRefreshing(false)
        }, 2000);
      }} />
    }>
      <Swiper/>

      <CustomTabView onChange={(val)=>{
        setActiveTabIndex(val);
      }}/>
      {
        activeTabIndex===0?<Hot ref={hotRef}/>:<SoonShow ref={soonShowRef}/>
      }

      


    </ScrollView>
  </View>);
};
export default inject("home")(observer(Home));


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  
  
});


