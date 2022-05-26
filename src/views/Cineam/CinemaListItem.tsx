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
  title?:string,
  label?:string,
  value?:string,
  distance?:string,
  onPress?: () => void
}
const CinemaListItem = ({
  title = '',
  label = '',
  value = '',
  distance = '',
  onPress
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  // return <TouchableHighlight 
  // activeOpacity={1} 
  // underlayColor=''
  // style={styles.cinema_item_wrapper}
  // onPress={()=>{
  //   onPress && onPress()
  // }}>
    
  //     <View styles={styles.cinema_item}>
  //       <View style={styles.left_box}>
  //         <Text style={styles.title}>{title}</Text>
  //         <Text style={styles.label}>{label}</Text>
  //       </View>
  //       <View style={styles.right_box}>
  //         <View style={styles.value}>
  //           <Text style={styles.symbol}>¥</Text>
  //           <Text>{value}</Text>
  //           <Text style={styles.qi}>起</Text>
  //         </View>
  //         <Text style={styles.distance}>{distance}</Text>
  //       </View>
  //     </View>
  // </TouchableHighlight>
  return <View style={{flexDirection:'row'}}>
  <View style={{flex:1,height:100,backgroundColor:'red'}}></View>
  <View style={{width:30,height:100,backgroundColor:'yellow'}}></View>
</View>
}
export default CinemaListItem;
const styles = StyleSheet.create({
  cinema_item_wrapper:{

  },
  cinema_item:{
    padding: 15,
    // alignItems: 'center',
    flexDirection:'row',
    color: '#797d82',
  },
  left_box:{
    flex: 1,
  },
  title:{
    color: '#191a1b',
    fontSize: 15
  },
  label:{
    color: '#797d82',
    fontSize: 12,
    marginTop: 5,
    // width: ,
  },
  right_box:{
    width: 70
  },
  value:{
    color: Theme.primaryColor,
    fontSize: 15,
    textAlign: 'center',
  },
  symbol:{
    fontSize: 11,
    marginRight: 30
  },
  qi:{
    fontSize: 11,
  },
  distance:{
    // fontWeight: 400,
    marginTop: 5,
    fontSize: 11,
    textAlign: 'center',
  }
});