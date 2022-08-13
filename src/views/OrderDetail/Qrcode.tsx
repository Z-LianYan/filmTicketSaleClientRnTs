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
   useColorScheme,
   View as Viw,
   Text as Txt
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
  orderDetail:any
}
const Qrcode = ({
  orderDetail
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  let [expire_time, set_expire_time] = useState(0);
  let [timeoutStart, setTimeoutStart] = useState<boolean>(false);
  // let refTime:{current:any} = useRef();
  useEffect(() => {
    return () => {};
  });

  function handleVerifyCode() {
    let { order_verify_code } = orderDetail;
    if (!order_verify_code) return;
    return (
      order_verify_code.toString().substring(0, 4) +
      " " +
      order_verify_code.toString().substring(4, 8) +
      " " +
      order_verify_code.toString().substring(8, 12) +
      " " +
      order_verify_code.toString().substring(12, 16)
    );
  }

  

  return <Viw style={{
    ...styles.qrcodeContainer,
    // borderColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4'
  }}>
      <Text style={styles.titleTxt}>取电影票</Text>

      <Viw>
        <Text style={styles.qrcodem}>二维码</Text>
      </Viw>
      <Viw style={{
        ...styles.verifyCode,
        borderColor:colorScheme=='dark'?'#999':'#f4f4f4'
      }}>
        <Text style={styles.verifyCodeLabel}>验证码：</Text>
        <Text>{handleVerifyCode()}</Text>
      </Viw>
  </Viw>;
}
export default Qrcode;
const styles = StyleSheet.create({
  qrcodeContainer:{
  },
  titleTxt:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20
  },
  qrcodem:{

  },
  verifyCode:{
    height:50,
    borderWidth:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
    borderRadius:10
  },
  verifyCodeLabel:{
    color:'#666'
  }
});