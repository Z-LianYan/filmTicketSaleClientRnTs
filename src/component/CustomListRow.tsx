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
  Theme,
  ListRow
} from '../component/teaset/index';

const CustomListRow = ({ 
  title,
  detail,
  bottomSeparator,
  accessory='none',
  onPress,
  activeOpacity=1,
  titleStyle={} ,
  backgroundColor
}:any) => {
    
  const colorScheme = useColorScheme();

  useEffect(()=>{
  })

  const obj = {
    style:{
      backgroundColor:backgroundColor?backgroundColor:colorScheme=='dark'?'#000':'#fff'
    },
    titleStyle:{
      color:colorScheme=='dark'?'#fff':'#000',
      ...titleStyle
    },
    bottomSeparator:bottomSeparator,
    title:title,
    accessory:accessory,
    detail:detail,
    activeOpacity,
    onPress:()=>{
      onPress && onPress()
    }
  }
  return <ListRow
    {...obj} />;
};

const styles = StyleSheet.create({
});

export default CustomListRow;
