import React, { useState,useEffect,useCallback } from 'react';
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
  Input
} from '../../component/teaset/index';
import { edit_user_info, get_user_info } from "../../api/user";
import HeaderBar from "../../component/HeaderBar";
import { get_film_detail, add_cancel_want_see } from "../../api/film";
import dayjs from "dayjs";

var ScreenObj = Dimensions.get('window');

const HeaderContainer = ({detail}:any) => {
  const colorScheme = useColorScheme();
  
  useEffect(()=>{
    
    return ()=>{

    };
  },[]);
  

  return <Viw style={styles.headerContainer}>
    <Viw style={styles.headerContainerTop}>
        <Image 
        resizeMode='cover' 
        style={styles.headerContainerBg} 
        source={{uri: detail.poster_img }} />
        <Viw style={styles.headerContainerTopRight}>
          <Text style={styles.filmName}>{detail.film_name}</Text>
          <Viw style={styles.categoryNamesPlayTypeName}>
            <Text style={styles.categoryNames}>{detail.category_names}</Text>
            <Text style={styles.playTypeName}>{detail.play_type_name}</Text>
          </Viw>
          <Text style={styles.areaRuntime}>
            {detail.area} | {detail.runtime}分钟
          </Text>
          <Text style={styles.showTime}>
            {dayjs(detail.show_time).format("YYYY年MM月DD日")}
            {detail.area}上映
          </Text>
          <Viw style={styles.wantSee}>
            <Text style={{
              ...styles.wantSeeNum,
              color:Theme.secondaryColor
            }}>{detail.want_see_num}</Text>
            <Text>人想看</Text>
          </Viw>
          
        </Viw>
    </Viw>
  </Viw>;
};

const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor:'#533468'
  },
  
  headerContainerTop:{
    flexDirection:'row',
    paddingTop:50,
    padding:10
  },
  headerContainerBg:{
    width:100,
    height:150,
    borderRadius:3
  },
  headerContainerTopRight:{
    flex:1,
    marginLeft:10
  },
  filmName:{
    marginBottom:15
  },
  categoryNamesPlayTypeName:{
    flexDirection:'row',
  },
  categoryNames:{
  },
  playTypeName:{
    paddingLeft:8
  },
  areaRuntime:{
    marginTop:5
  },
  showTime:{
    marginTop:5
  },
  wantSee:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end'
  },
  wantSeeNum:{
    marginRight:10
  }
  
});

export default inject("app")(observer(HeaderContainer));
