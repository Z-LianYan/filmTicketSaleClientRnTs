



import * as React from 'react';
import { observer, inject } from 'mobx-react'
import {Text, View, Image,useColorScheme,TouchableHighlight,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  FIlM_ICON,
  FIlM_ACTIVE_ICON, 
  CINEMA_ICON,
  CINEMA_ACTIVE_ICON,
  MINE_ICON,
  MINE_ACTIVE_ICON,
} from '../assets/image/index';
import { 
  Button,
  Carousel,
  NavigationBar,
  Theme
} from '../component/teaset/index';

import MyTabBar from '../component/TabBar';
import HomePage from '../views/Home/index';
import CinemaPage from '../views/Cinema/index';
import MinePage from '../views/Mine/index';
const routes=[
  {
    component: HomePage, 
    name: "HomePage", 
    options: {
      // tabBarBadge:1,
      title:'电影',
      headerShown:false,//是否隐藏头部导航
    } 
  },
  { 
    component: CinemaPage, 
    name:"CinemaPage",
    options:{
      // tabBarBadge:1,
      title:'影院',
    }
  },
  { 
    component: MinePage, 
    name: "MinePage", 
    options: {
      // tabBarBadge:3,
      title:'我的',
      headerShown:false,//是否隐藏头部导航
    } 
  }
]


const Tab = createBottomTabNavigator();

function tabBarScreen(props:any){
  return routes.map((item)=>{
    return <Tab.Screen 
    key={item.name} 
    name={item.name}
    component={item.component} 
    options={{
      ...item.options,
    }}/>
  })
}


function BottomTabNavigator(props:any) {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
    initialRouteName="HomePage"
    tabBar={_props => <MyTabBar {..._props} />}
    screenOptions={({ route }) => ({
      headerShown:true,//是否隐藏头部导航
      // tabBarIcon: ({ focused, color, size }) => {
      //   let iconName; 

      //   if (route.name === 'HomePage') {
      //     iconName = focused
      //       ? FIlM_ACTIVE_ICON
      //       : FIlM_ICON;
      //   } else if (route.name === 'CinemaPage') {
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
      },
      headerStyle: { 
        backgroundColor: colorScheme=='dark'?'#000':Theme.primaryColor,
        borderBottomWidth:1,
        borderBottomColor:colorScheme=='dark'?'#1a1b1c':Theme.primaryColor
      },
      headerTitleStyle: {
        // fontSize: 18,
        color:'#fff' 
      }
    })}
    
    >
      {tabBarScreen(props)}
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;