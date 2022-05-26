import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';

import { 
  Button,
  Carousel
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import BottomLoading from '../../component/BottomLoading';
import CinemaListItem from './CinemaListItem';

const Cineam = () => {
  console.log('影院')
  let navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  let [list,setList] = useState([])
  let [isLoading,setLoading] = useState(false);
  let [isFinallyPage,setFinallyPage] = useState(false);

  useEffect(()=>{
    // getList()
  },[])
  return (<View style={styles.container}>
    <NavigationBar 
      style={{
        zIndex:1
      }}
      position=''
      title='影院'
      leftView={<Text>234</Text>}/>

    {/* <Button type='primary' title="123"></Button> */}

    <ScrollView
    stickyHeaderIndices={[]}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={()=>{
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
        // activeTabIndex===0 && onRefresh();
        // activeTabIndex===1 && onRefresh();
      }} />
    }
    onScroll={(event)=>{
      const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
      const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
      const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
      
      if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
        // activeTabIndex===0 && onLoadMore();
        // activeTabIndex===1 && onLoadMore();
      }
      if(offSetY>=100){
       
      }else{
        
      }
    }}
    onMomentumScrollEnd={(event:any)=>{}}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1,height:100,backgroundColor:'red'}}></View>
        <View style={{flex:1,height:100,backgroundColor:'yellow'}}></View>
      </View>
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
