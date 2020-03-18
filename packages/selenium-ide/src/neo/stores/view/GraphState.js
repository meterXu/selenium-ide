import { action, computed, observable, observe, extendObservable } from 'mobx'
class GraphState {
  @observable
  zoom = 1
  constructor() {}
  @observable
  zoomSale = 0.25
  @observable
  minZoom = 0.25
  @observable
  maxZoom = 2
  @observable
  firstLeft = 360
  @observable
  firstTop = 90
  @observable
  offsetLeft = 0
  @observable
  offsetTop = 0
  @observable
  paper = null
  @observable
  verticalInterval = 40
  @observable
  LevelInterval = 40
  @action.bound
  setZoom(value) {
    this.zoom = value
  }
  @action.bound
  setOffsetLeft(value) {
    this.offsetLeft = value
  }
  @action.bound
  setOffsetTop(value) {
    this.offsetTop = value
  }
  @action.bound
  setPaper(value) {
    this.paper = value
  }
  @action.bound
  reduceZoom() {
    if (this.zoom > this.minZoom) {
      this.zoom -= this.zoomSale
    } else {
      this.zoom = this.minZoom
    }
  }
  @action.bound
  enlargeZoom() {
    if (this.zoom < this.maxZoom) {
      this.zoom += this.zoomSale
    } else {
      this.zoom = this.maxZoom
    }
  }
}
if (!window._graphState) window._graphState = new GraphState()

export default window._graphState
