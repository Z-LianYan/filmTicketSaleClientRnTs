



import * as React from 'react';
import { observer, inject } from 'mobx-react'
import {Text, View, Image,TouchableHighlight,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MinePage from '../views/Mine/index';
import LoginPage from '../views/Login/index';
import { 
  FIlM_ICON,
  FIlM_ACTIVE_ICON, 
  CINEMA_ICON,
  CINEMA_ACTIVE_ICON,
  MINE_ICON,
  MINE_ACTIVE_ICON,
} from '../assets/image/index';

import router from './router';
import MyTabBar from '../component/TabBar';

const Tab = createBottomTabNavigator();

function tabBarScreen(props:any){
  return router.map((item)=>{
    return <Tab.Screen 
    key={item.name} 
    name={item.name}
    component={item.component} 
    options={{
      ...item.options,
      // tabBarBadge:item.name=='HomePage'?props.home.count:props.app.tabBarBadge
    }}/>
  })
}


function BottomTabNavigator(props:any) {
  return (
    <Tab.Navigator
    initialRouteName="CineamPage"
    tabBar={_props => <MyTabBar {..._props} />}
    screenOptions={({ route }) => ({
      headerShown:false,//是否隐藏头部导航
      // tabBarIcon: ({ focused, color, size }) => {
      //   let iconName; 

      //   if (route.name === 'HomePage') {
      //     iconName = focused
      //       ? FIlM_ACTIVE_ICON
      //       : FIlM_ICON;
      //   } else if (route.name === 'CineamPage') {
      //     iconName = focused ? CINEMA_ACTIVE_ICON : CINEMA_ICON;
      //   }else if (route.name === 'MinePage') {
      //     iconName = focused ? MINE_ACTIVE_ICON : MINE_ICON;
      //   }
      //   return <TouchableHighlight onPress={()=>{
      //     // console.log(12345)
      //   }}>
      //     <Image
      //       style={{width:20,height:20}}
      //       source={iconName}
      //     />
      //   </TouchableHighlight>;
      // },
      tabBarActiveTintColor: '#e54847',//激活的颜色
      tabBarInactiveTintColor: '#333',//未必激活的颜色

      headerTitleAlign:'center',//头部标题居中
      tabBarLabelStyle:{
        marginBottom:5
      },
      tabBarStyle:{
      }
    })}
    
    >
      {tabBarScreen(props)}
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;