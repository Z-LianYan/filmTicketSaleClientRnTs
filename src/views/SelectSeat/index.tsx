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
  TouchableOpacity
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
  
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import BottomLoading from '../../component/BottomLoading';
import DropdownMenu from '../../component/DropdownMenu';
import dayjs from 'dayjs';


const SelectSeat = ({app,navigation,route}:any) => {
  // const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(()=>{
  },[]);
  
  
  const setNavigation = useCallback((film_name?:any)=>{
    navigation.setOptions({
      headerTitle:film_name,
      // headerLeft:'',
      headerTransparent: false,
      headerStyle: { 
        backgroundColor: colorScheme=='dark'?'#000':Theme.primaryColor
      },
      headerRight:()=>{
        return <Ionicons 
        name={'search'}
        style={{paddingRight:10}}
        size={25} 
        color={'#ccc'}
        onPress={()=>{
          navigation.navigate({
            name: "CinemaSearch",
          });
        }}/>
      },
      
    });
  },[]);

  
  return <ScrollView
    stickyHeaderIndices={[]}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      title="下拉刷新"//ios
      refreshing={refreshing} 
      onRefresh={()=>{
      }} />
    }>
      <Text>SelectSeat</Text>
    </ScrollView>;
};

const styles = StyleSheet.create({
});

export default inject("app")(observer(SelectSeat));
