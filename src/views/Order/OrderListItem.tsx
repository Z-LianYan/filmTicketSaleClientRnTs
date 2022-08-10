import React, { useState,useEffect, useCallback,useRef } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react'
 import {
   StyleSheet,
   Image,
  //  View,
  //  Text,
   TouchableOpacity,
   Dimensions,
   TouchableHighlight,
   useColorScheme
 } from 'react-native';

 import { 
  Carousel,
  Theme,
  Button
} from '../../component/teaset/index';
var ScreenWidth = Dimensions.get('window').width;
import { 
  View,
  Text
} from '../../component/Themed';


type propsType = {
  navigation:any,
  item?:any,
  // separator:boolean
}
const CinemaListItem = ({
  navigation,
  item = {},
  // separator = true
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  let [expire_time, set_expire_time] = useState(0);
  // const savedUseRef:{current:any} = useRef();
  useEffect(() => {
    let time = item.expireTime || 0;
    let timer  = setInterval(()=>{
      if(time<=0) {
        clearInterval(timer);
      }else{
        time -= 1;
        set_expire_time(time)
      }
    },1000);
    return () => {
      clearInterval(timer);
    };
  },[]);

  const onExpireTime = useCallback(()=>{
    let val = 11;
    setTimeout(() => {
      console.log('3秒后')
      val = 123
    }, 3000);
    return val
  },[])

  return <View style={{
    ...styles.itemContainer,
    borderColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4'
  }}>
      <TouchableHighlight 
      underlayColor={''}
      onPress={()=>{
        navigation.navigate({
          name:"OrderDetailPage",
          params:{
            order_id: item && item.order_id
          }
        });
      }}>
        <View style={{
          ...styles.itemContent,
          // borderColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4'
        }}>
          <View style={styles.topWrapper}>
            <Text>{item.film_name}</Text>
            <Text style={styles.topWrapperRight}>{item.status_text}{expire_time}</Text>
          </View>
          <View style={styles.bottomWrapper}>
            <Image 
            resizeMode='cover' 
            style={styles.posterImg} 
            source={{
              uri: item.poster_img 
            }} />
            <View style={styles.bottomWrapperRight}>
              <Text style={styles.bottomWrapperRightRow}>影院：<Text style={styles.bottomWrapperRightValue}>{item.cinema_name}</Text></Text>
              <Text style={styles.bottomWrapperRightRow}>场次：<Text style={styles.bottomWrapperRightValue}>{item.start_runtime}</Text></Text>
              <Text style={styles.bottomWrapperRightRow}>数量：<Text style={styles.bottomWrapperRightValue}>{item.buy_seat_ids.length}</Text></Text>
              <Text style={styles.bottomWrapperRightRow}>总价：<Text style={styles.bottomWrapperRightValue}>¥{item.price}</Text></Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
      
      {/* {separator ? <View style={{
          ...styles.separator,
          backgroundColor: colorScheme=='dark'?'#1a1b1c':'#eee'
        }}></View> : null} */}


        <View style={styles.commentBtn}>
          {item.status == 2 && !item.comment_content ? (
            <Button
              title={'写影评'}
              type="primary"
              size="md"
              titleStyle={{
                color:Theme.primaryColor
              }}
              style={{width:80,height:40,marginBottom:10,marginRight:10,backgroundColor:'transparent'}}
              disabled={false}
              onPress={() => {
                navigation.navigate({
                  name: "CommentPage",
                  params: {
                    film_id: item.film_id
                  },
                });
              }}
            />
          ) : null}
          {item.status == 0 && expire_time ? (
            <Button
              title={'付款'}
              type="primary"
              size="md"
              style={{width:80,height:40,marginBottom:10,marginRight:10}}
              disabled={false}
              onPress={() => {
                navigation.navigate({
                  name:'BuyTicket',
                  params:{
                    order_id:item.order_id
                  }
                })
              }}
            />
          ) : null}
        </View>


    
    </View>
  
}
export default CinemaListItem;
const styles = StyleSheet.create({
  itemContainer:{
    // padding:12,
    margin:12,
    borderRadius:8,
    borderWidth:1,
  },
  itemContent:{
    padding:8,
    borderRadius:8
  },
  topWrapper:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  topWrapperLeft:{},
  topWrapperRight:{
    color:'#666'
  },
  bottomWrapper:{
    marginTop:24,
    flexDirection:'row',
  },
  posterImg:{
    width:60,
    height:60,
    borderRadius:8
  },
  bottomWrapperRight:{
    marginLeft:10
  },
  bottomWrapperRightRow:{
    height:24
  },
  bottomWrapperRightValue:{
    color:'#666'
  },

  commentBtn:{
    flexDirection:'row',
    justifyContent:'flex-end'
  }
});