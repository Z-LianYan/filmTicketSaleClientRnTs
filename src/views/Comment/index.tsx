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

var ScreenWidth = Dimensions.get('window').width;


const CommentPage = ({app,navigation,route}:any) => {
    
  const colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  const [commentlist,setCommentlist] = useState<any>([]);

  useEffect(()=>{
    navigation.setOptions({
      title: '',
      headerLeft:'',
      headerTransparent: false,
      headerBackground: () => (
        <HeaderBar 
        title={'route.params.film_name'} 
        headerHeight={headerHeight}
        rightView={
          <Button 
          style={{borderRadius:20,backgroundColor:'#00b578'}} 
          titleStyle={{color:'#fff'}} 
          title="发布" 
          size="sm"
          onPress={()=>{
            
          }}></Button>
        }/>
      )
    });
  },[]);


  
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
    
    <Text>1234</Text>
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },

  
  
});

export default inject("app")(observer(CommentPage));
