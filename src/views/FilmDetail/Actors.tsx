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
  Input
} from '../../component/teaset/index';
import CustomListRow from '../../component/CustomListRow';
import ImageViewer from '../../component/ImageViewer';

var ScreenObj = Dimensions.get('window');

const ActionsCompnent = ({detail,app}:any) => {
  let navigation:any = useNavigation();
  const colorScheme = useColorScheme();
  const refImageViewer:{current:any} = useRef();
  
  
  useEffect(()=>{
    return ()=>{

    };
  },[detail]);

  const renderAction = useCallback(()=>{

    return (detail && detail.actors
    ? detail.actors.map((item:any, index:number) => {
        return (<View style={{
          ...styles.actorItem,
          marginRight:10
        }}  key={index+'actors'}>
          <TouchableOpacity activeOpacity={1} onPress={()=>{
            refImageViewer.current.open({
              index:index,
              imgs:detail.actors.map((item:any)=>({url:item.avatar}))
            })
          }}>
            <Image 
            resizeMode='cover' 
            style={{
              ...styles.actorAvatar
            }} 
            source={{uri: item.avatar }} />
          </TouchableOpacity>
          
          <Text style={styles.actorsname}>{item.name}</Text>
          <Text style={{
            ...styles.actorsname,
            color:'#797d82'
          }}>{item.role}</Text>
        </View>)
      }):null)
  },[])
  

  return <Viw style={styles.actionsContainer}>
    <ImageViewer ref={refImageViewer}/>
    <CustomListRow 
    accessory="none" 
    bottomSeparator="none" 
    title={'演职人员'}/>
    <ScrollView
    horizontal={true}
    style={{paddingHorizontal:5}}
    showsHorizontalScrollIndicator={false}
    stickyHeaderIndices={[]}>
      {renderAction()}
    </ScrollView>
  </Viw>;
};

const styles = StyleSheet.create({
  actionsContainer:{
    paddingHorizontal:5
  },
  actorItem:{
    width:80,
  },
  actorAvatar:{
    width:80,
    height:100,
    borderRadius:5
  },
  actorsname:{
    fontSize:12
  }
  
  
});

export default inject("app")(observer(ActionsCompnent));
