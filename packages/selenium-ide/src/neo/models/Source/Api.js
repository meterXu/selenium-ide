import { action, observable, reaction } from 'mobx'
export default class Api {
  @observable
  type = 2
  @observable
  data = null
  constructor(name) {
    this.type = name
    this.createApi = this.createApi.bind(this)
  }
  @action.bound
  createApi(
    url,
    type,
    contentType = 'application/x-www-form-urlencoded',
    data,
    header
  ) {
    this.data = {
      type: 0,
      pro: {
        path: url,
        type: type,
        contentType: contentType,
        data: data,
        header: header,
      },
    }
  }
}
