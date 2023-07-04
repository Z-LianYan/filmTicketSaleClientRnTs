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


const CommentPage = ({AppStore,navigation,route}:any) => {
    
  const colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  const [filmInfo, setFilmInfo] = React.useState<any>(null);
  const [commentInfo, setCommentInfo] = React.useState<any>(null);
  const [productionNum, setProductionNum] = React.useState(0);
  
  useEffect(()=>{
    getData()
  },[]);

  const getData = useCallback(async ()=>{
    let result:any = await get_comment_detail({
      film_id: route.params && route.params.film_id,
      comment_id: route.params && route.params.comment_id,
    });
    console.log('result--评论详情',result);
    setFilmInfo(result.filmInfo);
    setCommentInfo(result.commentInfo);
    setProductionNum(result.count);
  },[])
  

  return <Viw style={styles.container}>
    <ScrollView
    stickyHeaderIndices={[]}>

      
      {/* <Ionicons 
      name={'md-people-circle-outline'}
      size={20} 
      color={colorScheme=='dark'?'#fff':'#000'}/> */}


      <Viw style={styles.contentContainer}>
        <Viw style={{
          ...styles.contentWrapper,
          backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
        }}>
          <Viw  style={styles.userInfo}>
            {
              commentInfo && commentInfo.avatar ? (
                <Image 
                style={styles.avatar}
                resizeMode='cover' 
                source={{uri: commentInfo.avatar }} />
              ) : (<Ionicons 
                name={'md-people-circle-outline'} 
                size={20} 
                color={colorScheme=='dark'?'#fff':'#000'}/>
              )
            }
            <Viw  style={styles.rightWrapper}>
              {commentInfo && commentInfo.nickname ? (
                <Text style={styles.nickname}>
                  {commentInfo.nickname} <Text  style={styles.ping}>评</Text>
                </Text>
              ) : null}
              {productionNum ? (
                <Text style={styles.num}>在这里记录了共 {productionNum} 部作品</Text>
              ) : null}
            </Viw>
          </Viw>
          <Viw style={styles.scoreWrapper}>
            {filmInfo && filmInfo.film_name ? (
              <Text  style={{
                ...styles.filmName,
                backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff'
              }}>《{filmInfo.film_name}》</Text>
            ) : null}
            {commentInfo && commentInfo.score ? (
              <Star 
              style={{marginLeft:5,marginVertical:20}} 
              marginRight={8} 
              size={25}
              value={commentInfo.score / 2}/>
            ) : null}
            {commentInfo && commentInfo.score ? (
              <Text style={styles.score}>
                {commentInfo.score}分 {AppStore.rateLevelTex[commentInfo.score]}
              </Text>
            ) : null}
          </Viw>
          <Text style={styles.commentContent}>
            {commentInfo && commentInfo.comment_content}
          </Text>
          {
            filmInfo && 
            <Viw style={styles.posterImgWrapper}>
              <Image 
              style={styles.posterImg}
              resizeMode='contain' 
              source={{uri: filmInfo.poster_img }} />
            </Viw>
          }
        </Viw>
      </Viw>


    </ScrollView>
  </Viw>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  contentContainer:{
    marginTop: 30,
    paddingBottom: 10,
    paddingTop:15
  },
  contentWrapper:{
    borderRadius: 10,
    paddingBottom: 10,
    marginHorizontal:20
  },
  userInfo:{
    height: 100,
    flexDirection:'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  avatar:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  rightWrapper:{
    marginLeft: 20
  },
  nickname:{

  },
  ping:{
    color: '#999'
  },
  num:{
    color: '#999'
  },
  scoreWrapper:{
    position: 'relative',
    height: 100,
    borderTopWidth:1,
    // borderStyle:'dotted',
    borderTopColor:'#ccc',
    rderBottomWidth:1,
    borderBottomColor:'#ccc',
    alignItems: 'center',
  },
  filmName:{
    position: 'absolute',
    top: -10,
  },
  score:{
    color:Theme.primaryColor,
    fontWeight:'bold'
  },
  commentContent:{
    paddingVertical:15,
    paddingHorizontal:10,
    
  },
  posterImgWrapper:{
    paddingVertical:15,
    paddingHorizontal:10,
  },
  posterImg:{
    width:'100%',
    height:300,
    
  }
  
  
});

export default inject("AppStore")(observer(CommentPage));
