/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{ useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider,observer, inject } from 'mobx-react';
import store from './store/index';
import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useNavigationContainerRef 
} from '@react-navigation/native';
import StackNavigators from './navigators/StackNavigators';
import { TopView, Toast,Theme } from './component/teaset/index';//使用 ./component/teaset/index ui库需要安装依赖 prop-types,rebound,immutable,react-timer-mixin,create-react-class,fbjs  
import TabBar from './component/TabBar';
import { any } from 'prop-types';

import { get_user_info } from "./api/user";
import { SystemUpdataOverlay } from './component/SystemUpdate/SystemUpdataOverlay';
import { checkAppUpdate } from './api/appVersions';


// Theme.set(Theme.themes.black);
// Theme.set({
//   toastColor: '#e54847',
//   primaryColor:'#e54847'
// });




const App = (props:any) => {
  console.log('store========>>>',store.AppStore);
  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
  useEffect(()=>{
    if(!store.AppStore.userInfo){
      getUserInfo();
    }
  },[]);
  

  async function getUserInfo() {
    try{
      let result:any = await get_user_info();
      if (result) {
        delete result.token
        store.AppStore.setUserInfo(result);


        setTimeout(() => {
          new SystemUpdataOverlay().show(false);
        }, 3000);
      }
    }catch(err:any){
      console.log('err',err.message);
      store.AppStore.setUserInfo(null);
    }
  }
  
  const colorScheme = useColorScheme();
    return (
      <Provider {...store}>
        <SafeAreaView style={{flex:1,backgroundColor:colorScheme === 'dark' ?'#000':Theme.primaryColor}}>
          <TopView style={{flex:1}}>
            <StatusBar 
            hidden={false} 
            backgroundColor={Theme.primaryColor} //状态栏的背景色  
            barStyle={'light-content'}
            />
            <NavigationContainer //给react navigation 设置夜间模式和白天模式
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            ref={navigationRef} 
            onReady={()=>{
              console.log('onReady-----')
            }}>
              <StackNavigators/>
            </NavigationContainer>
            </TopView>
        </SafeAreaView>
    </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   
 });
 
 export default App;