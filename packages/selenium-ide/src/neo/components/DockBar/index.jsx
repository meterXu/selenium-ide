import React from 'react'
import './style.css'
export default class DockBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="dockBar">
        <div className="ul-container">
          <ul className="item-container">
            <li>
              <img src={require('../../../icons/case.svg')} alt="case" />
              <span>用例</span>
            </li>
            <li>
              <img src={require('../../../icons/while.svg')} alt="while" />
              <span>循环</span>
            </li>
            <li>
              <img
                src={require('../../../icons/excel_read.svg')}
                alt="excel_read"
              />
              <span>Excel读</span>
            </li>
            <li>
              <img
                src={require('../../../icons/excel_write.svg')}
                alt="excel_write"
              />
              <span>Excel写</span>
            </li>
            <li>
              <img
                src={require('../../../icons/oracle_read.svg')}
                alt="oracle_read"
              />
              <span>Oracle读</span>
            </li>
            <li>
              <img
                src={require('../../../icons/oracle_write.svg')}
                alt="oracle_write"
              />
              <span>Oracle写</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
