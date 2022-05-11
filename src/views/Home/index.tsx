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
  Image,
  View as Viw,
  Text as Txt
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
  Carousel
} from '../../component/teaset/index';

// import { 
//   Button, 
//   ButtonGroup, 
//   withTheme,
//   CheckBox,
//   Dialog
// } from '@rneui/themed';

import { get_film_hot } from '../../api/film';

import NavigationBar from '../../component/NavigationBar';

const renderNavigationLeft = (props?:any)=>{
  let navigation:any = useNavigation();
  
  return <View
    style={styles.tagFilmName}
    onPress={() => {
      // navigation.navigate({
      //   path: "citys",
      // });
    }}
  >
    <View style={styles.tagFilmNameMask}></View>
    <Txt style={styles.cityName}>广州</Txt>
    <Ionicons 
    name={'chevron-down-outline'} 
    size={20} 
    color={'#fff'} 
    onPress={()=>{
        navigation.goBack()
    }}/>

    

  
      <View style={styles.locationShowBox}>
        <View style={styles.locationMask}></View>
        <View style={styles.topArrow}></View>
        <View style={styles.leftTxt}>
          <Txt>定位显示您在广州</Txt>
        </View>
        <Button
          color="primary"
          onPress={(e:any) => {
            // this.stopBubble(e);
            // this.onSwitchCity();
          }}
        >
          <Txt>切换到广州</Txt>
        </Button>
      </View>
  </View>
}

const Home = (props:any) => {
  const [check1, setCheck1] = useState(false);
  const colorScheme = useColorScheme();
  console.log('首页',props,colorScheme)
  const [groupValues, setGroupValues] = useState(['0']);

  return (<View style={styles.container}>
    <NavigationBar 
      style={{
        zIndex:1000
      }}
      backgroundColor='transparent'
      position='absolute'
      leftView={renderNavigationLeft(colorScheme)}/>
    <ScrollView>
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
    </ScrollView>
    
  </View>);
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  tagFilmName:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    color: '#fff',
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    position:'relative',
  },
  tagFilmNameMask:{
    position: 'absolute',
    zIndex: -1, 
    opacity: 0.4,
    left:0,
    bottom:0,
    top:0,
    right:0,
    backgroundColor: '#000',
    borderRadius: 15,
  },
  cityName:{
    color:'#fff'
  },
  locationShowBox:{
    position: 'absolute',
    left: 0,
    top: 40,
    // width: 230,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    padding: 5,
  },
  locationMask:{
    position: 'absolute',
    left:0,
    bottom:0,
    top:0,
    right:0,
    backgroundColor:'#000',
    opacity: 0.6,
    borderRadius: 5,
    zIndex: -1,
  },
  topArrow:{
    position: 'absolute',
    top: -20,
    left: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    opacity: 0.6
  },
  leftTxt:{
    marginRight: 10
  }
});

export default inject("home")(observer(Home));
