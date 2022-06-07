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
  TouchableHighlight,
  Alert
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
  // NavigationBar,
  Theme,
  ListRow,
  Toast
} from '../../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";



const SetPage = ({app,navigation}:any) => {
    
  const colorScheme = useColorScheme();

  useEffect(()=>{
  })

  async function onLoginOut() {

    Alert.alert(
      "您确定退出登录吗？",
      "",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确定", onPress: async () => {
          await login_out();
          navigation.navigate("HomePage");
          app.setUserInfo(null);
          // navigation.replace('LoginPage')
        } }
      ]
    );
  }

  return <View style={styles.container}>
    <NavigationBar 
    onBack={()=>{
      navigation.goBack()
    }}
    title={''}/>
    <ScrollView
    stickyHeaderIndices={[]}
    onMomentumScrollEnd={(event:any)=>{}}>
      <CustomListRow 
      accessory="none"
      bottomSeparator="indent" 
      title={'账号ID'} 
      detail={app.userInfo && app.userInfo.user_id} />
      <CustomListRow 
      accessory="none"
      bottomSeparator="indent" 
      title={'电话号码'} 
      detail={app.userInfo && app.userInfo.phone_number} />
      <CustomListRow 
      accessory="none"
      bottomSeparator="indent" 
      title={'软件版本'} 
      detail={app.versions} />
      <CustomListRow 
      bottomSeparator="indent" 
      title={'修改会员信息'} 
      accessory= "indicator"
      detail={''} />
      <Button
        style={{backgroundColor:'transparent',marginTop:100,marginLeft:20,marginRight:20}}
        title={'退出登录'}
        type="default"
        onPress={() => {
          onLoginOut()
        }}
      />
    </ScrollView>
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default inject("app")(observer(SetPage));
