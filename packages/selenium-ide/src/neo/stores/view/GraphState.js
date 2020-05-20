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
  firstDrawX = 360
  @observable
  firstDrawY = 90
  @observable
  offsetLeft = 0
  @observable
  offsetTop = 0
  @observable
  paper = null
  @observable
  verticalInterval = 48
  @observable
  LevelInterval = 48
  @observable
  currentProcess = {graphData:null}
  @observable
  currentActiveNode = {
    data:{
      source:null,
      paraNames:[],
      paraValues:[]
    },st:[]}
  @observable
  processData = []
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
  addProcessData(value) {
    this.processData.push(value)
  }
  @action.bound
  addGraphData(value) {
    this.currentProcess.graphData.push(value)
  }
  @action.bound
  setProcessData(value) {
    this.processData = value
  }
  @action.bound
  setCurrentProcess(value) {
    this.currentProcess = value
  }
  @action.bound
  setCurrentActiveNode(coordinate) {
    this.currentActiveNode = this.currentProcess.graphData.find(
      c => c.coordinate === coordinate
    )
  }
  @action.bound
  setCurrentActiveNodeObj(caseId,caseName,paramNames){
    this.currentActiveNode.data.caseId = caseId
    this.currentActiveNode.data.caseName = caseName
    this.currentActiveNode.text = caseName
    this.currentActiveNode.st[1].attr({
      text: caseName,
    })
    this.currentActiveNode.data.paraNames = paramNames
    this.currentActiveNode.data.paraValues = new Array(paramNames!=null?paramNames.length:0)
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
  @action.bound
  setCurrentActiveNodeParamValues(index,paramValue){
    this.currentActiveNode.data.paraValues[index] = paramValue
  }
  @action.bound
  setCurrentActiveNodeSource(source){
    this.currentActiveNode.data.source=source
  }
}
if (!window._graphState) window._graphState = new GraphState()

export default window._graphState
