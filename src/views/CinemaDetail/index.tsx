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
import dayjs from "dayjs";
import { any } from 'prop-types';




var ScreenWidth = Dimensions.get('window').width;
const CinemaDetailPage = ({app,navigation,route}:any) => {
  const colorScheme = useColorScheme();

  const [cinemaDetail,setCinemaDetail] = useState<any>();
  const [filmDetail,setFilmDetail] = useState<any>();
  const [filmList,setFilmList] = useState<any[]>();
  const [scheduleList,setScheduleList] = useState<any[]>();
  const [isSkeleton,setIsSkeleton] = useState<boolean>(true);
  const [activeDateKey,setActiveDateKey] = useState<number>(0);
  const [activeBgImg,setActiveBgImg] = useState<string>('');
  const [isShowTitle,setShowTitle] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const serverDetialRef:{current:any} = useRef();
  const scrollViewDateRef:{current:any} = useRef();

  const headerHeight = useHeaderHeight();
  
  
  // const [activeFilmIndex,setActiveFilmIndex] = useState<number>(0);

  useEffect(()=>{
    setNavigatioin()
    getCinemaDetail();

  },[]);


  
  

  const setNavigatioin = useCallback((showLeftArrow=true)=>{
    navigation.setOptions({
      title: '',
      headerLeft:()=>{
        return showLeftArrow?<Ionicons 
        name={'chevron-back'} 
        size={30} 
        color={colorScheme === 'dark' ? '#fff' : '#000'} 
        onPress={()=>{
          navigation.goBack();
        }}/>:<Txt></Txt>
      },
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

    // setNavigatioin('',true,'#000');
    setCinemaDetail(result);
    let film = result.filmList[0];
    if(film && film.show_date && film.show_date.length){
      getDateScheduleList(result.id,film.film_id,film.show_date[activeDateKey])
    }
    
    // this.newSwiper();

    setRefreshing(false)
  },[]);

  const getDateScheduleList = useCallback(async(cinema_id,film_id,date)=>{
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
    stickyHeaderIndices={[0]}
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
    onMomentumScrollEnd={(event:any)=>{}}
    onScroll={(event)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
      }
      if(offSetY>=10){
        setShowTitle(true);
        setNavigatioin(false)
      }else{
        setShowTitle(false);
        setNavigatioin(true)
      }
    }}>

      {
        isShowTitle?<HeaderBar 
        title={cinemaDetail && cinemaDetail.name} 
        headerHeight={headerHeight}/>:<View style={{height:headerHeight}}></View>
      }

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

      {
        filmList && <SlideView 
        // _activeIndex={activeFilmIndex} 
        // onChange={(index:number)=>{
        //   console.log(index)
        //   setActiveFilmIndex(index)
        // }}
        list={filmList}/>
      }

      <View style={styles.filmNameJuqing}>
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
      </View>


      <ScrollView
      horizontal={true}
      ref={scrollViewDateRef}
      onScrollEndDrag={(event)=>{
        console.log('onScrollEndDrag')
        // handleScrollTo(event)
      }}
      style={{
        paddingHorizontal:0,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingVertical:10,
        paddingRight:10,
        paddingLeft:10
      }}
      contentContainerStyle={{alignItems:'flex-end'}}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[]}
      onContentSizeChange={(contentWidth, contentHeight)=>{
        scrollViewDateRef.current.scrollTo({ x: 100, y: 0, animated: true });
      }}>
        {filmDetail &&
            filmDetail.show_date &&
            filmDetail.show_date.map((date:string, index:number) => {
              return (
                <Text 
                style={{color:activeDateKey==index?Theme.primaryColor:'#666'}}
                key={index}
                >{handerDate(date)}</Text>
              );
            })}

      </ScrollView>

      

      <View style={{height:5000}}></View>


     

      <ServerDetial 
      app={app} 
      ref={serverDetialRef}/>
      
    </ScrollView>);


    function handerDate(date:string) {
      let cur_y = dayjs(date).format("YYYY");
      let y = dayjs().format("YYYY");
      return (
        handleWeek(dayjs(date).day()) +
        dayjs(date).format(cur_y == y ? "MM月DD日" : "YY年MM月DD日")
      );
    }
    function handleWeek(day:any) {
      switch (day) {
        case 0:
          return "周日";
        case 1:
          return "周一";
        case 2:
          return "周二";
        case 3:
          return "周三";
        case 4:
          return "周四";
        case 5:
          return "周五";
        case 6:
          return "周六";
        default:
          return "";
      }
    }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  cinemaDetailName:{
    textAlign:'center',
    marginTop:10,
    fontSize:18,
    fontWeight:'bold'
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
    fontSize:13,
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
    fontSize:17,
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

export default inject("app")(observer(CinemaDetailPage));
