import React from 'react'
import Modal from '../../Modal'
import PropTypes from 'prop-types'
import DialogContainer from '../Dialog'
import './LibModifyDialog.css'
import classNames from 'classnames'
import SplitPane from 'react-split-pane'
export default class LibModifyDialog extends React.Component {
  constructor(props) {
    super(props)
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
              <div>left</div>
              <div>right</div>
            </SplitPane>
          </div>
        </DialogContainer>
      </Modal>
    )
  }
}
