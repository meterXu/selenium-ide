import React from 'react'
import './type.css'
import ScTypeSwitch from '../../components/SourceConf/ScTypeSwitch'
import SourceList from '../../components/SourceConf/SourceList'
import UiState from '../../stores/view/UiState'
export default class SourceConf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeSwitchData: [{ text: '读取', value: 0 }, { text: '写入', value: 1 }],
      itemData: [],
    }
  }
  scTypeSwitch(type) {
    switch (type) {
      case 0:
        {
          this.setState({
            itemData: UiState.sourceData.read,
          })
        }
        break
      case 1:
        {
          this.setState({
            itemData: UiState.sourceData.write,
          })
        }
        break
    }
  }
  componentDidMount() {
    this.setState({
      itemData: UiState.sourceData.read,
    })
  }

  render() {
    return (
      <div className="sourceConf-containers">
        <ScTypeSwitch
          keys={this.state.typeSwitchData}
          OnSwitch={this.scTypeSwitch.bind(this)}
        />
        <SourceList itemData={this.state.itemData} />
      </div>
    )
  }
}
