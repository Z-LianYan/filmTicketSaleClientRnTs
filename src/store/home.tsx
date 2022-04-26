
import { observable, action, makeAutoObservable } from 'mobx';
class Home {
  constructor() {
    // 建议使用这种方式，自动识别类型，不需要再加前缀
    makeAutoObservable(this)
  }

  num = "werty7u"
  count = 0

  setAppName(num: string) {
    this.num = num
  }

  addCount() {
    this.count++
  }
}
export default  new Home()


// ERROR  Error: MobX Provider: The set of provided stores has changed. 
// See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error

// Seems like you're using an old API with gesture components, check out new Gestures system!