import React,{useState,useEffect,useRef,useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  View as Viw,
  Text as Txt,
  TouchableOpacity,
  Image
} from 'react-native';
import { observer, inject } from 'mobx-react'

import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  Button,
  Carousel,
  Theme,
  Label,
  Drawer,
  ActionSheet,
  TransformView,
  Overlay
} from '../../component/teaset/index';

import dayjs from 'dayjs';
import { 
  SEAT_ALREADY_SALE,
  SEAT_DISABLE,
  SEAT_NO_SELECTED,
  SEAT_SCREEN,
  SEAT_SECTION_A,
  SEAT_SECTION_B,
  SEAT_SECTION_C,
  SEAT_SECTION_D,
  SEAT_SECTION_E,
  SEAT_SELECTED
} from "../../assets/image/index";
const SectionPriceContainer = ({
  selectedSchedule=null
}:any) => {
  const colorScheme = useColorScheme();
  useEffect(()=>{
  },[]);

  if(selectedSchedule && selectedSchedule.is_section == 1) {
    return <Viw  style={[
      styles.sectionPriceWrapper,
      {backgroundColor:colorScheme=='dark'?'#000':'#fff'}
    ]}>
      {selectedSchedule.sectionPrice.map((item:any, index:number) => {
        return (
          <Viw style={styles.sectionItem} key={index}>
            <Image 
            resizeMode='cover' 
            style={styles.icons} 
            source={item.section_id == "a"
              ? SEAT_SECTION_A
              : item.section_id == "b"
              ? SEAT_SECTION_B
              : item.section_id == "c"
              ? SEAT_SECTION_C
              : item.section_id == "d"
              ? SEAT_SECTION_D
              : null
            } />
            
            <Viw style={styles.namePrice}>
              <Text style={styles.sectionName}>{item.section_name}</Text>
              <Text style={styles.price}>¥{item.price}</Text>
            </Viw>
          </Viw>
        );
      })}
    </Viw>
  }else{
    return null
  }
  
};

const styles = StyleSheet.create({
  
  sectionPriceWrapper:{
    paddingTop:5,
    paddingHorizontal:15,
    paddingBottom:10,
    flexDirection:'row',
    alignItems: 'center',
    zIndex:10
  },
  sectionItem:{
    flexDirection:'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icons:{
    width: 20,
    height: 20,
    marginRight: 5
  },
  namePrice:{
    fontSize: 10,
    marginLeft: 5
  },
  sectionName:{
    fontSize:12
  },
  price:{
    color: Theme.primaryColor,
    fontSize:12
  }
});

export default inject("app")(observer(SectionPriceContainer));
