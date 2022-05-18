/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
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



const Home = (props:any) => {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
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
        activeTabIndex===0?<Text>正在热映</Text>:<Text>即将上映</Text>
      }
      



    </ScrollView>


    
        
  </View>);
};

var ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  lineStyle: {
    width: ScreenWidth / 4,
    height: 2,
    backgroundColor:'red'
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    marginTop: 20,
    textAlign:'center'
  },
  
});

export default inject("home")(observer(Home));
