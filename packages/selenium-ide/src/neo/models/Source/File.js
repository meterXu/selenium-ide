import { action, observable, reaction } from 'mobx'
export default class File {
  @observable
  type = 0
  @observable
  name = null
  @observable
  data = null
  constructor(name) {
    this.name = name
    this.createExcel = this.createExcel.bind(this)
  }
  @action.bound
  createExcel(path) {
    this.data = {
      type: 0,
      pro: {
        path: path,
      },
    }
  }
}
