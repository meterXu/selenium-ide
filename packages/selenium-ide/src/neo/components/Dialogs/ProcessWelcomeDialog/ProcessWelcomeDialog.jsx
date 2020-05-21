import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Modal from '../../Modal'
import DialogContainer from '../Dialog'
import FlatButton from '../../FlatButton'
import './style.css'
import FormInput from '../../FormInput'
import FormGroup from '../../FormGroup'
import UiState from '../../../stores/view/UiState'
import GraphState from '../../../stores/view/GraphState'

export default class ProcessWelcomeDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prcName: null,
    }
  }
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    cancel: PropTypes.func,
  }
  addProcess() {
    let process = UiState.project.createProcess(this.state.prcName)
    GraphState.setCurrentProcess(process)
    this.props.cancel()
  }
  nameChange() {
    this.setState({
      prcName: event.target.value,
    })
  }

  render() {
    return (
      <Modal
        className={classNames('stripped', 'new-window-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <DialogContainer
          title={'您还未添加任何流程设计'}
          type={'info'}
          renderFooter={() => (
            <span
              className="right"
              style={{
                display: 'flex',
              }}
            >
              <FlatButton
                onClick={this.props.cancel}
                style={{
                  marginRight: '0',
                }}
              >
                关闭
              </FlatButton>
              <FlatButton
                disabled={!this.state.prcName}
                onClick={this.addProcess.bind(this)}
              >
                添加
              </FlatButton>
            </span>
          )}
        >
          <FormGroup label="请输入新的流程设计名称！" width={200}>
            <FormInput
              label="名称"
              name="name"
              value={this.state.prcName}
              onChange={this.nameChange.bind(this)}
            />
          </FormGroup>
        </DialogContainer>
      </Modal>
    )
  }
}
