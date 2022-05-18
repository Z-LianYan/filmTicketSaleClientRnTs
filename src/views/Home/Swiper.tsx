import React, { useState } from 'react';
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
   View,
   Text
 } from 'react-native';

 import { 
  Button,
  Carousel,
  TabView,
  TransformView,
  Theme
} from '../../component/teaset/index';
 
//  import { get_film_hot } from '../../api/film';

import { TouchableOpacity } from 'react-native-gesture-handler';
 
 const Swiper = (props?:any)=>{
   let navigation:any = useNavigation();
   return <Carousel style={{height: 238}} control={<Carousel.Control
    style={{alignItems: 'flex-end'}}
    dot={<View style={styles.dot}></View>}
    activeDot={<View style={styles.activeDot}></View>}
    />}>
   <Image 
   style={{width: "100%", height: 238}} 
   resizeMode='cover' 
   source={{uri: 'https://static.maizuo.com/v5/upload/6f5e10201aaea65b311d7ab562ba097c.jpg'}} />
   <Image 
   style={{width: "100%", height: 238}} 
   resizeMode='cover' 
   source={{uri: 'https://static.maizuo.com/v5/upload/67f9eb733fd33f6148ae740e130d5612.jpg'}} />
   <Image 
   style={{width: "100%", height: 238}} 
   resizeMode='cover' 
   source={{uri: 'https://static.maizuo.com/v5/upload/fae22ffcaa41eced5e3dc7a0f2873690.jpg'}} />
 </Carousel>
 }
 export default inject('app')(observer(Swiper));


 const styles = StyleSheet.create({
  dot:{
    width:10,
    height:10,
    borderRadius:5,
    borderColor:'#fff',
    borderWidth:1,
    marginRight:5,
    marginBottom:5
  },
  activeDot:{
    width:10,
    height:10,
    borderRadius:5,
    backgroundColor:Theme.primaryColor,
    marginRight:5
  }
 });
 

 