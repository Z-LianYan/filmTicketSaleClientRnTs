import React,{useState,useEffect,useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight
} from 'react-native';
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
import DropdownMenu from '../../component/DropdownMenu';


const Cineam = () => {
  const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  let navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  let [list,setList] = useState([])
  let [isLoading,setLoading] = useState(false);
  let [isFinallyPage,setFinallyPage] = useState(false);
  let [fetchOptions,setFetchOptions] = useState({
    page: 1,
    limit: 3,
    city_id: "440100",
    district_id: "",
    date: "",
    film_id: "",
    lat: "",
    lng: "",
    type: "",
  })
  

  useEffect(()=>{
    getList(true)
  },[])

  const onLoadMore = ()=>{
    if(isLoading || isFinallyPage) return;
    fetchOptions.page += 1;
    setFetchOptions(fetchOptions);
    getList(true)
  }
  const onRefresh = ()=>{
    // setFinallyPage(false);
    fetchOptions.page = 1;
    setFetchOptions(fetchOptions);
    getList(false)
  }

  async function getList(isLoading:boolean){
    isLoading && setLoading(true);
    let result:any = await get_cinema_list(fetchOptions,'');
    // console.log('影院------》〉》〉',result);
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



  return (<View style={styles.container}>
    <NavigationBar 
      style={{
        zIndex:1
      }}
      position=''
      title='影院'
      leftView={
        <TouchableHighlight
          onPress={()=>{
            // navigation.navigate({
            //   path: "/citys",
            // });
          }}>
            <View 
            style={{flexDirection:'row',alignItems:'center'}}>
              <Text>广州</Text>
              <Ionicons 
              name={'chevron-down-outline'} 
              size={20} 
              style={{marginTop:-2}}
              color={colorScheme=='dark'?'#fff':'#000'} />
            </View>
        </TouchableHighlight>
      }
      rightView={
        <TouchableHighlight
          onPress={()=>{
            // navigation.navigate({
            //   path: "/cinema/search",
            // });
            refDropdownMenu.current.onHiddenMenu()
          }}>
          <Ionicons 
          name={'search-outline'} 
          size={20} 
          color={colorScheme === 'dark' ? '#fff' : '#000'}/>
        </TouchableHighlight>
        
      }/>
    <DropdownMenu 
    ref={refDropdownMenu}
    list={[{title:'123457654'},{title:'456哈哈哈哈'},{title:'123'},{title:'456'},{title:'123'},{title:'456'},{title:'123'},{title:'456'}]}/>
    <ScrollView
    stickyHeaderIndices={[]}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={()=>{
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

export default Cineam;
