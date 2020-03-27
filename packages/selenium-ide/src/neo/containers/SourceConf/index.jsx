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
              <div className="sourceConf-type-icon sc-type-icon-oracle"></div>
              <label className="sourceConf-type-title">oracle</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-mysql"></div>
              <label className="sourceConf-type-title">mysql</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-sqlserver"></div>
              <label className="sourceConf-type-title">sqlserver</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-excel"></div>
              <label className="sourceConf-type-title">excel</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item">
              <div className="sourceConf-type-icon sc-type-icon-api"></div>
              <label className="sourceConf-type-title">api</label>
            </li>
            <li className="sourceConf-list-item sourceConf-list-item-add">
              <div className="sourceConf-type-icon sc-type-icon-add"></div>
              <label className="sourceConf-type-title">添加</label>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
