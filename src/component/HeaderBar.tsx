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
  TouchableOpacity
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
// import { useHeaderHeight } from '@react-navigation/elements';

import { get_film_hot } from '../api/film';
type TypeProps = {
  title?:number|string|Element,
  style?:object,
  backgroundColor?:string,
  position?:string,
  leftView?: number|string|Element,
  rightView?: number|string|Element,
  onBack?:Function,
  headerHeight:number
}
const HeaderBar = ({
  title,
  style,
  backgroundColor=Theme.primaryColor,
  position,
  leftView=true,
  rightView,
  onBack,
  headerHeight
}:TypeProps) => {
  
  const colorScheme = useColorScheme();
  let navigation:any = useNavigation();
  // const [groupValues, setGroupValues] = useState(['0']);

  useEffect(()=>{},[])

  let headerContainerObj = {
    ...styles.headerContainer,
    ...style,
    height:headerHeight,
  }
  if(backgroundColor){
    headerContainerObj['backgroundColor'] = backgroundColor;
  }

  return (<View style={{
    ...headerContainerObj
  }}>
    {
      <Ionicons 
      name={'chevron-back'} 
      size={25} 
      color={colorScheme === 'dark' ? '#fff' : '#000'} 
      onPress={()=>{
        onBack ? onBack(): navigation.goBack();
      }}/>
    }
    {typeof title=='string'||'number'?<Text style={styles.title}>{title}</Text>:title}
    {typeof rightView=='string'||'number'?<Text style={styles.rightView}>{rightView}</Text>:rightView}
  </View>);
};

const styles = StyleSheet.create({
  headerContainer:{
    height:100,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  leftView:{

  },
  title:{
    fontSize:18
  },
  rightView:{
    fontSize:18
  }
});

export default inject("app")(observer(HeaderBar));
