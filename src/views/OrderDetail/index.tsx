import React, { useState,useEffect, useCallback } from 'react';
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
  View as Viw,
  Text as Txt,
  RefreshControl,
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
import PropTypes, { any, number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";

import service from '../../utils/request';
import dayjs from 'dayjs';

import {
  create_order,
  pay_order,
  cancle_order,
  get_buy_ticket_detail,
  get_order_detail
} from "../../api/order";
import { get_user_info } from "../../api/user";
var ScreenObj = Dimensions.get('window');



let overlay_view = function(orderDetail:any=null,colorScheme:any,onCancel:any){
  return <Overlay.PullView 
  side='bottom'
  modal={false}
  containerStyle={{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
  }}>
    <Viw style={{
      borderBottomWidth:1,
      borderBottomColor:colorScheme=='dark'?'#202122':'#f4f4f4',
      paddingTop:20,
      paddingBottom:10,
      // flexDirection:'row',
      // alignItems:'center',
      // justifyContent:'space-between'
      position:'relative'
    }}>
      <Text style={{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold'
      }}>价格明细</Text>
      <Ionicons 
      name={'close-sharp'}
      size={30} 
      color={colorScheme=='dark'?'#fff':'#000'}
      style={{
        position:'absolute',
        right:10,
        top:10
      }}
      onPress={()=>{
        onCancel && onCancel();
      }}/>
    </Viw>
    
    <ScrollView
    style={{
      maxHeight:300,
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
      // paddingHorizontal:20,
      paddingTop:5
    }}
    showsHorizontalScrollIndicator={false}
    stickyHeaderIndices={[]}>
      {
        orderDetail && <CustomListRow 
        accessory="none"
        // topSeparator='full'
        bottomSeparator="indent" 
        backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
        title={'电影票'} 
        detail={orderDetail.ticket_count + "张"} />
      }
      {
        orderDetail && <CustomListRow 
        accessory="none"
        // topSeparator='full'
        backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
        bottomSeparator="indent" 
        title={'原价'} 
        detail={
              '含服务费'+orderDetail.premium+'元/张 ' + ' ' +orderDetail.price+'元'
        } />
      }
      
    </ScrollView>
    <View style={{
      height:10,
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
    }}></View>
  <View style={{
    height:10,
    backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
  }}></View>
</Overlay.PullView>
};


const OrderDetail = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();
  let [refreshing,setRefreshing] = useState(false);
  let [isSkeleton,setIsSkeleton] = useState(false);
  let [orderDetail,setOrderDetail] = useState<any>(null);
  useEffect(()=>{
    getOrderDetail();
    return ()=>{
      console.log('销毁了====》');
    }
  },[]);
  const setNavigation = useCallback((orderDetail)=>{
    navigation.setOptions({
      headerTitle:orderDetail.order_expire ? "观影结束" : handlerTitle(orderDetail),
      // headerLeft:'',
      headerTransparent: false,
      headerStyle: { 
        backgroundColor: colorScheme=='dark'?'#000':Theme.primaryColor
      },
    });
  },[]);
  function handlerTitle(orderDetail:any) {
    // let { orderDetail } = this.state;
    let { start_runtime } = orderDetail;
    console.log('orderDetail====>',orderDetail);
    if (!start_runtime) return;

    console.log('start_runtime====>😂',start_runtime);
    // return dayjs(dayjs('2022-02-08 15:24').valueOf()).fromNow()
    // if()
    return dayjs(start_runtime).format('YY年M月D日 HH点MM分') + " 开场"
    // return (
    //   dayjs(start_runtime).calendar(null, {
    //     sameDay: "[今天] A h:mm ", // The same day ( Today at 2:30 AM )
    //     nextDay: "[明天]", // The next day ( Tomorrow at 2:30 AM )
    //     nextWeek: "[下周]", // The next week ( Sunday at 2:30 AM )
    //     lastDay: "[昨天]", // The day before ( Yesterday at 2:30 AM )
    //     lastWeek: "[上周] dddd", // Last week ( Last Monday at 2:30 AM )
    //     sameElse: "YY年MM月DD日", // Everything else ( 7/10/2011 )
    //   }) + "开场"
    // );
  }
  const getOrderDetail = useCallback(async ()=>{
    let { params } = route;
    // console.log("location", this.props, match.params.order_id);
    try {
      let result = await get_order_detail({
        order_id: params && params.order_id,
      });
      // console.log(result);
      setIsSkeleton(false);
      setOrderDetail(result);
      setNavigation(result);
    } catch (err:any) {
      if (err.error == 401) {
        app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
        navigation.navigate({
          name:"LoginPage"
        });
      }
      if (err.error == 400) {
        setTimeout(() => {
          navigation.goBack();
        }, 800);
      }
    }
  },[])
  
  return <ScrollView
    bounces={false}//设置ios 上下拉回弹
    stickyHeaderIndices={[0]}
    style={{
      ...styles.container,
      backgroundColor:colorScheme=='dark'?'#000':'#fff'
    }}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      title="下拉刷新"//ios
      refreshing={refreshing} 
      onRefresh={()=>{
        setRefreshing(true);
        
      }} />
    }
    onMomentumScrollEnd={(event:any)=>{}}>
    <View style>

    </View>
  </ScrollView>;

 
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  
});

export default inject("app")(observer(OrderDetail));
