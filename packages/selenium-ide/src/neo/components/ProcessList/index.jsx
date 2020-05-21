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

import React, { Component } from 'react'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { MenuTest } from '../Test'
import UiState from '../../stores/view/UiState'
import GraphState from '../../stores/view/GraphState'
import './style.css'

@observer
export default class ProcessList extends Component {
  static propTypes = {
    process: MobxPropTypes.arrayOrObservableArray.isRequired,
  }
  render() {
    return (
      <ul className={classNames('tests', { active: !this.props.collapsed })}>
        {this.props.process.map((process, index) => (
          <li key={process.id}>
            <MenuTest
              key={process.id}
              index={index}
              test={process}
              selected={
                UiState.project.selectedProcess &&
                process.id === UiState.project.selectedProcess
              }
              changed={process.modified}
              selectTest={GraphState.selectProcess}
              renameTest={GraphState.renameProcess}
              duplicateTest={() => {
                GraphState.duplicateProcess(process)
              }}
              removeTest={() => {
                GraphState.removeProcess(process)
              }}
              codeExport={GraphState.codeExport}
              setSectionFocus={UiState.setSectionFocus}
            />
          </li>
        ))}
      </ul>
    )
  }
}
