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
import ProgressBar from '../../component/ProgressBar';
import Star from '../../component/Star';

var ScreenObj = Dimensions.get('window');

const HeaderContainer = ({detail,app,reSetDetail}:any) => {
  let navigation:any = useNavigation();
  const colorScheme = useColorScheme();
  
  useEffect(()=>{
    console.log('刷新了')
    return ()=>{

    };
  },[detail]);
  

  return <Viw style={styles.headerContainer}>
    <Viw style={styles.headerContainerTop}>
      <Image 
      resizeMode='cover' 
      style={styles.headerContainerBg} 
      source={{uri: detail.poster_img }} />
      <Viw style={styles.headerContainerTopRight}>
        <Txt style={{
          ...styles.filmName,
          ...styles.whiteFont
        }}>{detail.film_name}</Txt>
        <Viw style={styles.categoryNamesPlayTypeName}>
          <Txt style={{
            ...styles.categoryNames,
            ...styles.whiteFont
          }}>{detail.category_names}</Txt>
          <Txt style={{
            ...styles.playTypeName,
            ...styles.whiteFont
          }}>{detail.play_type_name}</Txt>
        </Viw>
        <Txt style={{
          ...styles.areaRuntime,
          ...styles.whiteFont
        }}>
          {detail.area} | {detail.runtime}分钟
        </Txt>
        <Txt style={{
          ...styles.showTime,
          ...styles.whiteFont
        }}>
          {dayjs(detail.show_time).format("YYYY年MM月DD日")}
          {detail.area}上映
        </Txt>
        <Viw style={styles.wantSee}>
          <Txt style={{
            ...styles.wantSeeNum,
            color:Theme.secondaryColor
          }}>{detail.want_see_num}</Txt>
          <Txt style={styles.whiteFont}>人想看</Txt>
        </Viw>
      </Viw>
    </Viw>

    {
      detail.total_comment_num ? <Viw style={styles.headerContainerMiddle}>
        <Viw style={styles.headerContainerMiddleLeft}>
          <Viw style={styles.headerContainerMiddleLeftL}>
            <Txt style={styles.whiteFont}>口碑</Txt>
          </Viw>
          <Viw style={styles.headerContainerMiddleLeftR}>
            {
              detail.comment_score_subsection &&
              detail.comment_score_subsection.map((item:any, index:number) => {
                return <Viw style={styles.headerContainerMiddleLeftRItem} key={index}>
                  <Txt style={styles.scoreLabel}>{item.label}</Txt>
                  <ProgressBar percent={item.percent} style={styles.percent}/>
                  <Txt style={styles.headerContainerMiddleLeftRItemV}>{item.percent}%</Txt>
                </Viw>
              })
            }
          </Viw>
        </Viw>
        <Viw style={styles.headerContainerMiddleRight}>
          <Txt style={{
            ...styles.whiteFont,
            fontSize:12
          }}>评分</Txt>
          <Viw style={{
            flexDirection:'row'
          }}>
            <Txt style={{
              ...styles.whiteFont,
              // fontSize:12,
              color:Theme.primaryColor
            }}>{detail.score}分</Txt> 
            <Star style={{marginLeft:5}} value={detail.score / 2}/>
          </Viw>
          <Txt style={{
            ...styles.whiteFont,
            fontSize:12,
            alignItems:'center'
          }}>
            1人
            <Ionicons 
            name={'ios-chevron-forward'} 
            size={12} 
            color={"#fff"}/>
          </Txt>
        </Viw>
      </Viw>:null
    }
    

    {/* <Viw style={styles.headerContainerMiddleBottom}> */}


      {
        detail.user_already_comment ? (<Viw style={styles.headerContainerMiddleBottom}>
          <Txt style={{color:'#fff'}}>看过啦,</Txt>
          {
            !detail.user_comment_del ? <Viw style={{flexDirection:'row'}}>
              <Txt style={{color:'#fff'}}>{app.rateLevelTex[detail.rate_score] + "！我评 "}</Txt>
              <Viw style={{flexDirection:'row',alignItems:'center'}}>
                <Txt style={{color:Theme.secondaryColor}}>{detail.rate_score} 分</Txt>
                <Star style={{marginLeft:5}} value={
                  detail.user_already_comment && !detail.user_comment_del
                  ? detail.rate_score / 2
                  : 0
                }/>
              </Viw>
            </Viw>: <Viw style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Viw style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                <Txt style={{color:'#fff'}}>快来打个分吧</Txt>
                <Star style={{marginLeft:5}} value={
                  detail.user_already_comment && !detail.user_comment_del
                  ? detail.rate_score / 2
                  : 0
                }/>
              </Viw>

              {
                detail.user_already_comment &&
                  !detail.user_comment_del ? null : (
                    <Button
                    type="primary"
                      size="sm"
                      title="去评分"
                      onPress={() => {
                        // if (!app.userInfo) {
                        //   navigation.navigate({
                        //     name: "LoginPage",
                        //   });
                        //   return;
                        // }
                        navigation.navigate({
                          name: "CommentPage",
                          params: {
                            film_id: detail.id,
                          },
                        });
                      }}
                    />
                  )
              }
            </Viw>
          }
        </Viw>):(<Viw style={styles.notCommentWrapper}>
          <TouchableOpacity 
          activeOpacity={1}
          style={styles.notCommentBtn} 
          onPress={async ()=>{
            if (!app.userInfo) {
              navigation.navigate({
                name: "LoginPage",
              });
              return;
            }
            let result = await add_cancel_want_see({
              film_id: detail.id,
              user_id: app.userInfo.user_id,
            });
            // detail.want_see_num = result.count;
            // detail.user_already_click_want_see = !detail.user_already_click_want_see;
            reSetDetail();
          }}>
            <Ionicons 
            name={'heart'} 
            size={15} 
            color={
              detail.user_already_click_want_see
                ? Theme.primaryColor
                : "#fff"
            }/>
            <Txt style={styles.notCommentBtnTxt}>想看</Txt>
          </TouchableOpacity>
          <TouchableOpacity 
          activeOpacity={1}
          style={styles.notCommentBtn}
          onPress={()=>{
            if (!app.userInfo) {
              navigation.navigate({
                name: "LoginPage",
              });
              return;
            }
            navigation.navigate({
              name: "CommentPage",
              state: {
                film_id: detail.id,
              },
            });
          }}>
            <Ionicons 
            name={'star'} 
            size={15} 
            color={'#fff'}/>
            <Txt style={styles.notCommentBtnTxt}>看过</Txt>
          </TouchableOpacity>
        </Viw>)
      }


    {/* </Viw> */}
    
  </Viw>;
};

