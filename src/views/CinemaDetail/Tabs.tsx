import React, { useState,useEffect, useRef,useCallback,useImperativeHandle,forwardRef } from 'react';
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
   View as Viw,
   Text as Txt,
   Dimensions,
   Modal,
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
   NavigationBar,
   Theme,
   Label,
   Overlay,
   Input,
   Toast
} from '../../component/teaset/index';

import * as _ from 'lodash'
import { any } from 'prop-types';
import dayjs from "dayjs";

const ScreenWidth = Dimensions.get('window').width;
type TypeProps = {
   
}
const SlideView = ({
  active_index=0,
  list=[],
  onChange
}:any,ref:any) => {
  const colorScheme = useColorScheme();
  const [activeIndex,setActiveIndex] = useState<number>(0);
  const [obj,setObj] = useState<any>({});
  const scrollViewRef:{current:any} = useRef();
  const [scrollW,setScrollW] = useState(0);
  const [timeout,set_timeout] = useState<any>(null);
  const [onContentSizeChange,setOnContentSizeChange] = useState(false);

  

  useEffect(()=>{
    setActiveIndex(active_index);
  },[active_index,obj])

  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    
  }));
  

  return <ScrollView
    horizontal={true}
    ref={scrollViewRef}
    onScrollEndDrag={(event)=>{
      // Platform.OS=='ios' && 
    }}
    style={{
      ...styles.scrollViewContainer,
      borderTopColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
      borderBottomColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
    }}
    // contentContainerStyle={{alignItems:'flex-end'}}
    showsHorizontalScrollIndicator={false}
    stickyHeaderIndices={[]}
    scrollEnabled={true}
    onContentSizeChange={(contentWidth, contentHeight)=>{
    }}
    onMomentumScrollEnd={(event:any)=>{
      
    }}>
      
      {
        list && list.map((date:any,index:number)=>{
          return <TouchableOpacity
          activeOpacity={0.9}
          key={index+'tabdate'}
          style={{
            ...styles.tabItem
          }}
          onLayout={(event:any)=>{
            clearTimeout(timeout);
            const { x, y, width, height } = event.nativeEvent.layout;
            obj[index] = {
              x, 
              y, 
              width, 
              height
            }
            setObj({
              ...obj
            });
            setScrollW(scrollW+width);

            let _timeout = setTimeout(() => {
              setIndex(activeIndex,false);
            }, 500);
            set_timeout(_timeout);
          }}
          onPress={()=>{
            if(activeIndex!=index) {
              setIndex(index);
            };
            
          }}>
            <Txt
            style={{
              ...styles.tabItemText,
              fontWeight:activeIndex==index?'bold':"normal",
              color:activeIndex==index?Theme.primaryColor:'#666'
            }}
            >
              {handerDate(date)}
            </Txt>
            {
              activeIndex==index && <View style={styles.bottomLine}></View>
            }
          </TouchableOpacity>
        })
      }
    </ScrollView>

    function setIndex(index:number,flag:boolean=true) {
      //先改变点击项的颜色
      // this.setState({ index })
      //兼容错误
      if (!scrollViewRef) return;
      //拿到当前项的位置数据
      let layout = obj[index];
      if(!layout) return;
      let rx = ScreenWidth / 2;
      //公式
      let sx = layout.x - rx + layout.width / 2;
      //如果还不需要移动,原地待着
      if (sx < 0) sx = 0;
      //移动位置
      sx < scrollW - ScreenWidth && scrollViewRef && scrollViewRef.current && scrollViewRef.current.scrollTo({ x: sx, animated: true });
      //结尾部分直接移动到底
      sx >= scrollW - ScreenWidth && scrollViewRef && scrollViewRef.current && scrollViewRef.current.scrollToEnd({ animated: true });
      //触发一些需要的外部事件
      if(flag) onChange && onChange(index);
      // this.props.onChange && this.props.onChange(index);
    }


    function handerDate(date:string) {
      let cur_y = dayjs(date).format("YYYY");
      let y = dayjs().format("YYYY");
      return (
        handleWeek(dayjs(date).day()) +
        dayjs(date).format(cur_y == y ? "MM月DD日" : "YY年MM月DD日")
      );
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
  scrollViewContainer:{
    paddingHorizontal:0,
    borderTopWidth:1,
    borderBottomWidth:1,
    // paddingVertical:10,
    // paddingRight:10,
    // paddingLeft:10,
    // position:'relative'
  },
  tabItem:{
    // padding:10,
    height:48,
    // lineHeight:48,
    paddingHorizontal:10,
    justifyContent:'center',
    position:'relative',
    alignItems:'center'
  },
  tabItemText:{

  },
  bottomLine:{
    width:'100%',
    position:'absolute',
    height:3,
    backgroundColor:Theme.primaryColor,
    bottom:-1,
    zIndex:10,
    borderRadius:2
  }
 });
 
 export default forwardRef(SlideView);
 