import React from 'react'
import './type.css'
import SourceList from '../../components/SourceConf/SourceList'
import UiState from '../../stores/view/UiState'
import ModalState from '../../stores/view/ModalState'
export default class SourceConf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: UiState.project,
      typeSwitchData: [{ text: '读取', value: 0 }, { text: '写入', value: 1 }],
    }
    this._project = null
  }
  scTypeSwitch(type) {
    UiState.project.changeScTypeSwitch(type)
  }
  showSourceTypeDialog() {
    ModalState.toggleSourceTypeDialog()
  }
  viewSourceTypeDialog() {
    ModalState.viewSourceModifyDialog()
  }

  render() {
    return (
      <div className="sourceConf-containers">
        {/*<ScTypeSwitch*/}
        {/*  keys={this.state.typeSwitchData}*/}
        {/*  onSwitch={this.scTypeSwitch.bind(this)}*/}
        {/*/>*/}
        <SourceList
          addSource={this.showSourceTypeDialog.bind(this)}
          viewSource={this.viewSourceTypeDialog.bind(this)}
        />
      </div>
    )
  }
}
