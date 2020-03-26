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
import Title from 'react-document-title'
import ContentEditable from 'react-contenteditable'
import { observer } from 'mobx-react'
import NewButton from '../ActionButtons/New'
import OpenButton from '../ActionButtons/Open'
import SaveButton from '../ActionButtons/Save'
import MoreButton from '../ActionButtons/More'
import ListMenu, { ListMenuItem } from '../ListMenu'
import SourceConf from '../ActionButtons/SourceConf'
import './style.css'
import UiState from '../../stores/view/UiState'

@observer
export default class ProjectHeader extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    changed: PropTypes.bool,
    changeName: PropTypes.func.isRequired,
    openFile: PropTypes.func,
    load: PropTypes.func,
    save: PropTypes.func,
    new: PropTypes.func,
  }
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }
  handleChange(e) {
    this.props.changeName(e.target.value)
  }
  render() {
    return (
      <div className={classNames('header', { changed: this.props.changed })}>
        <Title
          title={`JetRecord ${this.props.title === '' ? '' : '-'} ${
            this.props.title
          }${this.props.changed ? '*' : ''}`}
        />
        <div>
          <span className="title-prefix">项目: </span>
          <ContentEditable
            className="title"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            html={this.props.title}
          />
          <i className="si-pencil" />
        </div>
        <span className="buttons">
          <SourceConf onClick={this.props.switchHeadBtn} type={UiState.selectedView==='sourceConf'?0:1} />
          <NewButton onClick={this.props.new} />
          <OpenButton
            onFileSelected={this.props.load}
            openFile={this.props.openFile}
          />
          <SaveButton
            data-place="left"
            unsaved={this.props.changed}
            onClick={this.props.save}
          />
        </span>
      </div>
    )
  }
}
