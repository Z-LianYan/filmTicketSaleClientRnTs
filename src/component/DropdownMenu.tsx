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
  Theme,
  ListRow
} from '../component/teaset/index';
import PropTypes, { number } from 'prop-types';


import { get_film_hot } from '../api/film';
var ScreenHeight = Dimensions.get('window').height;
const DropdownMenu = ({
  list=[],
  titleStyle,
  onTypeChange,
  districtChange
  }:{
    list:any[],
    titleStyle?:any,
    onTypeChange?:any
    districtChange?:any
  },ref:any) => {
  const colorScheme = useColorScheme();
  const [title,setTitle] = useState(list && list.length?list[0].title:'');
  const [showMenu,setShowMenu] = useState(false);
  const [showMenu2,setShowMenu2] = useState(false);
  const [title2,setTitle2] = useState('全部');
  const [type,setType] = useState('');
  

  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    onHiddenMenu: ()=>{
      setShowMenu(false);
      setShowMenu2(false);
    },
    onShowMenu: ()=>{
      setShowMenu(true);
      setShowMenu2(true);
    }
  }));

  return (<View style={styles.dropdownMenuWrapper}>
    <View style={{
      borderBottomColor: colorScheme === 'dark' ? '#1a1b1c' : '#f4f4f4',
      ...styles.btnBox
    }}>
        <Text style={styles.title} onPress={()=>{
          setShowMenu(!showMenu);
          if(!showMenu && showMenu2){
            setShowMenu2(false);
          }
          
        }}>
          {title}
          <Ionicons
          name={showMenu?'caret-up':'caret-down-sharp'}
          size={15} 
          color={colorScheme === 'dark' ? '#fff' : '#000'}/>
        </Text>

        <Text style={styles.title} onPress={()=>{
          setShowMenu2(!showMenu2);
          if(showMenu && !showMenu2){
            setShowMenu(false);
          }
        }}>
          {title2}
          <Ionicons
          name={showMenu2?'caret-up':'caret-down-sharp'}
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
              setTitle(item.title);
              setShowMenu(false);
              districtChange(item.id)
            }}>
              <Text 
              style={styles.contentItemTitle}
              numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        })
        }
      </View>:null
    }
    {
      showMenu2?<View style={{
        ...styles.contentBox2,
        borderBottomColor: colorScheme === 'dark' ? '#1a1b1c' : '#f4f4f4',
        
      }}>
          <TouchableHighlight onPress={()=>{
            setShowMenu2(false);
            setTitle2('全部');
            onTypeChange('');
            setType('');
          }}>
            <View style={{
              ...styles.customCellRadio,
              borderBottomWidth:1,
              borderColor:colorScheme === 'dark' ? '#1a1b1c' : '#f4f4f4'
            }}>
              <Text style={styles.customCellRadioTxt}>全部</Text>
              <Text style={styles.customCellRadioTxt}>
                {
                  !type?<Ionicons
                  name={'checkmark-sharp'}
                  size={15} 
                  color={Theme.primaryColor}/>:null
                }
              </Text>
            </View>
          </TouchableHighlight>
          
          
          <TouchableHighlight onPress={()=>{
            setShowMenu2(false);
            setTitle2('最近去过');
            onTypeChange('zjqg');
            setType('zjqg')
          }}>
            <View style={styles.customCellRadio}>
              <Text style={styles.customCellRadioTxt}>最近去过</Text>
              <Text style={styles.customCellRadioTxt}>
              {
                  type=='zjqg'?<Ionicons
                  name={'checkmark-sharp'}
                  size={15} 
                  color={Theme.primaryColor}/>:null
                }
              </Text>
            </View>
          </TouchableHighlight>
          
      </View>:null
    }
    
    {
      (showMenu || showMenu2)?<TouchableHighlight
      underlayColor=''
      style={{
        ...styles.maskWrapper,
        backgroundColor:colorScheme === 'dark' ?'#666':'#000',
      }}
      onPress={()=>{
        setShowMenu(false);
        setShowMenu2(false);
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
    zIndex:1
  },
  btnBox:{
    height:50,
    lineHeight:50,
    flexDirection:'row',
    borderBottomWidth:1,
    alignContent:'center',
    justifyContent:'space-around'
  },
  title:{
    // flex:1,
    flexDirection:'row',
    lineHeight:50,
    justifyContent:'center',
    alignItems:'center'
  },
  contentBox:{
    position:'absolute',
    left:0,
    right:0,
    top:50,
    borderBottomWidth:1,
    paddingTop:10,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around'
  },
  contentItem:{
    width:'23%',
    padding:6,
    borderWidth:1,
    borderRadius:5,
    borderColor:'#eee',
    marginBottom:10,
  },
  contentBox2:{
    position:'absolute',
    left:0,
    right:0,
    top:50,
    borderBottomWidth:1,
    paddingTop:10,
    // flexDirection:'column',
    // flexWrap:'wrap',
    // justifyContent:'space-around'
  },
  contentItemTitle:{
    textAlign:'center'
  },
  maskWrapper:{
    position:'absolute',
    left:0,
    right:0,
    top:50,
    bottom:-ScreenHeight,
    opacity:0.5,
    zIndex:-1
  },
  customCellRadio:{
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
  },
  customCellRadioTxt:{
    height:18
  }
});

export default forwardRef(DropdownMenu);
