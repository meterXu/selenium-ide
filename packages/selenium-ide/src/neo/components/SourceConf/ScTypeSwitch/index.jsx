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
    onSwitch: PropTypes.func.isRequired,
  }
  switchScType(type) {
    this.setState({
      sourceConfType: type,
    })
    this.props.onSwitch(type)
  }
  render() {
    return (
      <div className="sourceConf-typeSwitch">
        <ul>
          {this.props.keys.map((c,i)=>{
            return (
                <li key={i}
                    className={
                      this.state.sourceConfType === c.value
                          ? 'sourceConf-typeSwitch-ul-li-active'
                          : ''
                    }
                    onClick={this.switchScType.bind(this, c.value)}
                >
                  {c.text}
                </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
