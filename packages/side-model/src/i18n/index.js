import zh from './zh'
let i18n = function() {
  this.langList = {
    zh: zh,
  }
  this.type = 'zh'
  this.lang = this.langList[this.type]
}
export default new i18n()
