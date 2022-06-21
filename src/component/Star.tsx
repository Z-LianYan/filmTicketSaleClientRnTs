/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState,useEffect, useCallback } from 'react';
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
} from 'react-native';

import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import { 
  View,
  Text
} from '../component/Themed';
import { 
  Button,
  Carousel,
  NavigationBar,
  Theme
} from '../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { 
  FIlM_ICON,
  FIlM_ACTIVE_ICON, 
  CINEMA_ICON,
  CINEMA_ACTIVE_ICON,
  MINE_ICON,
  MINE_ACTIVE_ICON,
} from '../assets/image/index';

import { get_film_hot } from '../api/film';
type TypeProps = {
  size?:number,
  value?:number,
  maxValue?:number,
  // allowHalf?:boolean,
  readOnly?:boolean,
  style?: object
}
const Star = ({
  size = 15,
  value = 0,
  maxValue = 5,
  // allowHalf = false,
  readOnly = false,
  style
}:TypeProps) => {
  const colorScheme = useColorScheme();
  useEffect(()=>{
  })

  const renderStart = useCallback(()=>{
    let dom = []
    for(let i=0;i<maxValue;i++){
      let isHalf = i<value && value<(i+1)
      dom.push(<Ionicons 
      key={i+'star'}
      name={isHalf?'md-star-half-sharp':(i+1)<=value?'md-star':'md-star-outline'} 
      size={size} 
      color={((i+1)<=value || isHalf)?Theme.secondaryColor:'#fff'}/>)
    }
    return dom;
  },[])

  return <View style={{ 
    // height:size,
    // width:'100%',
    flex:1,
    backgroundColor:'transparent',
    flexDirection:'row',
    ...style
  }}>
    { renderStart() }
</View>;
};

const styles = StyleSheet.create({
});

export default Star;
