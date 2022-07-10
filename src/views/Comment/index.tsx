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
  const [commentContent,setCommentContent] = useState<string>('');
  const [title,setTitle] = useState<string>('');
  const [score,setScore] = useState<number>(0);
  // const [formData,setFormData] = useState<any>({
  //   score: 0,
  //   film_id: "",
  //   comment_parent_id: "",
  //   comment_content: "",
  // });
  
  useEffect(()=>{
    getDefault();
    return ()=>{

    }
  },[]);

  const getDefault = useCallback(async()=>{
    if ((route.params && !route.params.film_id) || !route.params) return;
    try {
      let result:any = await get_comment_detail({
        film_id: route.params.film_id,
        comment_id: route.params.comment_id,
      });
      
      setFilmInfo(result.filmInfo);
      setTitle(result.filmInfo && result.filmInfo.film_name)
      setProductionNum((route.params && route.params.comment_id)?result.count:(result.count + 1))
      setNavigation(result.filmInfo && result.filmInfo.film_name,0,'')
      if (route.params && route.params.comment_id) {
        let commentInfo = result.commentInfo;
        setScore(commentInfo.score);
        setCommentContent(commentInfo.comment_content);
        // formData.score = commentInfo.score;
        // formData.comment_content = commentInfo.comment_content;
        // setFormData({
        //   ...formData
        // });

        setNavigation(result.filmInfo && result.filmInfo.film_name,commentInfo.score,commentInfo.comment_content)
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

  const setNavigation = useCallback((title,score,commentContent)=>{
    navigation.setOptions({
      // title: <Viw>
      //   <Txt style={{color:'#000',textAlign:'center'}}>我的评价</Txt>
      //   <Txt style={{textAlign:'center',color:'#fff'}}>{filmInfo && filmInfo.film_name}</Txt>
      // </Viw>,
      headerLeft:'',
      headerTransparent: false,
      // headerStyle: { 
      //   backgroundColor: Theme.primaryColor,
      //   borderBottomWidth:1,
      //   borderBottomColor:colorScheme=='dark'?'#1a1b1c':Theme.primaryColor
      // },
      // headerRight:()=>{
      //   return <Button 
      //   disabled={disabled}
      //   style={{borderRadius:20,backgroundColor:'#00b578',borderColor:'#00b578'}} 
      //   titleStyle={{color:'#fff'}} 
      //   title="发布" 
      //   size="md"
      //   onPress={()=>{
      //     console.log('123456')
      //     addComment();
      //   }}></Button>
      // },
      headerBackground: () => (
        <HeaderBar 
        title={<Viw>
            <Txt style={{color:'#000',textAlign:'center',fontSize:18}}>我的评价</Txt>
            <Txt style={{textAlign:'center',color:'#fff',fontSize:13}}>{title}</Txt>
          </Viw>} 
        headerHeight={headerHeight}
        // rightView={
        //   <Button 
        //   disabled={(score && commentContent.length>=5)?false:true}
        //   style={{borderRadius:20,backgroundColor:'#00b578'}} 
        //   titleStyle={{color:'#fff'}} 
        //   title="发布" 
        //   size="md"
        //   onPress={()=>{
        //     addComment();
        //   }}></Button>
        // }
        />
      )
    });
  },[title,score,commentContent])
 
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
    try{
      if (!score) return Toast.message("您还没给评分呢");
      if (!commentContent) return Toast.message("您还没评论呢");
      if (route.params && route.params.comment_id) {
        await edit_comment({
          score,
          comment_content:commentContent,
          comment_id: route.params.comment_id
        });
        
        onGotoCommentCompletePage(route.params.comment_id);
        return;
      }
      let result:any = await add_comment({
        score,
        comment_content:commentContent,
        film_id: route.params && route.params.film_id,
      });
      if (!result) return;
      onGotoCommentCompletePage(result.comment_id);
    }catch(err:any){
      console.log(err.message);
    }
  },[title,score,commentContent]);
  
  return <View style={styles.container}>
    <View style={styles.contentWrapper}>
      <Text style={styles.headTxt}>您总共参与讨论了<Text style={styles.headTxtNum}>{productionNum}</Text>部作品</Text>
      <View style={styles.starBox}>
        <View style={styles.star}>
          <Text style={{marginTop:4}}>评分</Text>
          <Star 
          style={{marginLeft:5}} 
          marginRight={8} 
          size={22}
          value={score / 2}
          onChange={(val:number) => {
            setScore(val*2);
            // setNavigation(title,score,commentContent)
          }}/>
        </View>
        
        <Text>
        {score ? (
                  <Text style={styles.scoreTxt}>{score}分</Text>
                ) : null}
                <Text>{app.rateLevelTex[score]}</Text>
        </Text>
      </View>

      <Input 
      placeholder={`大家都在问：剧情怎么样，画面好吗，演技如何？`} 
      style={{
        backgroundColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
        color:colorScheme=='dark'?'#fff':'#000',
        height:300,
        borderWidth:0
      }}
      editable={true}//是否可编辑
      keyboardAppearance={colorScheme}//'default', 'light', 'dark'
      size='lg'
      multiline={true}
      value={commentContent}
      onChangeText={(text:any) => {
        console.log('text',text);
        if(text.length>150) return;
        setCommentContent(text);
        // setNavigation(title,score,commentContent)
      }}
      />
      <View style={{alignItems:'flex-end'}}>
        <Text>{commentContent.length}/150</Text>
      </View>
    </View>
    <View style={{alignItems:'center',marginTop:20,paddingHorizontal:25}}>
      <Button 
      title="发布" 
      type="primary" 
      style={{width:'100%'}}
      size='lg'
      onPress={()=>{
        addComment()
      }}></Button>
    </View>
    
   
  </View>
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  contentWrapper:{
    paddingHorizontal:25,
    marginTop:30,
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
    alignItems:'center'
  },
  star:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  scoreTxt:{
    color:Theme.primaryColor
  }

  
  
});

export default inject("app")(observer(CommentPage));
