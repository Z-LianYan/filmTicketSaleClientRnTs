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
  Alert,
  Dimensions
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
  Toast,
  Input
} from '../../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";

import { user_recharge, get_user_info } from "../../api/user";
import service from '../../utils/request';


var ScreenObj = Dimensions.get('window');

const BuyTicket = ({app,navigation}:any) => {
  const colorScheme = useColorScheme();
  // let [submiting,setSubmiting] = useState(false);
  useEffect(()=>{
  })

  

  return <View style={styles.container}>
    <Text>BuyTicket</Text>

  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
});

export default inject("app")(observer(BuyTicket));
