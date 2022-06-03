/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{ useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { View,Text} from '../../component/Themed';
import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';
import NavigationBar from '../../component/NavigationBar';
import { observer, inject } from 'mobx-react'

const Mine = ({navigation,route,app}:any) => {
  // let navigation = useNavigation();
  // useEffect(() => {
  //   navigation.navigate("LoginPage",{
  //     idP:1234
  //   });
  //   // if(prop)
  //   // console.log('app---',app)
  //   // if(!app.userInfo){
  //   //   navigation.navigate("LoginPage");
  //   //   // navigation.dispatch(
  //   //   //   StackActions.replace('LoginPage', {
  //   //   //       test:"from SelectGoodsPage"
  //   //   //   })
  //   //   // );
  //   // }
    


  //   // const unsubscribe = navigation.addListener('tabPress', (e:any) => {
  //   //   // Prevent default behavior
  //   //   e.preventDefault();

  //   //   console.log('66666--==')

  //   //   // navigation.navigate('')
  //   //   // navigation.navigate("LoginPage");
  //   //   navigation.replace("LoginPage");
  //   //   // alert('Default behavior prevented');
  //   //   // Do something manually
  //   //   // ...
  //   // });
  //   return ()=>{
  //   }
  // },[navigation])

  // useEffect(() => {
    

  //   const unsubscribe = navigation.addListener('tabPress', (e:any) => {
  //     // Prevent default behavior
  //     e.preventDefault();
  //     navigation.navigate("LoginPage");
  
  //     // Do something manually
  //     // ...
  //   });

  //   if(!app.userInfo){
  //     navigation.navigate("LoginPage");
  //   }
  
  //   return unsubscribe;
  // }, [navigation]);
  
  return (<View>
    <NavigationBar 
    title={'我的'}/>
    <Text>我的</Text>

    
  </View>);
};

const styles = StyleSheet.create({
});

export default inject("app")(observer(Mine));
