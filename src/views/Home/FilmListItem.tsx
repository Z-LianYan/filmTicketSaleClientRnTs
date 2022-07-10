import React, { useState,useEffect } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react'
 import {
   StyleSheet,
   Image,
  //  View,
  //  Text,
   TouchableOpacity,
   Dimensions,
   TouchableHighlight,
   useColorScheme
 } from 'react-native';

 import { 
  Carousel,
  Theme,
  Button
} from '../../component/teaset/index';
var ScreenWidth = Dimensions.get('window').width;
import { 
  View,
  Text
} from '../../component/Themed';
type propsType = {
  imgUrl?:string,
  title?:string,
  playType?:string,
  isShowScore?:boolean,
  score?:string|number,
  btnTxt?:string,
  actors?:string,
  bottomText?:string,
  btnColor?:string,
  separator?:boolean,
  onPress?: () => void,
  onRightClick?: () => void,
}
const FilmListItem = ({
  imgUrl,
  title,
  playType,
  isShowScore = true,
  score = 0,
  btnTxt='购票',
  actors,
  bottomText,
  btnColor,
  separator = true,
  onPress,
  onRightClick
}:propsType)=>{ 
  const colorScheme = useColorScheme();
  const buttonStyle = {
    backgroundColor:'transparent'
  }
  if(btnColor){
    buttonStyle['borderColor'] = btnColor;
  }
  return <TouchableOpacity 
  activeOpacity={1} 
  onPress={()=>{
    onPress && onPress()
  }}>
    <View>
      <View style={styles.filmListItem}>
        <Image 
          resizeMode='cover' 
          key={imgUrl}
          style={styles.leftImage} 
          source={{uri: imgUrl }} />


        <View style={styles.middleBox}>
          <View style={styles.titleWrapper}>
            <Text numberOfLines={1} style={styles.titleSty}>{title}</Text>
            <Text style={styles.titleWrapperTag}>{playType}</Text>
          </View>
          {isShowScore ? (
            <View style={styles.scoreWrapper}>
              <Text style={styles.scoreText}>观众评分 <Text style={styles.scoreWrapperValue}>{score}</Text></Text>
            </View>
          ) : null}
          <Text numberOfLines={1} style={styles.actors}>主演：{actors}</Text>
          
          <Text numberOfLines={1} style={styles.areaText}>{bottomText}</Text>
        </View>
        {btnTxt ? (
          <Button
            title={btnTxt}
            type="default"
            style={buttonStyle}
            titleStyle={btnColor?{
              color:btnColor
            }:''}
            onPress={() => {
              onRightClick && onRightClick()
            }}
          />
        ) : null}
      </View>
      {separator ? <View style={{
        ...styles.separator,
        backgroundColor: colorScheme=='dark'?'#1a1b1c':'#eee',
      }}></View> : null}
    </View>
  
  </TouchableOpacity>
}
export default FilmListItem;
const styles = StyleSheet.create({
  filmListItem:{
    boxSizing: 'border-box',
    padding: 15,
    alignItems: 'center',
    flexDirection:'row',
    // backgroundColor:'#fff'
  },
  leftImage:{
    width: 66,
    height: 92,
    borderRadius: 2,
  },
  middleBox:{
    height: 92,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    fontSize: 13,
    justifyContent:'space-around'
  },
  titleWrapper:{
    flexDirection:'row',
    alignItems:'center'
  },
  titleSty:{
    lineHeight: 20,
    // color: '#000',
    fontSize: 16
  },
  titleWrapperTag:{
    backgroundColor: '#d2d6dc',
    marginLeft: 5,
    color: '#fff',
    paddingLeft: 2,
    paddingRight:2,
    borderRadius: 3,
    fontSize: 12,
  },
  scoreWrapper:{
    
  },
  scoreText:{
    color:'#797d82',
  },
  scoreWrapperValue:{
    color: Theme.primaryColor
  },
  actors:{
    color:'#797d82',
  },
  areaText:{
    color:'#797d82',
  },
  rightBtn:{

  },
  separator:{
    height: 1,
    marginLeft: 15,
  }
});