import React, { useState,useEffect } from 'react';
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
  item?:any,
  // separator:boolean
}
const CinemaListItem = ({
  item = {},
  // separator = true
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  return <View style={styles.itemContainer}>
      <TouchableHighlight>
        <View style={{
          ...styles.itemContent,
          borderColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4'
        }}>
          <View style={styles.topWrapper}>
            <Text>{item.film_name}</Text>
            <Text style={styles.topWrapperRight}>{item.status_text}</Text>
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
    </View>
  
}
export default CinemaListItem;
const styles = StyleSheet.create({
  itemContainer:{
    padding:12,
  },
  itemContent:{
    padding:8,
    // flexDirection:'row',
    // color: '#797d82',
    // backgroundColor:'#463d3d',
    borderRadius:8,
    borderWidth:1,
    // borderColor:'#fff'
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
  }
});