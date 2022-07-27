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
  Image
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
let overlay_view = function(notices:any[]=[],colorScheme:any,onCancel:any){
  return <Overlay.PullView 
  side='bottom'
  modal={false}
  containerStyle={{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
  }}>
    <Viw style={{
      borderBottomWidth:1,
      borderBottomColor:colorScheme=='dark'?'#202122':'#f4f4f4',
      paddingTop:20,
      paddingBottom:10,
    }}>
      <Text style={{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold'
      }}>观影小贴士</Text>
    </Viw>
    
    <ScrollView
    style={{
      maxHeight:300,
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
      paddingHorizontal:20,
      paddingTop:5
    }}
    showsHorizontalScrollIndicator={false}
    stickyHeaderIndices={[]}>

      {notices.map((item, index) => {
        return (
          <Viw 
          key={index} 
          style={{flexDirection:'row',marginBottom:10}}>
            <Ionicons 
            name={'volume-high-sharp'}
            size={16}
            style={{marginRight:10}} 
            color={colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor}/>
            <Text style={{flex:1}}>{item.text}</Text>
          </Viw>
        );
      })}
    </ScrollView>
    <View style={{
      height:10,
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
    }}></View>
   <Button
    type="primary"
    style={{
      backgroundColor:Theme.primaryColor,
      marginHorizontal:20,
    }}
    title="知道了"
    onPress={() => {
      console.log(1234)
      onCancel && onCancel();
    }}
  />
  <View style={{
    height:10,
    backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
  }}></View>
</Overlay.PullView>
};