const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor:'#533468',
    paddingBottom:10
  },
  
  headerContainerTop:{
    flexDirection:'row',
    paddingTop:50,
    paddingHorizontal:10,
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
  },

  headerContainerMiddle:{
    paddingTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10
  },
  headerContainerMiddleLeft:{
    width:'63%',
    backgroundColor:'#9e8e8e',
    borderRadius:5,
    flexDirection:'row',
    paddingRight:5
  },
  headerContainerMiddleLeftL:{
    padding:5,
    borderRightColor:'#fff',
    borderRightWidth:0.5,
    alignItems:'center',
    justifyContent:'center'
  },
  headerContainerMiddleLeftR:{
    // flexDirection:'row',
    flex:1,
    // padding:5,
    paddingVertical:5,
    alignItems:'center',
    // backgroundColor:'red'

    
  },
  headerContainerMiddleLeftRItem:{
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:5
  },
  scoreLabel:{
    width:55,
    color:"#fff",
    fontSize:12,
    textAlign:'right'
  },
  percent:{
    marginHorizontal:5
  },
  headerContainerMiddleLeftRItemV:{
    width:55,
    color:"#fff",
    fontSize:12,
    // alignItems:'flex-end',
    textAlign:'left'
  },
  headerContainerMiddleRight:{
    width:'35%',
    backgroundColor:'#9e8e8e',
    borderRadius:5,
    padding:5
  },
  
  headerContainerMiddleBottom:{
    marginHorizontal:10,
    marginTop:10,
    borderRadius:5,
    backgroundColor:'#9e8e8e',
    padding:5,
    flexDirection:'row',
    alignItems:'center'
  },
  whiteFont:{
    color:'#fff'
  },
  notCommentWrapper:{
    marginTop:10,
    marginHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
  },
  notCommentBtn:{
    width: '45%',
    height: 35,
    // paddingHorizontal:15,
    // paddingVertical:5,
    backgroundColor:'#9e8e8e',
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  notCommentBtnTxt:{
    width: '30%',
    fontSize:15,
    marginLeft:5,
    color:'#fff'
  }
  
});

export default inject("app")(observer(HeaderContainer));
