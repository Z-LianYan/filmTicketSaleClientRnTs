
import { observable, action, makeAutoObservable } from 'mobx';
class Home {
  constructor() {
    // 建议使用这种方式，自动识别类型，不需要再加前缀
    makeAutoObservable(this)
  }

  num = "werty7u"
  count = 0;

  

  setAppName(num: string) {
    this.num = num
  }

  addCount() {
    this.count++
  }
}
export default  new Home()