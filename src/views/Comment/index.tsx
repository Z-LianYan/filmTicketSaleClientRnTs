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
  const [filmInfo,setFilmInfo] = useState<any>(null);
  const [productionNum,setProductionNum] = useState<any>(null);
  const [formData,setFormData] = useState<any>({
    score: 0,
    film_id: "",
    comment_parent_id: "",
    comment_content: "",
  });
  
  useEffect(()=>{
    getDefault();
    return ()=>{

    }
  },[]);

  const getDefault = useCallback(async()=>{
    if (route.params && !route.params.film_id) return;
    try {
      let result:any = await get_comment_detail({
        film_id: route.params.film_id,
        comment_id: route.params.comment_id,
      });
      
      setFilmInfo(result.filmInfo);
      setProductionNum((route.params && route.params.comment_id)?result.count:(result.count + 1))
    
      setNavigation(result.filmInfo)
      if (route.params && route.params.comment_id) {
        let commentInfo = result.commentInfo;
        formData.score = commentInfo.score;
        formData.comment_content = commentInfo.comment_content;
        setFormData({
          ...formData
        });
      }
    } catch (err:any) {
      if (err.error == 401) {
        app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
        navigation.navigate({
          name: "LoginPage"
        });
      }
    }
  },[])

  const setNavigation = useCallback((filmInfo)=>{
    navigation.setOptions({
      title: '',
      headerLeft:'',
      headerTransparent: false,
      headerBackground: () => (
        <HeaderBar 
        title={<Viw>
            <Txt style={{color:'#000',textAlign:'center'}}>我的评价</Txt>
            <Txt style={{textAlign:'center',color:'#fff'}}>{filmInfo && filmInfo.film_name}</Txt>
          </Viw>} 
        headerHeight={headerHeight}
        rightView={
          <Button 
          style={{borderRadius:20,backgroundColor:'#00b578'}} 
          titleStyle={{color:'#fff'}} 
          title="发布" 
          size="md"
          onPress={()=>{
            addComment();
          }}></Button>
        }/>
      )
    });
  },[formData])
 
  function onGotoCommentCompletePage(comment_id:any) {
    setTimeout(() => {
      navigation.navigate({
        name:'CommentCompletePage',
        params:{
          comment_id: comment_id,
          film_id: route.params && route.params.film_id,
        }
      })
    }, 500);
  }
  const addComment = useCallback(async()=>{
    if (!formData.score) return Toast.message("您还没给评分呢");
    if (!formData.comment_content) return Toast.message("您还没评论呢");
    if (route.params && route.params.comment_id) {
      await edit_comment({
        ...formData,
        comment_id: route.params.comment_id
      });
      onGotoCommentCompletePage(route.params.comment_id);
      return;
    }
    let result:any = await add_comment({
      ...formData,
      film_id: route.params && route.params.film_id,
    });
    if (!result) return;
    onGotoCommentCompletePage(result.comment_id);
  },[formData]);
  
  return <View style={styles.container}>
    <View style={styles.contentWrapper}>
      <Text style={styles.headTxt}>您总共参与讨论了<Text style={styles.headTxtNum}>{productionNum}</Text>部作品</Text>
      <View style={styles.starBox}>
        <Text>评分</Text>
        <Star style={{marginLeft:5}} marginRight={10} size={20} value={2}/>
        <Text>
        {formData.score ? (
                  <Text style={styles.scoreTxt}>{formData.score}分</Text>
                ) : null}
                <Text>{app.rateLevelTex[formData.score]}</Text>
        </Text>
      </View>

      <Input 
      placeholder={`大家都在问：剧情怎么样，画面好吗，演技如何？`} 
      style={{
        backgroundColor:colorScheme=='dark'?'#000':'#fff',
        // height:50,
        // borderWidth:0,
        color:colorScheme=='dark'?'#fff':'#000',
        // flex:1,
        height:200,
        borderWidth:0
      }}
      editable={true}//是否可编辑
      keyboardAppearance={colorScheme}//'default', 'light', 'dark'
      size='lg'
      multiline={true}
      value={formData.comment_content}
      onChangeText={(text:any) => {
        formData.comment_content = text;
        setFormData({
          ...formData,
          comment_content:text
        });
        setNavigation(filmInfo)
      }}
      />
    
    </View>
    
   
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  contentWrapper:{
    paddingHorizontal:25,
    marginTop:30
  },
  headTxt:{

  },
  headTxtNum:{
    color:Theme.primaryColor
  },
  starBox:{
    flexDirection:'row',
    paddingTop:20,
    paddingBottom:15,
    // borderBottomWidth:1,
    // borderBottomColor:'#1a1b1c'
    alignItems:'center'
  },
  scoreTxt:{
    color:Theme.primaryColor
  }

  
  
});

export default inject("app")(observer(CommentPage));
