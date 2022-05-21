import React, { useState,useEffect,forwardRef,useImperativeHandle } from 'react';
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
import { get_film_hot } from '../../api/film';
import dayjs from 'dayjs';
type propsType = {
  // onLoadMore?:()=> void,
  // onRefresh?:()=> void,
  
}
const Hot = ({}:propsType,ref:any)=>{
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
    let result = await get_film_hot(fetchOptionsHot);
    console.log('热更新----',result);
    setList(result.rows);
  }

  const onLoadMore = ()=>{
    console.log('onLoadMore----正在热映')
  }
  const onRefresh = ()=>{
    console.log('onRefresh----正在热映')
  }
  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    onLoadMore: onLoadMore,
    onRefresh: onRefresh
  }));
  
  return <View>
      {
        list.map((item:any,index:number)=>{
          return <FilmListItem
          title={item.film_name}
          playType={item.play_type_name}
          key={item.film_id}
          score={item.grade}
          isShowScore={true}
          actors={item.actors.map((it:any) => it.name).join(",")}
          bottomText={item.area + " | " + item.runtime + "分钟"}
          imgUrl={item.poster_img}
          separator={list.length === index + 1 ? false : true}
          onPress={() => {
            // navigation.navigate({
            //   path: "/film/detail/" + item.film_id,
            // });
          }}
          onRightClick={() => {
            // this.props.history.push({
            //   pathname: `/film/cinema/${item.film_id}`,
            // });

            // navigation.navigate({
            //   path: "/film/cinema/" + item.film_id,
            // });
          }}/>
        })
      }
  </View>
}

export default forwardRef(Hot)