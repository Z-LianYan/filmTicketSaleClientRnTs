import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions, CommonActions } from '@react-navigation/native';
import { FilterManager } from './filter';
import routeConfig from '../navigators/router'

export class Router {
  filterManager:any;
  startLen:number;
  constructor() {
    this.filterManager = {};
    this.startLen = 0;
  }	

  //跳转函数	
  push(name:string, params:any){
      // 声明目标函数
      function targetFun() {
        const pushAction = StackActions.push(name, params);
        navigationRef.dispatch(pushAction);
      }
      this.execute(name, targetFun);
  }
  
  execute(name:string, targetFun:()=>void) {
  	
    let route = routeConfig[name];

    if (route) {
      const interceptors = route.interceptors;

      if (interceptors) {
        let interceptorClazzs:any = [];
        interceptors.forEach((element:any) => {
          interceptorClazzs.push(element["clazz"]);
        });

        const state = navigationRef.getState();
        this.startLen = state ? state.routes.length : 1;

		// 过滤管理器
        this.filterManager = new FilterManager(interceptorClazzs, targetFun);
        this.filterManager.execute();

      } else {
        targetFun();
      }
    }
  }

  /**
   * 执行下一个拦截器
   */
  interceptNext() {
    this.clearStack();
    this.filterManager.execute();
  }

  /**
   * 清栈
   */
  clearStack() {
    navigationRef.dispatch(state => {
      const routes = state.routes.filter((r, index) => {
        return index < this.startLen;
      });

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }
}

export const navigationRef = createNavigationContainerRef();
export let router = new Router();