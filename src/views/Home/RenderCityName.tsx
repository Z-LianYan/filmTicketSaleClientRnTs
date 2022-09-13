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

import AsyncStorage from '@react-native-async-storage/async-storage';

 
//  import { get_film_hot } from '../../api/film';

import { TouchableOpacity } from 'react-native-gesture-handler';
import app from '../../store/app';
 
 const RenderCityName = ({app,onCityChange}:any)=>{
   let navigation:any = useNavigation();
   return <View style={styles.tagFilmName}>
    <View style={styles.tagFilmNameMask}></View>
    <TouchableOpacity style={styles.contentWrapper} onPress={()=>{
      navigation.navigate({
        name: "CitysPage",
      });
    }}>
      <Text 
      style={styles.cityName} 
      key={app.locationInfo.city_name}
      numberOfLines={1}>{app.locationInfo.city_name}</Text>
      <Ionicons 
      name={'chevron-down-outline'} 
      size={20} 
      style={{marginTop:-2}}
      color={'#fff'} />
    </TouchableOpacity>
    
    {
      app.locationInfo.realLocation && app.locationInfo.realLocation.city_id!=app.locationInfo.city_id &&<View style={styles.locationShowBox}>
        <View style={styles.locationMask}></View>
        <View style={styles.topArrow}></View>
        <Text style={styles.leftTxt}>定位显示您在{app.locationInfo.realLocation.city_name}</Text>
        <Button
          type="primary"
          size='sm'
          onPress={async (e:any) => {
            app.setLocationInfo({
              city_name:app.locationInfo.realLocation.city_name,
              city_id:app.locationInfo.realLocation.city_id,
              lng: app.locationInfo.realLocation.lng,
              lat: app.locationInfo.realLocation.lat
            });
            //缓存切换定位的位置，下次打开app直接读取缓存的数据
            await AsyncStorage.setItem('locationInfo', JSON.stringify({
              city_id: app.locationInfo.realLocation.city_id,
              city_name: app.locationInfo.realLocation.city_name,
            }));
            onCityChange && onCityChange();
          }}
          title={"切换到"+app.locationInfo.realLocation.city_name}
        >
        </Button>
      </View>
    }
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
    maxWidth:50,
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
 

 