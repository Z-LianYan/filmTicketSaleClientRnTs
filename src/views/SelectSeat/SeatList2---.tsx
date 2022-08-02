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
  TouchableOpacity,
  Image,
  PanResponder,
  Animated
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
  TransformView,
  Overlay
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import BottomLoading from '../../component/BottomLoading';
import DropdownMenu from '../../component/DropdownMenu';
import dayjs from 'dayjs';
import { create_order } from "../../api/order";

import { get_schedule_info, get_seat } from "../../api/selectSeat";
import { 
  SEAT_ALREADY_SALE,
  SEAT_DISABLE,
  SEAT_NO_SELECTED,
  SEAT_SCREEN,
  SEAT_SECTION_A,
  SEAT_SECTION_B,
  SEAT_SECTION_C,
  SEAT_SECTION_D,
  SEAT_SECTION_E,
  SEAT_SELECTED
} from "../../assets/image/index";

import { number } from 'prop-types';


const SeatList = ({
  app,
  navigation,
  route,
  seatList=[],
  minScale=0.5,
  maxScale=2
}:any) => {
  const colorScheme = useColorScheme();
  const [pan_responder, set_pan_responder] = useState<any>(null);
  const [touchMoved, setTouchMoved] = useState<boolean>(false);
  const [lockDirection, setLockDirection] = useState<string>('');
  const [dxSum, setDxSum] = useState<number>(0);
  const [dySum, setDySum] = useState<number>(0);
  const [speedX, setSpeedX] = useState<number>(0);
  const [speedY, setSpeedY] = useState<number>(0);
  const [touchTime, setTouchTime] = useState<any>(null);
  const [prevTouches, setPrevTouches] = useState<any>([]);
  const [translateX, setTranslateX] = useState<any>(new Animated.Value(0));
  const [translateY, setTranslateY] = useState<any>(new Animated.Value(0));
  const [scale, setScale] = useState<any>(new Animated.Value(1));
  const [initContentLayout, setInitContentLayout] = useState<any>({x: 0, y: 0, width: 0, height: 0});
  const [viewLayout, setViewLayout] = useState<any>({x: 0, y: 0, width: 0, height: 0});

  useEffect(()=>{
    createPanResponder();
  },[]);

  function createPanResponder() {
    let _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onStartShouldSetPanResponderCapture: (e, gestureState) => false,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => false,
      onPanResponderGrant: (e,gestureState) => 
        onPanResponderGrant(e, gestureState),//开始手势操作
      onPanResponderMove: (e, gestureState) =>
        onPanResponderMove(e, gestureState),
      onPanResponderTerminationRequest: (e, gestureState) => true,
      onPanResponderRelease: (e, gestureState) =>
        onPanResponderRelease(e, gestureState),
      onPanResponderTerminate: (e, gestureState) => null,
      onShouldBlockNativeResponder: (e, gestureState) => true,
    });
    set_pan_responder(_panResponder)
  }
  function onPanResponderGrant(e:any, gestureState:any){
    console.log('手势开始》〉》〉》〉》〉》',e.nativeEvent.touches);
    // setupLongPressTimer(e);
    setTouchMoved(false);
    setLockDirection('none');
    setDxSum(0);
    setDySum(0);
    setSpeedX(0);
    setSpeedY(0);
    setTouchTime(new Date());
    setPrevTouches([...prevTouches,e.nativeEvent.touches])
  };
  // console.log('e.nativeEvent.touches======>>>>',prevTouches)
  function setupLongPressTimer(e:any){
    // let {onLongPress} = this.props;
    // if (!onLongPress) return;
    // this.removeLongPressTimer();
    // this.longPressTimer = setTimeout(() => {
    //   this.longPressTimer = null;
    //   onLongPress && onLongPress(e);
    // }, 500);
  };
  // function removeLongPressTimer() {
  //   if (this.longPressTimer) {
  //     clearTimeout(this.longPressTimer);
  //     this.longPressTimer = null;
  //   }
  // }
  function onPanResponderMove(e:any, gestureState:any){
    // console.log('移动中=========》',e,gestureState);
    handleTouches(e.nativeEvent.touches,
      (dx:number, dy:number, speedX:number, speedY:number, scaleRate:number) => {
        // let {tension, onTransforming} = this.props;
        // let {translateX, translateY, scale} = this.state;

        let {x, y, width, height} = contentLayout();
        // if (tension) {
        //   if (x > this.initContentLayout.x) dx /= 3;
        //   else if (
        //     x + width <
        //     this.initContentLayout.x + this.initContentLayout.width
        //   )
        //     dx /= 3;
        //   if (y > this.initContentLayout.y) dy /= 3;
        //   else if (
        //     y + height <
        //     this.initContentLayout.y + this.initContentLayout.height
        //   )
        //     dy /= 3;
        // }
        setDxSum(dxSum+dx);
        setDySum(dySum+dy);
        setSpeedX(speedX);
        setSpeedY(speedX);
        // this.dySum += dy;
        // this.speedX = speedX;
        // this.speedY = speedY;
        let adx = Math.abs(dxSum),
          ady = Math.abs(dySum),
          asr = Math.abs(scaleRate - 1);
        if (!touchMoved && adx < 6 && ady < 6 && asr < 0.01) {
          return;
        }

        let _lockDirection = lockDirection;
        if (
          e.nativeEvent.touches.length == 1 &&
          lockDirection === 'none'
        ) {
          if (adx > ady && height <= viewLayout.height) {
            _lockDirection = 'y';
            setLockDirection('y');
          } else if (adx < ady && width <= viewLayout.width) {
            _lockDirection = 'x';
            setLockDirection('x');
          }
        }

        switch (_lockDirection) {
          case 'x':
            translateX.setValue(0);
            translateY.setValue(translateY._value + dy);
            break;
          case 'y':
            translateX.setValue(translateX._value + dx);
            translateY.setValue(0);
            break;
          default:
            translateX.setValue(translateX._value + dx);
            translateY.setValue(translateY._value + dy);
            scale.setValue(scale._value * scaleRate);
        }

        // removeLongPressTimer();
        setTouchMoved(true);
        // onTransforming &&
        //   onTransforming(translateX._value, translateY._value, scale._value);
      },
    );
  };

  const handleTouches = useCallback((touches:any, onHandleCompleted:any)=> {

    


    let _prevTouches = prevTouches;
    // this.prevTouches = touches;
    setPrevTouches(touches)

    setTimeout(() => {
      console.log('移动中=========》',prevTouches,touches);
    }, 2000);

    


    if (touches.length == 0 || (_prevTouches && touches.length != _prevTouches.length)) {
      return;
    }
    for (let i = 0; i < touches.length; ++i) {
      if (touches[i].identifier != _prevTouches[i].identifier) {
        return;
      }
    }

    //translate
    let t0, t1;
    if (touches.length == 1) {
      t0 = {x: _prevTouches[0].pageX, y: _prevTouches[0].pageY};
      t1 = {x: touches[0].pageX, y: touches[0].pageY};
    } else {
      t0 = {
        x: (_prevTouches[0].pageX + _prevTouches[1].pageX) / 2,
        y: (_prevTouches[0].pageY + _prevTouches[1].pageY) / 2,
      };
      t1 = {
        x: (touches[0].pageX + touches[1].pageX) / 2,
        y: (touches[0].pageY + touches[1].pageY) / 2,
      };
    }
    let dx = t1.x - t0.x;
    let dy = t1.y - t0.y;

    let t = touches[0].timestamp - _prevTouches[0].timestamp;
    let speedX = t ? dx / t : 0;
    let speedY = t ? dy / t : 0;

    //scale
    let distance0 = 0,
      distance1 = 0;
    if (touches.length >= 2) {
      let dx0 = _prevTouches[1].pageX - _prevTouches[0].pageX;
      let dy0 = _prevTouches[1].pageY - _prevTouches[0].pageY;
      let dx1 = touches[1].pageX - touches[0].pageX;
      let dy1 = touches[1].pageY - touches[0].pageY;
      distance0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
      distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    }

    if (distance0 && distance1) {
      let scaleRate = distance1 / distance0;

      // let {maxScale} = this.props;
      // let {scale} = this.state;
      if (scale._value * scaleRate > maxScale) {
        scaleRate = maxScale / scale._value;
      }

      onHandleCompleted(dx, dy, speedX, speedY, scaleRate);
    } else {
      onHandleCompleted(dx, dy, speedX, speedY, 1);
    }
  },[prevTouches])

  function contentLayout() {
    // let {translateX, translateY, scale} = this.state;
    let originX = initContentLayout.x + initContentLayout.width / 2;
    let originY = initContentLayout.y + initContentLayout.height / 2;
    let scaleOriginX = originX + translateX._value;
    let scaleOriginY = originY + translateY._value;
    let scaleWidth = initContentLayout.width * scale._value;
    let scaleHeight = initContentLayout.height * scale._value;
    let scaleX = scaleOriginX - scaleWidth / 2;
    let scaleY = scaleOriginY - scaleHeight / 2;
    let contentLayout = {
      x: scaleX,
      y: scaleY,
      width: scaleWidth,
      height: scaleHeight,
    };
    return contentLayout;
  }

  function buildContainerStyle() {
    // let {containerStyle} = this.props;
    // let {translateX, translateY, scale} = this.state;
    let containerStyle:any[] = [].concat({
      transform: [
        {translateX: translateX},
        {translateY: translateY},
        {scale: scale},
      ]
    });
    return containerStyle;
  }

  function buildStyle() {
    // let {style, containerStyle, ...others} = this.props;
    // let {translateX, translateY, scale} = this.state;
    let style:any = StyleSheet.flatten(
      [
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        },
      ],
    );
    return style;
  }






  function onPanResponderRelease(e:any, gestureState:any){
    // console.log('离开=========》',e,gestureState);
  };


  if(pan_responder) return <View style={{
    ...styles.seatListWrapper,
    // backgroundColor:colorScheme=='dark'?'#000':'#eee'
    // flex:1,
    borderWidth:1,
    borderColor:'red',
    ...buildStyle()
  }}
  {...pan_responder.panHandlers}>
    <Animated.View
    style={buildContainerStyle()}
    onLayout={e => {
      // initContentLayout = e.nativeEvent.layout;
      setInitContentLayout(e.nativeEvent.layout);
    }}>
      <View style={{
        borderWidth:1,
        borderColor:'blue',
        height:300,
        width:100
      }}></View>
    </Animated.View>
  </View>






  if(!pan_responder) return null;
};

const styles = StyleSheet.create({
  seatListWrapper:{
    flex:1
  },
  
});

export default inject("app")(observer(SeatList));
