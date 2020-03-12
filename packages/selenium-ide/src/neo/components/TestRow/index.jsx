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
import { DragSource, DropTarget } from 'react-dnd'
import { modifier, parse } from 'modifier-keys'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import CommandName from '../CommandName'
import MoreButton from '../ActionButtons/More'
import ListMenu, { ListMenuItem, ListMenuSeparator } from '../ListMenu'
import MultilineEllipsis from '../MultilineEllipsis'
import { withOnContextMenu } from '../ContextMenu'
import ModalState from '../../stores/view/ModalState'
import './style.css'
import Checkbox from '../Checkbox'
import Alert from '../Dialogs/Alert'

export const Type = 'command'

const commandSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const commandTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = component
      .getDecoratedComponentInstance()
      .node.getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.swapCommands(dragIndex, hoverIndex)

    // save time on index lookups
    monitor.getItem().index = hoverIndex
  },
}

@DropTarget(Type, commandTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(Type, commandSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@observer
class TestRow extends React.Component {
  constructor(props) {
    super(props)
    this.addCommand = this.addCommand.bind(this)
    this.copy = this.copy.bind(this)
    this.cut = this.cut.bind(this)
    this.paste = this.paste.bind(this)
    this.select = this.select.bind(this)
    this.remove = this.remove.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.isParamChange = this.isParamChange.bind(this)
    this.showAlertInfo = null
  }
  static propTypes = {
    index: PropTypes.number,
    selected: PropTypes.bool,
    className: PropTypes.string,
    status: PropTypes.string,
    readOnly: PropTypes.bool,
    singleCommandExecutionEnabled: PropTypes.bool,
    command: PropTypes.object.isRequired,
    new: PropTypes.func,
    isPristine: PropTypes.bool,
    select: PropTypes.func,
    startPlayingHere: PropTypes.func,
    executeCommand: PropTypes.func,
    addCommand: PropTypes.func,
    remove: PropTypes.func,
    swapCommands: PropTypes.func,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    copyToClipboard: PropTypes.func,
    pasteFromClipboard: PropTypes.func,
    clearAllCommands: PropTypes.func,
    moveSelection: PropTypes.func,
    setSectionFocus: PropTypes.func,
    onContextMenu: PropTypes.func,
    setContextMenu: PropTypes.func,
    level: PropTypes.number,
    scrollToLastPos: PropTypes.func,
  }
  componentDidMount() {
    if (this.props.selected) {
      this.props.scrollToLastPos()
      this.props.setSectionFocus('editor', () => {
        this.node.focus()
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.selected && !prevProps.selected) {
      this.scrollToRowIfNeeded(this.node)
      this.node.focus()
      this.props.setSectionFocus('editor', () => {
        this.node.focus()
      })
    } else if (this.props.status === 'pending') {
      this.scrollToRowIfNeeded(this.node)
    }
  }
  componentWillUnmount() {
    if (this.props.selected) {
      this.props.setSectionFocus('editor', undefined)
    }
  }
  handleKeyDown(event) {
    const e = event.nativeEvent
    modifier(e)
    const key = e.key.toUpperCase()
    const noModifiers = !e.primaryKey && !e.secondaryKey
    const onlyPrimary = e.primaryKey && !e.secondaryKey

    if (
      this.props.remove &&
      noModifiers &&
      (e.key === 'Delete' || e.key == 'Backspace')
    ) {
      this.remove()
    } else if (!this.props.isPristine && noModifiers && key === 'B') {
      this.props.command.toggleBreakpoint()
    } else if (!this.props.isPristine && noModifiers && key === 'S') {
      this.props.startPlayingHere(this.props.command, {
        playToThisPoint: true,
      })
    } else if (!this.props.isPristine && noModifiers && key === 'U') {
      this.props.startPlayingHere(this.props.command, {
        recordFromHere: true,
      })
    } else if (!this.props.isPristine && noModifiers && key === 'X') {
      this.props.executeCommand(this.props.command)
    } else if (this.props.moveSelection && noModifiers && e.key === 'ArrowUp') {
      e.preventDefault()
      this.props.moveSelection(this.props.index - 1)
    } else if (
      this.props.moveSelection &&
      noModifiers &&
      e.key === 'ArrowDown'
    ) {
      e.preventDefault()
      this.props.moveSelection(this.props.index + 1)
    } else if (!this.props.isPristine && onlyPrimary && key === 'X') {
      this.cut()
    } else if (!this.props.isPristine && onlyPrimary && key === 'C') {
      this.copy()
    } else if (onlyPrimary && key === 'V') {
      this.paste()
    }
  }
  scrollToRowIfNeeded(rowNode) {
    scrollIntoViewIfNeeded(rowNode, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
    })
  }
  addCommand(index) {
    if (!this.props.readOnly) {
      this.props.addCommand(index)
    }
  }
  copy() {
    this.props.copyToClipboard(this.props.command)
  }
  cut() {
    if (!this.props.readOnly) {
      this.props.copyToClipboard(this.props.command)
      this.props.remove(this.props.index, this.props.command)
    }
  }
  paste() {
    if (!this.props.readOnly) {
      this.props.pasteFromClipboard(this.props.index)
    }
  }
  select() {
    this.props.select(this.props.command)
  }
  remove() {
    if (!this.props.readOnly) {
      this.props.remove(this.props.index, this.props.command)
    }
  }
  async clearAll() {
    if (!this.props.readOnly) {
      const choseProceed = await ModalState.showAlert({
        title: 'Clear all test commands',
        description:
          "You're about to remove all of the commands in this test. Do you want to proceed?",
        confirmLabel: 'clear all commands',
        cancelLabel: 'cancel',
      })
      if (choseProceed) {
        this.props.clearAllCommands()
        this.props.moveSelection(0)
      }
    }
  }
  isParamChange(e) {
    if (
      this.props.command &&
      (this.props.command.value || this.props.command.target)
    ) {
      this.props.command.setIsParam(e.target.checked)
    } else {
      if (e.target.checked === true) {
        this.showAlertInfo({
          title: '警告',
          type: 'warn',
          description: '目标或值为空无法设为参数！',
        })
      }
    }
  }
  render() {
    const commandIndentation = (
      <span
        className="command-indentation"
        style={{ paddingRight: `${(this.props.level || 0) * 10}px` }}
      />
    )
    const listMenu =
      !this.props.isPristine && !this.props.readOnly ? (
        <ListMenu width={300} padding={-5} opener={<MoreButton />}>
          <ListMenuItem
            label={parse('x', { primaryKey: true })}
            onClick={this.cut}
          >
            剪切
          </ListMenuItem>
          <ListMenuItem
            label={parse('c', { primaryKey: true })}
            onClick={this.copy}
          >
            拷贝
          </ListMenuItem>
          <ListMenuItem
            label={parse('v', { primaryKey: true })}
            onClick={this.paste}
          >
            粘贴
          </ListMenuItem>
          <ListMenuItem label="Del" onClick={this.remove}>
            删除
          </ListMenuItem>
          <ListMenuSeparator />
          <ListMenuItem
            onClick={() => {
              this.addCommand(this.props.index)
            }}
          >
            插入新命令
          </ListMenuItem>
          <ListMenuSeparator />
          <ListMenuItem onClick={this.clearAll}>清除所有命令</ListMenuItem>
          <ListMenuSeparator />
          <ListMenuItem label="B" onClick={this.props.command.toggleBreakpoint}>
            切换断点
          </ListMenuItem>
          <ListMenuItem
            label="S"
            onClick={() => {
              this.props.startPlayingHere(this.props.command, {
                playToThisPoint: true,
              })
            }}
          >
            播放到此处
          </ListMenuItem>
          <ListMenuItem
            label="U"
            onClick={() => {
              this.props.startPlayingHere(this.props.command, {
                recordFromHere: true,
              })
            }}
          >
            从此处开始录制
          </ListMenuItem>
          <ListMenuItem
            onClick={() => {
              this.props.startPlayingHere(this.props.command, {
                playFromHere: true,
              })
            }}
          >
            从此处开始播放
          </ListMenuItem>
          {this.props.isSingleCommandExecutionEnabled && (
            <ListMenuItem
              label="X"
              onClick={() => {
                this.props.executeCommand(this.props.command)
              }}
            >
              执行此命令
            </ListMenuItem>
          )}
        </ListMenu>
      ) : null
    //setting component of context menu.
    this.props.setContextMenu(listMenu)

    const rendered = (
      <tr
        ref={node => {
          if (node && this.props.new && !this.props.isDragging) {
            this.props.new()
            this.scrollToRowIfNeeded(node)
          }
          return (this.node = node || this.node)
        }}
        className={classNames(
          this.props.className,
          this.props.status,
          { selected: this.props.selected },
          { 'break-point': this.props.command.isBreakpoint }
        )}
        tabIndex={this.props.selected ? '0' : '-1'}
        onContextMenu={
          !this.props.isPristine && !this.props.readOnly
            ? this.props.onContextMenu
            : null
        }
        onClick={this.select}
        onDoubleClick={() => {
          this.props.executeCommand && this.props.singleCommandExecutionEnabled
            ? this.props.executeCommand(this.props.command)
            : undefined
        }}
        onKeyDown={this.handleKeyDown.bind(this)}
        onFocus={this.select}
        style={{
          opacity: this.props.isDragging ? '0' : '1',
        }}
      >
        <td>
          {!this.props.isPristine ? (
            <a
              className="break-toggle"
              onClick={this.props.command.toggleBreakpoint}
              onDoubleClick={e => {
                e.stopPropagation()
              }}
            >
              <span className="code index">{this.props.index + 1}</span>
              <span className="arrow" />
              {!this.props.command.enabled ? (
                <span className="comment-icon">{'//'}</span>
              ) : null}
            </a>
          ) : null}
        </td>
        <td className={classNames('command')}>
          {commandIndentation}
          <CommandName>{this.props.command.displayedName}</CommandName>
        </td>
        <td>
          <MultilineEllipsis lines={3}>
            {this.props.command.target}
          </MultilineEllipsis>
        </td>
        <td>
          <MultilineEllipsis lines={3}>
            {this.props.command.value}
          </MultilineEllipsis>
        </td>
        <td className={classNames('comment')}>
          <MultilineEllipsis lines={1}>
            {this.props.command.comment}
          </MultilineEllipsis>
        </td>
        <td className={classNames('control-chk-container')}>
          {(() => {
            if (this.props.command.command) {
              return (
                <Checkbox
                  width={0}
                  checked={
                    this.props.command ? this.props.command.isParam : false
                  }
                  onChange={this.props.command ? this.isParamChange : null}
                />
              )
            }
          })()}
        </td>
        <td className={classNames('control-chk-container')}>
          <MultilineEllipsis lines={3}>
            {this.props.command.directionValue}
          </MultilineEllipsis>
        </td>
        <td className="buttons">
          {!this.props.isPristine && !this.props.readOnly ? listMenu : <div />}
        </td>
        <Alert
          show={c => {
            this.showAlertInfo = c
          }}
        />
      </tr>
    )
    return !this.props.isPristine && !this.props.readOnly
      ? this.props.connectDropTarget(this.props.connectDragSource(rendered))
      : rendered
  }
}

export default withOnContextMenu(TestRow)
