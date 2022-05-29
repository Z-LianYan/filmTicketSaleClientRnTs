import React, { useState,useImperativeHandle,forwardRef } from 'react';
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
  Dimensions,
  TouchableHighlight
} from 'react-native';

import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import { 
  View,
  Text
} from '../component/Themed';
import { 
  Button,
  Carousel,
  NavigationBar,
  Theme
} from '../component/teaset/index';
import PropTypes, { number } from 'prop-types';


import { get_film_hot } from '../api/film';
var ScreenHeight = Dimensions.get('window').height;
const DropdownMenu = ({
  list=[],
  titleStyle
  }:{
    list:any[],
    titleStyle?:any
  },ref:any) => {
  const colorScheme = useColorScheme();
  const [title,setTitle] = useState(list && list.length?list[0].title:'');
  const [showMenu,setShowMenu] = useState(false);


  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    onHiddenMenu: ()=>{
      setShowMenu(false)
    },
    onShowMenu: ()=>{
      setShowMenu(true)
    }
  }));

  return (<View style={styles.dropdownMenuWrapper}>
    <View style={{
      borderBottomColor: colorScheme === 'dark' ? '#1a1b1c' : '#f4f4f4',
      ...styles.btnBox
    }}>
        <Text style={styles.title} onPress={()=>{
          setShowMenu(!showMenu)
        }}>
          {title}
          <Ionicons
          name={showMenu?'caret-up':'caret-down-sharp'}
          size={15} 
          color={colorScheme === 'dark' ? '#fff' : '#000'}/>
        </Text>
    </View>
    {
      showMenu?<View style={{
        ...styles.contentBox,
        borderBottomColor: colorScheme === 'dark' ? '#1a1b1c' : '#f4f4f4',
        
      }}>
        {
          list.map((item:any,index:number)=>{
            return <TouchableOpacity
            style={styles.contentItem}
            key={index} 
            onPress={()=>{
              setTitle(item.title)
              // setShowMenu(false)
            }}>
              <Text numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        })
        }
      </View>:null
    }
    {
      showMenu?<TouchableHighlight
      underlayColor=''
      style={{
        ...styles.maskWrapper,
        backgroundColor:colorScheme === 'dark' ?'#666':'#000',
      }}
      onPress={()=>{
        setShowMenu(false)
      }}>
        <View 
      ></View>
      </TouchableHighlight>:null
    }
  </View>
  );
};

const styles = StyleSheet.create({
  dropdownMenuWrapper:{
    position:'relative',
    // overflow:'hidden'
    zIndex:1
  },
  btnBox:{
    height:50,
    lineHeight:50,
    flexDirection:'row',
    borderBottomWidth:1,
    alignContent:'center',
    justifyContent:'center'
  },
  title:{
    // height:25,
    flexDirection:'row',
    lineHeight:50,
    justifyContent:'center'
  },
  contentBox:{
    position:'absolute',
    // bottom:0,
    left:0,
    right:0,
    top:50,
    borderBottomWidth:1,
    // padding:10,
    // paddingLeft:10,
    paddingTop:10,
    // paddingBottom:10,
    // paddingRight:10,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around'
  },
  contentItem:{
    width:'23%',
    padding:10,
    borderWidth:1,
    borderRadius:5,
    borderColor:'#eee',
    // marginRight:10,
    marginBottom:10,
  },
  maskWrapper:{
    position:'absolute',
    // bottom:0,
    left:0,
    right:0,
    top:50,
    bottom:-ScreenHeight,
    opacity:0.5,
    zIndex:-1
  }
});

export default forwardRef(DropdownMenu);
