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
  FlatList,
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
} from '../../component/Themed';
import { get_banner } from '../../api/film';
import { 
  Button,
  Carousel,
  TabView,
  TransformView,
  Theme,
  Label
} from '../../component/teaset/index';


import { get_film_hot,get_film_soon_show } from '../../api/film';

import NavigationBar from '../../component/NavigationBar';
import RenderCityName from './RenderCityName';
import Swiper from './Swiper';
import CustomTabView from './CustomTabView';

import Hot from './Hot';
import SoonShow from './SoonShow';
var ScreenWidth = Dimensions.get('window').width;

import { useFocusEffect } from '@react-navigation/native';

import { init, Geolocation } from "react-native-amap-geolocation";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({app}:any) => {
  const cacheCityId:{current:any} = useRef();
  const hotRef:{current:any} = useRef();
  const soonShowRef:{current:any} = useRef();
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [navigationBarBg, setNavigationBarBg] = React.useState(Theme.primaryColor);
  const [navigationTitle, setNavigationTitle] = React.useState('');

  let [fetchOptionsHot,setFetchOptionsHot] = useState({
    page: 1,
    limit: 4,
    // city_id: app.locationInfo.city_id,
  })
  let [hotList,setHotList] = useState([])
  let [isHotLoading,setHotLoading] = useState(false);
  let [isHotFinallyPage,setHotFinallyPage] = useState(false);

  let [fetchOptionsSoonShow,setFetchOptionsSoonShow] = useState({
    page: 1,
    limit: 6,
    // city_id: app.locationInfo.city_id,
  });

  let [SoonShowList,setSoonShowList] = useState([])
  let [isSoonShowLoading,setSoonShowLoading] = useState(false);
  let [isSoonShowFinallyPage,setSoonShowFinallyPage] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if(app.locationInfo.city_id != cacheCityId.current){
        cacheCityId.current = app.locationInfo.city_id;
        onRefresh();
      }
      // return () => null;
    }, [])
  );

  useEffect(() => {
    // getHotList(true);
    // getSoonShowList(true);

    geolocationd();
    return ()=>{
    }
  },[]);

  async function geolocationd(){//首先需要到 android：android/app/src/main/AndroidManifest.xml， ios：Xcode打开 Info.plist 配置定位授权
    await init({
      ios: "9bd6c82e77583020a73ef1af59d0c759",
      android: "f2f61cd67f4b4a5aeaf3fc604a5f4348",
    });
    
    Geolocation.getCurrentPosition(({coords}) => {
      console.log('定位--------哈哈哈哈😄',coords);
      app.locationInfo.lng = coords.longitude;
      app.locationInfo.lat = coords.latitude;
    },(error)=>{
      console.log('定位出错error',error);
    });
  }

  async function getHotList(isLoading:boolean){
    isLoading && setHotLoading(true);
    let result:any = await get_film_hot({
      ...fetchOptionsHot,
      city_id:app.locationInfo.city_id
    });
    let _list = [];
    if(fetchOptionsHot.page==1){
      _list = result.rows;
      setRefreshing(false)
    }else{
      _list = hotList.concat(result.rows);
    }
    setHotList(_list);
    if(_list.length>=result.count){
      setHotFinallyPage(true);
    }else{
      setHotFinallyPage(false);
    }
    setHotLoading(false);
    _list = [];
  }
  async function getSoonShowList(isLoading:boolean){
    isLoading && setSoonShowLoading(true);
    let result:any = await get_film_soon_show({
      ...fetchOptionsSoonShow,
      city_id:app.locationInfo.city_id
    });
    let _list = [];
    if(fetchOptionsSoonShow.page==1){
      _list = result.rows;
      setRefreshing(false)
    }else{
      _list = SoonShowList.concat(result.rows);
    }
    setSoonShowList(_list);
    if(_list.length>=result.count){
      setSoonShowFinallyPage(true);
    }else{
      setSoonShowFinallyPage(false);
    }
    setSoonShowLoading(false);
    _list = [];
  }

  const onLoadMore = ()=>{
    if(activeTabIndex===0){
      if(isHotLoading || isHotFinallyPage) return;
      fetchOptionsHot.page += 1;
      setFetchOptionsHot(fetchOptionsHot);
      getHotList(true)
    }else{
      if(isSoonShowLoading || isSoonShowFinallyPage) return;
      fetchOptionsSoonShow.page += 1;
      setFetchOptionsSoonShow(fetchOptionsSoonShow);
      getSoonShowList(true)
    }
  }
  
   const onRefresh = ()=>{
    if(!isHotLoading){
      fetchOptionsHot.page = 1;
      setFetchOptionsHot(fetchOptionsHot);
      getHotList(false)
    }
    if(!isSoonShowLoading) {
      fetchOptionsSoonShow.page = 1;
      setFetchOptionsSoonShow(fetchOptionsSoonShow);
      getSoonShowList(false)
    };
    
  }

  return (<View style={styles.container}>
    <NavigationBar 
      style={{
        zIndex:1
      }}
      title={'电影'}
      position=''
      leftView={<RenderCityName/>}/>
    <ScrollView
    stickyHeaderIndices={[1]}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      refreshing={refreshing} 
      title="下拉刷新"//ios
      onRefresh={()=>{
        setRefreshing(true)
        activeTabIndex===0 && onRefresh();
        activeTabIndex===1 && onRefresh();
      }} />
    }
    onMomentumScrollEnd={(event)=>{
      // console.log('onScroll',event.nativeEvent)
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      // console.log('onMomentumScrollEnd',offSetY,oriageScrollHeight,contentSizeHeight)
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
        activeTabIndex===0 && onLoadMore();
        activeTabIndex===1 && onLoadMore();
      }
      // if(offSetY>=100){
      //   // setNavigationBarBg('');
      //   // setNavigationTitle("电影");
      // }else{
      //   // setNavigationBarBg(Theme.primaryColor);
      //   // setNavigationTitle("");
      // }
    }}>
      <Swiper/>

      <CustomTabView onChange={(val)=>{
        setActiveTabIndex(val);
      }}/>

      {
        activeTabIndex===0?<Hot  
        isLoading={isHotLoading}
        isFinallyPage={isHotFinallyPage}
        fetchOptionsHot={fetchOptionsHot}
        list={hotList}
        hotBoxStyle={{}}
        ref={hotRef}/>:<SoonShow 
        isLoading={isSoonShowLoading}
        isFinallyPage={isSoonShowFinallyPage}
        fetchOptionsSoonShow={fetchOptionsSoonShow}
        list={SoonShowList}
        hotBoxStyle={{}}
        ref={soonShowRef}/>
      }
          
    </ScrollView>

  </View>);
};
export default inject("home","app")(observer(Home));


const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'#fff'
  },
  
  
});


