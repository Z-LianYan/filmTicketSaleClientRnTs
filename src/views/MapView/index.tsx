import React, { useState,useEffect } from 'react';
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
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Dimensions
} from 'react-native';

import WebView from 'react-native-webview';


import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import { 
  View,
  Text
} from '../../component/Themed';
import { 
  Button,
  Carousel,
  // NavigationBar,
  Theme,
  ListRow,
  Toast,
  Input
} from '../../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";
import { edit_user_info, get_user_info } from "../../api/user";
var ScreenObj = Dimensions.get('window');
// import { AMapSdk, MapView, MapType } from "react-native-amap3d";

const MapViewComponent = ({app,navigation,route}:any) => {
  let [submiting,setSubmiting] = useState(false);
  useEffect(()=>{
    
    // AMapSdk.init(
    //   Platform.select({
    //     ios: "9bd6c82e77583020a73ef1af59d0c759",
    //     android: "4aebbdd0faddd3134a5f60a955c928ff",
    //   })
    // );

  },[]);
  

  return <View style={styles.container}>

      <WebView
        source={{uri: `https://uri.amap.com/marker?position=${route.params.lng},${route.params.lat}&name=${route.params.cinema_name}&callnative=1`}}
      />
    

    {/* <Button
      style={styles.btnRecharge}
      title={'保存'}
      type="primary"
      size="lg"
      disabled={submiting}
      onPress={() => {
        onEditUserInfo();
      }}
    /> */}

  {/* <MapView
    mapType={MapType.Satellite}
    initialCameraPosition={{
      target: {
        latitude: route.params.lat,
        longitude: route.params.lng,
      },
      zoom: 8,
    }}
  /> */}
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
});

export default inject("app")(observer(MapViewComponent));
