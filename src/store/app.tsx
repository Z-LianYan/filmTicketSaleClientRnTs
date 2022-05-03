
import { observable, action, makeAutoObservable } from 'mobx';
class Test {
  constructor() {
    // 建议使用这种方式，自动识别类型，不需要再加前缀
    makeAutoObservable(this)
  }

  tabBarBadge = "Badge";
  
}
export default  new Test();