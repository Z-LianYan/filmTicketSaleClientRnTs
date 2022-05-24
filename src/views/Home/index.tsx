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
  // View,
  // Text,
  RefreshControl,
  Dimensions,
  FlatList
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
import { Right } from '../../component/teaset/react-native-legacy-components/src/NavigatorBreadcrumbNavigationBarStyles.android';
var ScreenWidth = Dimensions.get('window').width;


const Home = (props:any) => {
  const hotRef:{current:any} = useRef();
  const soonShowRef:{current:any} = useRef();
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [navigationBarBg, setNavigationBarBg] = React.useState('transparent');

  useEffect(() => {
    
    return ()=>{
    }
  },[])

  return (<View style={styles.container}>
    <NavigationBar 
      style={{
        zIndex:1
      }}
      backgroundColor={navigationBarBg}
      position='absolute'
      leftView={<RenderCityName/>}/>
    <ScrollView
    stickyHeaderIndices={[]}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={()=>{
        setRefreshing(true)
        activeTabIndex===0 && hotRef.current && hotRef.current.onRefresh(setRefreshing(false));
        activeTabIndex===1 && soonShowRef.current && soonShowRef.current.onRefresh(setRefreshing(false));
      }} />
    }
    onScroll={(event)=>{
      // console.log('onScroll',event.nativeEvent)
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      // console.log('onMomentumScrollEnd',offSetY,oriageScrollHeight,contentSizeHeight)
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
        activeTabIndex===0 && hotRef.current && hotRef.current.onLoadMore();
        activeTabIndex===1 && soonShowRef.current && soonShowRef.current.onLoadMore();
      }
      // if(offSetY>=50){
      //   setNavigationBarBg('#fff');
      // }else{
      //   setNavigationBarBg('transparent');
      // }
    }}
    onMomentumScrollEnd={(event:any)=>{}}>
      <Swiper/>

      <CustomTabView onChange={(val)=>{
        setActiveTabIndex(val);
      }}/>

          {
            activeTabIndex===0?<Hot  
            hotBoxStyle={{}}
            ref={hotRef}/>:<SoonShow 
            hotBoxStyle={{}}
            ref={soonShowRef}/>
          }
          
    </ScrollView>
  </View>);
};
export default inject("home")(observer(Home));


const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'#fff'
  },
  
  
});


