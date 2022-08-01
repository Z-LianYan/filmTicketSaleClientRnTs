import React,{useState,useEffect,useRef,useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  View as Viw,
  Text as Txt,
  TouchableOpacity,
  Image,
  PanResponder,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { observer, inject } from 'mobx-react'

import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  Button,
  Carousel,
  Theme,
  Label,
  Drawer,
  ActionSheet,
  // TransformView,
  Overlay,
  Toast
} from '../../component/teaset/index';




// import NavigationBar from '../../component/NavigationBar';
// import BottomLoading from '../../component/BottomLoading';
import BottomWrapper from './BottomWrapper';
import SectionPriceWrapper from './SectionPriceWrapper';
import SeatListContainer from './SeatListContainer';
import dayjs from 'dayjs';


import { get_schedule_info, get_seat } from "../../api/selectSeat";
import { any } from 'prop-types';
import { Center, Right } from '../../component/teaset/react-native-legacy-components/src/NavigatorBreadcrumbNavigationBarStyles.android';

import { 
  SEAT_ALREADY_SALE,
  SEAT_DISABLE,
  SEAT_NO_SELECTED,
  SEAT_SCREEN,
  SEAT_SECTION_A,
  SEAT_SECTION_B,
  SEAT_SECTION_C,
  SEAT_SECTION_D,
  SEAT_SECTION_E,
  SEAT_SELECTED
} from "../../assets/image/index";

