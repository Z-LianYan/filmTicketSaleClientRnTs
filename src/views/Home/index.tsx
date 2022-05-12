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
  Text
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

const Home = (props:any) => {
  const [check1, setCheck1] = useState(false);
  const colorScheme = useColorScheme();

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


      {/* <TabView style={{flex: 1}} type='projector'>
        <TabView.Sheet
          title='Home'
        >
          <Text>123</Text>
        </TabView.Sheet>
        <TabView.Sheet
          title='Me'
          badge={1}
        >
          <Text>123</Text>
        </TabView.Sheet>
      </TabView> */}

      <TransformView
        style={{
          backgroundColor: '#fff', 
          flex: 1, 
          height:300,
          alignItems: 'center', 
          justifyContent: 'center'
        }}
        minScale={0.5}
        maxScale={2}
      >
        <Image 
        style={{width: 875, height: 500}} 
        resizeMode='cover' source={{uri: 'https://static.maizuo.com/v5/upload/6f5e10201aaea65b311d7ab562ba097c.jpg'}} />
      </TransformView>



    </ScrollView>
    
  </View>);
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});

export default inject("home")(observer(Home));
