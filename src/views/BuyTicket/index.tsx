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
  Dimensions,
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


const BuyTicket = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();
  let [isSkeleton,setIsSkeleton] = useState(false);
  let [orderDetail,setOrderDetail] = useState<any>(null);
  let [expire_time,set_expire_time] = useState<number>(0);
  let [isNotCancelOrder,setIsNotCancelOrder] = useState<boolean>(false);
  let [timerSetInterVal,setTimerSetInterVal] = useState<any>(null);
  
  
  useEffect(()=>{
    getOrderDetail();

    navigation.addListener('beforeRemove', (e:any) => {
      console.log('e====>',e)

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        '确定离开吗？',
        '离开后当前订单将自动取消！',
        [
          { text: "再想想", style: 'cancel', onPress: () => {} },
          {
            text: '确定离开',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: async () => {
              let { params } = route;
              if (
                orderDetail.order_id &&
                params && params.isCancelOrder && !isNotCancelOrder
              ) {

                console.log('取消订单')
                //取消订单
                await cancle_order({ order_id: orderDetail.order_id });


              }
              clearInterval(timerSetInterVal);
              
              navigation.dispatch(e.data.action)

            },
          },
        ]
      );
    })




    return ()=>{
      // let { params } = route;
      console.log('销毁了====》')
        /**
       * isCancelOrder 是否取消订单 为true取消订单 （从确认选座是进来时返回需要取消订单）
       */
      // if (
      //   orderDetail.order_id &&
      //   params && params.isCancelOrder && !isNotCancelOrder
      // ) {
      //   //取消订单
      //   cancle_order({ order_id: orderDetail.order_id });
      // }
      clearInterval(timerSetInterVal);
      
    }
  },[navigation]);

  async function getOrderDetail() {
    // let { history, location, match } = this.props;
    let { params } = route;
    try {
      let result:any = await get_buy_ticket_detail({
        order_id: params && params.order_id,
      });
      console.log('result===>',result);
      setIsSkeleton(false)
      setOrderDetail(result);

      set_expire_time(result.expireTime)

      onSetInterval(result.expireTime);

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
          setIsNotCancelOrder(true)
          navigation.goBack()
        } }
      ]
    );
    
  }
  function onSetInterval(time:number) {
    let timer = setTimeout(() => {
      if (time <= 0) {
        onDialog();
        clearInterval(timer);
      } else {
        time -= 1;
        onSetInterval(time);
        set_expire_time(time);
      }
    }, 1000);
    setTimerSetInterVal(timer)
  }
  function handleMinute() {
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

  function arrLabel(){
    if(!orderDetail) return;
    let arr_label = [
      <Txt key={"abc"}>
        {orderDetail.hall_name}
      </Txt>,
    ];
    if (orderDetail.select_seats) {
      orderDetail.select_seats.map((item:any, index:number) => {
        if (orderDetail.is_section == 1) {
          arr_label.push(
            <Txt style={{color:'#e9ea95'}} key={index + "s"}>
              {index == 0 ? "" :" | "} {item.section_name}
            </Txt>
          );
          item.seatList.map((it:any, idx:number) => {
            arr_label.push(
              <Txt key={idx + "se" + index}>
                {it.row_id}排{it.column_id}座
              </Txt>
            );
          });
        } else {
          arr_label.push(
            <Txt key={index + "se"}>
              {item.row_id}排{item.column_id}座
            </Txt>
          );
        }
      });
    }
    return arr_label;
  }

  

  return <View style={{
      ...styles.container
    }}>
    <Viw 
    style={{
      position:'absolute',
      right:0,
      top:50,
      zIndex:100,
      backgroundColor:colorScheme=='dark'?'#000':'#ccc',
      paddingHorizontal:8,
      paddingVertical:3,
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
    }}>
      <Txt 
      style={{
        color:colorScheme=='dark'?'#fff':'#fff',
        // backgroundColor:colorScheme=='dark'?'#000':'#ccc',
        // paddingHorizontal:8,å
        // paddingVertical:3,
        // borderRadius:50
      }}>
        <Ionicons 
        name={'time-outline'}
        size={16} 
        color={colorScheme=='dark'?'#fff':'#fff'}
        style={{marginLeft:20}}/>
        {' '}
        <Txt style={{marginLeft:40,fontSize:16}}>
          {handleMinute()}
        </Txt>
      </Txt>
    </Viw>
    
    <Viw style={{
      ...styles.headBox,
      backgroundColor:colorScheme=='dark'?'#1a1b1c':Theme.primaryColor
    }}>
      {
        orderDetail && orderDetail.poster_img && <Image 
        resizeMode='cover'
        style={styles.headBoxImage}
        source={{uri:orderDetail.poster_img}}/>
      }
      <Viw style={styles.headBoxRight}>
        <Viw style={styles.headBoxRightFilmNameWrapper}>
          <Txt 
          numberOfLines={1}
          style={styles.filmName}>
            {orderDetail && orderDetail.film_name}
          </Txt>
          {
            orderDetail && <Txt style={styles.numPrice}>
            {orderDetail.ticket_count}张{" "}
            原价 ¥{orderDetail.origin_price}
          </Txt>
          }
        </Viw>
        {
          orderDetail && <Txt style={styles.timeLanguage}>
            {handerDate(orderDetail.start_runtime)}{' '}
            {dayjs(orderDetail.start_runtime).format("HH:mm")} {' '}
            {' (' + orderDetail.language + orderDetail.play_type_name + ')'}
          </Txt>
        }
        <Txt style={styles.cinemaName}>
          {orderDetail && orderDetail.cinema_name}
        </Txt>
        <Txt style={styles.cinemaName}>
          {arrLabel()}
        </Txt>
      </Viw>
    </Viw>

    <Viw style={styles.bottomContentBox}>
      <Viw style={{
        ...styles.bottomContentBoxTop,
        backgroundColor:colorScheme=='dark'?'#000':'#fff',
      }}></Viw>
      {/* <CustomListRow 
      accessory="none"
      topSeparator='full'
      bottomSeparator="indent" 
      title={'抵用券'} 
      detail={'无可用'} /> */}
      {
        orderDetail && <CustomListRow 
        accessory="none"
        bottomSeparator="full" 
        title={''} 
        detail={"票价小计 ¥" + orderDetail.price} />
      }

      <View style={{
        ...styles.bottomBox,
        borderTopColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4'
      }}>
        {
          orderDetail && <Text style={styles.bottomBoxLeft}>
            ¥{orderDetail.price}
          </Text>
        }
        <Viw style={styles.bottomBoxRight}>
          <Text 
          style={styles.detailText} 
          onPress={()=>{
            let ol = Overlay.show(overlay_view(orderDetail,colorScheme,()=>{
              Overlay.hide(ol);
            }));
          }}>
            明细
            <Ionicons 
            name={'chevron-down-outline'}
            size={14} 
            color={colorScheme=='dark'?'#fff':'#000'}
            style={{marginLeft:20}}/>
          </Text>
          
          <Button
          title={'确认支付'}
          type="primary"
          size="md"
          style={{}}
          disabled={false}
          onPress={() => {
            setIsNotCancelOrder(true);
            onGoToPay();
          }}
        />
        </Viw>
      </View>
    </Viw>

  </View>;

  function handerDate(date:any) {
    let today = dayjs().format("YYYY-MM-DD");
    let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
    let houtian = dayjs().add(2, "day").format("YYYY-MM-DD");
    let cur_y = dayjs(date).format("YYYY");
    let y = dayjs().format("YYYY");
    switch (dayjs(date).format("YYYY-MM-DD")) {
      case today:
        return "今天" + dayjs(date).format("M月D日");
      case tomorrow:
        return "明天" + dayjs(date).format("M月D日");
      case houtian:
        return "后天" + dayjs(date).format("M月D日");
      default:
        return (
          handleWeek(dayjs(date).day()) +
          dayjs(date).format(cur_y == y ? "M月D日" : "YY年M月D日")
        );
    }
  }

  function handleWeek(day:any) {
    switch (day) {
      case 0:
        return "周日";
      case 1:
        return "周一";
      case 2:
        return "周二";
      case 3:
        return "周三";
      case 4:
        return "周四";
      case 5:
        return "周五";
      case 6:
        return "周六";
      default:
        return "";
    }
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  headBox:{
    paddingHorizontal:12,
    paddingTop:12,
    paddingBottom:50,
    // backgroundColor:Theme.primaryColor,
    flexDirection:'row',
  },
  headBoxImage:{
    width:72,
    height:100,
    marginRight:10
  },
  headBoxRight:{
    flex:1
  },
  headBoxRightFilmNameWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  filmName:{
    color:'#fff',
    fontSize:20,
    flex:1
  },
  numPrice:{
    fontSize:12,
    width:100,
    color:'#fff',
    textAlign:'right'
  },
  timeLanguage:{
    // fontSize:14,
    color:'#fff',
  },
  cinemaName:{
    color:'#fff',
  },

  bottomContentBox:{
    flex:1,
    position:'relative'
  },
  bottomContentBoxTop:{
    position:'absolute',
    left:0,
    right:0,
    top:-20,
    height:20,
    // transform:[{translateY: -30}],
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  bottomBox:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderTopWidth:1
  },
  bottomBoxLeft:{
    color:Theme.primaryColor,
    fontWeight:'bold'
  },
  bottomBoxRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailText:{
    display:'flex',
    justifyContent:'center',
    marginRight:10
  }
  
});

export default inject("app")(observer(BuyTicket));
