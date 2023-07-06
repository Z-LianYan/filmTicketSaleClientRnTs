
import {
  Platform,
  StatusBar,
  NativeModules,
} from 'react-native';

const {  StatusBarManager } = NativeModules;
export const STATUS_BAR_HEIGHT = Platform.OS === "android"?  StatusBar.currentHeight : StatusBarManager.HEIGHT