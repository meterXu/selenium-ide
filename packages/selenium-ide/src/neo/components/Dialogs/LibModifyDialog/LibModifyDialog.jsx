import React from 'react'
import Modal from '../../Modal'
import PropTypes from 'prop-types'
import DialogContainer from '../Dialog'
import './LibModifyDialog.css'
import classNames from 'classnames'
import SplitPane from 'react-split-pane'
import Tree from 'rc-tree'
import 'rc-tree/assets/index.css'
import GraphState from '../../../stores/view/GraphState'
import {observer} from 'mobx-react'
@observer
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
                  treeData={GraphState.LibTreeData}
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
