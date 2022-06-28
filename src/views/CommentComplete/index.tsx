import React, { useState,useEffect,useRef, useCallback } from 'react';
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
  Dimensions,
  RefreshControl,
  View as Viw,
  Text as Txt,
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
  Input,
  Overlay
} from '../../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";
import { edit_user_info, get_user_info } from "../../api/user";
import HeaderBar from "../../component/HeaderBar";
import { useHeaderHeight } from '@react-navigation/elements';
import CustomAlert from '../../component/CustomAlert';
import CommentItem from '../../component/CommentItem';


import {
  get_comment_list,
  thumb_up,
  get_comment_reply_list,
  add_comment_reply,
  del_comment_reply,
  del_comment,
  comment_jubao,
  get_comment_detail,
  edit_comment,
  add_comment
} from "../../api/comment";

import dayjs from "dayjs";
import _lodash from "lodash";
import Star from '../../component/Star';
var ScreenWidth = Dimensions.get('window').width;


const CommentPage = ({app,navigation,route}:any) => {
    
  const colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  
  
  useEffect(()=>{
  },[]);


  

  

  return <View style={styles.container}>
    
   <Txt>23456</Txt>
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
  
});

export default inject("app")(observer(CommentPage));
