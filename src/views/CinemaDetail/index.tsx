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
  Linking,
  Image,
  Dimensions
} from 'react-native';
import { observer, inject } from 'mobx-react'

import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
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
import SlideView from './SlideView';
import HeaderBar from "../../component/HeaderBar";
import ItemCell from "./ItemCell";
import Tabs from "./Tabs";
import dayjs from "dayjs";
import { any } from 'prop-types';




var ScreenWidth = Dimensions.get('window').width;
const CinemaDetailPage = ({AppStore,navigation,route}:any) => {
  const colorScheme = useColorScheme();

  const [cinemaDetail,setCinemaDetail] = useState<any>();
  const [filmDetail,setFilmDetail] = useState<any>();
  const [filmList,setFilmList] = useState<any[]>([]);
  const [scheduleList,setScheduleList] = useState<any[]>([]);
  const [isSkeleton,setIsSkeleton] = useState<boolean>(true);
  const [activeDateKey,setActiveDateKey] = useState<number>(0);
  const [filmActiveIndex,setFilmActiveIndex] = useState<number>(0);
  const [activeBgImg,setActiveBgImg] = useState<string>('');
  const [isShowTitle,setShowTitle] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const serverDetialRef:{current:any} = useRef();
  const scrollViewDateRef:{current:any} = useRef();

  const headerHeight = useHeaderHeight();
  
  
  

  useEffect(()=>{
    setNavigatioin();
    getCinemaDetail();

  },[]);


  
  

  const setNavigatioin = useCallback((showLeftArrow=true)=>{
    navigation.setOptions({
      title: '',
      // headerLeft:'',
      headerTransparent: true
    })
  },[]);

  const getCinemaDetail = useCallback(async()=>{
    let result:any = await get_cinema_detail({
      cinema_id: route.params && route.params.cinema_id,
      isHasFilmList: true,
    });
    // console.log('result===>',result);
    if (result && result.filmList && !result.filmList.length) return navigation.goBack(); //当前选择的影院无排片返回上一页
    
    console.log('9999===>',route.params);
    let _filmActiveIndex = filmActiveIndex;
    if(route.params && route.params.film_id){
      for(let i=0;i<result.filmList.length;i++){
        if(route.params.film_id == result.filmList[i].film_id){
          setFilmDetail(result.filmList[i]);
          setFilmActiveIndex(i);
          _filmActiveIndex = i;
          break;
        };
      }
    }else{
      setFilmDetail(result.filmList[filmActiveIndex]);
    }
    
    setFilmList(result.filmList);

    setActiveBgImg((result.filmList && result.filmList.length) ? result.filmList[0].poster_img:'');

    setCinemaDetail(result);

    let film = result.filmList[_filmActiveIndex];
    if(film && film.show_date && film.show_date.length){
      // console.log('film---=>',film);
      let date_index = (route.params && route.params.date)?film.show_date.indexOf(route.params.date):activeDateKey;
      setActiveDateKey(date_index)
      getDateScheduleList(result.id,film.film_id,film.show_date[date_index])
    }
    // setRefreshing(false)
  },[cinemaDetail]);

  const getDateScheduleList = useCallback(async(cinema_id,film_id,date)=>{
    // console.log('----getDateScheduleList',cinema_id,film_id,date)
    setScheduleList([]);
    let result:any = await get_date_schedule({
      cinema_id: cinema_id,
      film_id: film_id,
      date: date,
    });
    setScheduleList(result);
    setIsSkeleton(false);
  },[])
  
  return (<ScrollView
    bounces={false}//设置ios 上下拉回弹
    stickyHeaderIndices={[0]}
    style={{
      ...styles.container,
      backgroundColor:colorScheme=='dark'?'#000':'#fff'
    }}
    // refreshControl={
    //   <RefreshControl 
    //   tintColor={Theme.primaryColor}//ios
    //   colors={[Theme.primaryColor]}//android
    //   title="下拉刷新"//ios
    //   refreshing={refreshing} 
    //   onRefresh={()=>{
    //     setRefreshing(true);
    //     setFilmActiveIndex(0);
    //     getCinemaDetail();
    //   }} />
    // }
    onMomentumScrollEnd={(event:any)=>{}}
    onScroll={(event)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {}
      if(offSetY>=10){
        setShowTitle(true);
      }else{
        setShowTitle(false);
      }
    }}>

      {/* {
        cinemaDetail && cinemaDetail.name?<HeaderBar 
        title={cinemaDetail && cinemaDetail.name} 
        headerHeight={headerHeight}/>:<View style={{height:headerHeight}}></View>
      } */}

      <HeaderBar 
        title={cinemaDetail && cinemaDetail.name} 
        headerHeight={headerHeight}/>


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
        borderTopColor:colorScheme === 'dark' ?'#1a1b1c':'#f4f4f4',
        borderBottomColor:colorScheme === 'dark' ?'#1a1b1c':'#f4f4f4',
      }}>
        <Ionicons 
        name={'location-sharp'} 
        style={styles.cinemaAddrLeftIcon}
        size={25} 
        color={colorScheme === 'dark' ? '#fff' : '#999'}
        onPress={()=>{
          navigation.navigate({
            name:'MapView',
            params:{
              lat:cinemaDetail.lat,
              lng:cinemaDetail.lng,
              cinema_name:cinemaDetail.name
            }
          })
        }}/>
        <View style={{
          ...styles.cinemaAddrTextWrapper,
          borderRightColor:colorScheme === 'dark' ? '#1a1b1c' : '#f4f4f4',
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

      {
        filmList && <SlideView 
        active_index={filmActiveIndex}
        onChange={(_index:number)=>{
          setFilmActiveIndex(_index);
          // console.log('SlideView--index===>',_index,filmList);
          setActiveDateKey(0);
          setActiveBgImg(filmList[_index].poster_img);
          setFilmDetail(filmList[_index]);
          getDateScheduleList(route.params && route.params.cinema_id,filmList[_index].film_id,filmList[_index].show_date[0]);
        }}
        list={filmList}/>
      }

      <TouchableOpacity 
      activeOpacity={1} 
      style={styles.filmNameJuqing}
      onPress={()=>{
        if (filmDetail && filmDetail.film_id) {
          navigation.push("FilmDetail",{ 
            isNotCanSelectSeatBuy: true,
            film_id:filmDetail.film_id
          });
        }
      }}>
        <View style={styles.filmNameJuqingLeft}>
          <View  style={styles.filmNameJuqingLeftTop}>
            <Text style={styles.filmName}>{filmDetail && filmDetail.film_name}</Text>
            <Text style={styles.filmNameScore}>{filmDetail && filmDetail.grade}分</Text>
          </View>
          
            {filmDetail && filmDetail.category_names ? <Text 
            style={styles.filmNameJuqingLeftBottom} 
            numberOfLines={1}>
                {filmDetail.category_names} | {filmDetail.runtime}分钟 |{" "}
                {filmDetail.actors}
            </Text> : null}
          
        </View>
        <Ionicons 
        name={'chevron-forward'} 
        style={styles.cinemaAddrLeftIcon}
        size={25} 
        color={colorScheme === 'dark' ? '#fff' : '#666'}/> 
      </TouchableOpacity>

      {
       filmDetail && filmDetail.show_date?<Tabs 
       key={filmActiveIndex+'filmActiveIndex'}
       active_index={activeDateKey}
       list={filmDetail.show_date}
       onChange={(index:number)=>{
        //  console.log('Tabs===>Tabs',index);
         setActiveDateKey(index);
         getDateScheduleList(route.params && route.params.cinema_id,filmDetail.film_id,filmDetail.show_date[index]);
       }}/>:null
      }


      {
        
      scheduleList.map((item, index) => {
          return (
            <ItemCell
              key={index}
              startTime={dayjs(item.start_runtime).format("HH:mm")}
              endTime={dayjs(item.end_runtime).format("HH:mm")}
              showType={item.language + item.play_type_name}
              hall={item.hall_name}
              price={
                item.is_section == 1 ? handlerSectionPrice(item.sectionPrice) : item.sale_price
              }
              onPress={() => {
                if (AppStore.userInfo) {
                  navigation.navigate({
                    name:'SelectSeatPage',
                    params:{
                      schedule_id:item.id
                    }
                  })
                } else {
                  navigation.navigate({
                    name: "LoginPage"
                  });
                }
              }}
            />
          );
        })
      }
      

      <ServerDetial 
      app={AppStore} 
      ref={serverDetialRef}/>
      
    </ScrollView>);

    function handlerSectionPrice(sectionPrice:any) {
      let price = 0;
      let num = 0;
      sectionPrice.map((item:any, index:number) => {
        item.price = Number(item.price);
        if (price === Number(item.price) && index !== 0) {
          num += 1;
        }
        if (price === 0) {
          price = item.price;
        } else if (item.price < price) {
          price = item.price;
        }
      });
      return price + (num + 1 == sectionPrice.length ? "" : " 起");
    }
    
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  cinemaDetailServer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:25,
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
    fontSize:12,
    color:'#ffb232'
  },
  serverArrowRight:{
  },
  cinemaAddrBox:{
    flexDirection:'row',
    borderTopWidth:1,
    borderBottomWidth:1,
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
  },

  filmImage:{
    width:90,
    height:130,
    
  },
  filmNameJuqing:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    paddingTop:20
  },
  filmNameJuqingLeft:{
    flex:1
  },
  filmNameJuqingLeftTop:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  filmName:{
    fontSize:15,
    // fontWeight:'bold',
  },
  filmNameScore:{
    fontSize:15,
    marginLeft:5,
    color:'#ffb232'
  },
  filmNameJuqingLeftBottom:{
    marginTop:10,
    color:'#797d82'
  }

});

export default inject("AppStore")(observer(CinemaDetailPage));
