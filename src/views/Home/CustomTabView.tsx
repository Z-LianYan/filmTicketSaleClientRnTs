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
 
 const CustomTabView = ({onChange}:{onChange:(val:any)=>void})=>{
   let navigation:any = useNavigation();
   const [activeTab, setActiveTab] = React.useState(0);
   return <TabView 
   barStyle={{backgroundColor:'#fff',fontSize:40}} 
   style={{flex: 1}} 
   type='sheet'//sheet,carousel
   activeIndex={activeTab}
   onChange={(val:any)=>{
     setActiveTab(val);
     onChange(val)
   }}>
     <TabView.Sheet
       title={<Text style={{
         ...styles.tabBtn,
         color:activeTab===0?Theme.primaryColor:'#000'
       }}>正在热映</Text>}
     >
     </TabView.Sheet>
     <TabView.Sheet
       title={<Text style={{...styles.tabBtn,color:activeTab===1?Theme.primaryColor:'#000'}}>即将上映</Text>}
     >
     </TabView.Sheet>
   </TabView>
 }
 export default inject('app')(observer(CustomTabView));


 const styles = StyleSheet.create({
  tabBtn:{
    width:80,
    fontSize:15,
    textAlign:'center'
  }
 });
 

 