import React, {Component, useState,useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { observer, inject } from 'mobx-react'
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  View as Viw,
  Text as Txt
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Overlay
} from '../../component/teaset/index';
import PropTypes, { any, number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";

import service from '../../utils/request';
import dayjs from 'dayjs';

import {
  create_order,
  pay_order,
  cancle_order,
  get_buy_ticket_detail,
} from "../../api/order";
import { get_user_info } from "../../api/user";
import { get_city_list } from "../../api/citys";


type Props={
  navigation:any,
  colorScheme:any,
  app:any
}
type State={
  letter:any,
  list:any,
  isLoading:boolean,
  fetchOptions:any,
  searchValue:string,
  stickyHeaderIndices:any,
  dataInitComplete:boolean
}

export default class CitysPageContent extends Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      list:[],
      isLoading:false,
      fetchOptions:{
        page: 1,
        limit: 5,
        status: "",
        keywords: "",
      },
      searchValue:'',
      letter:{
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: [],
      },
      stickyHeaderIndices:[0],

      dataInitComplete:false
    };
  }
  static defaultProps = {
  }

  componentDidMount(){
    this.getCityList();
  }
  async componentWillUnmount(){//只有反回的时候才能执行销毁（跳转不会销毁组件的）
    console.log('组件销毁前----》〉》〉');
  }

  async getCityList(){
    let { app } = this.props;
    let { letter } = this.state;
    this.setState({
      dataInitComplete:false
    })
    if(!app.cityList){
      let result:any = await get_city_list({});
      let citys = result.rows;
      for (let i = 0; i < citys.length; i++) {
        if (citys[i].id === 110100 || citys[i].id === 120100) {
          //110100北京 120100天津
          delete citys[i].children;
          letter[citys[i].first_letter].push(citys[i]);
        } else {
          let children = citys[i].children;
          for (let j = 0; j < children.length; j++) {
            delete children[j].children;
            letter[children[j].first_letter].push(children[j]);
          }
        }
      }
      app.cityList = letter;
      this.setState({
        letter
      })
    }else{
      this.setState({
        letter:app.cityList
      })
    }

    this.setState({
      dataInitComplete:true
    })
    
    
  };

  searchChange(val:string){
    let { app } = this.props;
    let { letter } = this.state;
    let letterObj = {}; 
    this.setState({
      dataInitComplete:false
    })
    for (let key in app.cityList) {
      for (let item of app.cityList[key]) {
        if (item.name.includes(val) || item.pinyin.includes(val)) {
          if(letterObj[key]) letterObj[key] = [...letterObj[key],item];
          if(!letterObj[key]) letterObj[key] = [item];
        }
      }
    }
    this.setState({
      letter:letterObj,
      dataInitComplete:true
    })
  }

  async setLocationInfo(item:any, type?:string) {
    let { app,navigation } = this.props;
    let { realLocation } = app.locationInfo;
    if (!item.name) return;
    //缓存用户选择的位置
    await AsyncStorage.setItem('locationInfo', JSON.stringify({
      city_id: item.id,
      city_name: item.name,
    }));
    app.setLocationInfo(
      {
        city_id: item.id,
        city_name: item.name,
        lng: realLocation && realLocation.lng,
        lat: realLocation && realLocation.lat,
        // isShowSwitchLocationModal: false, //关闭首页（film）banner 里的，切换城市的模态框
      },
      () => {
        navigation.goBack();
      }
    );
  }

  renderList (){
    let { letter,stickyHeaderIndices,dataInitComplete } = this.state;
    let { colorScheme } = this.props;
    let domArr:any = [];
    for(let key in  letter){
      if (letter[key].length){
        stickyHeaderIndices.push(stickyHeaderIndices[stickyHeaderIndices.length-1]+letter[key].length+1);
        domArr.push(<Text 
          style={{
            backgroundColor:colorScheme=='dark'?'#141313':'#eee',
            paddingHorizontal:13
          }}
          key={key+'letter'}
        >{key}</Text>);
        letter[key].map((item:any,index:number)=>{
          domArr.push( <CustomListRow 
            key={key+'-'+index+'cityname'}
            accessory="none"
            bottomSeparator={(index+1==letter[key].length)?'none':"full"} 
            backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
            title={item.name} 
            detail={""} 
            onPress={()=>{
              this.setLocationInfo(item);
            }}/>
          )
        })
      };
    }
    if(domArr.length){
      return domArr;
    }else if(dataInitComplete){
      return <Viw  style={{
        height:300,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Text style={{textAlign:'center',color:'#ccc'}}>没有找到匹配的城市</Text>
      </Viw>
      
    }
    
  }

  render() {
    let { colorScheme,app } = this.props;
    let { searchValue,stickyHeaderIndices,dataInitComplete } = this.state;
    return <View style={{
      ...styles.container,
      backgroundColor:colorScheme=='dark'?'#000':'#f4f4f4'
    }}> 
      <View style={{
        flexDirection:'row',
        padding:10
      }}>
        <Input 
        placeholder={`搜索城市名称或拼音`} 
        autoFocus={false}
        style={{
          backgroundColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
          color:colorScheme=='dark'?'#fff':'#000',
          flex:1,
          marginRight:10,
          borderRadius:20
        }}
        editable={true}//是否可编辑
        showsHorizontalScrollIndicator={false}//上下拖动回弹效果
        size='lg'
        // multiline={true}
        value={searchValue}
        onSubmitEditing={(e:any)=>{
          this.searchChange(searchValue)
        }}
        onChangeText={(text:any) => {
          if(!text){
            this.setState({
              letter:app.cityList
            })
          }
          this.setState({
            searchValue:text
          })
        }}
        />
        <Button 
        style={{
          width:60,
          borderRadius:20,
          backgroundColor:Theme.primaryColor,
          borderColor:Theme.primaryColor
        }} 
        titleStyle={{color:'#fff',fontSize:16}} 
        title="搜索" 
        size="sm"
        onPress={()=>{
          if(!searchValue){
            this.setState({
              letter:app.cityList
            })
          }else{
            this.searchChange(searchValue);
          }
        }}/>
      </View>
      
      <ScrollView
      bounces={false}//设置ios 上下拉回弹
      stickyHeaderIndices={stickyHeaderIndices}
      onMomentumScrollEnd={(event:any)=>{}}>
        {
          this.renderList()
        }
      </ScrollView>
    </View>;
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});