const BottomWrapper = ({
  app,
  navigation,
  route,
  scheduleInfo=null,
  scheduleList=[],
  selectedSchedule=null,
  setSelectedSchedule,
  getSeatList,
  selectedSeat = [],
  setSelectedSeat
}:any) => {
  const colorScheme = useColorScheme();
  const [showScheduleList, setShowScheduleList] = useState<boolean>(false);
  useEffect(()=>{
  },[]);
  
  return <View style={{
    ...styles.bottomWrapper,
    backgroundColor:colorScheme=='dark'?'#000':'#eee'

  }}>
    {
      !showScheduleList && <Viw style={{flexDirection:'row',paddingVertical:10}}>
        <Viw  style={{flexDirection:'row',alignItems:'center',paddingRight:10}}>
          <Image 
          resizeMode='cover' 
          style={{
            width:20,
            height:20,
            marginRight:5
          }} 
          source={SEAT_DISABLE} />
          <Text>不可选</Text>
        </Viw>
        <Viw  style={{flexDirection:'row',alignItems:'center',paddingRight:10}}>
          <Image 
          resizeMode='cover' 
          style={{
            width:20,
            height:20,
            marginRight:5
          }} 
          source={SEAT_ALREADY_SALE} />
          <Text>已售</Text>
        </Viw>
        <Viw  style={{flexDirection:'row',alignItems:'center',paddingRight:10}}>
          <Image 
          resizeMode='cover' 
          style={{
            width:20,
            height:20,
            marginRight:5
          }} 
          source={SEAT_NO_SELECTED} />
          <Text>可选</Text>
        </Viw>
        <Viw  style={{flexDirection:'row',alignItems:'center',paddingRight:0}}>
          <Image 
          resizeMode='cover' 
          style={{
            width:20,
            height:20,
            marginRight:5
          }} 
          source={SEAT_SELECTED} />
          <Text>选中</Text>
        </Viw>
      </Viw>
    }
    
    <View style={{
      ...styles.bottomContentBox,
      backgroundColor:colorScheme=='dark'?'#1a1b1c':'#fff',
      // borderTopColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4'
    }}>
      <TouchableOpacity 
      activeOpacity={0.9} 
      style={{
        ...styles.topCell,
        borderBottomColor:colorScheme=='dark'?'#272525':'#f4f4f4'
      }}
      onPress={()=>{
        let ol = Overlay.show(overlay_view((scheduleInfo && scheduleInfo.notices)?scheduleInfo.notices:[],colorScheme,()=>{
          Overlay.hide(ol);
        }));
      }}>
        <Ionicons 
        name={'volume-high-sharp'}
        size={16} 
        color={colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor}/>
        <Text style={{fontSize:16}}>
          {scheduleInfo && scheduleInfo.notices.length}个通知
          <Ionicons 
          name={'chevron-forward'}
          size={16} 
          color={colorScheme=='dark'?'#fff':'#000'}/>
        </Text>
        
      </TouchableOpacity>
      <Viw style={{
        ...styles.bottomContentSchedule,
        borderBottomColor:colorScheme=='dark'?'#272525':'#f4f4f4'
      }}>
        <Viw style={styles.bottomContentTopT}>
          <Viw style={styles.bottomContentTopTL}>
            <Text style={styles.filmName}>{scheduleInfo && scheduleInfo.film_name}</Text>
            <Text style={styles.timeLgType}>
              {scheduleInfo
                ? handerDate(scheduleInfo.schedule_date)
                : ""}{" "}
              {selectedSchedule && dayjs(selectedSchedule.start_runtime).format("HH:mm")}{" "}
              {selectedSchedule && selectedSchedule.language}
              {selectedSchedule && selectedSchedule.play_type_name}
            </Text>
          </Viw>
          <Text  
          style={styles.bottomContentTopTR} 
          onPress={()=>{
            setShowScheduleList(!showScheduleList)
          }}>
            切换场次 
              <Ionicons 
              name={showScheduleList?'chevron-up':'chevron-down-sharp'}
              size={12} 
              color={colorScheme=='dark'?Theme.primaryColor:Theme.primaryColor}/>
          </Text>
        </Viw>
        <ScrollView
        horizontal={true}
        style={{
          ...styles.scheduleListWrapper,
          height:!showScheduleList?0:'auto'
        }}
        showsHorizontalScrollIndicator={false}
        stickyHeaderIndices={[]}>
          {
            scheduleList && scheduleList.length?scheduleList.map((item:any,index:number)=>{
              return <TouchableOpacity 
              activeOpacity={0.9}
              key={index+'scheduleItem'}
              style={{
                ...styles.scheduleItem,
                backgroundColor:(selectedSchedule && selectedSchedule.id == item.id)?colorScheme=='dark'?'#000':'#fffbfb':colorScheme=='dark'?'#666':'#f4f4f499',
                borderWidth: (selectedSchedule && selectedSchedule.id == item.id)?1:0,
                borderColor:Theme.primaryColor
              }}
              onPress={()=>{
                if (selectedSchedule.id == item.id) return;
                setSelectedSchedule && setSelectedSchedule(item);
                getSeatList && getSeatList(item.id,item.hall_id);
              }}>
                <Text>{dayjs(item.start_runtime).format("HH:mm")}</Text>
                <Text style={{color:'#bdc0c5',fontSize:12}}>
                  {item.language}
                  {item.play_type_name}
                </Text>
                <Text style={{color:'#797d82',fontSize:12}}>
                  ¥{" "}
                  {item.is_section === 0
                    ? item.sale_price
                    : handlerSectionPrice(item.sectionPrice)}
                </Text>
              </TouchableOpacity>
            }):null
          }
        </ScrollView>
      </Viw>
      <ScrollView
      horizontal={true}
      style={{
        ...styles.scheduleListWrapper
      }}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[]}>
        {
          selectedSeat && selectedSeat.length?selectedSeat.map((item:any,index:number)=>{
            return <TouchableOpacity 
            activeOpacity={0.9}
            key={index+'selectedSeat'}
            style={{
              ...styles.scheduleItem,
              backgroundColor:colorScheme=='dark'?'#000':'#f4f4f499',
              flexDirection:'row'
            }}
            onPress={()=>{
            }}>
              
              <Viw style={{flex:1}}>
                <Text>{item.row_id}排{item.column_id}座</Text>
                {
                  selectedSchedule && <Text style={{color:'#fab646'}}>¥{
                    selectedSchedule.is_section === 0? 
                    selectedSchedule.sale_price : handlerSelectedSectionPrice(item)
                  }</Text>
                }
              </Viw>
              <Ionicons 
              name={'close-sharp'}
              size={18} 
              style={{marginLeft:10}}
              color={'#ccc'}
              onPress={()=>{
                selectedSeat.splice(index, 1);
                setSelectedSeat(selectedSeat);
              }}/>
            </TouchableOpacity>
          }):null
        }
      </ScrollView>
    </View>

    
    <Button
      title={calcTotalPrice()+'元 确认选座'}
      type="primary"
      size="md"
      style={styles.selectSeatBuyBtn}
      disabled={selectedSeat.length ? false : true}
      onPress={() => {
        onCreateOreder();
      }}
    />
  </View>
  async function onCreateOreder() {
    try {
      // let result:any = await create_order({
      //   schedule_id: selectedSchedule.id,
      //   buy_seat_ids: selectedSeat.map((item:any) => item.id).join(","),
      // });
      // console.log("生成订单", result);
      // if (!result) return;
      navigation.navigate({ name: 'BuyTicket', params:{
        // order_id:result.order_id,
        // isCancelOrder:true
      }});
    } catch (err:any) {
      console.log("err", err.message);
    }
  }

  function calcTotalPrice() {
    // let { selectedSeat, selectedSchedule } = this.state;
    if(!selectedSchedule) return 0;
    let totalPrice = 0;
    for (let i = 0; i < selectedSeat.length; i++) {
      if (selectedSchedule.is_section == 1) {
        for (let j = 0; j < selectedSchedule.sectionPrice.length; j++) {
          let it = selectedSchedule.sectionPrice[j];
          if (selectedSeat[i].section_id === it.section_id) {
            totalPrice += Number(it.price);
          }
        }
      } else {
        totalPrice += Number(selectedSchedule.sale_price);
      }
    }
    return totalPrice.toFixed(2);
  }

  function handlerSectionPrice(sectionPrice:any) {
    let price = 0;
    let num = 0;
    sectionPrice.map((item:any, index:number) => {
      item.price = Number(item.price);
      if (price === Number(item.price) && index !== 0) {
        num += 1;
      }
      if (price === 0) {
        price = item.price;
      } else if (item.price < price) {
        price = item.price;
      }
    });
    return price + (num + 1 == sectionPrice.length ? "" : " 起");
  }

  function handlerSelectedSectionPrice(it:any){
    if(!selectedSchedule) return;
    let price = 0;
    selectedSchedule.sectionPrice.map((item:any, index:number) => {
      item.price = Number(item.price);
      if (item.section_id === it.section_id) {
        price = item.price;
      }
    });
    return price;
  }

  function handerDate(date:string) {
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
          handleWeek(dayjs(date).day()) + dayjs(date).format(cur_y == y ? "MM月DD日" : "YY年MM月DD日")
        );
    }
  }
  function handleWeek(day:number) {
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
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    position:'absolute'
  },
  bottomWrapper:{
    alignItems:'center',
    // ≈≈
    paddingBottom:15,
    paddingHorizontal:5
  },
  topCell:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:15,
    paddingTop:5,
    borderBottomWidth:1
  },
  bottomContentBox:{
    
    width:'100%',
    borderRadius:5,
    padding:10,
    // borderTopWidth:1

  },
  bottomContentSchedule:{
    // borderBottomColor:'#f4f4f4',
    borderBottomWidth:1,
    paddingVertical:10
  },
  bottomContentTopT:{
    flexDirection:'row',
    alignItems:'center'
  },
  bottomContentTopTL:{
    flex:1
  },
  filmName:{
    marginBottom:5,
    fontSize:17
  },
  timeLgType:{
    color:'#ccc'
  },
  bottomContentTopTR:{
    justifyContent:'center',
    fontSize:12,
    height:25,
    lineHeight:25,
    color:Theme.primaryColor
  },
  scheduleListWrapper:{

  },
  scheduleItem:{
    padding:5,
    marginRight:10,
    marginTop:5,
    borderRadius:5,
    alignItems:'center'
  },
  selectSeatBuyBtn:{
    marginTop:10,
    width:'100%'
  }
});

export default inject("app")(observer(BottomWrapper));
