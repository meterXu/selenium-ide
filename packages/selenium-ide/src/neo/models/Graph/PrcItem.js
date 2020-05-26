import { action } from 'mobx'
export default class PrcItem {
  coordinate = null
  data = null
  image = null
  name = null
  type = null
  st = null

  constructor(coordinate, data, image, name, type, st = null) {
    this.coordinate = coordinate
    this.data = data
    this.image = image
    this.name = name
    this.type = type
    this.st = st
    this.export = this.export.bind(this)
  }
  export() {
    return {
      coordinate: this.coordinate,
      data: this.data,
      image: this.image,
      name: this.image,
      type: this.type,
    }
  }
  @action.bound
  static fromJs(jsRep) {
    let prcItem = new PrcItem(
      jsRep.coordinate,
      jsRep.data,
      jsRep.image,
      jsRep.name,
      jsRep.type
    )
    return prcItem
  }
}
