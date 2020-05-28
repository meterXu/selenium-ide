import React from 'react'
import Modal from '../../Modal'
import PropTypes from 'prop-types'
import DialogContainer from '../Dialog'
import './LibModifyDialog.css'
import classNames from 'classnames'
import SplitPane from 'react-split-pane'
import Tree from 'rc-tree'
import 'rc-tree/assets/index.css'

export default class LibModifyDialog extends React.Component {
  constructor(props) {
    super(props)
    this.defaultExpandedKeys = ['0', '0-2', '0-9-2']
    this.motion = {
      motionName: 'node-motion',
      motionAppear: false,
    }
  }
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    cancel: PropTypes.func,
  }
  getTreeData() {
    return [
      {
        key: '0',
        title: 'node 0',
        children: [
          { key: '0-0', title: 'node 0-0' },
          { key: '0-1', title: 'node 0-1' },
          {
            key: '0-2',
            title: 'node 0-2',
            children: [
              { key: '0-2-0', title: 'node 0-2-0' },
              { key: '0-2-1', title: 'node 0-2-1' },
              { key: '0-2-2', title: 'node 0-2-2' },
            ],
          },
          { key: '0-3', title: 'node 0-3' },
          { key: '0-4', title: 'node 0-4' },
          { key: '0-5', title: 'node 0-5' },
          { key: '0-6', title: 'node 0-6' },
          { key: '0-7', title: 'node 0-7' },
          { key: '0-8', title: 'node 0-8' },
          {
            key: '0-9',
            title: 'node 0-9',
            children: [
              { key: '0-9-0', title: 'node 0-9-0' },
              {
                key: '0-9-1',
                title: 'node 0-9-1',
                children: [
                  { key: '0-9-1-0', title: 'node 0-9-1-0' },
                  { key: '0-9-1-1', title: 'node 0-9-1-1' },
                  { key: '0-9-1-2', title: 'node 0-9-1-2' },
                  { key: '0-9-1-3', title: 'node 0-9-1-3' },
                  { key: '0-9-1-4', title: 'node 0-9-1-4' },
                ],
              },
              {
                key: '0-9-2',
                title: 'node 0-9-2',
                children: [
                  { key: '0-9-2-0', title: 'node 0-9-2-0' },
                  { key: '0-9-2-1', title: 'node 0-9-2-1' },
                ],
              },
            ],
          },
        ],
      },
    ]
  }
  render() {
    return (
      <Modal
        modConClassName={classNames('libModify-modal-content')}
        className={classNames('stripped', 'libModify-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <DialogContainer title={'函数维护'} onRequestClose={this.props.cancel}>
          <div className={classNames('libModify-container')}>
            <SplitPane
              split="vertical"
              style={{
                position: 'initial',
              }}
              size={175}
              maxSize={250}
              minSize={175}
            >
              <div className={classNames('libModify-tree-container')}>
                <div className={classNames('libModify-pane-title')}>
                  选择函数：
                </div>
                <Tree
                  className={classNames('libModify-tree')}
                  defaultExpandAll={false}
                  defaultExpandedKeys={this.defaultExpandedKeys}
                  height={600}
                  treeData={this.getTreeData()}
                />
              </div>
              <div className={classNames('libModify-pane-title')}>
                详细配置：
              </div>
            </SplitPane>
          </div>
        </DialogContainer>
      </Modal>
    )
  }
}
