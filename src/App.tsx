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
import { ThemeProvider, Button, createTheme } from '@rneui/themed';
 const App = () => {
    const colorScheme = useColorScheme();
    const theme = createTheme({
      lightColors: {
        primary: '#e54847',
      },
      darkColors: {
        primary: '#e54847',
      },
    });
   return (
     <Provider {...store}>
        <StatusBar hidden={false} translucent={true}/>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={{flex:1}}>
            <NavigationContainer //给react navigation 设置夜间模式和白天模式
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <StackNavigators/>
            </NavigationContainer>
         </SafeAreaView>
        </ThemeProvider>
    </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   
 });
 
 export default App;
 