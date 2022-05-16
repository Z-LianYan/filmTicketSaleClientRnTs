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
  View,
  Text,
  RefreshControl,
  Dimensions,
  FlatList
} from 'react-native';

import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
// import { 
//   View,
//   Text
// } from '../../component/Themed';
import { 
  Button,
  Carousel,
  TabView,
  TransformView
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
import RenderCityName from './RenderCityName';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';


const Home = (props:any) => {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);
  return (<View style={styles.container}>
    <NavigationBar 
      style={{
        zIndex:1000
      }}
      backgroundColor='transparent'
      position='absolute'
      leftView={<View>
        <RenderCityName/>
      </View>}/>
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={()=>{
        setRefreshing(true)
        setTimeout(() => {
          setRefreshing(false)
        }, 2000);
      }} />
    }>
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


      <TabView 
      barStyle={{backgroundColor:'#ccc'}} 
      style={{flex: 1}} 
      type='carousel'>
        <TabView.Sheet
          title='Home'
          badge={12}
        >
          <View style={{height:200,backgroundColor:'purple'}}>
            <Text>123</Text>
          </View>
        </TabView.Sheet>
        <TabView.Sheet
          title='Me'
          badge={1}
        >
          <View style={{height:200,backgroundColor:'yellow'}}>
            <Text>123</Text>
          </View>
        </TabView.Sheet>
        <TabView.Sheet
          title='Me'
          badge={1}
        >
          <View style={{height:200,backgroundColor:'blue'}}>
            <Text>123</Text>
          </View>
        </TabView.Sheet>
        
      </TabView>

   



    </ScrollView>


    
        
  </View>);
};

var ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  lineStyle: {
    width: ScreenWidth / 4,
    height: 2,
    backgroundColor:'red'
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    marginTop: 20,
    textAlign:'center'
  }
});

export default inject("home")(observer(Home));
