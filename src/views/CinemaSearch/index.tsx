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
  Dimensions,
  View as Viw,
  Text as Txt,
  Platform
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
  ActionSheet,
  Input
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import BottomLoading from '../../component/BottomLoading';

import { get_cinema_list } from '../../api/cinema';
import { get_city_district_list } from '../../api/citys';
import { get_film_detail } from "../../api/film";
import DropdownMenu from '../../component/DropdownMenu';
import { useHeaderHeight } from '@react-navigation/elements';

import CinemaListItem from '../Cinema/CinemaListItem';

var ScreenWidth = Dimensions.get('window').width;

import HeaderBar from "../../component/HeaderBar";


const CinemaSearch = ({app,navigation,route}:any) => {
  const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  // let navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  let [list,setList] = useState<[]>([])
  let [isLoading,setLoading] = useState(false);
  let [isFinallyPage,setFinallyPage] = useState(false);
  let [fetchOptions,setFetchOptions] = useState({
    page: 1,
    limit: 8,
    city_id: "",
    district_id: "",
    lat: "",
    lng: "",
    keywords: "",
  })

  let [searchValue,setSearchValue] = useState('');
  const headerHeight = useHeaderHeight();
  useEffect(()=>{
    navigation.setOptions({
      title: <Viw style={{width:ScreenWidth-150}}>
        <Input 
        placeholder={`输入影城名称`} 
        autoFocus={true}
        style={{
          backgroundColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
          color:colorScheme=='dark'?'#fff':'#000',
          paddingTop:Platform.OS=='ios'?12:8
          // height:300,
          // borderWidth:0
        }}
        editable={true}//是否可编辑
        keyboardAppearance={colorScheme}//'default', 'light', 'dark'
        size='lg'
        // multiline={true}
        value={searchValue}
        onSubmitEditing={(e:any)=>{
          // console.log('onSubmitEditing',e.nativeEvent.text)
          // onToRecharge()
          onRefresh()
        }}
        onChangeText={(text:any) => {
          console.log('text',text);
          setSearchValue(text);
          // setNavigation(title,score,commentContent)
        }}
        />
      </Viw>,
      // headerLeft:'',
      // headerTitle:<Text>123</Text>,
      headerTransparent: false,
      // headerStyle: { 
      //   backgroundColor: Theme.primaryColor,
      //   borderBottomWidth:1,
      //   borderBottomColor:colorScheme=='dark'?'#1a1b1c':Theme.primaryColor
      // },
      headerRight:()=>{
        return <Button 
        style={{borderRadius:20,backgroundColor:'#00b578',borderColor:'#00b578'}} 
        titleStyle={{color:'#fff'}} 
        title="搜索" 
        size="md"
        onPress={()=>{
          onRefresh()
        }}></Button>
      },
    })
  },[searchValue])



  const onLoadMore = ()=>{
    if(isLoading || isFinallyPage) return;
    fetchOptions.page += 1;
    setFetchOptions(fetchOptions);
    getList(true)
  }
  const onRefresh = ()=>{
    fetchOptions.page = 1;
    setFetchOptions(fetchOptions);
    getList(true)
  }
  
  const getList = useCallback(async (isLoading:boolean)=>{
    if(!searchValue) {
      setList([]);
      setRefreshing(false)
      return;
    };
    try{
      isLoading && setLoading(true);
      let result:any = await get_cinema_list({
        ...fetchOptions,
        city_id: app.locationInfo.city_id,
        lat: app.locationInfo.lat,
        lng: app.locationInfo.lng,
        keywords: searchValue,
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
      setRefreshing(false)
    }catch(err:any){
      console.log(err.message)
    }
  },[searchValue])

  return (<View style={styles.container}>
    {/* <HeaderBar 
      title={<Viw style={{width:ScreenWidth-150}}>
        <Input 
        placeholder={`输入影城名称`} 
        style={{
          backgroundColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
          color:colorScheme=='dark'?'#fff':'#000',
          paddingTop:Platform.OS=='ios'?12:8
          // height:300,
          // borderWidth:0
        }}
        // editable={true}//是否可编辑
        keyboardAppearance={colorScheme}//'default', 'light', 'dark'
        size='lg'
        // multiline={true}
        autoFocus
        value={searchValue}
        onSubmitEditing={(e:any)=>{
          console.log('onSubmitEditing',e.nativeEvent.text)
          // onToRecharge()
        }}
        onChangeText={(text:any) => {
          console.log('text',text);
          setSearchValue(text);
          // setNavigation(title,score,commentContent)
        }}
        />
      </Viw>} 
      headerHeight={headerHeight}
      // rightView={
      //   <Button 
      //   disabled={(score && commentContent.length>=5)?false:true}
      //   style={{borderRadius:20,backgroundColor:'#00b578'}} 
      //   titleStyle={{color:'#fff'}} 
      //   title="发布" 
      //   size="md"
      //   onPress={()=>{
      //     addComment();
      //   }}></Button>
      // }
      /> */}
    <ScrollView
    stickyHeaderIndices={[]}
    refreshControl={
      <RefreshControl 
      tintColor={Theme.primaryColor}//ios
      colors={[Theme.primaryColor]}//android
      title="下拉刷新"//ios
      refreshing={refreshing} 
      onRefresh={()=>{
        // onRefresh();
        setRefreshing(true);
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
              navigation.navigate({
                name: 'CinemaDetailPage',
                params: {
                  cinema_id: item.cinema_id,
                  film_id: app.params && app.params.film_id,
                },
              });
            }}
          />
        })
      }
      <BottomLoading
      isLoading={isLoading}
      isFinallyPage={isFinallyPage}
      hasContent={list.length?true:false}/>
    </ScrollView>

  </View>);
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default inject("app")(observer(CinemaSearch));
