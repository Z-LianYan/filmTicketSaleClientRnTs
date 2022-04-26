// import React, {Component} from 'react';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// import MinePage from '../Mine/index';
// import LoginPage from '../Login/index';
// import HomePage from '../Home/index';

// const AppTabNavigator = createBottomTabNavigator(
//   {
//     HomePage: {
//       screen: HomePage,
//       navigationOptions: () => ({
//         tabBarLabel: '首页',
//         headerTitle: '123456789',
//         tabBarIcon: ({tintColor, focused}) => (
//           <Ionicons
//             name={focused ? 'md-home' : 'md-home'}
//             size={26}
//             style={focused ? {color: tintColor} : {color: '#ccc'}}
//           />
//         ),
//       }),
//     },

//     LoginPage: {
//       screen: LoginPage,
//       navigationOptions: () => ({
//         tabBarLabel: '最热',
//         tabBarIcon: ({tintColor, focused}) => (
//           <Ionicons
//             name={focused ? 'md-heart' : 'md-heart'}
//             size={26}
//             style={focused ? {color: tintColor} : {color: '#ccc'}}
//           />
//         ),
//       }),
//     },

//     MinePage: {
//       screen: MinePage,
//       navigationOptions: () => ({
//         tabBarLabel: '我的',
//         tabBarIcon: ({tintColor, focused}) => (
//           <Ionicons
//             name={focused ? 'md-person' : 'md-person'}
//             size={26}
//             style={focused ? {color: tintColor} : {color: '#ccc'}}
//           />
//         ),
//       }),
//     },
//   },
//   {
//     initialRouteName: 'sectonList',
//     lazy: true,
//     swipeEnabled: true,
//     tabBarOptions: {
//       activeTintColor: 'red',
//       // style: {
//       //   backgroundColor: '#ccc'
//       // },
//     },
//   },
// );

// export default AppTabNavigator;

// import MinePage from '../Mine/index';
// import LoginPage from '../Login/index';
// import HomePage from '../Home/index';

// import LoginPage from '../Login/index';
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

function tabScreen(){
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

        // You can return any component that you like here!
        // return <Ionicons name={iconName} size={size} color={color} />;
        return <Image
          style={{width:30,height:30}}
          source={iconName}
        />;
      },
      tabBarActiveTintColor: '#e54847',
      tabBarInactiveTintColor: '#333',
    })}
    >
      {tabScreen()}
    </Tab.Navigator>
  );
}
