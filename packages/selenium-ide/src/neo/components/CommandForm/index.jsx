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
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { Commands } from '../../models/Command'
import { ParamSource } from '../../models/Command'
import Input from '../FormInput'
import TextArea from '../FormTextArea'
import CommandInput from '../CommandInput'
import TargetInput from '../TargetInput'
import FlatButton from '../FlatButton'
import InfoBadge from '../InfoBadge'
import { find, select } from '../../IO/SideeX/find-select'
import ModalState from '../../stores/view/ModalState'
import UiState from '../../stores/view/UiState'
import PlaybackState from '../../stores/view/PlaybackState'
import FormDropInput from '../FormDropInput'
import './style.css'
import Checkbox from '../Checkbox'

@observer
export default class CommandForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  static propTypes = {
    command: PropTypes.object,
    isSelecting: PropTypes.bool,
    onSubmit: PropTypes.func,
  }
  getCommandName(command) {
    const commandName = Commands.list.get(command).name
    if (commandName === 'pause' && !UiState.pauseNotificationSent) {
      ModalState.showAlert({
        title: '开始搬砖。',
        description:
          'IDE命令中内置了隐式等待。\n\n' +
          '如果那没有满足预期，请使用显式等待命令。 ' +
          '这些命令的开头一般是 `wait for element` (例如： `wait for element visible`)。',
      })
      UiState.pauseNotificationSent = true
    }
    return commandName
  }
  getParamSourceName(name) {
    const paramSourceName = ParamSource.list.get(name).name
    return paramSourceName
  }
  parseCommandName(command) {
    return Commands.list.has(command) ? this.getCommandName(command) : command
  }
  parseParamSourceName(name) {
    return ParamSource.list.has(name) ? this.getParamSourceName(name) : name
  }
  parseCommandTargetType(command) {
    return Commands.list.has(command)
      ? Commands.list.get(command).type
      : undefined
  }
  handleSelect() {
    const type = this.parseCommandTargetType(this.props.command.command)
    if (type) {
      select(type, this.props.command.target)
    }
  }
  render() {
    const isParamChange = e => {
      if (this.props.command) {
        this.props.command.setIsParam(e.target.checked)
      }
    }
    return (
      <div className="command-form">
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <div className="target">
            <CommandInput
              id="command"
              name="command"
              label="命令"
              value={
                this.props.command
                  ? this.parseCommandName(this.props.command.command)
                  : ''
              }
              disabled={!this.props.command || PlaybackState.isPlaying}
              onChange={
                this.props.command ? this.props.command.setCommand : null
              }
            />
            <FlatButton
              data-tip="<p>启用/禁用命令</p>"
              className={classNames(
                'icon',
                this.props.command &&
                this.props.command.command &&
                !this.props.command.enabled
                  ? 'si-remove-comment'
                  : 'si-comment'
              )}
              disabled={
                !this.props.command ||
                (this.props.command && !this.props.command.command) ||
                PlaybackState.isPlaying
              }
              onClick={
                this.props.command ? this.props.command.toggleEnabled : null
              }
            />
            <FlatButton
              data-tip={
                this.props.command && this.props.command.opensWindow
                  ? '<p>修改新窗口配置</p>'
                  : '<p>添加新窗口配置</p>'
              }
              className={classNames(
                'new-window-button',
                'icon',
                'si-open-tab',
                {
                  active: this.props.command && this.props.command.opensWindow,
                }
              )}
              disabled={
                !this.props.command ||
                (this.props.command && !this.props.command.command) ||
                PlaybackState.isPlaying
              }
              onClick={() => {
                ModalState.toggleNewWindowConfiguration()
                this.props.command
                  ? this.props.command.toggleOpensWindowRead()
                  : undefined
              }}
            >
              {this.props.command &&
              (this.props.command.opensWindow &&
                !this.props.command.opensWindowRead) ? (
                <InfoBadge />
              ) : (
                undefined
              )}
            </FlatButton>
          </div>
          <div className="target">
            <TargetInput
              id="target"
              name="target"
              label="目标"
              value={this.props.command ? this.props.command.target : ''}
              targets={this.props.command ? this.props.command.targets : []}
              disabled={!this.props.command}
              onChange={
                this.props.command ? this.props.command.setTarget : null
              }
            />
            <FlatButton
              data-tip="<p>在页面中选择目标</p>"
              className={classNames('icon', 'si-select', {
                active: this.props.isSelecting,
              })}
              disabled={
                this.props.command
                  ? !this.parseCommandTargetType(this.props.command.command)
                  : true
              }
              onClick={this.handleSelect}
            />
            <FlatButton
              data-tip="<p>在页面中查找目标</p>"
              className="icon si-search"
              disabled={
                this.props.command
                  ? !this.parseCommandTargetType(this.props.command.command)
                  : true
              }
              onClick={() => {
                find(this.props.command.target)
              }}
            />
          </div>
          <TextArea
            id="value"
            name="value"
            label="值"
            value={this.props.command ? this.props.command.value : ''}
            disabled={!this.props.command}
            onChange={this.props.command ? this.props.command.setValue : null}
          />
          <Input
            id="comment"
            name="comment"
            label="描述"
            value={this.props.command ? this.props.command.comment : ''}
            disabled={!this.props.command}
            onChange={this.props.command ? this.props.command.setComment : null}
          />
          <Checkbox
            label="参数"
            checked={this.props.command ? this.props.command.isParam : false}
            onChange={this.props.command ? isParamChange : null}
          />
          {(() => {
            if (this.props.command && this.props.command.isParam) {
              return (
                <FormDropInput
                  label="参数指向"
                  placeholder="替换匹配的值为参数"
                  disabled={!this.props.command || PlaybackState.isPlaying}
                  dropValue={
                    this.props.command
                      ? this.parseParamSourceName(
                          this.props.command.directionType
                        )
                      : ''
                  }
                  value={
                    this.props.command
                      ? !this.props.command.directionValue
                        ? this.props.command.value
                        : this.props.command.directionValue
                      : ''
                  }
                  onChangeDrop={
                    this.props.command
                      ? this.props.command.setDirectionType
                      : null
                  }
                  onChangeInput={
                    this.props.command
                      ? this.props.command.setDirectionValue
                      : null
                  }
                />
              )
            }
          })()}
          <input tabIndex="-1" type="submit" onClick={this.props.onSubmit} />
        </form>
      </div>
    )
  }
}
