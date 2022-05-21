import React, { useState,useEffect,useImperativeHandle,forwardRef } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react'
 import {
   StyleSheet,
   Image,
   View,
   Text,
   TouchableOpacity,
   Dimensions
 } from 'react-native';

 import { 
  Carousel,
  Theme,
  Button
} from '../../component/teaset/index';
import FilmListItem from './FilmListItem';
import { get_film_soon_show } from '../../api/film';
import dayjs from 'dayjs';
type propsType = {

}
const SoonShow = ({}:propsType,ref:any)=>{
  let navigation:any = useNavigation();
  let [fetchOptionsHot,setFetchOptionsHot] = useState({
    page: 1,
    limit: 6,
    city_id: "440100",
  })
  let [list,setList] = useState([])
  
  useEffect(()=>{
    getList()
  },[])
  async function getList(){
    let result = await get_film_soon_show(fetchOptionsHot);
    console.log('即将上映----',result);
    setList(result.rows);
  }
  const onLoadMore = ()=>{
    console.log('onLoadMore----即将上映')
  }
  const onRefresh = ()=>{
    console.log('onRefresh----即将上映')
  }
  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    onLoadMore: onLoadMore,
    onRefresh: onRefresh
  }));
  
  function handleWeek(day:number) {
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
  function hendalDate(show_time:any) {
    let year = dayjs(show_time).format("YYYY");
    let cur_year = dayjs().format("YYYY");
    if (cur_year !== year) {
      return dayjs(show_time).format("YYYY年MM月DD");
    } else {
      return dayjs(show_time).format("MM月DD");
    }
  }
  return <View>
      {
        list.map((item:any,index:number)=>{
          return <FilmListItem
          key={item.id}
          title={item.film_name}
          playType={item.play_type_name}
          isShowScore={false}
          actors={item.actors.map((item:any) => item.name).join(",")}
          bottomText={
            "上映日期：" +
            handleWeek(dayjs(item.show_time).day()) +
            " " +
            hendalDate(item.show_time)
          }
          imgUrl={item.poster_img}
          separator={list.length === index + 1 ? false : true}
          btnColor="#ff8f1f"
          btnTxt={item.isPresale ? "预购" : ""}
          onPress={() => {
            // this.props.history.push({
            //   pathname: "/film/detail/" + item.id,
            // });
          }}
          onRightClick={() => {
            // props.history.push({
            //   pathname: `/film/cinema/${item.id}`,
            //   // state: {
            //   //   film_id: item.id,
            //   //   film_name: item.film_name,
            //   // },
            // });
          }}/>
        })
      }
  </View>
}

export default forwardRef(SoonShow);