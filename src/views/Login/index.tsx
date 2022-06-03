/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { reaction } from 'mobx';
import React,{ Component, useEffect,useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { View,Text} from '../../component/Themed';
import NavigationBar from '../../component/NavigationBar';
import { observer, inject } from 'mobx-react'
const Login = (props:any) => {
  // 在页面显示之前设(重)置 options 值，相当于在 componentDidMount 阶段执行
  // useLayoutEffect 是阻塞同步的，即执行完此处之后，才会继续向下执行
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title:'登录'
  //   });
  // });

  useEffect(()=>{

  }, [props.navigation])
  return (<View>
    <NavigationBar 
    onBack={()=>{
      props.navigation.goBack()
      console.log('navigation',props.route);
    }}
    title={'登录'}/>
    <Text>登录212</Text>
  </View>);
};

const styles = StyleSheet.create({
});
export default inject("app")(observer(Login));