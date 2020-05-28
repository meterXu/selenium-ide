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
import { observer } from 'mobx-react'
import FormGroup from '../../FormGroup'
import FormInput from '../../FormInput'
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
                  onSelect={GraphState.TreeSelect}
                />
              </div>
              <SplitPane
                split="horizontal"
                style={{
                  position: 'initial',
                }}
                size={500}
                maxSize={500}
                minSize={400}
              >
                <div className={classNames('libModify-pane-con')}>
                  <div className={classNames('libModify-pane-title')}>
                    详细配置：
                  </div>
                  <div>
                    <FormGroup label="使用函数" name="">
                      <label>
                        {(() => {
                          if (GraphState.currentActiveFun) {
                            return GraphState.currentActiveFun.title
                          } else {
                            return '--请在左侧选择要使用的函数--'
                          }
                        })()}
                      </label>
                    </FormGroup>
                    <FormGroup label="函数参数" name="">
                      <FormInput label="param1" name="param2" />
                      <FormInput label="param2" name="param2" />
                      <FormInput label="param2" name="param2" />
                      <FormInput label="param2" name="param2" />
                    </FormGroup>
                  </div>
                  <div
                    className={classNames(
                      'libModify-pane-title',
                      'libModify-pane-title-bottom'
                    )}
                  >
                    描述：
                  </div>
                </div>
                <div className={classNames('libModify-pane-con')}>
                  <div
                    className={classNames('libModify-pane-doc')}
                    dangerouslySetInnerHTML={{
                      __html:
                        GraphState.currentActiveFun === null ||
                        GraphState.currentActiveFun === undefined
                          ? '--暂无--'
                          : GraphState.currentActiveFun.doc,
                    }}
                  />
                </div>
              </SplitPane>
            </SplitPane>
          </div>
        </DialogContainer>
      </Modal>
    )
  }
}
