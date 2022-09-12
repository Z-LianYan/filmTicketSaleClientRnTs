import React,{useEffect} from 'react';


import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getHeaderTitle } from '@react-navigation/elements';
import {Image,useColorScheme,TouchableHighlight,TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();
import {
    Text,
    View
  } from 'react-native';
import { 
    Button,
    Carousel,
    NavigationBar,
    Theme,
} from '../component/teaset/index';

import BottomTabNavigator from './BottomTabNavigator';
import LoginPage from '../views/Login/index';
import SetPage from '../views/Set/index';
import OrderPage from '../views/Order/index';
import Recharge from '../views/Recharge/index';
import EditUserInfo from '../views/EditUserInfo/index';
import FilmDetail from '../views/FilmDetail/index';
import CommentList from '../views/CommentList/index';
import CommentPage from '../views/Comment/index';
import CommentCompletePage from '../views/CommentComplete/index';
import CinemaPageStack from '../views/Cinema/index';
import CinemaSearch from '../views/CinemaSearch/index';
import CinemaDetailPage from '../views/CinemaDetail/index';
import SelectSeatPage from '../views/SelectSeat/index';
import BuyTicket from '../views/BuyTicket/index';
import OrderDetailPage from '../views/OrderDetail/index';
import CitysPage from '../views/Citys/index';
import MapView from '../views/MapView/index';



const routes=[
    { 
        component: BottomTabNavigator, 
        name: "AppTabBar", 
        options: {
            headerShown:false
        } 
    },
    { 
        component: CinemaPageStack, 
        name:"CinemaPageStack",
        options: {
            headerShown:true,
            title:''
        } 
    },
    
    { 
        component: LoginPage, 
        name:"LoginPage",
        options: {
            headerShown:true,
            title:'登录'
        } 
    },
    { 
        component: SetPage, 
        name:"SetPage",
        options: {
            title:'设置'
        }
    },
    { 
        component: OrderPage, 
        name:"OrderPage",
        options: {
            headerShown:false,
            title:'订单'
        } 
    },
    { 
        component: Recharge, 
        name:"Recharge",
        options: {
            headerShown:true,
            title:'充值',
        } 
    },
    { 
        component: EditUserInfo, 
        name:"EditUserInfo",
        options: {
            headerShown:true,
            title:'修改会员信息',
        } 
    },
    { 
        component: FilmDetail, 
        name:"FilmDetail",
        options: {
            // cardStyle:{backgroundColor: 'transparent'},
            headerShown:true,
            title:'',
            headerTransparent:true
        } 
    },
    { 
        component: CommentList, 
        name:"CommentListPage",
        options: {
            headerShown:true,
            title:'',
            // headerTransparent:true
        } 
    },
    { 
        component: CommentPage, 
        name:"CommentPage",
        options: {
            headerShown:true,
            title:'',
            // headerTransparent:true
        } 
    },
    { 
        component: CommentCompletePage, 
        name:"CommentCompletePage",
        options: {
            headerShown:true,
            title:'评论成功',
            // headerTransparent:true
        } 
    },
    { 
        component: CinemaSearch, 
        name:"CinemaSearch",
        options: {
            headerShown:true,
            title:'',
            // headerTransparent:true
        } 
    },
    { 
        component: CinemaDetailPage, 
        name:"CinemaDetailPage",
        options: {
            headerShown:true,
            title:'',
            // headerTransparent:true
        } 
    },
    { 
        component: BuyTicket, 
        name:"BuyTicket",
        options: {
            headerShown:true,
            title:'支付订单',
            // headerTransparent:true
        } 
    },
    { 
        component: SelectSeatPage, 
        name:"SelectSeatPage",
        options: {
            headerShown:true,
            title:'',
            // headerTransparent:true
        } 
    },
    { 
        component: OrderDetailPage, 
        name:"OrderDetailPage",
        options: {
            headerShown:true,
            title:'',
            // headerTransparent:true
        } 
    },
    { 
        component: CitysPage, 
        name:"CitysPage",
        options: {
            headerShown:true,
            title:'选择城市',
            // headerTransparent:true
        } 
    },
    { 
        component: MapView, 
        name: "MapView", 
        options: {
            headerShown:true,
            title:'地图'
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

import store from '../store/index';

function StackNavigators(){
    let navigation:any = useNavigation();
    const colorScheme = useColorScheme();
    return <Stack.Navigator
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,//切换路由时的显示和隐藏的动画方式
            headerShown:true,//是否隐藏头部导航
            headerLeft:()=>{
                return <Ionicons 
                name={'md-chevron-back-sharp'} 
                size={30} 
                color={colorScheme=='dark'?'#fff':'#fff'} 
                onPress={()=>{
                    navigation.goBack()
                }}/>
            },
            // headerRight:()=>{
            //     return <Text>Right</Text>
            // },
            headerStyle:{
                backgroundColor:colorScheme=='dark'?'#000':Theme.primaryColor,
                borderBottomWidth:1,
                borderBottomColor:colorScheme=='dark'?'#1a1b1c':Theme.primaryColor,
                
            },
            headerTitleStyle: {
                color: '#fff'
            },
            // headerTintColor:'#000',//头部导航标题颜色
            headerTitleAlign:'center',//头部标题居中
            // header: ({ navigation, route, options, back }) => {
            //     const title = getHeaderTitle(options, route.name);
                
            //     return (
            //         <Text>custom header -- {route.name}</Text>
            //     );
            // }
            headerBackTitle:' ',//返回键右侧的文字 置为 空，配置了此项 ，ios端显示，android不显示，不配置此项android端会默认显示screen name
        }}
        initialRouteName="AppTabBar"
        >
        {renderStackItems()}
    </Stack.Navigator>
}

export default StackNavigators;