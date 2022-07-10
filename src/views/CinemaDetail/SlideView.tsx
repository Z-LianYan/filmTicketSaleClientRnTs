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

// var ScreenHeight = Dimensions.get('window').height;
var ScreenWidth = Dimensions.get('window').width;
type TypeProps = {
   
}
const SlideView = ({
  active_index=0,
  list=[],
  onChange
}:any,ref:any) => {
  const colorScheme = useColorScheme();
  const [activeIndex,setActiveIndex] = useState<number>(0);
  const scrollViewRef:{current:any} = useRef();
  
  useEffect(()=>{
    setActiveIndex(active_index)
  },[active_index])

  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    
  }));
  function _handleScrollTo(event:any){
    const x = event.nativeEvent.contentOffset.x;
    const len = Math.floor(x/100);
    if((x%100)===0 || len<0){
      let ln = len>0?(len-1):0;
      if(activeIndex!=ln){
        onChange && onChange(ln);
      } 
      setActiveIndex(ln);
      scrollViewRef.current.scrollTo({ x: ln*100 + 45, y: 0, animated: true });
    }else{
      let ln = len==list.length?(len-1):len;
      if(activeIndex!=ln) {
        onChange && onChange(ln);
      }
      setActiveIndex(ln);
      scrollViewRef.current.scrollTo({ x: (ln)*100 + 45, y: 0, animated: true });
    }
  }

  const handleScrollTo = useCallback(_.debounce((event:any)=>{
    _handleScrollTo(event);
  }, 50, { leading: false, trailing: true }),[activeIndex,list])//这 list 必须要设置不然 父组件上 滑动第一个时 onChange 打印 filmList为空数组

  
  return <View style={{paddingHorizontal:0,backgroundColor:'#606266',paddingBottom:10,position:'relative',height:170}}>
      <ScrollView
      horizontal={true}
      ref={scrollViewRef}
      onScrollEndDrag={(event)=>{
        Platform.OS=='ios' && _handleScrollTo(event)
      }}
      style={{paddingHorizontal:0,height:170}}
      contentContainerStyle={{alignItems:'flex-end'}}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[]}
      scrollEnabled={true}
      onContentSizeChange={(contentWidth, contentHeight)=>{
        scrollViewRef.current.scrollTo({ x: (100 * (list.length>(activeIndex+1)?activeIndex:(list.length-1))) + 45, y: 0, animated: true });
      }}
      onMomentumScrollEnd={(event:any)=>{
        event.persist()
        if(Platform.OS!='ios') handleScrollTo(event);
      }}>
        <Viw style={{width:ScreenWidth/2,height:170}}></Viw>
        {
          list && list.map((item:any,index:number)=>{
            return <TouchableOpacity 
            key={index+'filmList'}
            activeOpacity={0.9}
            onPress={()=>{
              scrollViewRef.current.scrollTo({ 
                x: index*100+45, 
                y: 0,
                animated: true 
              });
              setActiveIndex(index);
              if(activeIndex!=index) {
                onChange && onChange(index);
              }
              
            }}
            style={{
              width:90,
              height:index==activeIndex?150:130,
              marginRight:((index+1)==list.length)?0:10,
              borderWidth:index==activeIndex?1:0,
              borderColor:index==activeIndex?'#fff':'transparent'
            }}>
              <Image 
              resizeMode='cover' 
              style={{
                width:'100%',
                height:'100%',
              }}
              source={{uri: item.poster_img }}/>
            </TouchableOpacity>
            
          })
        }
        <Viw style={{width:ScreenWidth/2,height:170}}></Viw>
      </ScrollView>
      <Viw style={{
        position:'absolute',
        left:ScreenWidth/2-10,
        borderWidth:10,
        borderColor:'transparent',
        borderBottomColor:colorScheme=='dark'?'#000':'#fff',
        bottom:-1
      }}></Viw>
    </View>;
  };
 
 const styles = StyleSheet.create({
  
 });
 
 export default forwardRef(SlideView);
 