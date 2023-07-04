import React,{useState,useEffect,useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Dimensions
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
  Input
} from '../../component/teaset/index';
var ScreenWidth = Dimensions.get('window').width;

const Tabs = ({onChange,active=''}:{
  onChange?:(val:string)=>void,
  active?:string
}) => {
  const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  let navigation = useNavigation();
  const [activate,setActivate] = useState('')

  useEffect(()=>{
    setActivate(active)
  },[])

  return <View style={{height:50}}>
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    stickyHeaderIndices={[]}>
      <View style={{
        ...styles.statusWrapper,
        width:ScreenWidth,
        borderBottomColor:colorScheme=='dark'?'#1a1b1c':'#eee',
      }}>
        <TouchableHighlight 
        underlayColor='' 
        style={styles.statusItem} onPress={()=>{
          if(!activate) return;
          setActivate('')
          onChange && onChange('')
        }}>
          <View style={styles.statusItemWrapper}>
            <Text style={{color:activate ==''?Theme.primaryColor:colorScheme=='dark'?'#fff':'#000'}}>全部</Text>
            {
              activate == '' && <Text style={{
                ...styles.statusItemLine,
                backgroundColor:Theme.primaryColor
              }}></Text>
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
        underlayColor='' 
        style={styles.statusItem} 
        onPress={()=>{
          if(activate==='0') return;
          setActivate('0')
          onChange && onChange('0')
        }}>
          
          <View style={styles.statusItemWrapper}>
            <Text style={{color:activate == '0'?Theme.primaryColor:colorScheme=='dark'?'#fff':'#000'}}>待支付</Text>
            {
              activate == '0' && <Text style={{
                ...styles.statusItemLine,
                backgroundColor:Theme.primaryColor
              }}></Text>
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
        underlayColor='' 
        style={styles.statusItem} 
        onPress={()=>{
          if(activate==='1') return;
          setActivate('1')
          onChange && onChange('1')
        }}>
          <View style={styles.statusItemWrapper}>
            <Text style={{color:activate == '1'?Theme.primaryColor:colorScheme=='dark'?'#fff':'#000'}}>待使用</Text>
            {
              activate == '1' && <Text style={{
                ...styles.statusItemLine,
                backgroundColor:Theme.primaryColor
              }}></Text>
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
        underlayColor='' 
        style={styles.statusItem} 
        onPress={()=>{
          if(activate==='2') return;
          setActivate('2')
          onChange && onChange('2')
        }}>
          <View style={styles.statusItemWrapper}>
            <Text 
            style={{color:activate == '2'?Theme.primaryColor:colorScheme=='dark'?'#fff':'#000'}}>
              待评价
            </Text>
            {
              activate == '2' && <Text style={{
                ...styles.statusItemLine,
                backgroundColor:Theme.primaryColor
              }}></Text>
            }
          </View>
        </TouchableHighlight>
      </View>
      
    </ScrollView>
  </View>;
};

const styles = StyleSheet.create({
  statusWrapper:{
    // flex:1,
    flexDirection:'row',
    borderBottomWidth:1
  },
  statusItem:{
    flex:1,
    // flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  statusItemWrapper:{
    width:'100%',
    flex:1,
    // flexDirection:'row',
    position:'relative',
    // backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center'
  },
  statusItemLine:{
    position:'absolute',
    left:'25%',
    bottom:-1,
    height:2,
    width:'50%'
  }
});

export default inject("AppStore")(observer(Tabs));
