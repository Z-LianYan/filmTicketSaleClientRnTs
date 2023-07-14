import React, { useState,useEffect,useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import { observer, inject } from 'mobx-react';
import { observable, action, makeAutoObservable,runInAction } from 'mobx';

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
  Dimensions
} from 'react-native';

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
  Input
} from '../../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";

import { user_recharge, get_user_info } from "../../api/user";
import service from '../../utils/request';


var ScreenObj = Dimensions.get('window');

const Recharge = ({AppStore,navigation}:any) => {
    
  const colorScheme = useColorScheme();
  let [rechargePrice,setRechargePrice] = useState('');
  let [fontPrice,setFontPrice] = useState<any>({
    1: "",
    2: "",
    3: "百",
    4: "千",
    5: "万",
    6: "十万",
    7: "百万",
    8: "千万",
    9: "亿",
    10: "十亿",
    11: "百亿",
  });
  let [fontPriceIndex,setFontPriceIndex] = useState(0);
  let [submiting,setSubmiting] = useState(false);

  const valRef:{current:any} = useRef();


  useEffect(()=>{
  })

  async function onToRecharge() {
    if (!rechargePrice) return Toast.message('请输入充值金额');
    Alert.alert(
      `您将要充值${rechargePrice}元到你的余额，确定充值吗？`,
      "",
      [
        {
          text: "再想想",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "确定", onPress: async () => {
            onGotoRecharge();
          }
        }
      ]
    );
  }

  async function getUserInfo() {
    let result = await get_user_info();

    if (result) AppStore.setUserInfo(result);
   
  }

  async function onGotoRecharge() {
    setSubmiting(true)
    try {
      await user_recharge({
        rechargePrice: Number(rechargePrice),
        navigation
      });
      setRechargePrice('');
      setFontPriceIndex(0);
      setSubmiting(false);
      getUserInfo();

      navigation.goBack()
    } catch (err) {
      setSubmiting(false);
    }
  }

  return <View style={styles.container}>
    <View style={{height:30}}></View>
    <CustomListRow 
    titleStyle={{
      fontSize:18,
      fontWeight:'bold'
    }}
    accessory="none"
    bottomSeparator="none" 
    title={'充值金额'} 
    detail={''} />

    <View style={styles.numTextWrapper}>
      {fontPrice[fontPriceIndex]? <Text style={styles.numTextLine}></Text>:null}
      {fontPrice[fontPriceIndex]? <Text style={styles.numTextTxt}>{fontPrice[fontPriceIndex]}</Text>:null}
      
    </View>
    <CustomListRow 
    accessory="none"
    bottomSeparator="none" 
    title={<View>
      <View style={styles.inputWrapper}>
        <Input 
        value={rechargePrice} 
        clearButtonMode="never"
        style={{
          ...styles.input,
          color:colorScheme=="dark"?'#fff':'#000'
        }}
        placeholderTextColor="#999"
        selectionColor={Theme.primaryColor}
        maxLength={11}
        keyboardType="numeric"
        placeholder="请输入充值金额"
        onSubmitEditing={(e:any)=>{
          console.log(e.nativeEvent.text)
          onToRecharge()
        }}
        onChangeText={(val:any)=>{
          
        }}
        autoFocus
        onChange={(e:any)=>{
          let val = e.nativeEvent.text;
          console.log('isNaN(val)--->>',isNaN(val));
          let index = val.indexOf(".");
          if (index != -1 && val.slice(index + 1).length>=3) return;//如 1.1111 变 1.11
          if(!isNaN(val)) {
            setRechargePrice(val)
          }else{
            setRechargePrice(val.slice(0,val.length-1))
          }
          if(index != -1) {
            let s_len = val.slice(0,index);
            setFontPriceIndex(s_len.length);
          }else{
            setFontPriceIndex(val.length);
          }
        }}/>

        <Ionicons 
          name={'ios-close-circle-sharp'} 
          style={styles.iosCloseCircleSharp}
          size={30} 
          color={colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor} 
          onPress={(e)=>{
              setRechargePrice('');
              setFontPriceIndex(0)
          }}/>
        
      </View>
      
    </View>} 
    detail={''} />

    <Button
      style={styles.btnRecharge}
      title={'充值'}
      type="primary"
      size="lg"
      disabled={submiting}
      onPress={() => {
        // sendVerifyCode()
        onToRecharge();
      }}
    />
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  numTextWrapper:{
    height:38,
    lineHeight:38,
    flexDirection:'row',
    paddingLeft:30,
    alignItems:'center',
    // marginVertical:10
  },
  numTextLine:{
    width:3,
    height:16,
    backgroundColor:'#666',
    marginRight:10
  },
  numTextTxt:{
    color:'#666',
    fontSize:18,
    fontWeight:'bold'
  },
  inputWrapper:{
    width:ScreenObj.width - 24,
    position:'relative',
    // backgroundColor:'#ccc'
  },
  input:{
    width:'100%',
    height:50,
    fontSize:18,
    fontWeight:'bold',
    backgroundColor:'transparent',
    borderColor:'transparent'
  },
  iosCloseCircleSharp:{
    position:'absolute',
    right:10,
    top:9,
  },
  btnRecharge:{
    marginHorizontal:10,
    marginTop:ScreenObj.height - ScreenObj.height/1.8
  }
});

export default inject("AppStore")(observer(Recharge));
