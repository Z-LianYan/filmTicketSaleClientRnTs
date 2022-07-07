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
  const [scrollDisabel,setScrollDisabel] = useState<boolean>(false);
  const [timer,setTimer] = useState<any>('');

  const scrollViewRef:{current:any} = useRef();
  
  
  
  useEffect(()=>{
    setActiveIndex(_activeIndex)
  },[])

 

  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    
  }));

  const handleScrollTo = useCallback((event:any)=>{

    if(scrollDisabel) return;
    const x = event.nativeEvent.contentOffset.x;
    const len = Math.floor(x/100);
    
    if((x%100)===0){
      let ln = len?(len-1):0
      setActiveIndex(ln)
      scrollViewRef.current.scrollTo({ x: ln*100 + 45, y: 0, animated: true });
    }else{
      setActiveIndex(len);
      scrollViewRef.current.scrollTo({ x: (len)*100 + 45, y: 0, animated: true });
    }
    setScrollDisabel(false)
  },[])

  return <View style={{paddingHorizontal:0,backgroundColor:'#606266',paddingBottom:10,position:'relative',height:170}}>
      <ScrollView
      horizontal={true}
      ref={scrollViewRef}
      onScrollEndDrag={(event)=>{
        console.log('onScrollEndDrag')
        // handleScrollTo(event)
      }}
      style={{paddingHorizontal:0,height:170}}
      contentContainerStyle={{alignItems:'flex-end'}}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[]}
      // endFillColor='red'
      // onScroll={(event)=>{
      // }}
      onLayout={(event)=>{
      }}
      onContentSizeChange={(contentWidth, contentHeight)=>{
        scrollViewRef.current.scrollTo({ x: (100 * (list.length>(activeIndex+1)?activeIndex:(list.length-1))) + 45, y: 0, animated: true });
      }}
      onMomentumScrollEnd={(event:any)=>{
        console.log('7777==>onMomentumScrollEnd')
        handleScrollTo(event)

      }}>
        <Viw style={{width:ScreenWidth/2,height:170}}></Viw>
        {
          list && list.map((item:any,index:number)=>{
            return <TouchableOpacity 
            key={index+'filmList'}
            activeOpacity={0.9}
            onPress={()=>{
              console.log('scrollViewRef===>',timer);
              timer && clearTimeout(timer);
              setScrollDisabel(true)
              scrollViewRef.current.scrollTo({ 
                x: index*100+45, 
                y: 0,
                animated: true 
              });
              setActiveIndex(index)
              onChange && onChange(index);
              let _timer = setTimeout(() => {
                setScrollDisabel(false)
              }, 2000);
              setTimer(timer);
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
 