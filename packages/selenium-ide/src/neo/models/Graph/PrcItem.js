import { action } from 'mobx'
export default class PrcItem {
  coordinate = null
  data = null
  img = null
  text = null
  type = null
  st = null

  constructor(coordinate, data, img, text, type, st = null) {
    this.coordinate = coordinate
    this.data = data
    this.img = img
    this.text = text
    this.type = type
    this.st = st
    this.export = this.export.bind(this)
  }
  export() {
    return {
      coordinate: this.coordinate,
      data: this.data,
      img: this.img,
      text: this.text,
      type: this.type,
    }
  }
  @action.bound
  static fromJs(jsRep) {
    let prcItem = new PrcItem(
      jsRep.coordinate,
      jsRep.data,
      jsRep.img,
      jsRep.text,
      jsRep.type
    )
    return prcItem
  }
}
