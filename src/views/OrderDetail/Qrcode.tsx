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
}
const Qrcode = ({
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  let [expire_time, set_expire_time] = useState(0);
  let [timeoutStart, setTimeoutStart] = useState<boolean>(false);
  // let refTime:{current:any} = useRef();
  useEffect(() => {
    return () => {};
  });

  

  return <View style={{
    ...styles.qrcodeContainer,
    borderColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4'
  }}>
      <Text style={styles.titleTxt}>取电影票</Text>
  </View>;
}
export default Qrcode;
const styles = StyleSheet.create({
  qrcodeContainer:{
  },
  titleTxt:{
    fontSize:20,
    fontWeight:'bold'
  }
  
});