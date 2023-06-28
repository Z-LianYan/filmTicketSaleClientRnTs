
import { observable, action, makeAutoObservable,runInAction } from 'mobx';
import * as HttpUtils from '../utils/request';
import * as Api from '../api/constant';
import {Toast} from '../component/teaset/index';

class AppVersions {
  constructor() {
    // 建议使用这种方式，自动识别类型，不需要再加前缀
    makeAutoObservable(this)
  }

  versionCode = 0;
  

  checkAppUpdate(params:any={}) {
    return new Promise((resolve, reject) => {
      HttpUtils.post(Api.APP_VERSIONS_CHECK_UPDATE, {
        platform: 'android',
        packageName: 'com.filmticketsaleclientrnts',
        ...params
      }, '加载中...').then((res:any) => {
        runInAction(()=>{
          this.versionCode = res.data.versionCode;
        });
        console.log('=========>>>',res.data.versionCode);
        switch (res.error) {
          case 0:
            Toast.success(res.message);
            resolve(res.data);
            break;
          default:
            Toast.fail(res.message);
            reject(res.data);
            break;
        }
      });
    });
  }
  
}

export default new AppVersions()