
import { observable, action, makeAutoObservable,runInAction } from 'mobx';
import * as HttpUtils from '../utils/request';
import * as Api from '../api/constant';
import {Toast} from '../component/teaset/index';
import DeviceInfo from 'react-native-device-info';
import {
  Platform
} from 'react-native';
import { useState } from 'react';
class AppVersions {
  constructor() {
    // 建议使用这种方式，自动识别类型，不需要再加前缀
    makeAutoObservable(this)
  }

  // versionCode = 0;

  versionName = DeviceInfo.getVersion();
	app_user_agent = DeviceInfo.getUserAgentSync();
	app_brand = DeviceInfo.getBrand();
	platform = Platform.OS;
	device_id = DeviceInfo.getDeviceId();
	versionCode  = DeviceInfo.getBuildNumber();
	unique_id  = DeviceInfo.getUniqueIdSync();
	package_name = DeviceInfo.getInstallerPackageNameSync();
	bundle_id = DeviceInfo.getBundleId();
  

  checkAppUpdate(params:any={}) {
    return new Promise((resolve, reject) => {
      HttpUtils.post(Api.APP_VERSIONS_CHECK_UPDATE, {
        platform: 'android',
        packageName: 'com.filmticketsaleclientrnts',
        ...params
      }, '加载中...').then((res:any) => {
        runInAction(()=>{
          // this.versionCode = res.data.versionCode;
        });
        console.log('=========>>>',res.data);
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