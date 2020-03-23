import React from 'react'
import PropTypes from 'prop-types'
import LabelledInput from '../../LabelledInput'
import './style.css'
export default class CycleFormInput extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    cycleKeys: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div>
        <label className="cycleForm-label">{this.props.label}</label>
        <div className="cycleForm-container">
          {this.props.cycleKeys &&
            this.props.cycleKeys.map((c, i) => {
              return <LabelledInput key={i} label={c} name={'cucleFn_' + i} />
            })}
          {this.props.cycleKeys.length === 0 && <span>无</span>}
        </div>
      </div>
    )
  }
}
