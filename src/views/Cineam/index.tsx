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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';

import { 
  Button,
  Carousel,
  NavigationBar
} from '../../component/teaset/index';
const Cineam = () => {
  console.log('影院')
  let navigation = useNavigation()
  return (<View>
    <NavigationBar 
    title='Teaset' 
    leftView={<NavigationBar.IconButton icon={require('../../assets/image/cinema-active.png')} />}
    type={'ios'}/>

    
    <Text style={styles._text} onPress={()=>{
      navigation.goBack()
    }}>影院
    {/* 123456345678123456345678123456345678123456345678123456345678
    123456345678123456345678123456345678123456345678123456345678 */}
    
    </Text>
  </View>);
};

const styles = StyleSheet.create({
  _text:{
    // color:'#000'
  }
});

export default Cineam;
