import React from 'react'
import Modal from '../../Modal'
import DialogContainer from '../Dialog'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'
import FlatButton from '../../FlatButton'
import ModalState from '../../../stores/view/ModalState'
export default class SourceModifyDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    isOpen: PropTypes.bool,
    isAdd: PropTypes.bool,
    submit: PropTypes.func,
    cancel: PropTypes.func,
  }
  render() {
    return (
      <Modal
        className={classNames('stripped', 'rename-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <SourceModifyContents {...this.props} />
      </Modal>
    )
  }
}

class SourceModifyContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title:
        (this.props.isAdd ? '添加数据源 - ' : '维护数据源 - ') +
        ModalState.sourceTypeNames[0],
      bodyTop: '',
      bodyBottom: '',
      submitButton: this.props.isAdd ? '添加' : '保存',
      cancelButton: '关闭',
    }
  }

  render() {
    return (
      <DialogContainer
        title={this.state.title}
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
              {this.state.cancelButton}
            </FlatButton>
            <FlatButton
              onClick={this.props.submit}
              style={{
                marginRight: '0',
              }}
            >
              {this.state.submitButton}
            </FlatButton>
          </span>
        )}
      >
        {this.state.bodyTop}
        {this.state.bodyBottom}
      </DialogContainer>
    )
  }
}
