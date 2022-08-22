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
  onPress?: () => void,
  separator?:boolean
}
const CinemaListItem = ({
  title = '',
  label = '',
  value = '',
  distance = '',
  onPress,
  separator = true,
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  return <TouchableHighlight 
  underlayColor={''}
  onPress={()=>{
    onPress && onPress();
  }}>
    <View>
      <View style={styles.cinemaItemWrapper}>
        <View style={styles.left_box}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.label}>{label}</Text>
        </View>
        <View style={styles.right_box}>
          <View  numberOfLines={1} style={styles.value}>
            <Text style={styles.symbol}>¥</Text>
            <Text style={styles.val}>{value}</Text>
            <Text style={styles.qi}>起</Text>
          </View>
          <Text 
          style={styles.distance}>
            {distance}
          </Text>
        </View>
      </View>
      {separator ? <View style={{
          ...styles.separator,
          backgroundColor: colorScheme=='dark'?'#1a1b1c':'#eee'
        }}></View> : null}
    </View>
    
  </TouchableHighlight>
  
}
export default CinemaListItem;
const styles = StyleSheet.create({
  cinemaItemWrapper:{
    padding:15,
    flexDirection:'row',
    color: '#797d82',
  },
  left_box:{
    flex: 1,
  },
  title:{
    // color: '#191a1b',
    fontSize: 15
  },
  label:{
    color: '#797d82',
    fontSize: 12,
    marginTop: 5,
    // width: ,
  },
  right_box:{
    width:80,
  },
  value:{
    color: Theme.primaryColor, 
    fontSize: 15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  symbol:{
    color: Theme.primaryColor, 
    fontSize: 11
  },
  val:{
    fontSize: 14,
    color: Theme.primaryColor, 
    marginLeft:2,
    marginRight:2
  },
  qi:{
    color: Theme.primaryColor, 
    fontSize: 11,
  },
  distance:{
    // fontWeight: 400,
    marginTop: 5,
    fontSize: 11,
    textAlign: 'right',
    justifyContent:'center'
  },
  separator:{
    height: 1,
    // marginLeft: 15,
  }
});