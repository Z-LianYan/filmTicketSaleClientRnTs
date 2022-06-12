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
  Image,
} from 'react-native';
import { View,Text} from '../../component/Themed';
import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';
import NavigationBar from '../../component/NavigationBar';
import { observer, inject } from 'mobx-react';
import { 
  Button,
  Carousel,
  Theme,
  Label,
  Drawer,
  ActionSheet,
  Input,
  // ListRow,
  Toast
} from '../../component/teaset/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomListRow from '../../component/CustomListRow';


const Mine = ({navigation,route,app}:any) => {
  // let navigation = useNavigation();
  const colorScheme = useColorScheme();
  useEffect(() => {
    return ()=>{
    }
  },[navigation]);
  
  return (<View style={styles.container}>
    <View style={styles.headerBox}>
      {
        (app.userInfo && app.userInfo.avatar) ? <Image 
        resizeMode='cover' 
        style={styles.avatarImage} 
        source={{
          uri: app.userInfo && app.userInfo.avatar 
        }} />:null
      }


      <View style={styles.rightBox}>
        <Text style={styles.userName}>{app.userInfo && app.userInfo.nickname}</Text>
        <Text style={styles.userName}>{app.userInfo && app.userInfo.phone_number}</Text>
      </View>
    </View>

    <CustomListRow 
    bottomSeparator="indent" 
    title={'余额'} 
    detail={'¥ '+(app.userInfo?app.userInfo.balance:'')} />
    <CustomListRow 
    bottomSeparator="indent" 
    title={'订单'} 
    accessory="indicator"
    onPress={() => {
      navigation.navigate('OrderPage')
    }} />

    <CustomListRow 
    bottomSeparator="indent" 
    title={'充值'} 
    accessory="indicator"
    onPress={() => {
      navigation.navigate('Recharge')
    }}  />

    <CustomListRow 
    bottomSeparator="full" 
    title={'设置'} 
    accessory="indicator" 
    onPress={() => {
      navigation.navigate('SetPage')
    }} />

    
  </View>);
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  headerBox:{
    height:200,
    backgroundColor:Theme.primaryColor,
    paddingTop:64,
    paddingLeft:22,
    flexDirection:'row'
  },
  avatarImage:{
    width:70,
    height:70,
    borderWidth:1,
    borderColor:'#fff',
    borderRadius: 35
  },
  rightBox:{
    height:70,
    // flex:1
    backgroundColor:'transparent',
    justifyContent:'center',
    marginLeft:20
  },
  userName:{
    height:20,
    color:'#fff'
  }
});

export default inject("app")(observer(Mine));
