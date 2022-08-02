import React, { useState,useEffect } from 'react';
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
  Dimensions
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
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";

import service from '../../utils/request';

import {
  create_order,
  pay_order,
  cancle_order,
  get_buy_ticket_detail,
} from "../../api/order";
import { get_user_info } from "../../api/user";


var ScreenObj = Dimensions.get('window');

const BuyTicket = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();
  let [isSkeleton,setIsSkeleton] = useState(false);
  let [orderDetail,setOrderDetail] = useState<any>(null);
  let [expire_time,set_expire_time] = useState<number>(0);
  let [isNotCancelOrder,setIsNotCancelOrder] = useState<boolean>(false);
  let [timerSetInterVal,setTimerSetInterVal] = useState<any>(null);
  
  
  useEffect(()=>{
    getOrderDetail();
  },[]);

  async function getOrderDetail() {
    // let { history, location, match } = this.props;
    let { params } = route;
    try {
      let result:any = await get_buy_ticket_detail({
        order_id: params && params.order_id,
      });
      // this.setState({
      //   isSkeleton: false,
      //   orderDetail: result,
      // });
      setIsSkeleton(false)
      setOrderDetail(result);

      set_expire_time(result.expireTime)

      // this.setState({ expire_time: result.expireTime });
      onSetInterval();
    } catch (err:any) {
      if (err.error == 400) {
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
      if (err.error == 401) {
        app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
        navigation.navigate({
          name: "LoginPage"
        });
      }
    }
  }

  function onDialog() {
    Alert.alert(
      "支付超时，该订单已失效，请重新选座购票",
      "",
      [
        // {
        //   text: "取消",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        { text: "确定", onPress: async () => {
          console.log('123456')
          setIsNotCancelOrder(true)
          // navigation.goBack()
        } }
      ]
    );
    
  }
  function onSetInterval() {
    let timer = setInterval(() => {
      // let { expire_time } = this.state;
      if (expire_time <= 0) {
        onDialog();
        clearInterval(timer);
      } else {
        expire_time -= 1;
        // this.setState({ expire_time: expire_time });
        set_expire_time(expire_time);
      }
    }, 1000);
    setTimerSetInterVal(timer);
  }
  function handleMinute() {
    // let { expire_time } = this.state;
    let m = Math.floor(expire_time / 60);
    let s = expire_time % 60;
    return m + ":" + (s > 9 ? s : "0" + s);
  }

  async function onGoToPay() {
    Alert.alert(
      "您确认支付吗？",
      "",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确定", onPress: async () => {
          console.log('确定支付---》〉',orderDetail);
          try {
            let pay_result:any = await pay_order({
              order_id: orderDetail.order_id,
              pay_type: "user_balance",
            });
            console.log('pay_result====>',pay_result);
            if (pay_result) getUserInfo();
            setTimeout(() => {
              navigation.navigate({
                name:"orderDetail",
                params:{
                  order_id:pay_result.order_id
                }
              });
            }, 800);
          } catch (err:any) {
            if (err.error == "noBalance") {
              Alert.alert(
                err.message,
                "",
                [
                  { text: "前往充值", 
                    onPress: async () => {
                      navigation.navigate({
                        name:'recharge'
                      })
                    } 
                  }
                ]
              );
            }
          }
        }}
      ]
    );
  }

  async function getUserInfo() {
    let result = await get_user_info();
    // app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
    //     navigation.navigate({
    //       name: "LoginPage"
    //     });
    if (result) app.setUserInfo(result);
  }
  

  return <View style={styles.container}>
    <Text onPress={()=>{
      onGoToPay()
    }}>BuyTicket</Text>

  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
});

export default inject("app")(observer(BuyTicket));
