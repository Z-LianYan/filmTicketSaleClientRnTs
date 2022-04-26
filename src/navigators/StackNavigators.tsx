import React,{useEffect} from 'react';


import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

import LoginPage from '../Login/index';
import HomePage from '../Home/index';

import BottomTabNavigator from './BottomTabNavigator';

const routes=[
    { component: HomePage, name: "HomePage", options: {} },
    { component: BottomTabNavigator, name: "AppNav", options: {} },
    
    { component: LoginPage, name:"LoginPage",options:{}},
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
    return <Stack.Navigator
        screenOptions={{
            headerShown:false,
        }}
        initialRouteName="LaunchView"
        >
        {renderStackItems()}
    </Stack.Navigator>
}

export default Router;