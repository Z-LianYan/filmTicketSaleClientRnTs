import React, { useState,useEffect, useCallback,useRef } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
   Text as Txt,
   ScrollView
 } from 'react-native';

 import { 
  Carousel,
  Theme,
  Button,
  Overlay
} from '../../component/teaset/index';
var ScreenWidth = Dimensions.get('window').width;
import { 
  View,
  Text
} from '../../component/Themed';
import CustomListRow from '../../component/CustomListRow';

let overlay_view = function(orderDetail:any=null,colorScheme:any,onCancel:any){
  return <Overlay.PullView 
  side='bottom'
  modal={false}
  containerStyle={{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
  }}>
    <Viw style={{
      borderBottomWidth:1,
      borderBottomColor:colorScheme=='dark'?'#202122':'#f4f4f4',
      paddingTop:20,
      paddingBottom:10,
      position:'relative'
    }}>
      <Text style={{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold'
      }}>价格明细</Text>
      <Ionicons 
      name={'close-sharp'}
      size={30} 
      color={colorScheme=='dark'?'#fff':'#000'}
      style={{
        position:'absolute',
        right:10,
        top:10
      }}
      onPress={()=>{
        onCancel && onCancel();
      }}/>
    </Viw>
    
    <ScrollView
    style={{
      maxHeight:300,
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
      paddingTop:5
    }}
    showsHorizontalScrollIndicator={false}
    stickyHeaderIndices={[]}>
      {
        orderDetail && <CustomListRow 
        accessory="none"
        bottomSeparator="full" 
        backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
        title={'电影票'} 
        detail={orderDetail.ticket_count + "张"} />
      }
      {
        orderDetail && <CustomListRow 
        accessory="none"
        backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
        bottomSeparator="full" 
        title={'原价'} 
        detail={
             <Text>
              { '含服务费'+orderDetail.premium+'元/张 ' + ' '}
              <Text  style={{color:Theme.primaryColor}}>{orderDetail.price}</Text>元
             </Text>
        } />
      }
      {
        orderDetail && <CustomListRow 
        accessory="none"
        backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
        bottomSeparator="none" 
        title={'实际支付'} 
        detail={<Text style={{color:Theme.primaryColor}}>{'¥'+orderDetail.price}</Text>} />
      }
    </ScrollView>
    <View style={{
      height:10,
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
    }}></View>
  <View style={{
    height:10,
    backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
  }}></View>
</Overlay.PullView>
};

type propsType = {
  orderDetail:any
}
const OrderInfo = ({
  orderDetail
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  let [expire_time, set_expire_time] = useState(0);
  let [timeoutStart, setTimeoutStart] = useState<boolean>(false);
  // let refTime:{current:any} = useRef();
  useEffect(() => {
    return () => {};
  });

  return <Viw style={{
    ...styles.container,
    backgroundColor:colorScheme=='dark'?'#1a1b1c':'#fff',
    overflow:'hidden'
  }}>
      <CustomListRow 
      accessory="indicator"
      bottomSeparator="none" 
      backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
      title={<Text style={{
        fontWeight:'bold',
        fontSize:18,
        color:colorScheme=='dark'?'#999':'#000'
      }}>订单明细</Text>} 
      detail={"价格明细"} 
      onPress={()=>{
        let ol = Overlay.show(overlay_view(orderDetail,colorScheme,()=>{
          Overlay.hide(ol);
        }));
      }}/>

      <CustomListRow 
      accessory="none"
      bottomSeparator="none" 
      backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
      title={'实际金额'} 
      detail={<Viw style={{flexDirection:'row',alignItems:'center'}}>
        <Text 
        style={{color:Theme.primaryColor,marginRight:20}}>
          ¥{orderDetail.price}
        </Text>
        <Text style={{color:'#ccc'}}>({orderDetail.ticket_count}张电影票)</Text>
      </Viw>} />
      <CustomListRow 
      accessory="none"
      bottomSeparator="none" 
      backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
      title={'手机号码'} 
      detail={orderDetail.phone_number} />
      <CustomListRow 
      accessory="none"
      bottomSeparator="none" 
      backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
      title={'订单编号'} 
      detail={orderDetail.order_id} />
      <CustomListRow 
      accessory="none"
      bottomSeparator="none" 
      backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
      title={'订单时间'} 
      detail={orderDetail.created_at} />
  </Viw>;
}
export default OrderInfo;
const styles = StyleSheet.create({
 container:{
  marginHorizontal: 10,
  borderRadius:10,
  marginTop:20
 }
});