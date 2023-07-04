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
  Dimensions,
  TouchableOpacity
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
import CinemaListItem from './CinemaListItem';

import { get_cinema_list,get_film_in_schedule_dates } from '../../api/cinema';
import { get_city_district_list } from '../../api/citys';
import { get_film_detail } from "../../api/film";
import DropdownMenu from '../../component/DropdownMenu';
import dayjs from 'dayjs';
const ScreenWidth = Dimensions.get('window').width;
import { useFocusEffect } from '@react-navigation/native';

const Cinema = ({AppStore,navigation,route}:any) => {
  const cacheCityId:{current:any} = useRef();
  const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  // let navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  let [list,setList] = useState([])
  let [isLoading,setLoading] = useState(false);
  let [isFinallyPage,setFinallyPage] = useState(false);
  let [fetchOptions,setFetchOptions] = useState({
    page: 1,
    limit: 15,
    city_id: AppStore.locationInfo.city_id,
    district_id: "",
    date: "",
    film_id: "",
    lat: "",
    lng: "",
    type: "",
    user_id: AppStore.userInfo ? AppStore.userInfo.user_id:''
  })
  let [city_district_list, set_city_district_list] = useState([]);
  let [dateList, setDateList] = useState([]);
  const scrollViewRef:{current:any} = useRef();
  const [tabObj,setTabObj] = useState<any>({});
  const [scrollW,setScrollW] = useState(0);
  // let [film_name,setFilmName] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      if(AppStore.locationInfo.city_id != cacheCityId.current){
        cacheCityId.current = AppStore.locationInfo.city_id;
        console.log('1234567',AppStore.locationInfo.city_id);
        setFetchOptions({
          ...fetchOptions,
          type:'',
          district_id:''
        })
        // onRefresh();
        // getDistrictList();

        getDistrictList();
        if(route.params && route.params.film_id){
          getFilmInScheduleDates();
          getFilmDetail();
        }else{
          setNavigation('影院');
          getList(true);
        }
      }
    }, [])
  );

  

  useEffect(()=>{

    // getDistrictList();
    // if(route.params && route.params.film_id){
    //   getFilmInScheduleDates();
    //   getFilmDetail();
    // }else{
    //   setNavigation('影院');
    //   getList(true);
    // }
  },[]);
  async function getFilmInScheduleDates() {
    let result:any = await get_film_in_schedule_dates({
      city_id:AppStore.locationInfo.city_id,
      film_id: route.params && route.params.film_id,
    });
    if (!result || !result.rows.length) return navigation.goBack(); //无排片日期时返回
    fetchOptions.date = result.rows[0];
    fetchOptions.film_id = route.params && route.params.film_id;

    setFetchOptions({
      ...fetchOptions
    })
    setDateList(result.rows);
    onRefresh();
  }

  
  const setNavigation = useCallback((film_name?:any)=>{
    navigation.setOptions({
      headerTitle:film_name,
      // headerLeft:'',
      headerTransparent: false,
      headerStyle: { 
        backgroundColor: colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor
      },
      headerRight:()=>{
        return <Ionicons 
        name={'search'}
        style={{paddingRight:10}}
        size={25} 
        color={'#ccc'}
        onPress={()=>{
          navigation.navigate({
            name: "CinemaSearch",
          });
        }}/>
      },
      
    });
  },[]);

  const getFilmDetail = useCallback(async ()=>{
    if((route.params && !route.params.film_id) || !route.params) return;
    let film_detail_result:any = await get_film_detail({
      film_id: route.params && route.params.film_id,
    });
    setNavigation(film_detail_result.film_name);
  },[]);

  const onLoadMore = ()=>{
    if(isLoading || isFinallyPage) return;
    fetchOptions.page += 1;
    setFetchOptions(fetchOptions);
    getList(true)
  }
  const onRefresh = ()=>{
    fetchOptions.page = 1;
    setFetchOptions(fetchOptions);
    getList(false)
  }

  async function getList(isLoading:boolean){
    isLoading && setLoading(true);
    let result:any = await get_cinema_list({
      ...fetchOptions,
      user_id:AppStore.userInfo ? AppStore.userInfo.user_id:'',
      city_id: AppStore.locationInfo.city_id,
      lat: AppStore.locationInfo.lat,
      lng: AppStore.locationInfo.lng
    },'');
    let _list = [];
    if(fetchOptions.page==1){
      _list = result.rows;
      setRefreshing(false)
    }else{
      _list = list.concat(result.rows);
    }
    setList(_list);
    if(_list.length>=result.count){
      setFinallyPage(true);
    }else{
      setFinallyPage(false);
    }
    setLoading(false);
    _list = [];
  }

  async function getDistrictList() {
    let result:any = await get_city_district_list({
      city_id:AppStore.locationInfo.city_id,
    });
    result.rows.unshift({
      first_letter: null,
      id: "",
      is_hot: null,
      module_id: "",
      name: "全城",
      pinyin: "quanbu",
    });
    set_city_district_list(result.rows);
  }


  function handerDate(date:any) {
    let today = dayjs().format("YYYY-MM-DD");
    let tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
    let houtian = dayjs().add(2, "day").format("YYYY-MM-DD");
    let cur_y = dayjs(date).format("YYYY");
    let y = dayjs().format("YYYY");
    switch (dayjs(date).format("YYYY-MM-DD")) {
      case today:
        return "今天" + dayjs(date).format("MM月DD日");
      case tomorrow:
        return "明天" + dayjs(date).format("MM月DD日");
      case houtian:
        return "后天" + dayjs(date).format("MM月DD日");
      default:
        return (
          handleWeek(dayjs(date).day()) +
          dayjs(date).format(cur_y == y ? "MM月DD日" : "YY年MM月DD日")
        );
    }
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

  function setIndex(index:number) {
    //兼容错误
    if (!scrollViewRef) return;
    //拿到当前项的位置数据
    let layout = tabObj[index];
    if(!layout) return;
    let rx = ScreenWidth / 2;
    //公式
    let sx = layout.x - rx + layout.width / 2;
    //如果还不需要移动,原地待着
    if (sx < 0) sx = 0;
    //移动位置
    sx < scrollW - ScreenWidth && scrollViewRef && scrollViewRef.current && scrollViewRef.current.scrollTo({ x: sx, animated: true });
    //结尾部分直接移动到底
    sx >= scrollW - ScreenWidth && scrollViewRef && scrollViewRef.current && scrollViewRef.current.scrollToEnd({ animated: true });
  }



  return (<View style={styles.container}>
    {
      (route.params && route.params.film_id) && <View style={{
        paddingHorizontal:5,
        borderBottomColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
        borderBottomWidth:1
        }}>
        <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        style={{
          
        }}
        showsHorizontalScrollIndicator={false}
        stickyHeaderIndices={[]}>
          {
            dateList.map((item,index)=><TouchableOpacity 
            key={item+index+'1234'}  
            style={{
              alignItems:'center',
              justifyContent:'center',
              paddingHorizontal:10,
              height:50,
              position:'relative'
            }}
            onPress={()=>{
              fetchOptions.date = item;
              fetchOptions.page = 1;
              setFetchOptions(fetchOptions);
              getList(true);
              setIndex(index);
            }}
            onLayout={(event:any)=>{
              const { x, y, width, height } = event.nativeEvent.layout;
              tabObj[index] = {
                x, 
                y, 
                width, 
                height
              }
              setTabObj({
                ...tabObj
              });
              setScrollW(scrollW+width);
            }}>
              <Txt 
              style={{
                color:item==fetchOptions.date?Theme.primaryColor:colorScheme=='dark'?'#fff':'#666',
                textAlignVertical:'center',
                fontWeight:'bold'
              }}>{handerDate(item)}</Txt>
              {
                item==fetchOptions.date && <View style={{
                  position:'absolute',
                  bottom:0,
                  width:'80%',
                  height:2,
                  backgroundColor:Theme.primaryColor
                }}></View>
              }
            </TouchableOpacity>
            )
          }
        </ScrollView>
      </View>
    }
    <DropdownMenu 
    ref={refDropdownMenu}
    key={AppStore.locationInfo.city_id}
    list={city_district_list}
    onTypeChange={(type:string)=>{
      fetchOptions.type = type;
      fetchOptions.page = 1;
      setFetchOptions(fetchOptions);
      getList(true)
    }}
    districtChange={(id:any)=>{
      fetchOptions.district_id = id;
      fetchOptions.page = 1;
      setFetchOptions(fetchOptions);
      getList(true)
    }}/>
    <ScrollView
    stickyHeaderIndices={[]}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      title="下拉刷新"//ios
      refreshing={refreshing} 
      onRefresh={()=>{
        onRefresh();
      }} />
    }
    onMomentumScrollEnd={(event)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
        onLoadMore();
      }
      if(offSetY>=100){
       
      }else{
        
      }
    }}>
      {
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
                  film_id: route.params && route.params.film_id,
                  date: fetchOptions.date,
                },
              });
            }}
          />
        })
      }
      <BottomLoading
      isLoading={isLoading}
      emptyText="当前区域暂无排片的影院"
      isFinallyPage={isFinallyPage}
      hasContent={list.length?true:false}/>
    </ScrollView>

    {/* <FlatList
      // ListEmptyComponent={()=>(
      //   <View><Text>暂无内容</Text></View>
      // )}
      ItemSeparatorComponent={
        ()=>{
          return <View><Text>66</Text></View>
        }
      }
      ListFooterComponent={
        <BottomLoading
          emptyText='12'
          isLoading={isLoading}
          isFinallyPage={isFinallyPage}
          hasContent={list.length?true:false}/>
        }
      // ListHeaderComponent={()=>(<View><Text>我是Header组件</Text></View>)}
      data={[{title:'title1'},{title:'title2'},{title:'title3'},{title:'title4'},{title:'title5'},{title:'title6'}]}
      renderItem={({ item, index, separators }) => (
        // <CinemaListItem
        //   key={index}
        //   title={item.cinema_name}
        //   value={item.min_low_sale_price}
        //   label={item.address}
        //   distance={item.distance}
        //   onClick={() => {
        //     this.props.history.push({
        //       pathname: `/cinema/detail`,
        //       state: {
        //         cinema_id: item.cinema_id,
        //         film_id: params && params.film_id,
        //         date: fetchOptions.date,
        //       },
        //     });
        //   }}
        // />
        <CinemaListItem
          title={'影院名称'}
          value={'价格'}
          label={'地址'}
          distance={'距离'}
          onPress={() => {
            // this.props.history.push({
            //   pathname: `/cinema/detail`,
            //   state: {
            //     cinema_id: item.cinema_id,
            //     film_id: params && params.film_id,
            //     date: fetchOptions.date,
            //   },
            // });
            console.log('onPress')
          }}
        />
      )}
      getItemLayout={(data, index) => (
        {length: 320, offset: 320 * index, index}
      )}
      horizontal={false}
      initialNumToRender={5}
      columnWrapperStyle={{height:300}}
      numColumns={2}
      onRefresh={()=>{
        setRefreshing(true);
        console.log('下拉刷新了')
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }}
      refreshing={refreshing}
      onEndReached = {//列表被滚动到距离内容最底部不足onEndReachedThreshold设置的的距离时调用。
        () => {
          console.log('onEndReached')
        }
      }
      onEndReachedThreshold={0.1}
    /> */}



  </View>);
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default inject("AppStore")(observer(Cinema));
