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
  Text as Txt
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

import { get_cinema_list } from '../../api/cinema';
import { get_city_district_list } from '../../api/citys';
import { get_film_detail } from "../../api/film";
import DropdownMenu from '../../component/DropdownMenu';

const Cinema = ({app,navigation,route}:any) => {
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
    city_id: app.locationInfo.city_id,
    district_id: "",
    date: "",
    film_id: "",
    lat: "",
    lng: "",
    type: "",
    user_id: app.userInfo?app.userInfo.user_id:''
  })
  let [city_district_list, set_city_district_list] = useState([]);

  let [film_name,setFilmName] = useState('');

  

  useEffect(()=>{
    getList(true);
    getDistrictList();
    if(route.params && route.params.film_id){
      getFilmDetail()
    }else{
      setNavigation()
    }
  },[])

  
  const setNavigation = useCallback((film_name?:any)=>{
    navigation.setOptions({
      headerTitle:film_name,
      // headerLeft:'',
      headerTransparent: false,
      headerStyle: { 
        backgroundColor: colorScheme=='dark'?'#000':Theme.primaryColor
      },
      headerRight:()=>{
        return <Ionicons 
        name={'search'}
        style={{paddingRight:10}}
        size={25} 
        color={'#ccc'}
        onPress={()=>{
          navigation.navigate({
            name: "CitySearchPage",
          });
        }}/>
      },
      
    });
  },[film_name]);

  const getFilmDetail = useCallback(async ()=>{
    console.log('有参数吗？',route)
    if((route.params && !route.params.film_id) || !route.params) return;
    let film_detail_result = await get_film_detail({
      film_id: route.params && route.params.film_id,
    });
    console.log('有参数吗？film_detail_result',film_detail_result.film_name)
    setFilmName(film_detail_result.film_name);
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
    let result:any = await get_cinema_list(fetchOptions,'');
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
    // let { city_id } = props.locationInfo;
    // let _cookies = Cookies.get("locationInfo");
    // let _cookiesInfo = null;
    // if (_cookies) {
    //   _cookiesInfo = JSON.parse(_cookies);
    // }
    let result = await get_city_district_list({
      // city_id:_cookiesInfo && _cookiesInfo.city_id ? _cookiesInfo.city_id : city_id,
      city_id:app.locationInfo.city_id,
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



  return (<View style={styles.container}>
    {
      (route.params && route.params.film_id) && <View style={{paddingHorizontal:5}}>
        <ScrollView
        horizontal={true}
        style={{}}
        showsHorizontalScrollIndicator={false}
        stickyHeaderIndices={[]}>
          <Txt>2022-07-01</Txt>
          <Txt>2022-07-01</Txt>
          <Txt>2022-07-01</Txt>
          <Txt>2022-06-01</Txt>
          <Txt>2022-06-01</Txt>
          <Txt>2022-09-01</Txt>
        </ScrollView>
      </View>
    }
    <DropdownMenu 
    ref={refDropdownMenu}
    list={city_district_list}
    onTypeChange={(type:string)=>{
      console.log('12345678',type);
      fetchOptions.type = type;
      fetchOptions.page = 1;
      setFetchOptions(fetchOptions);
      getList(true)
    }}
    districtChange={(id:any)=>{
      console.log('id----',id);
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
    onScroll={(event)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
        onLoadMore();
      }
      if(offSetY>=100){
       
      }else{
        
      }
    }}
    onMomentumScrollEnd={(event:any)=>{}}>
      {
        list.map((item:any,index)=>{
          return <CinemaListItem
            key={index}
            title={item.cinema_name}
            value={item.min_low_sale_price}
            label={item.address}
            distance={item.distance}
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
        })
      }
      <BottomLoading
      isLoading={isLoading}
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

export default inject("app")(observer(Cinema));
