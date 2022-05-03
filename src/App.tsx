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
// import { navigationRef } from './lib/router';
 
 
 // const Section: React.FC<{
 //   title: string;
 // }> = ({children, title}) => {
 //   const isDarkMode = useColorScheme() === 'dark';
 //   return (
 //     <View style={styles.sectionContainer}>
 //       <Text
 //         style={[
 //           styles.sectionTitle,
 //           {
 //             color: isDarkMode ? Colors.white : Colors.black,
 //           },
 //         ]}>
 //         {title}
 //       </Text>
 //       <Text
 //         style={[
 //           styles.sectionDescription,
 //           {
 //             color: isDarkMode ? Colors.light : Colors.dark,
 //           },
 //         ]}>
 //         {children}
 //       </Text>
 //     </View>
 //   );
 // };
 
 const App = () => {
  //  const isDarkMode = useColorScheme() === 'dark';
 
  //  const backgroundStyle = {
  //    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //  };
  const colorScheme = useColorScheme();
   return (
     <Provider {...store}>
         <SafeAreaView style={{flex:1}}>
           <StatusBar hidden={false} translucent={true}/>
           <NavigationContainer 
           theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
             <StackNavigators/>
           </NavigationContainer>
         </SafeAreaView>
    </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   
 });
 
 export default App;
 