
import HomePage from '../Home/index';
import CineamPage from '../Cineam/index';
import MinePage from '../Mine/index';

import * as React from 'react';
import {Text, View, Image} from 'react-native';
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
} from '../assets/image/index'

const Tab = createBottomTabNavigator();
const routes=[
  {
    component: HomePage, 
    name: "HomePage", 
    options: {
      tabBarBadge:1,
      title:'电影'
    } 
  },
  { 
    component: CineamPage, 
    name:"CineamPage",
    options:{
      tabBarBadge:2,
      title:'影院'
    }},
  { 
    component: MinePage, 
    name: "MinePage", 
    options: {
      tabBarBadge:3,
      title:'我的'
    } 
  }
]

function tabBarScreen(){
  return routes.map((item,index)=>{
    return <Tab.Screen 
    key={item.name} 
    name={item.name}
    component={item.component} 
    options={item.options}/>
  })
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomePage') {
          iconName = focused
            ? FIlM_ACTIVE_ICON
            : FIlM_ICON;
        } else if (route.name === 'CineamPage') {
          iconName = focused ? CINEMA_ACTIVE_ICON : CINEMA_ICON;
        }else if (route.name === 'MinePage') {
          iconName = focused ? MINE_ACTIVE_ICON : MINE_ICON;
        }
        return <Image
          style={{width:20,height:20}}
          source={iconName}
        />;
      },
      tabBarActiveTintColor: '#e54847',
      tabBarInactiveTintColor: '#333',
    })}
    >
      {tabBarScreen()}
    </Tab.Navigator>
  );
}
