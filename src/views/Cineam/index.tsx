/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';

import { 
  Button,
  Carousel
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';



const Cineam = () => {
  console.log('影院')
  let navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  return (<View>
    <NavigationBar 
    title={'影院'}/>
    <Text style={styles._text} onPress={()=>{
      navigation.goBack()
    }}>影院
    {/* 123456345678123456345678123456345678123456345678123456345678
    123456345678123456345678123456345678123456345678123456345678 */}
    
    </Text>

    <Button type='primary' title="123"></Button>



    <View style={{height:100}}></View>

    <FlatList
      // ListEmptyComponent={()=>(
      //   <View><Text>暂无内容</Text></View>
      // )}
      ItemSeparatorComponent={
        ()=>{
          return <View><Text>66</Text></View>
        }
      }
      // ListFooterComponent={()=>(<View><Text>我是Footer组件</Text></View>)}
      // ListHeaderComponent={()=>(<View><Text>我是Header组件</Text></View>)}
      data={[{title:'title1'},{title:'title2'},{title:'title3'},{title:'title4'},{title:'title5'},{title:'title6'}]}
      renderItem={({ item, index, separators }) => (
        <View style={{backgroundColor:'#ccc',width:'48%',height:300}}><Text>{item.title}</Text></View>
      )}
      getItemLayout={(data, index) => (
        {length: 320, offset: 320 * index, index}
      )}
      horizontal={false}
      initialNumToRender={5}
      columnWrapperStyle={{height:300,justifyContent: 'space-between'}}
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
    />




  </View>);
};

const styles = StyleSheet.create({
  _text:{
    // color:'#000'
  }
});

export default Cineam;
