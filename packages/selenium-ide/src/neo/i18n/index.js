import zh from './zh'
import { observable } from 'mobx'
class i18n {
  constructor() {}
  @observable
  langList = {
    zh: zh,
  }
  @observable
  type = 'zh'
  @observable
  lang = this.langList[this.type]
}

if (!window._i18n) window._i18n = new i18n()
export default window._i18n
