import uuidv4 from 'uuid/v4'
import prcItem from './PrcItem'
import { action, observable } from 'mobx'
export default class Process {
  id = null
  @observable
  name = null
  graphData = []

  constructor(id = uuidv4(), name = null, graphData = []) {
    this.id = id
    this.name = name
    this.graphData = graphData
    this.export = this.export.bind(this)
    this.setName = this.setName.bind(this)
  }

  export() {
    return {
      id: this.id,
      name: this.name,
      graphData: this.graphData.map(c => c.export()),
    }
  }

  @action.bound
  setId(id) {
    this.id = id
  }
  @action.bound
  setName(name) {
    this.name = name
  }
  @action.bound
  static fromJs(jsRep) {
    let graphData = jsRep.graphData.map(c => prcItem.fromJS(c))
    let process = new Process(jsRep.id, jsRep.name, graphData)
    return process
  }
}
