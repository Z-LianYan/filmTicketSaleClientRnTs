import React, { useState,useEffect, useRef,useCallback,useImperativeHandle,forwardRef } from 'react';
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
   View as Viw,
   Text as Txt,
   Dimensions,
   Modal,
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
   NavigationBar,
   Theme,
   Label,
   Overlay,
   Input,
   Toast
} from '../../component/teaset/index';

import * as _ from 'lodash'
import { any } from 'prop-types';
import dayjs from "dayjs";


// var ScreenHeight = Dimensions.get('window').height;
var ScreenWidth = Dimensions.get('window').width;
type TypeProps = {
   
}
const SlideView = (item:any = {},ref:any) => {
  const colorScheme = useColorScheme();
  
  
  useEffect(()=>{
    
  },[])

  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    
  }));
  
  

  return <View style={styles.cellItemContainer}>
  <View style={styles.leftBox}>
    <View style={styles.leftItem}>
      <Text>{item.startTime}</Text>
      <Text style={styles.leftItemBottom}>{item.endTime}散场</Text>
    </View>
    <View style={styles.leftItem}>
      <Text>{item.showType}</Text>
      <Text style={styles.leftItemBottom}>{item.hall}</Text>
    </View>
  </View>
  <View style={styles.rightBox}>
    <Text style={styles.rightBoxPrice}><Text style={{
      fontSize:11,color:Theme.primaryColor}}>¥ </Text>{item.price}</Text>
    <Button
      type="primary"
      style={styles.rightBoxBtn}
      title="购票"
      onPress={() => {
        console.log(1234)
        item.onPress && item.onPress();
      }}
    />
  </View>
</View>


    
  };
 
 const styles = StyleSheet.create({
  cellItemContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor:1,
    borderColor:'#eee'
  },
  leftBox:{
    flex: 1,
    flexDirection:'row'
  },
  leftItem:{
    fontSize: 15,
    color: '#191a1b',
    marginRight: 15,
    // flexDirection:'row',
    // flexFlow: 'column',
    justifyContent: 'space-between',
  },
  leftItemBottom:{
    fontSize: 13,
    color: '#797d82',
    marginTop: 2
  },
  rightBox:{
    width: 130,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightBoxPrice:{
    fontSize: 15,
    color: Theme.primaryColor
  },
  rightBoxBtn:{
    // width: 50,
    // height: 25,
    // backgroundColor:
    color: Theme.primaryColor,
    textAlign: 'center',
    lineHeight: 25,
    // border: 0.01 solid $base-color,
    borderColor:Theme.primaryColor,
    borderWidth:1,
    fontSize: 12,
    borderRadius: 4,
  }

  
 });
 
 export default forwardRef(SlideView);
 