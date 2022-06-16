import React, { useState,useEffect,useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { observer, inject } from 'mobx-react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
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
  View as Viw
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
import HeaderBar from "../../component/HeaderBar";
import HeaderContainer from './HeaderContainer'

import { get_film_detail, add_cancel_want_see } from "../../api/film";
var ScreenObj = Dimensions.get('window');

const FilmDetail = ({app,navigation,route}:any) => {
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();
  let [submiting,setSubmiting] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  // const [headerTransparent, setHeaderTransparent] = React.useState(true);
  let [detail,setDetail] = useState<any>(null);
  let [isSkeleton,setIsSkeleton] = useState(true);
  let [headerBackgroundColor,setHeaderBackgroundColor] = useState<any>('transparent');
  let [title,setTitle] = useState<any>('');

  useEffect(()=>{
    navigation.setOptions({
      title: '',
      headerLeft:'',
      headerTransparent: true,
      headerBackground: () => (
        <HeaderBar 
        title={title} 
        headerHeight={headerHeight}
        backgroundColor={headerBackgroundColor}/>
      )
    });
    getFilmDetail();
  
    return ()=>{

    };
  },[headerBackgroundColor]);

  const getFilmDetail = useCallback(async ()=>{
    let { locationInfo } = app;
    let { params } = route;
    let result = await get_film_detail({
      film_id: params && params.film_id,
      city_id: locationInfo && locationInfo.city_id,
    });
    setDetail(result);
    setIsSkeleton(false);
    // const color_result = await ImageColors.getColors(result.poster_img, {
    //   fallback: '#228B22',
    //   cache: true,
    //   key: 'unique_key',
    // })
    console.log('color_result----',result);
    
  },[])
  

  return <View style={styles.container}>
    <ScrollView
    stickyHeaderIndices={[]}
    style={{position:'relative'}}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      refreshing={refreshing} 
      title="下拉刷新"//ios
      onRefresh={()=>{
        console.log('onRefresh')
      }} />
    }
    onScroll={(event)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      setHeaderBackgroundColor(offSetY>=100?Theme.primaryColor:'transparent')
      setTitle(offSetY>=100?detail.film_name:'')
    }}
    onMomentumScrollEnd={(event:any)=>{}}>
      {
        detail?<HeaderContainer detail={detail}/>:null
      }

      <CustomListRow 
      accessory="indicator" 
      bottomSeparator="none" 
      title={'用户名'} 
      detail={<View>
        <Text onPress={()=>{
          console.log('12345')
        }}>全部</Text>
      </View>} />

      <Button
        style={styles.btnRecharge}
        title={'选座购票'}
        type="primary"
        size="lg"
        disabled={submiting}
        onPress={() => {
          // onEditUserInfo();
        }}
      />

      <View style={{height:800}}></View>

    </ScrollView>
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
  
    
  btnRecharge:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    zIndex:100
    // marginHorizontal:10,
    // marginTop:ScreenObj.height - ScreenObj.height/1.8
  }
});

export default inject("app")(observer(FilmDetail));
