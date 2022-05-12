/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
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
import { Provider } from 'mobx-react';
import store from './store/index';
import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import StackNavigators from './navigators/StackNavigators';
import { observer, inject } from 'mobx-react';
import { TopView, Toast,Theme } from './component/teaset/index';//使用 ./component/teaset/index ui库需要安装依赖 prop-types,rebound,immutable,react-timer-mixin,create-react-class,fbjs  


// Theme.set(Theme.themes.black);
// Theme.set({
//   toastColor: '#e54847',
//   primaryColor:'#e54847'
// });


const App = () => {
  
  const colorScheme = useColorScheme();
    return (
      <Provider {...store}>
        {/* <SafeAreaView style={{flex:1}}> */}
          <TopView style={{flex:1}}>
            <StatusBar 
            hidden={false} 
            backgroundColor={'green'} //状态栏的背景色  
            barStyle='dark-content'/>
            <NavigationContainer //给react navigation 设置夜间模式和白天模式
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <StackNavigators/>
            </NavigationContainer>
            </TopView>
        {/* </SafeAreaView> */}
    </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   
 });
 
 export default App;
 