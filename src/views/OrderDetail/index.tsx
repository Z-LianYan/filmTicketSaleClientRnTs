import React, { useState,useEffect, useCallback, useRef } from 'react';
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
  Linking
} from 'react-native';
// import { captureRef,captureScreen } from "react-native-view-shot";

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
import Qrcode from './Qrcode';
import OrderInfo from './OrderInfo';

import {
  create_order,
  pay_order,
  cancle_order,
  get_buy_ticket_detail,
  get_order_detail
} from "../../api/order";
import { get_user_info } from "../../api/user";
var ScreenObj = Dimensions.get('window');



const OrderDetail = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();
  let [refreshing,setRefreshing] = useState(false);
  let [isSkeleton,setIsSkeleton] = useState(false);
  let [orderDetail,setOrderDetail] = useState<any>(null);
  let qrcodeDomRef:{current:any} = useRef<any>(null);
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
    let { start_runtime } = orderDetail;
    if (!start_runtime) return;
    return dayjs(start_runtime).format('YY年M月D日 HH点MM分') + " 开场";
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
      setRefreshing(false);
    } catch (err:any) {
      setRefreshing(false);
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
    stickyHeaderIndices={[]}
    style={{
      ...styles.container,
      backgroundColor:colorScheme=='dark'?'#000':'#f4f4f4'
    }}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      title="下拉刷新"//ios
      refreshing={refreshing} 
      onRefresh={()=>{
        setRefreshing(true);
        getOrderDetail();
      }} />
    }
    onMomentumScrollEnd={(event:any)=>{}}>
      <Viw style={styles.headerBox} ref={qrcodeDomRef}>
        <View style={{
          ...styles.headerBoxBar,
          backgroundColor:'#494c2f'
        }}>
          <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.headerBoxBarLeft}
          onPress={()=>{
            if (!orderDetail || !orderDetail.cinema_has_schedule) return;
            navigation.navigate({
              name: `CinemaDetailPage`,
              params: {
                cinema_id: orderDetail && orderDetail.cinema_id,
              },
            });
          }}>
            <Text 
            numberOfLines={1} 
            style={styles.headerBoxBarLeftTxt}>{orderDetail && orderDetail.cinema_name}</Text>
            <Ionicons 
            name={'md-chevron-forward-sharp'}
            size={25} 
            color={'#fff'}/>
          </TouchableOpacity>
          <Viw style={styles.headerBoxIcons}>
            <Ionicons 
            name={'location-outline'}
            style={{marginLeft:20}}
            size={20} 
            color={'#fff'}/>
            <Ionicons 
            name={'md-call'}
            style={{marginLeft:20}}
            size={20} 
            color={'#fff'}
            onPress={()=>{
              if(!orderDetail || !orderDetail.phone) return;
              Linking.openURL(`tel:${orderDetail.phone}`)
            }}/>
          </Viw>
          
        </View>
        <View style={{
          ...styles.headerBoxCard,
          backgroundColor:colorScheme=='dark'?'#1a1b1c':'#fff'
        }}>
          <Viw style={{
            ...styles.circleBox,
            position:'absolute',
            top:-20,
            left:'50%',
            // transform:[{translateX:-15}]
          }}></Viw>
          <Viw style={styles.headerBoxCardCinemaImage}>
            <Viw style={styles.headerBoxCardCinemaImageLeft}>
              {
                orderDetail && <Text 
                style={styles.headerBoxCardCinemaImageLeftFilmName}>
                  {orderDetail.film_name}
                </Text>
              }
              {
                orderDetail && <Text>
                  {orderDetail.language + orderDetail.play_type_name +' '+ orderDetail.ticket_count}张
                </Text>
              }
            </Viw>
            {
              orderDetail && <Image 
              resizeMode='cover' 
              key={orderDetail.poster_img}
              style={styles.headerBoxCardCinemaImageRight} 
              source={{uri: orderDetail.poster_img }} />
            }
          </Viw>
          <Viw style={styles.headerBoxCardTimeHall}>
            {
              orderDetail && <Viw style={{flexDirection:'row'}}>
                <Text style={{color:'#ccc'}}>{handerDate(orderDetail.start_runtime)}</Text>
                <Text style={{paddingLeft:50,color:'#ccc'}}>{orderDetail.hall_name}</Text>
              </Viw>
            }
            {
              orderDetail && <Viw style={{flexDirection:'row',marginTop:8}}>
                <Text>
                  {dayjs(orderDetail.start_runtime).format("HH:mm")}～
                  {dayjs(orderDetail.start_runtime)
                    .add(orderDetail.runtime, "minute")
                    .format("HH:mm")}
                </Text>
                <Text style={{paddingLeft:20}}>{
                  arrLabel()
                }</Text>
              </Viw>
            }
          </Viw>
          
          <Viw style={styles.seperatorWrapepr}>
            <Viw style={{
              ...styles.circleBox,
              left:-30,
            }}></Viw>
            <Viw style={{
              ...styles.seperatorWrapeprLine,
              backgroundColor:'#494c2f',
            }}></Viw>
            <Viw style={{
              ...styles.circleBox,
              right:-30,
            }}></Viw>
          </Viw>


          {orderDetail && <Qrcode orderDetail={orderDetail}/>}
        </View>
      </Viw>
      {/* <Viw style={{paddingHorizontal:10,marginTop:5}}>
        <TouchableOpacity 
        activeOpacity={0.8} 
        style={{width:100,alignItems:'center'}}
        onPress={()=>{
          console.log('qrcodeDomRef.current',qrcodeDomRef.current)
        }}>
          <Ionicons 
            name={'ios-download-outline'}
            size={20} 
            color={colorScheme=='dark'?'#fff':'#000'}/>
          <Text>保存二维码</Text>
        </TouchableOpacity>
      </Viw> */}
      {orderDetail && <OrderInfo orderDetail={orderDetail}/>}
  </ScrollView>;

  function arrLabel(){
    // let { orderDetail } = this.state;
    if(!orderDetail) return;
    let arr_label:any = [];
    if (orderDetail.select_seats) {
      orderDetail.select_seats.map((item:any, index:number) => {
        if (orderDetail.is_section == 1) {
          arr_label.push(
            <Txt style={{color:'#e9ea95'}} key={index + "s"}>
            {' '}  {index == 0 ? "" :" | "} {item.section_name}
            </Txt>
          );
          item.seatList.map((it:any, idx:number) => {
            arr_label.push(
              <Txt key={idx + "se" + index}>
                {' '} {it.row_id}排{it.column_id}座 {' '}
              </Txt>
            );
          });
        } else {
          arr_label.push(
            <Txt key={index + "se"}>
            {' '} {item.row_id}排{item.column_id}座
            </Txt>
          );
        }
      });
    }
    return arr_label;
  }


  function handerDate(date:any) {
    let today = dayjs().format("YYYY-MM-DD");
    let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
    let houtian = dayjs().add(2, "day").format("YYYY-MM-DD");
    let cur_y = dayjs(date).format("YYYY");
    let y = dayjs().format("YYYY");
    switch (dayjs(date).format("YYYY-MM-DD")) {
      case today:
        return "今天 " + dayjs(date).format("M月D日");
      case tomorrow:
        return "明天 " + dayjs(date).format("M月D日");
      case houtian:
        return "后天 " + dayjs(date).format("M月D日");
      default:
        return (
          handleWeek(dayjs(date).day()) +
          dayjs(date).format(cur_y == y ? "M月D日" : "YY年M月D日")
        );
    }
  }
  function handleWeek(day:number) {
    switch (day) {
      case 0:
        return "周日 ";
      case 1:
        return "周一 ";
      case 2:
        return "周二 ";
      case 3:
        return "周三 ";
      case 4:
        return "周四 ";
      case 5:
        return "周五 ";
      case 6:
        return "周六 ";
      default:
        return "";
    }
  }

 
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  headerBox:{
    marginHorizontal: 10,
    marginTop:10,
    position:'relative',
    paddingTop:50
  },
  headerBoxBar:{
    padding:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:20,
    position:'absolute',
    top:3,
    left:0,
    right:0
  },
  headerBoxBarLeft:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderRightWidth:1,
    borderRightColor:'#fff',
    // paddingRight:10,
    paddingRight:10
  },
  headerBoxBarLeftTxt:{
    fontSize:18,
    color:'#fff'
  },
  headerBoxIcons:{
    flexDirection:'row',
    alignItems:'center'
  },
  headerBoxCard:{
    // height:100,
    // borderWidth:1,
    // borderColor:'#ccc',
    borderLeftColor:'#494c2f',
    borderLeftWidth:1,
    borderRightColor:'#494c2f',
    borderRightWidth:1,
    borderBottomColor:'#494c2f',
    borderBottomWidth:1,
    // borderTopLeftRadius:10,
    borderRadius:10,
    // top:-10,
    position:'relative',
    overflow:'hidden',
    padding:10,
    
  },
  headerBoxCardCinemaImage:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headerBoxCardCinemaImageLeft:{

  },
  headerBoxCardCinemaImageLeftFilmName:{
    fontWeight:'bold'
  },
  headerBoxCardCinemaImageRight:{
    width:75,
    height:90,
    borderRadius:10
  },
  headerBoxCardTimeHall:{
    // paddingTop:50
  },
  circleBox:{
    height:30,
    width:30,
    borderRadius:15,
    backgroundColor:'#494c2f',
  },
  seperatorWrapepr:{
    flexDirection:'row',
    justifyContent:'space-between',
    position:'relative',
    marginVertical:15
  },
  seperatorWrapeprLine:{
    position:'absolute',
    left:0,
    right:0,
    top:'50%',
    transform:[{translateY:-0.5}],
    height:1,
    zIndex:-1



  }
});

export default inject("AppStore")(observer(OrderDetail));
