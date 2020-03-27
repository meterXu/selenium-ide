import { action, observable, reaction } from 'mobx'
import uuidv4 from 'uuid/v4'
export default class Source {
  @observable
  id = null
  @observable
  io = null
  @observable
  type = null
  @observable
  name = null
  @observable
  data = {}

  constructor(id = uuidv4(), io, sourceObj) {
    this.id = id
    this.name = sourceObj.name
    this.io = io
    this.type = sourceObj.type
    this.data = sourceObj.data
  }
}
