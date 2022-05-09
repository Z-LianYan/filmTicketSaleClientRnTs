/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
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
  useColorScheme,
  Platform,
  ActivityIndicator,
  Image
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
  NavigationBar
} from '../../component/teaset/index';

// import { 
//   Button, 
//   ButtonGroup, 
//   withTheme,
//   CheckBox,
//   Dialog
// } from '@rneui/themed';

import { get_film_hot } from '../../api/film';
// import { Button } from '@rneui/base';



const Home = (props:any) => {
  const [check1, setCheck1] = useState(false);
  const colorScheme = useColorScheme();
  console.log('首页',props,colorScheme)
  let navigation:any = useNavigation();
  const [groupValues, setGroupValues] = useState(['0']);

  return (<View>
    
    <NavigationBar 
    statusBarInsets={true} 
    title={<Text>title</Text>}
    style={{backgroundColor:colorScheme === 'dark' ? '#000' : '#fff',}}
    leftView={<View style={{flexDirection:'row',alignItems:'center'}}>
      <Ionicons 
      name={'md-chevron-back-sharp'} 
      size={30} 
      color={colorScheme === 'dark' ? '#fff' : '#000'} 
      onPress={()=>{
          navigation.goBack()
      }}/>
      <Text>返回</Text>
    </View>
    }
    type={'ios'}/>

    {/* <View style={{height:600}}></View> */}



    {/* <Text style={styles._text} onPress={()=>{
      // props.navigation.replace('AppNav')
      // navigation.navigate('AppNav')
      props.home.addCount();
      props.home.setAppName(666);
    }}>首页 count= {props.home.count} num= {props.home.num}</Text> */}

    {/* <FontAwesome name="gitlab" size={26} color={colorScheme=='dark'?'#fff':'#999'}/>
    <Ionicons name={'md-home'} size={26} color={colorScheme=='dark'?'#fff':'#999'} />
    <AntDesign name={'stepforward'} size={26} color={colorScheme=='dark'?'#fff':'#999'} />
    <MaterialCommunityIcons name={'ab-testing'} size={26} color={colorScheme=='dark'?'#fff':'#999'} /> */}


    {/* <Text style={styles._text} onPress={()=>{
      props.navigation.push('LoginPage')
    }}>登录</Text>
    <ActivityIndicator/>
    <Button type="primary" title={'2345'} onPress={async ()=>{
        let result = await get_film_hot({
          page: 1,
          limit: 6,
          city_id: '440100'
        });
        console.log('result---',result);
      }}></Button> */}
    
    <Carousel style={{height: 238}}>
      <Image 
      style={{width: "100%", height: 238}} 
      resizeMode='cover' 
      source={{uri: 'https://static.maizuo.com/v5/upload/6f5e10201aaea65b311d7ab562ba097c.jpg'}} />
      <Image 
      style={{width: "100%", height: 238}} 
      resizeMode='cover' 
      source={{uri: 'https://static.maizuo.com/v5/upload/67f9eb733fd33f6148ae740e130d5612.jpg'}} />
      <Image 
      style={{width: "100%", height: 238}} 
      resizeMode='cover' 
      source={{uri: 'https://static.maizuo.com/v5/upload/fae22ffcaa41eced5e3dc7a0f2873690.jpg'}} />
    </Carousel>
    
  </View>);
};

const styles = StyleSheet.create({
  _text:{
    // color:'#000',
  }
});

export default inject("home")(observer(Home));
// export default Home;
