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
import { edit_user_info, get_user_info } from "../../api/user";
import HeaderBar from "../../component/HeaderBar";
import { useHeaderHeight } from '@react-navigation/elements';
var ScreenObj = Dimensions.get('window');

const CommentList = ({app,navigation,route}:any) => {
    
  const colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  let [headerBackgroundColor,setHeaderBackgroundColor] = useState<any>('transparent');


  useEffect(()=>{
    navigation.setOptions({
      title: '',
      headerLeft:'',
      headerTransparent: false,
      headerBackground: () => (
        <HeaderBar 
        title={route.params.film_name} 
        headerHeight={headerHeight}
        rightView={
          <Button 
          style={{borderRadius:20,backgroundColor:'#00b578'}} 
          titleStyle={{color:'#fff'}} 
          title="编辑我的评论" 
          size="sm"></Button>
        }/>
      )
    });
  },[]);
  
  return <View style={styles.container}>
    <CustomListRow 
    accessory="none" 
    bottomSeparator="none" //full,indent,none
    title={'评论'}
    detail={
      <Ionicons 
      name={'md-information-circle-outline'}
      size={20} 
      color={'#ccc'}/>
    }
    />
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
});

export default inject("app")(observer(CommentList));
