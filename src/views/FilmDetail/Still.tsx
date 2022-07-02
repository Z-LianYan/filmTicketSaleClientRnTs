import React, { useState,useEffect,useCallback,useRef } from 'react';
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
  Dimensions,
  RefreshControl,
  ImageBackground,
  View as Viw,
  Text as Txt,

} from 'react-native';

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
  Input,
  AlbumView
} from '../../component/teaset/index';
import CustomListRow from '../../component/CustomListRow';
var ScreenObj = Dimensions.get('window');
import ImageViewer from '../../component/ImageViewer';
const StillCompnent = ({detail,app}:any) => {
  let navigation:any = useNavigation();
  const colorScheme = useColorScheme();
  const refImageViewer:{current:any} = useRef();
  
  useEffect(()=>{
    return ()=>{

    };
  },[detail]);

  const renderAction = useCallback(()=>{

    return (detail && detail.stage_photo
    ? detail.stage_photo.map((item:any, index:number) => {
        return (<TouchableOpacity  
        activeOpacity={1}
        style={{
          ...styles.actorItem,
          marginRight:10
        }}
        key={index+'stage_photo'}
        onPress={()=>{
          refImageViewer.current.open({
            index:index,
            imgs:detail.stage_photo.map((item:any)=>({url:item}))
          })
        }}>
            
          <Image 
          resizeMode='cover' 
          style={styles._image} 
          source={{uri: item }} />
        </TouchableOpacity>)
      }):null)
  },[])

  return <Viw style={styles.actionsContainer}>
    <ImageViewer ref={refImageViewer}/>
    <CustomListRow 
    accessory="indicator" 
    bottomSeparator="full" //full,indent,none
    title={'剧照'}
    style={{marginBottom:10}}
    detail={<View>
      {/* <Text onPress={()=>{
        console.log('12345')
      }}>全部({detail.stage_photo ? detail.stage_photo.length : 0})</Text> */}
    </View>} />
    <View style={{height:10}}></View>
    <View style={{paddingHorizontal:5}}>
      <ScrollView
      horizontal={true}
      style={{paddingHorizontal:5}}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[]}>
        {renderAction()}
      </ScrollView>
    </View>
    
  </Viw>;
};

const styles = StyleSheet.create({
  actionsContainer:{
    // paddingHorizontal:5
  },
  actorItem:{
    width:150,
  },
  _image:{
    width:150,
    height:100,
    borderRadius:5
  },
  actorsname:{
    fontSize:12
  }
  
  
});

export default inject("app")(observer(StillCompnent));
