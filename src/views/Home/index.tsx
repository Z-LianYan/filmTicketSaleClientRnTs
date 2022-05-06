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
  ActivityIndicator
} from 'react-native';
import { 
  View,
  Text 
} from '../../component/Themed';

import { 
  Button, 
  ButtonGroup, 
  withTheme,
  CheckBox,
  Dialog
} from '@rneui/themed';

import { get_film_hot } from '../../api/film';



const Home = (props:any) => {
  const [check1, setCheck1] = useState(false);
  const colorScheme = useColorScheme();
  console.log('首页',props,colorScheme)
  let navigation:any = useNavigation();
  const [groupValues, setGroupValues] = useState(['0']);

  return (<View>
    <Text style={styles._text} onPress={()=>{
      // props.navigation.replace('AppNav')
      // navigation.navigate('AppNav')
      props.home.addCount();
      props.home.setAppName(666);
    }}>首页 count= {props.home.count} num= {props.home.num}</Text>

    <FontAwesome name="gitlab" size={26} color={colorScheme=='dark'?'#fff':'#999'}/>
    <Ionicons name={'md-home'} size={26} color={colorScheme=='dark'?'#fff':'#999'} />
    <AntDesign name={'stepforward'} size={26} color={colorScheme=='dark'?'#fff':'#999'} />
    <MaterialCommunityIcons name={'ab-testing'} size={26} color={colorScheme=='dark'?'#fff':'#999'} />


    <Text style={styles._text} onPress={()=>{
      props.navigation.push('LoginPage')
    }}>登录</Text>
    <ActivityIndicator/>
    {/* <Toast message='1234'/> */}
    <Button
      title={'获取数据'}
      containerStyle={{
        // marginHorizontal: 50,
        marginVertical: 10,
      }}
      onPress={async ()=>{
        // console.log('-----',process.env.NODE_ENV);
        // return;
        let result = await get_film_hot({
          page: 1,
          limit: 6,
          city_id: '440100'
        });
        console.log('result---',result);
      }}
    />

    <CheckBox
      center
      title="Click Here"
      checked={check1}
      onPress={() => setCheck1(!check1)}
      containerStyle={{
        width:120
      }}
      wrapperStyle={{
        width:120,
        borderWidth:1,
        borderColor: 'red'
      }}
    />
    
  </View>);
};

const styles = StyleSheet.create({
  _text:{
    // color:'#000',
  }
});

export default inject("home")(observer(Home));
// export default Home;
