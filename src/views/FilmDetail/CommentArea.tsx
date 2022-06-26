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
import ReplyCommentModal from '../../component/ReplyCommentModal';



import dayjs from "dayjs";
import _lodash from "lodash";

var ScreenObj = Dimensions.get('window');



const CommentArea = ({app,route,film_detail=null,getFilmDetail}:any) => {
  let navigation:any = useNavigation();
  const colorScheme = useColorScheme();
  const [commentlist,setCommentlist] = useState<any>([]);
  const [selectReplyItem,setSelectReplyItem] = useState<any>(null);
  const replyCommentModalRef:{current:any} = useRef();
  
  useEffect(()=>{
    getcommentlist()
    return ()=>{};
  },[]);

  async function getcommentlist() {
    let result:any = await get_comment_list({
      page: 1,
      limit: 3,
      film_id: route && route.params && route.params.film_id,
      city_id: app.locationInfo && app.locationInfo.city_id,
      user_id: app.userInfo && app.userInfo.user_id,
    });
    // console.log('123456---',result.rows);
    setCommentlist(result.rows);
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
                getFilmDetail && getFilmDetail();
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
    // let { history } = this.props;
    // const result = await Dialog.confirm({
    //   confirmText: "确定",
    //   content: "您确定举报吗？",
    // });

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

  function renderEditCommentBtn(){
    if(app.userInfo && commentlist.some((item:any) => item.user_id == app.userInfo.user_id)){
        return <Txt
          style={styles.editMineCommentBtn}
          onPress={() => {
            let commentData:any = {};
            for (let item of commentlist) {
              if (item.user_id == app.userInfo.user_id) {
                commentData = item;
              }
            }
            navigation.navigate({
              name: "CommentPage",
              params:{
                film_id: film_detail.id,
                comment_id: commentData.comment_id,
              }
            });
          }}
        >
          编辑我的讨论
        </Txt>
    }
  }


  

  return <Viw style={styles.commentContainer}>
    <CustomListRow 
    accessory="none" 
    bottomSeparator="full" //full,indent,none
    title={'评论'}
    detail={renderEditCommentBtn()}
    />
    {commentlist.map((item:any, index:number) => {
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
          onReplyTextBtn={() => {
            // let selectReplyItem = {
            //   commentlistIndex: index,
            //   reply_person_nickname: item.nickname,
            //   reply_parent_id: 0,
            //   reply_content: "",
            //   parent_user_id: item.user_id,
            //   comment_id: item.comment_id,
            // };
            // // setSelectReplyItem(selectReplyItem);
            // setSelectReplyItem({
            //   ...selectReplyItem
            // });

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
          {item.replyList &&
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
            })}
        </CommentItem>
      );
    })}
    {
      commentlist && commentlist.length?<Text
        style={styles.showCommentBtn}
        onPress={() => {
          navigation.navigate({
            name: "CommentListPage",
            params:{
              film_id: film_detail.id,
              film_name: film_detail.film_name
            }
          });
        }}
      >
        查看全部 {film_detail?film_detail.total_comment_num:0} 条讨论
        {/* <RightOutline /> */}
        <Ionicons 
        name={'md-chevron-forward-outline'}
        size={14} 
        color={Theme.primaryColor}/>
        
      </Text>:null
    }

    <ReplyCommentModal 
    app={app} 
    ref={replyCommentModalRef} 
    commentlist={commentlist}
    replySuccess={(commentlist:any)=>{
      setCommentlist([...commentlist])
    }}/>
  </Viw>;
};

const styles = StyleSheet.create({
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
  showCommentBtn:{
    height: 50,
    textAlignVertical:'center',
    textAlign: 'center',
    color: Theme.primaryColor,
    fontWeight: 'bold',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    borderBottomWidth:0.5,
    borderBottomColor: '#ccc',
  }
});

export default inject("app")(observer(CommentArea));
