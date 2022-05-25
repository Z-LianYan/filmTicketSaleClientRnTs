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
  hotBoxStyle:object
}
const Hot = ({
  // opacity,
  hotBoxStyle
}:propsType,ref:any)=>{
  let navigation:any = useNavigation();
  let [fetchOptionsHot,setFetchOptionsHot] = useState({
    page: 1,
    limit: 4,
    city_id: "440100",
  })
  let [list,setList] = useState([])
  let [isLoading,setLoading] = useState(false);
  let [isFinallyPage,setFinallyPage] = useState(false);
  useEffect(()=>{
    getList()
  },[])
  async function getList(onRefreshing?:()=>void){
    setLoading(true);
    let result = await get_film_hot(fetchOptionsHot);
    let _list = [];
    if(fetchOptionsHot.page==1){
      _list = result.rows;
      onRefreshing && onRefreshing()
    }else{
      _list = list.concat(result.rows);
    }
    setList(_list);
    if(_list.length>=result.count){
      setFinallyPage(true);
    }
    setLoading(false);
    _list = [];
  }

  const onLoadMore = ()=>{
    if(isLoading) return;
    if(isFinallyPage) return;
    // setLoading(true);
    fetchOptionsHot.page += 1;
    setFetchOptionsHot(fetchOptionsHot);
    getList()
  }
  /**
   * 
   * @param onRefreshing  下拉刷新时，父组件传过来的 onRefreshing，用来关闭刷新状态
   * @returns void
   */
  const onRefresh = (onRefreshing:()=>void)=>{
    if(isLoading) return;
    setFinallyPage(false);
    fetchOptionsHot.page = 1;
    setFetchOptionsHot(fetchOptionsHot);
    getList(onRefreshing)
  }
  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    onLoadMore: onLoadMore,
    onRefresh: onRefresh
  }));
  
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
      
      <BottomLoading
      emptyText='12'
      isLoading={isLoading}
      isFinallyPage={isFinallyPage}
      hasContent={list.length?true:false}/>
      

  </View>
}

export default forwardRef(Hot)