import React from 'react'
import PropTypes from 'prop-types'
import 'rc-slider/assets/index.css'
import './style.css'
export default class SpeedNumber extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toUnit: 's',
    }
  }
  static propTypes = {
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }
  get UnitConversion() {
    switch (this.props.unit) {
      case 'ms': {
        return (this.props.value / 1000).toFixed(1)
      }
      case 's':
      default: {
        return this.props.value
      }
    }
  }
  render() {
    return (
      <div className="speed-show-number">
        {this.UnitConversion}
        <span className="speed-show-unit"> {this.state.toUnit}</span>
      </div>
    )
  }
}
