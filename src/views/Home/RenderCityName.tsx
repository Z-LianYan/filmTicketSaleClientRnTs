import React, { useState } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react'
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   useColorScheme,
   Platform,
   ActivityIndicator,
   Image,
   View,
   Text
 } from 'react-native';

 import { 
   Button,
   Carousel
 } from '../../component/teaset/index';
 
//  import { get_film_hot } from '../../api/film';

import { TouchableOpacity } from 'react-native-gesture-handler';
 
 const RenderCityName = (props?:any)=>{
   let navigation:any = useNavigation();
   return <View style={styles.tagFilmName}>
    <View style={styles.tagFilmNameMask}></View>
    <TouchableOpacity style={styles.contentWrapper} onPress={()=>{
      // navigation.navigate({
      //   path: "citys",
      // });
    }}>
      <Text style={styles.cityName}>广州</Text>
      <Ionicons 
      name={'chevron-down-outline'} 
      size={20} 
      style={{marginTop:-2}}
      color={'#fff'} />
    </TouchableOpacity>
    
    <View style={styles.locationShowBox}>
      <View style={styles.locationMask}></View>
      <View style={styles.topArrow}></View>
      <Text style={styles.leftTxt}>定位显示您在广州</Text>
      <Button
        type="primary"
        size='sm'
        onPress={(e:any) => {}}
        title="切换到广州"
      >
      </Button>
    </View>
   </View>
 }
 export default inject('app')(observer(RenderCityName));


 const styles = StyleSheet.create({
   tagFilmName:{
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection:'row',
     color: '#fff',
     fontSize: 12,
     paddingTop: 5,
     paddingBottom: 5,
     paddingLeft: 8,
     paddingRight: 8,
     position:'relative',
   },
   tagFilmNameMask:{
     position: 'absolute',
     zIndex: -1, 
     opacity: 0.4,
     left:0,
     bottom:0,
     top:0,
     right:0,
     backgroundColor: '#000',
     borderRadius: 15,
   },
   contentWrapper:{
    flexDirection:'row',
   },
   cityName:{
     color:'#fff'
   },
   locationShowBox:{
     position: 'absolute',
     left: 0,
     top: 40,
     // width: 230,
     justifyContent: 'space-between',
     alignItems: 'center',
     flexDirection:'row',
     padding: 5,
   },
   locationMask:{
     position: 'absolute',
     left:0,
     bottom:0,
     top:0,
     right:0,
     backgroundColor:'#000',
     opacity: 0.6,
     borderRadius: 5,
     zIndex: -1,
   },
   topArrow:{
      position: 'absolute',
      top: -20,
      left: 20,
      zIndex:100,
      borderWidth: 10,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderBottomColor: '#000',
      opacity: 0.6
   },
   leftTxt:{
     marginRight: 10,
     color: '#fff',
   }
 });
 

 