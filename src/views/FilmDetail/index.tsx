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
  Dimensions,
  RefreshControl
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
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";
import { edit_user_info, get_user_info } from "../../api/user";
var ScreenObj = Dimensions.get('window');

const FilmDetail = ({app,navigation}:any) => {
    
  const colorScheme = useColorScheme();
  let [submiting,setSubmiting] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(()=>{
    navigation.setOptions({
      title: '电影详情',
      headerMode:'float',
      // headerLeft:()=>{
      //   return <Text>txt</Text>
      // },
      // headerStyle:{
      //   // backgroundColor:'transparent',
      //   // position:'absolute',
      //   // headerTransparent:true
      // }
    });

    const unsubscribe = navigation.addListener('gestureStart', (e:any) => {
      console.log('gestureStart')
      // Do something
    });
  
    return unsubscribe;
  },[navigation]);
  

  return <View style={styles.container}>
    <ScrollView
    stickyHeaderIndices={[]}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      refreshing={refreshing} 
      title="下拉刷新"//ios
      onRefresh={()=>{
      }} />
    }
    onScroll={(event)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
        
      }
      if(offSetY>=100){
        
      }else{
        
      }
    }}
    onMomentumScrollEnd={(event:any)=>{}}>
      <CustomListRow 
      accessory="indicator" 
      bottomSeparator="none" 
      title={'用户名'} 
      detail={<View>
        <Text>全部</Text>
      </View>} />

      <Button
        style={styles.btnRecharge}
        title={'保存'}
        type="primary"
        size="lg"
        disabled={submiting}
        onPress={() => {
          // onEditUserInfo();
        }}
      />

      <View style={{height:300}}></View>

    </ScrollView>
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
    
  btnRecharge:{
    marginHorizontal:10,
    marginTop:ScreenObj.height - ScreenObj.height/1.8
  }
});

export default inject("app")(observer(FilmDetail));
