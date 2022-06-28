import React, { useState,useEffect,useRef } from 'react';
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
} from "../../api/comment";

import dayjs from "dayjs";
import _lodash from "lodash";

import BottomLoading from '../../component/BottomLoading';


var ScreenWidth = Dimensions.get('window').width;


const CommentList = ({app,navigation,route}:any) => {
    
  const colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  const [refreshing, setRefreshing] = React.useState(false);
  const [commentlist,setCommentlist] = useState<any>([]);
  const [page,setPage] = useState<number>(1);
  let [isLoading,setLoading] = useState(false);
  let [isFinallyPage,setFinallyPage] = useState(false);
  const replyCommentModalRef:{current:any} = useRef();
  

  const customAlertRef:{current:any} = useRef()

  useEffect(()=>{
    getcommentlist(true);
    
  },[]);


  async function getcommentlist(isLoading?:boolean) {
    isLoading && setLoading(true);
    let result:any = await get_comment_list({
      page: page,
      limit: 10,
      film_id: route && route.params && route.params.film_id,
      city_id: app.locationInfo && app.locationInfo.city_id,
      user_id: app.userInfo && app.userInfo.user_id,
    });
    let _commentlist = []
    if(page==1){
      _commentlist = result.rows;
      // setCommentlist(result.rows);
    }else{
      _commentlist = commentlist.concat(result.rows)
      // setCommentlist(commentlist.concat(result.rows));
    }
    setCommentlist(_commentlist);
    if (_commentlist.length >= result.count) {
      setFinallyPage(true);
    } else {
      setFinallyPage(false);
    }
    setLoading(false);
    
    setRefreshing(false);

    setNavigation(_commentlist);
  }

  function setNavigation(commentlist:any){
    navigation.setOptions({
      title: '',
      headerLeft:'',
      headerTransparent: false,
      headerBackground: () => (
        <HeaderBar 
        title={route.params.film_name} 
        headerHeight={headerHeight}
        rightView={
          app.userInfo && commentlist.some((item:any) => item.user_id == app.userInfo.user_id) && (<Button 
          style={{borderRadius:20,backgroundColor:'#00b578'}} 
          titleStyle={{color:'#fff'}} 
          title="编辑我的评论" 
          size="sm"
          onPress={()=>{
            let commentData:any = {};
            for (let item of commentlist) {
              if (item.user_id == app.userInfo.user_id) {
                commentData = item;
              }
            }
            navigation.navigate({
              name: "CommentPage",
              params:{
                film_id: route.params.film_id,
                comment_id: commentData.comment_id,
              }
            });
          }}/>)
          
        }/>
      )
    });
  }

  function handleDate(date:any) {
    let diff = dayjs().diff(dayjs(date), "day");
    if (diff > 10) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    }
    // let fromNow = dayjs(date).fromNow();
    // if (fromNow == "几秒前") {
    //   return "刚刚";
    // }
    // return fromNow;
    return dayjs(date).format("YYYY-MM-DD HH:mm");
  }

  async function getCommentReplyList(item:any) {
    item.isReplyCommentLoading = true;
    // item.page = item.page ? item.page + 1 : 1;
    let page = 1;
    if(Array.isArray(item.backup_reply_list)){
      page = item.backup_reply_list.length<3?1:item.backup_reply_list.length%3 == 0?((item.backup_reply_list.length/3)+1):Math.floor(item.backup_reply_list.length/3)+1;
      console.log('page---item.backup_reply_list.length',item.backup_reply_list.length)
    }
    console.log('page---',page)
    setCommentlist([
      ...commentlist
    ])
    let result:any = await get_comment_reply_list({
      page: page,
      limit: 3,
      comment_id: item.comment_id,
    });
    console.log('result====>',result);
    if (item.replyList) {
      for (let it of item.replyList) {
        for (let i = 0; i < result.rows.length; i++) {
          if (it.reply_id == result.rows[i].reply_id) {
            result.rows.splice(i, 1);
          }
        }
      }
    } else {
      item.replyList = [];
    }

    item.replyList = item.replyList.concat(result.rows);

    console.log('item.replyList====>',item.replyList.length);
    item.backup_reply_list = _lodash.cloneDeep(item.replyList);
    item.isReplyCommentLoading = false;
    // item.isShowUnfold = item.replyList.length >= result.count ? true : false;
    
    item.isFinalllyPage = item.replyList.length >= result.count ? true : false;
    setCommentlist([
      ...commentlist
    ])
  }

  async function onDel(item:any, it:any, type:any, index:any) {
    Alert.alert(
      `您确定删除吗？`,
      "",
      [
        {
          text: "再想想",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "确定", onPress: async () => {
            try {
              if (type == "comment") {
                let result = await del_comment({
                  comment_id: item.comment_id,
                });
                commentlist.splice(index, 1);
                setCommentlist([...commentlist])
                // getFilmDetail && getFilmDetail();
              }
              if (type == "reply") {
                // console.log("reply000====---", it.reply_id);
                let result = await del_comment_reply({
                  reply_id: it.reply_id,
                });
                item.replyList.splice(index, 1);
                item.backup_reply_list.splice(index, 1);
                item.reply_count -= 1;
                setCommentlist([...commentlist])
                // console.log("删除回复", result);
              }
            } catch (err:any) {
              if (err.error == 401) {
                app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
                navigation.navigate({
                  name: "LoginPage"
                });
              }
            }
          }
        }
      ]
    );
  }

  async function onJubao(report_id:any, type:any, comment_id:any) {
    //举报

    Alert.alert(
      `您确定举报吗？`,
      "",
      [
        {
          text: "再想想",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "确定", onPress: async () => {
            try {
              await comment_jubao({
                report_id: report_id,
                report_type: type,
                comment_id: comment_id,
              });
            } catch (err:any) {
              if (err.error == 401) {
                app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
                navigation.navigate({
                  name: "LoginPage"
                });
              }
            }
          }
        }
      ]
    );
    
  }

 
  
  return <View style={styles.container}>
    <CustomListRow 
    accessory="none" 
    bottomSeparator="none" //full,indent,none
    title={'评论'}
    detail={
      <Ionicons 
      name={'md-information-circle-outline'}
      size={20} 
      color={'#ccc'}
      onPress={()=>{
        customAlertRef.current.open(<Text style={{color:Theme.primaryColor}}>" 什么是讨论 "</Text>,<View style={{width: ScreenWidth - 80}}>
          <Text allowFontScaling={true} style={{marginBottom:10}}>讨论的观点为大家所观影作品的观点，看法的分享通道。</Text>
          <Text allowFontScaling={true} style={{marginBottom:10}}>讨论区仅展示部分评价，与影片无关的，或包含人身攻击等内容的评价将被折叠，且其评分不计入评分。 对于多次违反社区规则的用户，我们也保留封禁账号的权利。</Text>
          <Text allowFontScaling={true}>设置头像和昵称、认真发布短评，可以增大你的创作被推荐为精选的机率～</Text>
        </View>)
      }}/>
    }
    />

    <ScrollView
    stickyHeaderIndices={[]}
    style={{position:'relative'}}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      refreshing={refreshing} 
      title="下拉刷新"//ios
      onRefresh={()=>{
        console.log('onRefresh');
        setRefreshing(true);
        getcommentlist(true);
      }} />
    }
    onMomentumScrollEnd={(event:any)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
        if(isLoading || isFinallyPage) return;
        setPage(page+1)
        getcommentlist();
      }
    }}>
      

      {
        commentlist.map((item:any, index:number) => {
          let actionsOptionComment = ["举报"];
          if (app.userInfo && app.userInfo.user_id == item.user_id) {
            actionsOptionComment.push("删除");
          }
          return (
            <CommentItem
              key={index}
              userInfo={app.userInfo}
              nickname={item.nickname}
              scoreText={`给这部作品打了${item.score}分`}
              date={handleDate(item.date)}
              separator={commentlist.length != index + 1}
              avatar={item.avatar}
              score={item.score}
              actionsOption={actionsOptionComment}
              onAction={(val:string) => {
                if (val == "删除") {
                  onDel(item, null, "comment", index);
                }
                if (val == "举报") {
                  onJubao(item.comment_id, "comment", item.comment_id);
                }
              }}
              commentContent={item.comment_content}
              isShowMineCommentTag={
                app.userInfo && app.userInfo.user_id == item.user_id
              }
              onReplyTextBtn={() => {;

                replyCommentModalRef.current.open({
                  commentlistIndex: index,
                  reply_person_nickname: item.nickname,
                  reply_parent_id: 0,
                  reply_content: "",
                  parent_user_id: item.user_id,
                  comment_id: item.comment_id,
                });
              }}
              isShowMenuBtn={true}
              // messageNum={785}
              dzNum={item.thumb_up_count}
              alreadyThumbUp={item.already_thumb_up}
              onThumbUp={async () => {
                try {
                  let result:any = await thumb_up({
                    thumb_up_id: item.comment_id,
                    comment_id: item.comment_id,
                    thumb_up_type: "comment",
                  });
                  if (result.type == "add") {
                    item.already_thumb_up = true;
                    item.thumb_up_count += 1;
                  }
                  if (result.type == "reduce") {
                    item.already_thumb_up = false;
                    item.thumb_up_count -= 1;
                  }
                  setCommentlist([
                    ...commentlist
                  ]);
                } catch (err:any) {
                  if (err.error == 401) {
                    app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
                    navigation.navigate({
                      name: "LoginPage"
                    });
                    
                  }
                }
              }}
              history={'history'}
              bottomNode={
                item.reply_count ? (
                  <View className="unfold-reply-btn">
                    {item.isReplyCommentLoading ? (
                      <Txt>加载中...</Txt>
                    ) : (
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Ionicons 
                        name={'ios-remove-outline'}
                        size={14} 
                        color={'#ccc'}/>
                        {
                          (!item.replyList || (item.replyList && item.replyList.length < item.reply_count))?<Txt
                            style={styles.btn}
                            onPress={() => {
                              if (
                                item.replyList &&
                                item.replyList.length <
                                  item.backup_reply_list.length
                              ) {
                                item.sliceIndex = item.sliceIndex
                                  ? item.sliceIndex
                                  : 0;
                                let arr = item.backup_reply_list.slice(
                                  item.sliceIndex,
                                  item.sliceIndex + 3
                                );
                                item.sliceIndex += 3;
                                let _arr = [];
                                for (let i = 0; i < arr.length; i++) {
                                  let flag = false;
                                  for (let it of item.replyList) {
                                    if (arr[i].reply_id == it.reply_id) {
                                      flag = true;
                                    }
                                  }
                                  if (!flag) _arr.push(arr[i]);
                                }
                                item.replyList =
                                  item.replyList.concat(_arr);
                                if (
                                  item.replyList.length ==
                                  item.backup_reply_list.length
                                ) {
                                  // item.isShowUnfold = true;
                                  item.backup_reply_list =
                                    _lodash.cloneDeep(item.replyList);
                                }
                                setCommentlist([
                                  ...commentlist
                                ])
                                return;
                              }
                              if (item.isFinalllyPage) {
                                // item.isShowUnfold = true;
                                setCommentlist([
                                  ...commentlist
                                ])
                                return;
                              }
                              getCommentReplyList(item);
                            }}
                          >
                            展开
                            {!item.replyList ||
                            (item.replyList &&
                              !item.replyList.length &&
                              item.backup_reply_list)
                              ? item.reply_count + "条"
                              : "更多"}
                            回复
                            <Ionicons 
                            name={'ios-chevron-down-sharp'}
                            size={14} 
                            color={'#ccc'}/>
                          </Txt>:null
                        }
                        {/* item.isShowUnfold */}
                        {
                          (item.replyList && item.replyList.length)?<Txt
                            style={{
                              ...styles.btn,
                              // marginLeft:20
                            }}
                            onPress={() => {
                              // item.isShowUnfold = false;
                              item.sliceIndex = 0; //收起时sliceIndex 要 设为0；
                              item.replyList = [];
                              setCommentlist([
                                ...commentlist
                              ])
                            }}
                          >
                            收起
                            <Ionicons 
                            name={'ios-chevron-up-sharp'}
                            size={14} 
                            color={'#ccc'}/>
                          </Txt>:null
                        }
                      </View>
                    )}
                  </View>
                ) : null
              }
            >
              {
                item.replyList &&
                item.replyList.map((it:any, idx:number) => {
                  let actionsOptionReply = ["举报"];
                  if (app.userInfo && app.userInfo.user_id == it.user_id) {
                    actionsOptionReply.push("删除");
                  }
                  return (
                    <CommentItem
                      userInfo={app.userInfo}
                      itemPaddingTop={0}
                      itemPaddingRight={0}
                      itemPaddingBottom={0.1}
                      itemPaddingLeft={0}
                      separator={false}
                      key={it.reply_id + "r"}
                      nickname={it.nickname}
                      replyName={it.parent_nickname}
                      date={handleDate(it.date)}
                      avatar={it.avatar}
                      score={item.score}
                      actionsOption={actionsOptionReply}
                      onAction={(val:any) => {
                        if (val == "删除") {
                          onDel(item, it, "reply", idx);
                        }
                        if (val == "举报") {
                          onJubao(
                            it.reply_id,
                            "reply",
                            item.comment_id
                          );
                        }
                      }}
                      commentContent={it.reply_content}
                      isShowMenuBtn={true}
                      onClickJubao={() => {
                        console.log("jubao");
                      }}
                      dzNum={it.thumb_up_count}
                      alreadyThumbUp={it.already_thumb_up}
                      onThumbUp={async () => {
                        try {
                          let result:any = await thumb_up({
                            thumb_up_id: it.reply_id,
                            comment_id: item.comment_id,
                            thumb_up_type: "reply",
                          });
                          if (result.type == "add") {
                            it.already_thumb_up = true;
                            it.thumb_up_count = it.thumb_up_count
                              ? it.thumb_up_count
                              : 0;
                            it.thumb_up_count += 1;
                          }
                          if (result.type == "reduce") {
                            it.already_thumb_up = false;
                            it.thumb_up_count -= 1;
                          }
                          setCommentlist([
                            ...commentlist
                          ])
                        } catch (err:any) {
                          if (err.error == 401) {
                            app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
                            navigation.navigate({
                              name: "LoginPage"
                            });
                          }
                        }
                      }}
                      history={'history'}
                      onReplyTextBtn={() => {
                        replyCommentModalRef.current.open({
                          commentlistIndex: index,
                          reply_person_nickname: it.nickname,
                          reply_parent_id: it.reply_id,
                          reply_content: "",
                          parent_user_id: it.user_id,
                          comment_id: item.comment_id,
                        });
                      }}
                    />
                  );
                })
              }
            </CommentItem>
          )})
      }

      <BottomLoading
      isLoading={isLoading}
      isFinallyPage={isFinallyPage}
      hasContent={commentlist.length?true:false}/>
      <View style={{height:50}}></View>
    </ScrollView>

    <CustomAlert ref={customAlertRef}/>
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },

  commentContainer:{

  },
  editMineCommentBtn:{
    color: Theme.primaryColor,
    // height: 50,
    flexDirection:'row',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  btn:{
    marginLeft:10
  },
  showCommentBtnWrapper:{
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    borderBottomWidth:0.5,
    borderBottomColor: '#ccc',
    justifyContent:'center',
    alignItems:'center'
  },
  showCommentBtn:{
    color: Theme.primaryColor,
    fontWeight: 'bold',
  }
  
});

export default inject("app")(observer(CommentList));
