import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../AutoComplete'
import classNames from 'classnames'
import './style.css'
import { ParamSource } from '../../models/Command'

export default class FormDropInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    width: PropTypes.number,
    value: PropTypes.string,
    onChangeInput: PropTypes.func,
    placeholder: PropTypes.string,
  }
  render() {
    const onChangeInput = e => {
      this.props.onChangeInput(e.target.value)
    }
    return (
      <div className={classNames('form-input', this.props.className)}>
        <label
          htmlFor={this.props.name}
          style={{
            width: `${this.props.width}px`,
          }}
        >
          {this.props.label}
        </label>
        <div className="dropInput-con">
          <div className="dropInput-con-item dropInput-con-input">
            <input
              type="text"
              value={this.props.value}
              onChange={onChangeInput}
              placeholder={this.props.placeholder || ''}
            />
          </div>
        </div>
      </div>
    )
  }
}
