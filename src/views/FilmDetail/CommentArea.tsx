import React, { useState,useEffect,useCallback,useRef } from 'react';
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
  ImageBackground,
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
  AlbumView
} from '../../component/teaset/index';
import CustomListRow from '../../component/CustomListRow';
var ScreenObj = Dimensions.get('window');
const StillCompnent = ({detail,app}:any) => {
  let navigation:any = useNavigation();
  const colorScheme = useColorScheme();
  useEffect(()=>{
    return ()=>{

    };
  },[detail]);


  

  return <Viw style={styles.commentContainer}>
    <CustomListRow 
    accessory="none" 
    bottomSeparator="none" 
    title={'评论'}/>
  </Viw>;
};

const styles = StyleSheet.create({
  commentContainer:{

  }
});

export default inject("app")(observer(StillCompnent));
