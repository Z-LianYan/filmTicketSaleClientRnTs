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
  const [commentlist,setCommentlist] = useState<any>([]);
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
        // console.log('result====>>哈哈哈哈哈哈---',route.params);
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

  function setNavigation(filmInfo:any){
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
          size="sm"
          onPress={()=>{
            addComment();
          }}></Button>
        }/>
      )
    });
  }

  function onGotoCommentCompletePage(comment_id:any) {
    // let { location, history } = this.props;
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
  async function addComment() {
    // let { location, history } = this.props;
    // let { formData } = this.state;
    if (!formData.score) return Toast.message("您还没给评分呢");
    if (!formData.comment_content)
      return Toast.message("您还没评论呢");
    if (route.params && route.params.comment_id) {
      await edit_comment({
        ...formData,
        comment_id: route.params.comment_id,
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
  }


  
  // async function onDel(item:any, it:any, type:any, index:any) {
  //   Alert.alert(
  //     `您确定删除吗？`,
  //     "",
  //     [
  //       {
  //         text: "再想想",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { 
  //         text: "确定", onPress: async () => {
  //           try {
  //             if (type == "comment") {
  //               let result = await del_comment({
  //                 comment_id: item.comment_id,
  //               });
  //               commentlist.splice(index, 1);
  //               setCommentlist([...commentlist])
  //               // getFilmDetail && getFilmDetail();
  //             }
  //             if (type == "reply") {
  //               // console.log("reply000====---", it.reply_id);
  //               let result = await del_comment_reply({
  //                 reply_id: it.reply_id,
  //               });
  //               item.replyList.splice(index, 1);
  //               item.backup_reply_list.splice(index, 1);
  //               item.reply_count -= 1;
  //               setCommentlist([...commentlist])
  //               // console.log("删除回复", result);
  //             }
  //           } catch (err:any) {
  //             if (err.error == 401) {
  //               app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
  //               navigation.navigate({
  //                 name: "LoginPage"
  //               });
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   );
  // }

  

 
  
  return <View style={styles.container}>
    <View style={styles.contentWrapper}>
      <Text style={styles.headTxt}>您总共参与讨论了<Text style={styles.headTxtNum}>{productionNum}</Text>部作品</Text>
      <View style={styles.starBox}>
        <Text>评分</Text>
        <Star style={{marginLeft:5}} value={2}/>
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
        ...formData
      })
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
  },
  scoreTxt:{
    color:Theme.primaryColor
  }

  
  
});

export default inject("app")(observer(CommentPage));
