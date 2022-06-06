import React,{useEffect} from 'react';


import {createStackNavigator} from '@react-navigation/stack'
// import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getHeaderTitle } from '@react-navigation/elements';
// import CineamPage from '../views/Cineam/index';
// import MinePage from '../views/Mine/index';

const Stack = createStackNavigator();
import {
    Text,
    View
  } from 'react-native';
  import BottomTabNavigator from './BottomTabNavigator';
import LoginPage from '../views/Login/index';
import HomePage from '../views/Home/index';
import SetPage from '../views/Set/index';




const routes=[
    { 
        component: HomePage, 
        name: "HomePage", 
        options: {
            title:'首页',
            
        } 
        
    },
    { 
        component: BottomTabNavigator, 
        name: "AppTabBar", 
        options: {
            headerShown:false
        } 
    },
    
    { 
        component: LoginPage, 
        name:"LoginPage",
        // options:LoginPage.navigationOptions,//页面里配置options
    },
    { 
        component: SetPage, 
        name:"SetPage",
        // options:LoginPage.navigationOptions,//页面里配置options
    },

    // { 
    //     component: CineamPage, 
    //     name:"CineamPage",
    // },
    // { 
    //     component: MinePage, 
    //     name:"MinePage",
    // },
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

import store from '../store/index';

function StackNavigators(){
    let navigation:any = useNavigation()
    return <Stack.Navigator
        screenOptions={{
            headerShown:false,//是否隐藏头部导航
            // headerLeft:()=>{
            //     return <Ionicons 
            //     name={'md-chevron-back-sharp'} 
            //     size={30} 
            //     color={'#000'} 
            //     onPress={()=>{
            //         navigation.goBack()
            //     }}/>
            // },
            headerRight:()=>{
                return <Text>Right</Text>
            },
            headerStyle:{
                // backgroundColor:'#fff'
            },
            headerTitleStyle: {
                // fontSize: 18, color: '#666666'
            },
            // headerTintColor:'#000',//头部导航标题颜色
            headerTitleAlign:'center',//头部标题居中
            // header: ({ navigation, route, options, back }) => {
            //     const title = getHeaderTitle(options, route.name);
                
            //     return (
            //         <Text>custom header -- {route.name}</Text>
            //     );
            // }
            headerBackTitle:' '//返回键右侧的文字 置为 空，配置了此项 ，ios端显示，android不显示，不配置此项android端会默认显示screen name
        }}
        initialRouteName="AppTabBar"
        >
        {renderStackItems()}
    </Stack.Navigator>
}

export default StackNavigators;