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
import ActionButton from '../ActionButton'
import classNames from 'classnames'
import { parse } from 'modifier-keys'

export default class PlayAllButton extends React.Component {
  render() {
    return (
      <ActionButton
        data-tip={`<p>运行组内所有测试<span style="color: #929292;padding-left: 5px;">${parse(
          'r',
          { primaryKey: true, shiftKey: true }
        )}</span></p>`}
        {...this.props}
        className={classNames('si-play-all', this.props.className)}
      /> // eslint-disable-line react/prop-types
    )
  }
}
