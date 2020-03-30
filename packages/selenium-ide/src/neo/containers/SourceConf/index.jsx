import React from 'react'
import './type.css'
import ScTypeSwitch from '../../components/SourceConf/ScTypeSwitch'
import SourceList from '../../components/SourceConf/SourceList'
import UiState from '../../stores/view/UiState'
import ModalState from '../../stores/view/ModalState'
export default class SourceConf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: UiState.project,
      typeSwitchData: [{ text: '读取', value: 0 }, { text: '写入', value: 1 }],
      itemData: [],
    }
    this._project = null
  }
  scTypeSwitch(type) {
    switch (type) {
      case 0:
        {
          this.setState({
            itemData: this.state.project.sourceData.read,
          })
        }
        break
      case 1:
        {
          this.setState({
            itemData: this.state.project.sourceData.write,
          })
        }
        break
    }
  }
  showSourceTypeDialog() {
    ModalState.toggleSourceTypeDialog()
  }
  componentDidMount() {
    this.setState({
      itemData: this.state.project.sourceData.read,
    })
  }

  render() {
    return (
      <div className="sourceConf-containers">
        <ScTypeSwitch
          keys={this.state.typeSwitchData}
          onSwitch={this.scTypeSwitch.bind(this)}
        />
        <SourceList itemData={this.state.itemData} addSource={this.showSourceTypeDialog.bind(this)}/>
      </div>
    )
  }
}
