import React, { useState,useEffect, useCallback } from 'react';
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
  Alert,
  Dimensions,
  View as Viw,
  Text as Txt,
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
  // NavigationBar,
  Theme,
  ListRow,
  Toast,
  Input,
  Overlay
} from '../../component/teaset/index';
import PropTypes, { any, number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";

import service from '../../utils/request';
import dayjs from 'dayjs';

import {
  create_order,
  pay_order,
  cancle_order,
  get_buy_ticket_detail,
} from "../../api/order";
import { get_user_info } from "../../api/user";
var ScreenObj = Dimensions.get('window');


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
      // flexDirection:'row',
      // alignItems:'center',
      // justifyContent:'space-between'
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
      // paddingHorizontal:20,
      paddingTop:5
    }}
    showsHorizontalScrollIndicator={false}
    stickyHeaderIndices={[]}>
      {
        orderDetail && <CustomListRow 
        accessory="none"
        // topSeparator='full'
        bottomSeparator="indent" 
        backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
        title={'电影票'} 
        detail={orderDetail.ticket_count + "张"} />
      }
      {
        orderDetail && <CustomListRow 
        accessory="none"
        // topSeparator='full'
        backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
        bottomSeparator="indent" 
        title={'原价'} 
        detail={
              '含服务费'+orderDetail.premium+'元/张 ' + ' ' +orderDetail.price+'元'
        } />
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


const OrderDetail = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();
  let [isSkeleton,setIsSkeleton] = useState(false);
  useEffect(()=>{
    return ()=>{
      console.log('销毁了====》');
    }
  },[]);
  return <View style={{
      ...styles.container
    }}>
    <Text>OrderDetail</Text>
  </View>;

 
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  
});

export default inject("app")(observer(OrderDetail));
