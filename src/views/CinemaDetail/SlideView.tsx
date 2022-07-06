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

// var ScreenHeight = Dimensions.get('window').height;
var ScreenWidth = Dimensions.get('window').width;
type TypeProps = {
   
}
const SlideView = ({
  _activeIndex=0,
  list=[],
  onChange
}:any,ref:any) => {
  const colorScheme = useColorScheme();
  const [activeIndex,setActiveIndex] = useState<number>(0);

  const scrollViewRef:{current:any} = useRef();

  
  
  useEffect(()=>{
    setActiveIndex(_activeIndex)
  },[activeIndex])

 

  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    
  }));

  return <View style={{paddingHorizontal:0,backgroundColor:'#606266',paddingBottom:10,position:'relative',height:170}}>
      <ScrollView
      horizontal={true}
      ref={scrollViewRef}
      onScrollEndDrag={(event)=>{
        console.log('onScrollEndDrag===>',event.nativeEvent.contentOffset.x)
        const x = event.nativeEvent.contentOffset.x;
        // if(x>(activeIndex*100)){
        //   scrollViewRef.current.scrollTo({ x: (100 * (list.length>(activeIndex+1)?activeIndex:(list.length-1))) + 45, y: 0, animated: true });
        // }
      }}
      style={{paddingHorizontal:0,height:170}}
      contentContainerStyle={{alignItems:'flex-end'}}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[]}
      endFillColor='red'
      onScroll={(event)=>{
        console.log('onScroll',event.nativeEvent.contentOffset.x);
        
      }}
      onLayout={(event)=>{
        // console.log('onLayout-------->',event.nativeEvent.layout.x)
      }}
      onContentSizeChange={(contentWidth, contentHeight)=>{
        console.log('contentWidth, contentHeight-------->',contentWidth, contentHeight)
        scrollViewRef.current.scrollTo({ x: (100 * (list.length>(activeIndex+1)?activeIndex:(list.length-1))) + 45, y: 0, animated: true });
      }}>
        <Viw style={{width:ScreenWidth/2,height:170}}></Viw>
        {
          list && list.map((item:any,index:number)=>{
            return <TouchableOpacity 
            key={index+'filmList'}
            activeOpacity={0.9}
            onPress={()=>{
              // console.log('scrollViewRef===>',scrollViewRef);
              scrollViewRef.current.scrollTo({ x: index*100+45, y: 0, animated: true });
              setActiveIndex(index)
              onChange && onChange(index)
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
        bottom:0
      }}></Viw>
    </View>;
  };
 
 const styles = StyleSheet.create({
  
 });
 
 export default forwardRef(SlideView);
 