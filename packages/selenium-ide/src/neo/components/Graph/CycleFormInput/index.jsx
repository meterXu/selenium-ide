import React from 'react'
import PropTypes from 'prop-types'
import LabelledInput from '../../LabelledInput'
import './style.css'
import FormSelect from '../../FormSelect'
import CaseConfigState from '../../../stores/view/caseConf/CaseConfState'
import GraphState from '../../../stores/view/GraphState'

export default class CycleFormInput extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    cycleKeys: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    cycleValues: PropTypes.array.isRequired,
  }
  formSelectChange(index) {
    if (event.target.value) {
      GraphState.setCurrentActiveNodeParamValues(index, event.target.value)
    }
  }
  render() {
    return (
      <div>
        <label className="cycleForm-label">{this.props.label}</label>
        <div className="cycleForm-container">
          {this.props.cycleKeys &&
            this.props.cycleKeys.map((c, i) => {
              return (
                <FormSelect
                  key={i}
                  label={c}
                  name={'cucleFn_' + i}
                  value={CaseConfigState.cycleFormValue(i)}
                  itemdata={this.props.cycleValues}
                  onChange={this.formSelectChange.bind(this, i)}
                />
              )
            })}
          {this.props.cycleKeys.length === 0 && <span>无</span>}
        </div>
      </div>
    )
  }
}
