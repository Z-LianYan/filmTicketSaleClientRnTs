
import { observable, action, makeAutoObservable } from 'mobx';

export default class AppStore {
  // constructor() {
  //   // 建议使用这种方式，自动识别类型，不需要再加前缀
  //   makeAutoObservable(this)
  // }

  static tabBarBadge = "Badge";

  static userInfo = null;
  static locationInfo= {
    city_id: 440100, //默认城市编码
    lng: "",
    lat: "",
    city_name: "广州", //默认城市广州
    isInLocation: true, //判断是否在定位中
    realLocation: null, //真实定位信息
    // isShowSwitchLocationModal: false, //首页（film页）banner ，定位成功显示切换模态框
  };

  static rateLevelTex = {
    0: "可以点击星星评分",
    1: "超烂啊,太差了",
    2: "超烂啊,太差了",
    3: "很差,不推荐",
    4: "很差,不推荐",
    5: "一般般",
    6: "一般般",
    7: "还可以,看看也行",
    8: "比较好,可以尝试",
    9: "很不错,推荐看看",
    10: "棒极了,极力推荐",
  };

  static setUserInfo(info:any){
    this.userInfo = info
  }

  static setLocationInfo(info:any,callBack?:()=>void){
    this.locationInfo = {
      ...this.locationInfo,
      ...info
    }
    callBack && callBack();
  }

  static cityList = null
  
}