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
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
const Cineam = () => {
  console.log('影院')
  let navigation = useNavigation()
  return (<View>
    <Text style={styles._text} onPress={()=>{
      navigation.goBack()
    }}>影院</Text>
  </View>);
};

const styles = StyleSheet.create({
  _text:{
    color:'#000'
  }
});

export default Cineam;