const SelectSeat = ({app,navigation,route}:any) => {
  // const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  const [scheduleInfo, setScheduleInfo] = useState<any>(null);
  const [scheduleList, setScheduleList] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [hallDetail, setHallDetail] = useState<any>(null);
  const [seatList, setSeatList] = useState<any[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<any[]>([]);
  const [seat_real_rows, set_seat_real_rows] = useState<any[]>([]);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [seatWidth, setSeatWidth] = useState<number>(30);
  const [seatHeight, setSeatHeight] = useState<number>(30);
  const [topSpace, setTopSpace] = useState<number>(50);
  const bottomWrapperRef:{current:any} = useRef();
  
  
  useEffect(()=>{
    getCinemaDetail();
    
  },[]);

  
  
  
  const setNavigation = useCallback((cinema_name?:any)=>{
    navigation.setOptions({
      headerTitle:cinema_name,
      // headerLeft:'',
      headerTransparent: false,
      headerStyle: { 
        backgroundColor: colorScheme=='dark'?'#000':Theme.primaryColor
      },
    });
  },[]);

  const getCinemaDetail = useCallback(async ()=>{
    try {
      let result:any = await get_schedule_info({
        schedule_id: route.params && route.params.schedule_id,
      });
      console.log(':any====>',result);

      setScheduleInfo(result);
      setNavigation(result.cinema_name)
      setScheduleList(result.schedule);

      result.schedule.map((item:any, index:number) => {
        if (item.id == route.params.schedule_id) {
          setSelectedSchedule(item);
          getSeatList(item.id,item.hall_id);
        }
      });
      
    } catch (err:any) {
      if (err.error == 401) {
        app.setUserInfo(null); //如果token认证过期 清空当前缓存的登录信息
        navigation.navigate({
          name: "LoginPage"
        });
      }
    }
  },[]);

  const getSeatList = useCallback(async (schedule_id,hall_id)=>{
    let result:any = await get_seat({
      hall_id,
      schedule_id
    });
    let seat = result.seat;
    setHallDetail(result);
    setSeatList(seat);

    //重置左侧行数以及顶部的屏幕位置
    setTranslateX(0);
    setTranslateY(0);
    setScale(1);

    setSelectedSeat([]);

    let seat_real_rows = [];
    let obj = {};
    for (let item of seat) {
      if (!obj[item.row_id]) {
        obj[item.row_id] = true;
        seat_real_rows.push({
          row: item.row, //生成座位时的排数
          row_id: item.row_id, //真实座位排数
        });
      }
    }
    set_seat_real_rows(seat_real_rows);
  },[])
  
  return <View style={{
    ...styles.container,
    backgroundColor:colorScheme=='dark'?'#000':'#eee'
  }}>

    <SectionPriceWrapper selectedSchedule={selectedSchedule}/>
    
    <Viw style={{flex:1,position:'relative'}}>
      <Viw style={{flexDirection:'row',justifyContent:'center'}}>
        <Viw 
          style={{
            transform:[{translateX:translateX}],
            alignItems:'center'
          }}>
          <Image 
          resizeMode='contain' 
          style={{
            width:150,
            height:15
          }} 
          source={SEAT_SCREEN} />
          <Txt style={{color:'#666'}}>
            {selectedSchedule && (selectedSchedule.hall_name + "/" + selectedSchedule.hall_type_name)}
          </Txt>
        </Viw>
      </Viw>

      <Viw 
      style={{
        position:'absolute',
        left:5,
        transform:[{translateY:translateY},{scale:scale}],
        // borderWidth:1,
        // borderColor:'yellow',
        // backgroundColor:'#ccc',
        height: hallDetail?hallDetail.seat_row_num * (seatHeight+10)-10:0,
        width:20,
        borderRadius:5,
        top:topSpace,
        // top:topSpace*scale,
        alignItems:'center'
        // opacity:0.5
      }}>
          <Viw style={{
            position:'absolute',
            left:0,
            right:0,
            bottom:0,
            top:0,
            backgroundColor:'#ccc',
            opacity:0.5,
            borderRadius:5
          }}></Viw>
        {
          seat_real_rows.map(item=>{
            return <Text 
            key={item.row_id+'seatrow'}
            style={{
              height:30,
              lineHeight:30,
              // width:15,
              textAlign:'center',
              position:'absolute',
              // borderColor:'yellow',
              // backgroundColor:'yellow', 
              top:(item.row-1) * (seatHeight+10),
              color:'#fff'
            }}>
              {item.row_id}
            </Text>
          })
        }
        
      </Viw>
      
      <SeatListContainer
        key={selectedSchedule && selectedSchedule.id}
        style={{
          width:'100%',
          height:'100%',//需要给容器设置宽高，否则会有问题
          // zIndex:100000000
        }}
        minScale={0.5}
        maxScale={1.5}
        onTransforming={(translateX:number, translateY:number, scale:number)=>{
          setTranslateX(translateX);
          setTranslateY(translateY);
          setScale(scale);
        }}
        onDidTransform={(translateX:number, translateY:number, scale:number)=>{
          setTranslateX(translateX);
          setTranslateY(translateY);
          setScale(scale);
        }}
      >
        <Viw style={{height:topSpace}}></Viw>
        <Viw 
        style={{
          width: hallDetail?(hallDetail.seat_column_num+2) * (seatWidth+10)-10:0,
          height: hallDetail?hallDetail.seat_row_num * (seatHeight+10)-10:0,
          position:'relative',
          // zIndex:100000000
        }}>
          {
          seatList.map((item, index) => {
            return <TouchableOpacity
            key={index+'seat12345'}
            // activeOpacity={0.5}
            style={{
              width:seatWidth,
              height:seatHeight,
              position:'absolute',
              top:(item.row-1) * (seatHeight+10),
              left:(item.column) * (seatWidth+10)
            }}
            onPressOut={()=>{
              console.log('真的flag====》');

              setTimeout(()=>{},800)
              //disabled 0可选 1不可选 2无座
              if (
                item.disabled !== 0 ||
                hallDetail.already_sale_seat.includes(item.id)
              ) return;
              console.log('真的flag====》1')
              let seats = selectedSeat.map((im) => im.id);
              if (
                selectedSeat.length >= selectedSchedule.buy_max &&
                selectedSchedule.buy_max &&
                !seats.includes(item.id)
              ) {
                return Toast.message(`1次最多购买${selectedSchedule.buy_max}张`);
              }
              console.log('真的flag====》2')
              let flag = true;
              // this.setState({
              //   isShowScheduleList: false,
              // });
              bottomWrapperRef.current.setShowScheduleList(false)
              for (let i = 0; i < selectedSeat.length; i++) {
                if (selectedSeat[i].id === item.id) {
                  selectedSeat.splice(i, 1);
                  setSelectedSeat([
                    ...selectedSeat
                  ])
                  flag = false;
                }
              }
              if (flag) {
                console.log('真的flag')
                selectedSeat.push(item);
                // this.setState({
                //   selectedSeat: selectedSeat,
                // });
                setSelectedSeat([
                  ...selectedSeat
                ])
              }
            }}>
              <Image 
              resizeMode='cover' 
              style={{
                width:'100%',
                height:'100%',
                // position:'absolute',
                // zIndex:10000000
              }}
              source={
                hallDetail &&  hallDetail.already_sale_seat.includes(item.id)
                  ? SEAT_ALREADY_SALE
                  : item.disabled == 0
                  ? handleSelectedSeat(item)
                    ? SEAT_SELECTED
                    : selectedSchedule.is_section == 1
                    ? item.section_id == "a"
                      ? SEAT_SECTION_A
                      : item.section_id == "b"
                      ? SEAT_SECTION_B
                      : item.section_id == "c"
                      ? SEAT_SECTION_C
                      : item.section_id == "d"
                      ? SEAT_SECTION_D
                      : SEAT_NO_SELECTED
                    : SEAT_NO_SELECTED
                  : item.disabled == 1
                  ? SEAT_DISABLE
                  : null
              } 
              />
            </TouchableOpacity>
          })}
          <Viw style={{
            position:'absolute',
            top:0,
            bottom:0,
            left:'50%',
            borderLeftColor:'#ccc',
            borderLeftWidth:0.5,
            borderStyle:Platform.OS === 'ios'?'solid':'dashed'
          }}></Viw>
        </Viw>
        <Viw style={{height:topSpace}}></Viw>
      </SeatListContainer>
      
    </Viw>

    <BottomWrapper 
    ref={bottomWrapperRef}
    app={app}
    navigation={navigation}
    route={route}
    scheduleInfo={scheduleInfo}
    scheduleList={scheduleList}
    selectedSchedule={selectedSchedule}
    setSelectedSchedule={setSelectedSchedule}
    getSeatList={getSeatList}
    selectedSeat = {selectedSeat}
    setSelectedSeat = {(selected_seat:any)=>{
      setSelectedSeat([
        ...selected_seat
      ])
    }}
    />
    
  </View>;

  function handleSelectedSeat(item:any){
    let flag = false;
    for (let i = 0; i < selectedSeat.length; i++) {
      if (selectedSeat[i].id === item.id) {
        flag = true;
      }
    }
    return flag;
  }
};


const styles = StyleSheet.create({
  container:{
    flex:1
  },
});

export default inject("app")(observer(SelectSeat));
