import React,{useEffect} from 'react';


import {createStackNavigator} from '@react-navigation/stack'
// import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
import {
    Text,
    View
  } from 'react-native';
import LoginPage from '../Login/index';
import HomePage from '../Home/index';

import BottomTabNavigator from './BottomTabNavigator';


const routes=[
    { 
        component: HomePage, 
        name: "HomePage", 
        options: {
            title:'首页'
        } 
    },
    { 
        component: BottomTabNavigator, 
        name: "AppNav", 
        options: {
            headerShown:true,
            headerTruncatedBackTitle:'返回0',
            headerBackTitle:"返回1"
        } 
    },
    
    { 
        component: LoginPage, 
        name:"LoginPage",
        options:{
            
        }
    },
]
function renderStackItems(){
    return routes.map((item)=>{
        return <Stack.Screen
            key={item.name} 
            name={item.name}
            component={item.component} 
            options={item.options}
        />
    })
}
function Router(){
    let navigation:any = useNavigation()
    return <Stack.Navigator
        screenOptions={{
            headerShown:true,
            headerBackTitle:"返回",
            headerLeft:()=>{
                return <Ionicons 
                name={'md-chevron-back-sharp'} 
                size={30} 
                color={'#fff'} 
                onPress={()=>{
                    navigation.goBack()
                }}/>
            },
            headerRight:()=>{
                return <Text>Right</Text>
            },
            headerStyle:{
                backgroundColor:'purple'
            },
            headerTintColor:'#ccc',
        }}
        initialRouteName="HomePage"
        >
        {renderStackItems()}
    </Stack.Navigator>
}

export default Router;