import React from 'react'
import './style.css'
import PropTypes from 'prop-types'
export default class ScTypeSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceConfType: 0,
    }
  }
  static propTypes = {
    OnSwitch: PropTypes.func.isRequired,
  }
  switchScType(type) {
    this.setState({
      sourceConfType: type,
    })
    this.props.OnSwitch(type)
  }
  render() {
    return (
      <div className="sourceConf-typeSwitch">
        <ul>
          <li
            className={
              this.state.sourceConfType === 0
                ? 'sourceConf-typeSwitch-ul-li-active'
                : ''
            }
            onClick={this.switchScType.bind(this, 0)}
          >
            读取
          </li>
          <li
            className={
              this.state.sourceConfType === 1
                ? 'sourceConf-typeSwitch-ul-li-active'
                : ''
            }
            onClick={this.switchScType.bind(this, 1)}
          >
            写入
          </li>
        </ul>
      </div>
    )
  }
}
