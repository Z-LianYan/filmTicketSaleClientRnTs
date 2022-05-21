import React, { useState,useEffect } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react'
 import {
   StyleSheet,
   Image,
   View,
   Text
 } from 'react-native';

 import { 
  Carousel,
  Theme
} from '../../component/teaset/index';
import { get_film_hot,get_banner } from '../../api/film';

type propType = {
}
 const SwiperCom = (props?:propType)=>{
  let navigation:any = useNavigation();
  let [banner_list,set_banner_list] = useState([])
  useEffect(() => {
      getBannerList()
    return ()=>{
    }
  },[])
  async function getBannerList(){
    let result = await get_banner();
    set_banner_list(result.rows);
  }
  
  return <Carousel 
    style={{height: 238}} 
    key={banner_list.length}
    control={<Carousel.Control
    style={{alignItems: 'flex-end'}}
    dot={<View style={styles.dot}></View>}
    activeDot={<View style={styles.activeDot}></View>}
    />}>
      {
        banner_list.map((item:{poster_img:any,id:number})=>{
          return <Image 
          style={{width: "100%", height: 238}} 
          resizeMode='cover' 
          key={item.id}
          source={{uri: item.poster_img }} />
        })
      }
  </Carousel>
 }
 export default inject('app')(observer(SwiperCom));

 const styles = StyleSheet.create({
  dot:{
    width:10,
    height:10,
    borderRadius:5,
    borderColor:'#fff',
    borderWidth:1,
    marginRight:5,
    marginBottom:5
  },
  activeDot:{
    width:10,
    height:10,
    borderRadius:5,
    backgroundColor:Theme.primaryColor,
    marginRight:5
  }
 });
 

 