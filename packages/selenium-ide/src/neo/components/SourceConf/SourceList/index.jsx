import React from 'react'
import './style.css'
import PropTypes from 'prop-types'
export default class SourceList extends React.Component {
  constructor(props) {
    super(props)
    this.getIcon = this.getIcon.bind(this)
  }
  static propTypes = {
    itemData: PropTypes.array.isRequired,
    addSource: PropTypes.func.isRequired,
  }
  getIcon(type, ctype) {
    switch (type) {
      case 0: {
        return 'excel'
      }
      case 1: {
        let icon = ''
        switch (ctype) {
          case 0:
            {
              icon = 'oracle'
            }
            break
          case 1:
            {
              icon = 'sqlserver'
            }
            break
          case 2:
            {
              icon = 'mysql'
            }
            break
        }
        return icon
      }
      case 2: {
        return 'api'
      }
    }
  }

  render() {
    return (
      <div className="sourceConf-list">
        <ul>
          {this.props.itemData.map((c, i) => {
            return (
              <li key={i} className="sourceConf-list-item">
                <div
                  className={
                    'sourceConf-type-icon sc-type-icon-' +
                    this.getIcon(c.type, c.data.type)
                  }
                />
                <label className="sourceConf-type-title">{c.name}</label>
              </li>
            )
          })}
          <li className="sourceConf-list-item" onClick={this.props.addSource}>
            <div className="sourceConf-type-icon sc-type-icon-add" />
            <label className="sourceConf-type-title">添加</label>
          </li>
        </ul>
      </div>
    )
  }
}
