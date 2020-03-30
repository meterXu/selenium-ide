// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.css'

export default class FormSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    width: PropTypes.number,
    children: PropTypes.element,
    onChange: PropTypes.func,
    itemData: PropTypes.array.isRequired,
  }
  render() {
    const props = Object.assign({}, this.props, {
      onChange: e => {
        if (this.props.onChange) this.props.onChange(e.target.value)
      },
      width: undefined,
    })
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
        <select {...props}>
          {this.props.itemData.map((c, i) => {
            return (
              <option key={i} value={c.value}>
                {c.text}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}
