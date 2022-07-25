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
  PanResponder
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
  Overlay
} from '../../component/teaset/index';




// import NavigationBar from '../../component/NavigationBar';
// import BottomLoading from '../../component/BottomLoading';
import BottomWrapper from './BottomWrapper';
import SectionPriceWrapper from './SectionPriceWrapper';
import SeatListContainer from './SeatListContainer';
import dayjs from 'dayjs';


import { get_schedule_info, get_seat } from "../../api/selectSeat";
import { any } from 'prop-types';

// import { 
//   SEAT_ALREADY_SALE,
//   SEAT_DISABLE,
//   SEAT_NO_SELECTED,
//   SEAT_SCREEN,
//   SEAT_SECTION_A,
//   SEAT_SECTION_B,
//   SEAT_SECTION_C,
//   SEAT_SECTION_D,
//   SEAT_SECTION_E,
//   SEAT_SELECTED
// } from "../../assets/image/index";

const SelectSeat = ({app,navigation,route}:any) => {
  // const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  const [scheduleInfo, setScheduleInfo] = useState<any>(null);
  const [scheduleList, setScheduleList] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [hallDetail, setHallDetail] = useState<any>(null);
  const [seatList, setSeatList] = useState<any[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<any[]>([
    {
      row_id:1,
      column_id:1,
      is_section:0
    }
  ]);
  const [seat_real_rows, set_seat_real_rows] = useState<any[]>([]);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  
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

   

   
    <Viw style={{flexDirection:'row',justifyContent:'center'}}>
      <Text style={{transform:[{translateX:translateX}]}}>屏幕</Text>
    </Viw>
    <Viw style={{flex:1,position:'relative'}}>
      <Viw style={{
        position:'absolute',
        left:0,
        zIndex:10,
        transform:[{translateY:translateY},
          // {scale:scale}
        ],
        borderWidth:1,borderColor:'yellow',

      }}>
        <Text style={{height:20,borderWidth:1,borderColor:'red'}}>123</Text>
        <Text style={{height:20,borderWidth:1,borderColor:'red'}}>123</Text>
        <Text style={{height:20,borderWidth:1,borderColor:'red'}}>123</Text>
      </Viw>
      <SeatListContainer
        style={{
          // backgroundColor:colorScheme=='dark'?'#000':'#eee',
          // flex: 1, 
          // alignItems: 'center', 
          // justifyContent: 'center',
          // position:'relative'
        }}
        minScale={0.5}
        maxScale={1}
        onTransforming={(translateX:number, translateY:number, scale:number)=>{
          console.log('onTransforming==>',translateX, translateY, scale);
          setTranslateX(translateX);
          setTranslateY(translateY);
          setScale(scale);
        }}
        onDidTransform={(translateX:number, translateY:number, scale:number)=>{
          console.log('onDidTransform==>',translateX, translateY, scale);
          setTranslateX(translateX);
          setTranslateY(translateY);
          setScale(scale);
        }}
      >
        <Viw 
        style={{
          // position:'absolute',
          // left:0,
          // top:0,
          width: 475, 
          height: 300,
          // backgroundColor:'#ccc',
          borderWidth:1,
          borderColor:'blue'
        }}></Viw>
      </SeatListContainer>
      
    </Viw>
    
    

    

    {/* {
      pan_responder?<View 
      style={{
        width: 475, 
        height: 300,
        backgroundColor:'#ccc',
        borderWidth:1,
        borderColor:'blue'
      }}
      {...pan_responder.panHandlers}>

      </View>:null
    } */}



    <BottomWrapper 
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

  
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});

export default inject("app")(observer(SelectSeat));
