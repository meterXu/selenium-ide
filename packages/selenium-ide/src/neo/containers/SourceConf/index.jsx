import React from 'react'
import './type.css'
export default class SourceConf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceConfType: 0,
    }
  }
  switchScType(type) {
    this.setState({
      sourceConfType: type,
    })
  }
  render() {
    return (
      <div className="sourceConf-containers">
        <div className="sourceConf-typeSwitch">
          <ul>
            <li
              className={this.state.sourceConfType===0?'sourceConf-typeSwitch-ul-li-active':''}
              onClick={this.switchScType.bind(this, 0)}
            >
              读取
            </li>
            <li className={this.state.sourceConfType===1?'sourceConf-typeSwitch-ul-li-active':''}
              onClick={this.switchScType.bind(this, 1)}>写入</li>

          </ul>
        </div>
        <div className="sourceConf-list">
          <ul>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-oracle">图标</div>
              <label className="sourceConf-type-title">标题</label>
            </li>
            <li className="sourceConf-list-item sourceConf-list-item-add">
              <div className="sourceConf-type-icon">图标</div>
              <label className="sourceConf-type-title">添加</label>
            </li>
            <li className="sourceConf-list-item sourceConf-list-item-add">
              <div className="sourceConf-type-icon">图标</div>
              <label className="sourceConf-type-title">添加</label>
            </li>
            <li className="sourceConf-list-item sourceConf-list-item-add">
              <div className="sourceConf-type-icon">图标</div>
              <label className="sourceConf-type-title">添加</label>
            </li>
            <li className="sourceConf-list-item sourceConf-list-item-add">
              <div className="sourceConf-type-icon">图标</div>
              <label className="sourceConf-type-title">添加</label>
            </li>
            <li className="sourceConf-list-item sourceConf-list-item-add">
              <div className="sourceConf-type-icon">图标</div>
              <label className="sourceConf-type-title">添加</label>
            </li>
            <li className="sourceConf-list-item sourceConf-list-item-add">
              <div className="sourceConf-type-icon">图标</div>
              <label className="sourceConf-type-title">添加</label>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
