/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState,useEffect } from 'react';
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
  TouchableHighlight
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
  percent: number,
  size?: number,
  style?: object
}
const ProgressBar = ({
  percent,
  size=3,
  style
}:TypeProps) => {
  const colorScheme = useColorScheme();
  useEffect(()=>{
  })

  return <View style={{ 
    height:size,
    // width:'100%',
    flex:1,
    backgroundColor:'#e5e5e5',
    ...style,
    borderRadius:3,
  }}>
  <View style={{
    ...styles.bar,
    width:`${Number(percent)}%`
  }}></View>
</View>;
};

const styles = StyleSheet.create({
  bar:{
    height:'100%',
    backgroundColor:Theme.primaryColor,
    borderRadius:3
  }
});

export default ProgressBar;
