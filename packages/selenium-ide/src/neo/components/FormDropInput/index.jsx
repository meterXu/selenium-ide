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
    dropValue: PropTypes.string,
    value: PropTypes.string,
    onChangeDrop: PropTypes.func,
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
          <div className="dropInput-con-item dropInput-con-drop">
            <AutoComplete
              items={
                this.props.dropValue
                  ? ParamSource.search(this.props.dropValue)
                  : Array.from(ParamSource.list.values())
              }
              getItemValue={item => item.value}
              getItemKey={item => item.name}
              renderDefaultStyledItem={item => (
                <span key={item.value}>{item.name}</span>
              )}
              value={this.props.dropValue}
              inputProps={{
                name: this.props.name,
                disabled: this.props.disabled,
                onBlur: e => {
                  this.props.onChangeDrop(e.target.value.trim())
                },
              }}
              onChange={e => {
                if (this.props.onChangeDrop)
                  this.props.onChangeDrop(e.target.value)
              }}
              onSelect={value => {
                if (this.props.onChangeDrop) this.props.onChangeDrop(value)
              }}
            />
          </div>
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
