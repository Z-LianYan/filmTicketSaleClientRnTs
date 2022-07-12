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
  Image
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
  TransformView,
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import BottomLoading from '../../component/BottomLoading';
import DropdownMenu from '../../component/DropdownMenu';
import dayjs from 'dayjs';

import { get_schedule_info, get_seat } from "../../api/selectSeat";



const SelectSeat = ({app,navigation,route}:any) => {
  // const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  const [scheduleInfo, setScheduleInfo] = useState(null);
  const [scheduleList, setScheduleList] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [hallDetail, setHallDetail] = useState<any>(null);
  const [seatList, setSeatList] = useState<any[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<any[]>([]);
  const [seat_real_rows, set_seat_real_rows] = useState<any[]>([]);
  
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
  
  return <ScrollView
    stickyHeaderIndices={[]}>
      <TransformView
        style={{
          backgroundColor: '#fff', 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center',
          position:'relative'
        }}
        minScale={0.5}
        maxScale={2}
      >
        <View style={{position:'absolute',height:20,width:20,backgroundColor:'#ccc'}}>

        </View>
        <Image 
        style={{width: 375, height: 300}} 
        resizeMode='cover' 
        source={{uri:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'}} />
      </TransformView>
      <Text>SelectSeat</Text>
    </ScrollView>;
};

const styles = StyleSheet.create({
});

export default inject("app")(observer(SelectSeat));
