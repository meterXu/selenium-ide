import React from 'react'
import './type.css'
import ScTypeSwitch from '../../components/SourceConf/ScTypeSwitch'
import SourceList from '../../components/SourceConf/SourceList'
export default class SourceConf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeSwitchData: [{ text: '读取', value: 0 }, { text: '写入', value: 1 }],
      sourceItemData: [
        {
          io: '0',
          type: '0',
          name: '用例excel数据',
          data: {
            path: '',
          },
        },
        {
          io: '0',
          type: '1',
          name: '用例oracle数据',
          data: {
            type: '0',
            pro: {
              connstr: 'xxxxx', //连接字符串
              objName: 'table', //对象名称
            },
          },
        },
      ],
    }
  }
  scTypeSwitch(type) {}
  render() {
    return (
      <div className="sourceConf-containers">
        <ScTypeSwitch
          keys={this.state.typeSwitchData}
          OnSwitch={this.scTypeSwitch.bind(this)}
        />
        <SourceList itemData={this.state.sourceItemData} />
      </div>
    )
  }
}
