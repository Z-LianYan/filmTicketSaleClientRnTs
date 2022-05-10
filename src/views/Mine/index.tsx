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
import { View,Text} from '../../component/Themed';

import NavigationBar from '../../component/NavigationBar';



const Cineam = () => {

  return (<View>
    <NavigationBar 
    title={'我的'}/>
    <Text>我的</Text>
  </View>);
};

const styles = StyleSheet.create({
});

export default Cineam;
