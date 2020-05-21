import { action, observable } from 'mobx'
import draw from '../../components/Graph/Draw/draw'
import ModalState from './ModalState'
import UiState from './../view/UiState'
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
  currentProcess = null
  @observable
  currentActiveNode = {
    data: {
      sourceId: null,
      paraNames: [],
      paraValues: [],
    },
    st: [],
  }
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
  addGraphData(value) {
    this.currentProcess.graphData.push(value)
  }

  @action.bound
  setCurrentProcess(value) {
    this.currentProcess = value
    UiState.project.setSelectedProcess(this.currentProcess.id)
    draw.drawCurrentProcess()
  }
  @action.bound
  setCurrentActiveNode(coordinate) {
    this.currentActiveNode = this.currentProcess.graphData.find(
      c => c.coordinate === coordinate
    )
  }
  @action.bound
  setCurrentActiveNodeObj(caseId, caseName, paramNames) {
    this.currentActiveNode.data.caseId = caseId
    this.currentActiveNode.data.caseName = caseName
    this.currentActiveNode.text = caseName
    this.currentActiveNode.st[1].attr({
      text: caseName,
    })
    this.currentActiveNode.data.paraNames = paramNames
    this.currentActiveNode.data.paraValues = new Array(
      paramNames != null ? paramNames.length : 0
    )
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
  setCurrentActiveNodeParamValues(index, paramValue) {
    this.currentActiveNode.data.paraValues[index] = paramValue
  }
  @action.bound
  setCurrentActiveNodeSource(sourceId) {
    this.currentActiveNode.data.sourceId = sourceId
  }
  @action.bound
  graphItemClick(item) {
    switch (item.type) {
      case 'case':
        {
          ModalState.toggleCaseConfig()
        }
        break
    }
  }
  @action.bound
  graphItemContentMenu(item) {
    alert(item.type)
  }
  @action.bound
  selectProcess(process) {
    if (this.currentProcess.id !== process.id){
      this.setCurrentProcess(process)
    }
  }
  @action.bound
  renameProcess() {}
  @action.bound
  duplicateProcess() {}
  @action.bound
  removeProcess() {}
  @action.bound
  codeExport() {}
  @action.bound
  getImage(name) {
    return require(`../../../icons/${name}.svg`)
  }
}
if (!window._graphState) window._graphState = new GraphState()

export default window._graphState
