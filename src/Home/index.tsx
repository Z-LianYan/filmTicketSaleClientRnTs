/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
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
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Home = (props:any) => {
  console.log('首页',props)
  let navigation:any = useNavigation()
  return (<View>
    <Text style={styles._text} onPress={()=>{
      props.navigation.replace('AppNav')
      // navigation.navigate('AppNav')
      // props.home.addCount();
      // props.home.setAppName(666);
    }}>首页 count= {props.home.count} num= {props.home.num}</Text>

    <FontAwesome name="gitlab" size={26} color="#999"/>
    <Ionicons name={'md-home'} size={26} color={'#000'} />
    <AntDesign name={'stepforward'} size={26} color={'#000'} />
    <MaterialCommunityIcons name={'ab-testing'} size={26} color={'#000'} />


    <Text style={styles._text} onPress={()=>{
      props.navigation.push('LoginPage')
    }}>登录</Text>
  </View>);
};

const styles = StyleSheet.create({
  _text:{
    color:'#000',
  }
});

export default inject("home")(observer(Home));
// export default Home;
