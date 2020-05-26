import React from 'react'
import { observer } from 'mobx-react'
import './style.css'
import PropTypes from 'prop-types'
import ModalState from '../../../stores/view/ModalState'
import UiState from '../../../stores/view/UiState'
@observer
export default class SourceList extends React.Component {
  constructor(props) {
    super(props)
    this.getIcon = this.getIcon.bind(this)
  }

  static propTypes = {
    addSource: PropTypes.func.isRequired,
  }

  getIcon(type, ctype) {
    switch (type) {
      case UiState.enum.scType.文件: {
        return UiState.enum.scTypeName.excel
      }
      case UiState.enum.scType.数据库: {
        let icon = ''
        switch (ctype) {
          case UiState.enum.scDbType.oracle:
            {
              icon = UiState.enum.scTypeName.oracle
            }
            break
          case UiState.enum.scDbType.sqlServer:
            {
              icon = UiState.enum.scTypeName.sqlserver
            }
            break
          case UiState.enum.scDbType.mysql:
            {
              icon = UiState.enum.scTypeName.mysql
            }
            break
        }
        return icon
      }
      case UiState.enum.scType.接口: {
        return UiState.enum.scTypeName.api
      }
    }
  }

  viewSource(index) {
    ModalState.setSourceConfModel(UiState.responseSources[index])
    this.props.viewSource()
  }

  initSourceList() {
    if (UiState.responseSources && UiState.responseSources.length > 0) {
      return UiState.responseSources.map((c, i) => {
        return (
          <li
            key={i}
            className="sourceConf-list-item"
            onClick={this.viewSource.bind(this, i)}
          >
            <div
              className={
                'sourceConf-type-icon sc-type-icon-' +
                this.getIcon(c.type, c.data.type)
              }
            />
            <label className="sourceConf-type-title">{c.name}</label>
          </li>
        )
      })
    } else {
      return (
        <li className="sourceConf-list-item">
          <div className={'sourceConf-type-icon sc-type-icon-none'} />
          <label className="sourceConf-type-title">暂无数据源</label>
        </li>
      )
    }
  }

  render() {
    return (
      <div className="sourceConf-list">
        <ul>{this.initSourceList()}</ul>
      </div>
    )
  }
}
