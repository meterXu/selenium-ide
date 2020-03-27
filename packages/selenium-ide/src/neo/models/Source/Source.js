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
  @observable
  _source = []

  constructor(id = uuidv4(), io, type, name, data) {
    this.id = id
    this.name = name
    this.io = io
    this.type = type
    this.data = data
  }
}
