import React, { useState,useEffect,useCallback,useRef } from 'react';
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
  View as Viw,
  Modal
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
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";
import { edit_user_info, get_user_info } from "../../api/user";
import HeaderBar from "../../component/HeaderBar";
import HeaderContainer from './HeaderContainer';
import Actors from './Actors';
import Still from './Still';
import CommentArea from './CommentArea';
import ImageViewer from '../../component/ImageViewer';



import { get_film_detail, add_cancel_want_see } from "../../api/film";
import { Right } from '../../component/teaset/react-native-legacy-components/src/NavigatorBreadcrumbNavigationBarStyles.android';
var ScreenObj = Dimensions.get('window');



const FilmDetail = ({AppStore,navigation,route}:any) => {
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();
  let [submiting,setSubmiting] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  // const [headerTransparent, setHeaderTransparent] = React.useState(true);
  let [detail,setDetail] = useState<any>(null);
  let [isSkeleton,setIsSkeleton] = useState(true);
  let [isInitPage,setInitPage] = useState(true);
  let [headerBackgroundColor,setHeaderBackgroundColor] = useState<any>('transparent');
  let [title,setTitle] = useState<any>('');
  let [openAbstract,setOpenAbstract] = useState<boolean>(false);
  // let [visibleModal,setVisibleModal] = useState<boolean>(true);
  const refCommentList:{current:any} = useRef();
  
  
  useEffect(()=>{
    navigation.setOptions({
      title: '',
      // headerLeft:'',
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
    let { locationInfo } = AppStore;
    let { params } = route;
    
    let result = await get_film_detail({
      film_id: params && params.film_id,
      city_id: locationInfo && locationInfo.city_id,
    });
    setDetail(result);
    
    setRefreshing(false);
    
    if(isInitPage){
      setIsSkeleton(false);
      setInitPage(false)
    }
    // const color_result = await ImageColors.getColors(result.poster_img, {
    //   fallback: '#228B22',
    //   cache: true,
    //   key: 'unique_key',
    // })
    // console.log('color_result----',result);
    
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
        console.log('onRefresh');
        setRefreshing(true);
        getFilmDetail();
        refCommentList.current.refreshCommentlist()
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
        detail?<HeaderContainer 
        detail={detail} 
        reSetDetail={()=>{
          getFilmDetail();
        }}/>:null
      }

      <View style={styles.abstractWrapper}>
        <Text style={{height:'auto'}}>{detail && detail.abstract}</Text>
        {/* <View style={styles.abstractBotBtn}>
          <Ionicons 
          name={openAbstract?'md-chevron-up':'md-chevron-down'}
          size={20} 
          color={colorScheme=='dark'?'#fff':'#000'}
          onPress={()=>{
            setOpenAbstract(!openAbstract);
          }}/>
        </View> */}
      </View>

      {
        detail && <Actors detail={detail}/>
      }
     
      {
        detail && <Still  detail={detail}/>
      }

      
      <CommentArea 
      userInfo={AppStore.userInfo} 
      route={route} 
      film_detail={detail}
      ref={refCommentList}
      getFilmDetail={getFilmDetail}/>

      <View style={{height:20}}></View>

    </ScrollView>

    {
      route.params && route.params.isNotCanSelectSeatBuy?null:(detail && detail.hasSchedule)?<Button
        style={styles.selectSeatBuyTicket}
        title={'选座购票'}
        type="primary"
        size="lg"
        disabled={submiting}
        onPress={() => {
          navigation.navigate({
            name: "CinemaPageStack",
            params:{
              film_id: detail.id,
              film_name: detail.film_name
            }
          });
        }}
      />:null
    }

    {
      isSkeleton && <View style={{
        ...styles.skeletonContainer,
        backgroundColor:colorScheme=='dark'?'#000':'#fff'
      }}></View>
    }
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
  
    
  selectSeatBuyTicket:{
    borderRadius:0
  },
  abstractWrapper:{
    paddingTop:12,
    paddingBottom:0,
    paddingHorizontal:15,
  },
  abstractBotBtn:{
    flexDirection:'row',
    justifyContent:'center'
  },

  skeletonContainer:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0
  }
});

export default inject("AppStore")(observer(FilmDetail));
