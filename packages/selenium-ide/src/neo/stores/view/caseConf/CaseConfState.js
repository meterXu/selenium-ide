import { action, computed, observable } from 'mobx'
import UiState from '../UiState'
import GraphState from '../GraphState'

class CaseConfState {
  constructor() {}
  @observable
  selectedSource = null

  @action.bound
  getSelectSource(code) {
    UiState.getSourceConf(code)
  }
  @computed
  get selectSourceList() {
    let selectSourceList = [{ text: '-请选择-', value: null }]
    if (
      GraphState.currentActiveNode &&
      GraphState.currentActiveNode.data.sourceId
    ) {
      let findSc = UiState.project.sourceData.read.find(
        c => c.id === GraphState.currentActiveNode.data.sourceId
      )
      selectSourceList.push({
        text: findSc.name,
        value: findSc.id,
      })
    } else {
      selectSourceList = selectSourceList.concat(
        UiState.responseSources.map(c => {
          return { text: c.name, value: c.id }
        })
      )
    }
    return selectSourceList
  }
  @action.bound
  setSelectedSource(id) {
    this.selectedSource = UiState.responseSources.find(c => c.id === id)
  }
  @computed
  get cycleValues() {
    let _cycleValues = null
    if (this.selectedSource) {
      _cycleValues = Object.keys(this.selectedSource.data.schema).map(c => {
        return { text: c, value: c }
      })
      if (_cycleValues) {
        return [{ text: '-请选择-', value: null }].concat(_cycleValues)
      }
    }
    return [{ text: '-请选择-', value: null }]
  }
  @computed
  get sourceValue() {
    if (this.selectedSource) {
      return this.selectedSource.id
    } else {
      return null
    }
  }
  @action.bound
  cycleFormValue(index) {
    if (
      GraphState.currentActiveNode &&
      GraphState.currentActiveNode.data.paraValues.length > 0
    ) {
      return GraphState.currentActiveNode.data.paraValues[index]
    }
    return null
  }
}

if (!window._caseConf) window._caseConf = new CaseConfState()

export default window._caseConf
