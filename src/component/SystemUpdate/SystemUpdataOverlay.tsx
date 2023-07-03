
import React, {Component,PureComponent} from 'react';
import {
    ScrollView,
    AsyncStorage,
    NativeModules,
    Text,
    View,
    ActivityIndicator,
    Animated,
    PushNotificationIOS,
    Platform,
    DeviceEventEmitter,
    InteractionManager,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput
} from 'react-native'

import { BaseOverlay } from '../BaseOverlay';
import {Overlay} from '../teaset';
import { scaleView as sv,scaleText as st } from '../../utils/scaleSize';
import { SystemUpdataContent } from './SystemUpdataContent';


export class SystemUpdataOverlay extends BaseOverlay{
    
     async show(isClickCheck:boolean){
       
        // tps://admin2.eryicaier.com/API/common/update/checkCachierUpdate
//  LOG  lastVersion {"admin_id": null, "build_number": 1821, "build_version": "18.21", "compile_sdk_version": "29", "create_employee_id": 112, "created_at": 1666943742, "description": "1. 优化性能
// 2. 修复bug", "download_url": "https://static.eryicaier.com/eryisy/app/18.21-182120221028155522.apk", "id": 174, "is_use": 1, "package_name": "com.eryisy3", "package_size": 18534992}
        // console.log("lastVersion",lastVersion);
        let overlayView = (
            <Overlay.View
                // type={'zoomIn'}
            onCloseRequest={()=>{
              // console.log("onDisappearCompleted");
                // this.hide();
              
            }}
            //   side="center"
              style={{
                alignItems: 'center', justifyContent: 'center',
            }}
            //   containerStyle={{

            //   }}
              >
             <View style={{backgroundColor: '#fff', width:sv(600),minHeight:sv(336), borderRadius:sv(24),paddingHorizontal:sv(40),paddingVertical:sv(40)}}>
                <SystemUpdataContent  
                isClickCheck={isClickCheck}
                hide={()=>{
                     this.hide();
                }}/>
             </View>
               
            </Overlay.View>
          );
          this.overlayKey=Overlay.show(overlayView);
        
    }

    hide(){
        Overlay.hide(this.overlayKey)
    }
}
