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
  @observable
  prcMenuIsOpen = false
  @observable
  prcMenuX = 0
  @observable
  prcMenuY = 0
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
    if (value) {
      this.currentProcess = value
      UiState.project.setSelectedProcess(this.currentProcess.id)
      draw.drawCurrentProcess()
    } else {
      this.currentProcess = null
      UiState.project.setSelectedProcess(null)
      draw.resetGraph()
    }
  }
  @action.bound
  setCurrentActiveNode(coordinate) {
    this.currentActiveNode = this.currentProcess.graphData.find(
      c => c.coordinate === coordinate
    )
  }
  @action.bound
  setCurrentActiveNodeObj(caseId, caseName, paramNames, sourceId) {
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
    this.currentActiveNode.data.sourceId = sourceId
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
  graphItemClick(code) {
    switch (this.currentActiveNode.type) {
      case UiState.enum.prcItem.用例.type:
        {
          if (code === UiState.enum.prcMenuBtn.修改.code) {
            ModalState.toggleCaseConfig()
          } else if (code === UiState.enum.prcMenuBtn.删除.code) {
            draw.removeItem()
          }
        }
        break
    }
  }
  @action.bound
  selectProcess(process) {
    if (this.currentProcess.id !== process.id) {
      this.setCurrentProcess(process)
    }
  }
  @action
  renameProcess(type, value, opts = { isNewTest: false }) {
    return ModalState.renameProcess(type, value, opts)
  }
  @action.bound
  duplicateProcess(process) {
    let new_process = UiState.project.createProcess(process.name + '_副本')
    this.setCurrentProcess(new_process)
  }
  @action.bound
  removeProcess(process) {
    if (UiState.project.processData && UiState.project.processData.length > 0) {
      UiState.project.removeProcess(process)
    }
    if (UiState.project.processData.length === 0) {
      this.setCurrentProcess(null)
      ModalState.toggleProcessWelcome()
    } else {
      this.setCurrentProcess(UiState.project.processData[0])
    }
  }
  @action.bound
  codeExport(payload) {
    return ModalState.codeExport(payload, UiState.lang.processDesign)
  }
  @action.bound
  getImage(name) {
    return require(`../../../icons/${name}.svg`)
  }
  @action.bound
  showPrcMenu(x = 0, y = 0) {
    this.prcMenuIsOpen = true
    this.prcMenuX = x
    this.prcMenuY = y
  }
  @action.bound
  hidePrcMenu() {
    this.prcMenuIsOpen = false
  }
  @action.bound
  removeItem() {
    if (this.currentActiveNode) {
      this.currentActiveNode.st.forEach(c => c.remove())
      this.currentProcess.graphData.splice(
        this.currentProcess.graphData.findIndex(
          c => c.coordinate === this.currentActiveNode.coordinate
        ),
        1
      )
      this.currentActiveNode = null
    }
  }
}
if (!window._graphState) window._graphState = new GraphState()

export default window._graphState
