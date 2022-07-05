import React,{useState,useEffect,useRef,useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  View as Viw,
  Text as Txt,
  Linking
} from 'react-native';
import { observer, inject } from 'mobx-react'

import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  Button,
  Carousel,
  Theme,
  Label,
  Drawer,
  ActionSheet
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import BottomLoading from '../../component/BottomLoading';

import { get_cinema_list,get_film_in_schedule_dates } from '../../api/cinema';
import { get_city_district_list } from '../../api/citys';
import { get_film_detail } from "../../api/film";
import DropdownMenu from '../../component/DropdownMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { get_cinema_detail, get_date_schedule } from "../../api/cinema";

import { useCallbackState } from "../../utils/useCallbackState";

import ServerDetial from './ServerDetial';





const CinemaDetailPage = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();

  const [cinemaDetail,setCinemaDetail] = useState<any>();
  const [filmDetail,setFilmDetail] = useState<any>();
  const [filmList,setFilmList] = useState<any[]>();
  const [scheduleList,setScheduleList] = useState<any[]>();
  const [isSkeleton,setIsSkeleton] = useState<boolean>(true);
  const [activeDateKey,setActiveDateKey] = useState<number>(0);
  const [activeBgImg,setActiveBgImg] = useState<string>('');
  const [refreshing, setRefreshing] = React.useState(false);
  const serverDetialRef:{current:any} = useRef();
  

  useEffect(()=>{
    // setNavigatioin();
    getCinemaDetail();
  },[]);


  
  

  const setNavigatioin = useCallback((cinemaName)=>{
    navigation.setOptions({
      title: <Txt>{cinemaName}</Txt>,
      // headerLeft:'',
      // headerTitle:<Text>123</Text>,
      headerTransparent: false,
      // headerStyle: { 
      //   backgroundColor: Theme.primaryColor,
      //   borderBottomWidth:1,
      //   borderBottomColor:colorScheme=='dark'?'#1a1b1c':Theme.primaryColor
      // },
      
    })
  },[]);

  const getCinemaDetail = useCallback(async()=>{
    // let { history } = this.props;
    // let { location } = history;
    console.log('route.params---',route.params);
    let result:any = await get_cinema_detail({
      cinema_id: route.params && route.params.cinema_id,
      isHasFilmList: true,
    });
    console.log('result===>',result);
    if (result && result.filmList && !result.filmList.length) return navigation.goBack(); //当前选择的影院无排片返回上一页
    if (route.params && route.params.film_id && route.params.date) {
      if (result.filmList[0].film_id == route.params.film_id) {
        let index = result.filmList[0].show_date.indexOf(route.params.date);
        if (index != -1) {
          setActiveDateKey(index)
        }
      }
    }
    

    setFilmDetail(result.filmList[0]);
    setFilmList(result.filmList);

    setActiveBgImg((result.filmList && result.filmList.length) ? result.filmList[0].poster_img:'');

    setNavigatioin(result && result.name);
    setCinemaDetail(result);
    let film = result.filmList[0];
    if(film && film.show_date && film.show_date.length){
      getDateScheduleList(result.id,film.film_id,film.show_date[activeDateKey])
    }
    
    // this.newSwiper();

    setRefreshing(false)
  },[]);

  const getDateScheduleList = useCallback(async(cinema_id,film_id,date)=>{
    // console.log('0000======>',cinema_id,film_id,date)
    setScheduleList([]);
    let result:any = await get_date_schedule({
      cinema_id: cinema_id,
      film_id: film_id,
      date: date,
    });
    // console.log('排片列表====》',result);
    setScheduleList(result);
    setIsSkeleton(false);
  },[])
  
  return (<ScrollView
    stickyHeaderIndices={[]}
    style={{
      ...styles.container,
      backgroundColor:colorScheme=='dark'?'#000':'#fff'
    }}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      title="下拉刷新"//ios
      refreshing={refreshing} 
      onRefresh={()=>{
        setRefreshing(true);
        getCinemaDetail();
      }} />
    }
    onMomentumScrollEnd={(event:any)=>{}}>

      <Text style={styles.cinemaDetailName}>
        {cinemaDetail && cinemaDetail.name}
      </Text>

      <TouchableOpacity 
      activeOpacity={1} 
      style={styles.cinemaDetailServer}
      onPress={()=>{
        serverDetialRef.current.open(cinemaDetail.service)
      }}>
        <Viw style={styles.cinemaDetailServerItemWrapper}>
          {
            cinemaDetail && cinemaDetail.service && cinemaDetail.service.map((item:any,index:number)=>{
              return <Txt 
              key={index+'service'}
              style={styles.cinemaDetailServerItem}
              >{item.label}</Txt>
            })
          }

        </Viw>
        <Ionicons 
        name={'chevron-forward'} 
        style={styles.serverArrowRight}
        size={25} 
        color={colorScheme === 'dark' ? '#fff' : '#999'}/>
      </TouchableOpacity>

      <View style={{
        ...styles.cinemaAddrBox,
        borderTopColor:colorScheme === 'dark' ?'#666':'#f4f4f4',
        borderBottomColor:colorScheme === 'dark' ?'#666':'#f4f4f4',
      }}>
        {/* <Ionicons 
        name={'location-outline'} 
        style={styles.cinemaAddrLeftIcon}
        size={25} 
        color={colorScheme === 'dark' ? '#fff' : '#666'}/> */}
        <View style={{
          ...styles.cinemaAddrTextWrapper,
          borderRightColor:colorScheme === 'dark' ? '#fff' : '#f4f4f4',
        }}>
          <Text style={{
            ...styles.cinemaAddrText
          }} 
          numberOfLines={1}>
            {cinemaDetail && cinemaDetail.address}
          </Text>
        </View>
        
        <Ionicons 
        name={'call-outline'} 
        style={styles.cinemaAddrRightIcon}
        size={25} 
        color={colorScheme === 'dark' ? '#fff' : '#999'}
        onPress={()=>{
          Linking.openURL(`tel:${cinemaDetail && cinemaDetail.phone}`)
        }}/>
      </View>

      {/* {
        list.map((item:any,index)=>{
          return <CinemaListItem
            key={index}
            title={item.cinema_name}
            value={item.min_low_sale_price}
            label={item.address}
            distance={item.distance}
            onPress={() => {

              navigation.navigate({
                name: 'CinemaDetailPage',
                params: {
                  cinema_id: item.cinema_id,
                  film_id: app.params && app.params.film_id,
                  date: fetchOptions.date,
                },
              });
            }}
          />
        })
      } */}


      <ServerDetial 
      app={app} 
      ref={serverDetialRef}/>
      
    </ScrollView>);
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  cinemaDetailName:{
    textAlign:'center',
    marginTop:10,
    fontSize:18
  },
  cinemaDetailServer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    paddingHorizontal:50,
  },
  cinemaDetailServerItemWrapper:{
    flexDirection:'row',
    // justifyContent:'center',
    flexWrap:'wrap',
    
  },
  cinemaDetailServerItem:{
    paddingHorizontal:3,
    borderColor:'#ffb232',
    borderWidth:1,
    marginBottom:2,
    position:'relative',
    marginRight:3,
    fontSize:13
  },
  serverArrowRight:{
    // position:'absolute',
    // right:0,
    // top:'50%'
  },
  cinemaAddrBox:{
    flexDirection:'row',
    borderTopWidth:1,
    borderBottomWidth:1,
    // paddingVertical:10,
    alignItems:'center',
    height:50,
    marginTop:10
  },
  cinemaAddrTextWrapper:{
    flex:1,
    height:48,
    textAlign:'center',
    borderRightWidth:1,
    justifyContent:'center',
    marginHorizontal:10
  },
  cinemaAddrText:{
    textAlign:'center'
  },
  cinemaAddrLeftIcon:{
    paddingLeft:10
  },
  cinemaAddrRightIcon:{
    paddingRight:10
  }
});

export default inject("app")(observer(CinemaDetailPage));
