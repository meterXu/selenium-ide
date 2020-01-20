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
import Modal from '../../Modal'
import LabelledInput from '../../LabelledInput'
import Checkbox from '../../Checkbox'
import DialogContainer from '../Dialog'
import FlatButton from '../../FlatButton'
import './style.css'

export default class NewWindowConfigurationDialog extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    cancel: PropTypes.func,
    isUniqueWindowName: PropTypes.func,
  }

  render() {
    return (
      <Modal
        className={classNames('stripped', 'new-window-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <NewWindowInput {...this.props} />
      </Modal>
    )
  }
}

class NewWindowInput extends React.Component {
  static propTypes = {
    cancel: PropTypes.func.isRequired,
    command: PropTypes.object.isRequired,
    isUniqueWindowName: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleWindowNameChange = this.handleWindowNameChange.bind(this)
    this.handleWindowTimeoutChange = this.handleWindowTimeoutChange.bind(this)
    this.handleWindowTimeoutBlur = this.handleWindowTimeoutBlur.bind(this)
    this.isInvalidOption = this.isInvalidOption.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      isInvalidName: false,
      isConfigEnabled: props.command.opensWindow,
      options: {
        windowName: props.command.windowHandleName,
        windowTimeout: props.command.windowTimeout,
      },
    }
  }
  handleCheckboxChange(e) {
    this.setState({ ['isConfigEnabled']: e.target.checked })
  }
  handleInputChange(type, value) {
    const result = { [type]: value }
    this.setState({
      ['options']: {
        ...this.state.options,
        ...result,
      },
    })
  }
  handleWindowNameChange(value) {
    this.isInvalidOption(value)
    this.handleInputChange('windowName', value)
  }
  handleWindowTimeoutChange(value) {
    const result = value === '' ? value : parseInt(value)
    this.handleInputChange('windowTimeout', result)
  }
  handleWindowTimeoutBlur() {
    if (this.state.options.windowTimeout === '')
      this.handleInputChange('windowTimeout', 0)
  }
  isInvalidOption(value) {
    const isEmpty = value === ''
    const isNonUnique = !this.props.isUniqueWindowName(
      value,
      this.props.command.id
    )
    const isInvalid = isEmpty || isNonUnique
    const errorMessage = isInvalid
      ? isEmpty
        ? '名称不能为空'
        : '名称必须唯一'
      : undefined
    this.setState({
      ...this.state,
      isInvalidName: isInvalid,
      errorMessage: errorMessage,
    })
  }
  onSubmit() {
    this.props.command.setWindowHandleName(this.state.options.windowName)
    this.props.command.setWindowTimeout(this.state.options.windowTimeout)
    this.props.command.setOpensWindow(this.state.isConfigEnabled)
    this.props.cancel()
  }
  render() {
    return (
      <DialogContainer
        title="新窗口配置"
        type={this.state.isInvalidName ? 'warn' : 'info'}
        renderFooter={() => (
          <div className="right">
            <FlatButton onClick={this.props.cancel}>cancel</FlatButton>
            <FlatButton
              type="submit"
              disabled={
                this.state.isInvalidName || this.state.options.windowName === ''
              }
              onClick={this.onSubmit}
            >
              {'确认'}
            </FlatButton>
          </div>
        )}
        onRequestClose={this.props.cancel}
      >
        {this.state.isConfigEnabled ? (
          <p
            style={{
              whiteSpace: 'pre-line',
            }}
          >
            {`此命令将打开一个新窗口。为了准确播放，需要一些其他信息。`}
          </p>
        ) : (
          <p>如果命令打开一个新窗口，请使用此选项。</p>
        )}
        <Checkbox
          label="启用新窗口配置"
          form={true}
          disabled={false}
          checked={this.state.isConfigEnabled}
          onChange={this.handleCheckboxChange}
        />
        {this.state.isConfigEnabled ? (
          <React.Fragment>
            <LabelledInput
              name="windowName"
              label="1. 窗口名称"
              value={this.state.options.windowName}
              onChange={this.handleWindowNameChange}
              autoFocus
            />
            {this.state.isInvalidName && (
              <div className="message">* {this.state.errorMessage}</div>
            )}
            <p style={{ whiteSpace: 'pre-line' }}>
              {`窗口名称用于与新窗口进行交互。为了使您的测试更具可读性，请将其更改为描述性的内容`}
            </p>
            <LabelledInput
              name="windowTimeout"
              label="2. 超时 (毫秒)"
              type="number"
              value={this.state.options.windowTimeout}
              onChange={this.handleWindowTimeoutChange}
              onBlur={this.handleWindowTimeoutBlur}
            />
            <p>超时是测试等待新窗口完成打开的时间。</p>
          </React.Fragment>
        ) : null}
      </DialogContainer>
    )
  }
}
