import React, { useState,useEffect,forwardRef,useImperativeHandle } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react'
 import {
   StyleSheet,
   Image,
   View,
   Text,
   TouchableOpacity,
   ActivityIndicator,
   Dimensions
 } from 'react-native';

 import { 
  Carousel,
  Theme,
  Button
} from '../../component/teaset/index';
import FilmListItem from './FilmListItem';
import { get_film_hot } from '../../api/film';
import dayjs from 'dayjs';
import BottomLoading from '../../component/BottomLoading';
var ScreenWidth = Dimensions.get('window').width;
type propsType = {
  hotBoxStyle:object,
  list:any[],
  fetchOptionsHot:any,
  isLoading:boolean,
  isFinallyPage:boolean,
}
const Hot = ({
  // opacity,
  hotBoxStyle,
  list=[],
  fetchOptionsHot={},
  isLoading = false,
  isFinallyPage = false,
}:propsType,ref:any)=>{
  let navigation:any = useNavigation();
  // let [fetchOptionsHot,setFetchOptionsHot] = useState({
  //   page: 1,
  //   limit: 4,
  //   city_id: "440100",
  // })
  // let [list,setList] = useState([])
  // let [isLoading,setLoading] = useState(false);
  // let [isFinallyPage,setFinallyPage] = useState(false);
  useEffect(()=>{
    // getList()
  },[])
 
  
  return <View 
      style={{
        ...hotBoxStyle
      }}>
      {
        list.map((item:any,index:number)=>{
          return <FilmListItem
          title={item.film_name}
          playType={item.play_type_name}
          key={item.film_id+Math.random()}
          score={item.grade}
          isShowScore={true}
          actors={item.actors.map((it:any) => it.name).join(",")}
          bottomText={item.area + " | " + item.runtime + "分钟"}
          imgUrl={item.poster_img}
          separator={list.length === index + 1 ? false : true}
          onPress={() => {
            navigation.navigate('FilmDetail',{film_id:item.film_id});
          }}
          onRightClick={() => {
            navigation.navigate({
              name: "CinemaPageStack",
              params:{
                film_id: item.film_id,
                film_name: item.film_name
              }
            });
          }}/>
        })
      }
      
      <BottomLoading
      isLoading={isLoading}
      isFinallyPage={isFinallyPage}
      hasContent={list.length?true:false}/>
      

  </View>
}

export default forwardRef(Hot)