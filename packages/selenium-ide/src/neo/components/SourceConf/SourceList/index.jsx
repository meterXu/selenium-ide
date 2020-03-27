import React from 'react'
import './style.css'
import PropTypes from 'prop-types'
export default class SourceList extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    itemData: PropTypes.array.isRequired,
  }
  getIcon(type, ctype) {
    switch (type) {
      case '0': {
        return 'sc-type-icon-excel'
      }
      case '1': {
        let icon = ''
        switch (ctype) {
          case '0':
            {
              icon = 'sc-type-icon-oracle'
            }
            break
          case '1':
            {
              icon = 'sc-type-icon-sqlserver'
            }
            break
          case '2':
            {
              icon = 'sc-type-icon-mysql'
            }
            break
        }
        return icon
      }
      case '2': {
        return 'sc-type-icon-api'
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
                  className={`sourceConf-type-icon ${this.getIcon.bind(
                    this,
                    c.type,
                    c.data.type
                  )}`}
                />
                <label className="sourceConf-type-title">{c.name}</label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
