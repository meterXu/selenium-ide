import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Modal from '../../Modal'
import DialogContainer from '../Dialog'
import FlatButton from '../../FlatButton'
export default class ProcessWelcomeDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
  }
  render() {
    return (
      <Modal
        className={classNames('stripped', 'new-window-dialog')}
        isOpen={this.props.isOpen}
      >
        <DialogContainer title={'您还未添加任何流程设计'} type={'info'}>
          <label>点击下方按钮添加流程设计</label>
          <FlatButton>添加</FlatButton>
        </DialogContainer>
      </Modal>
    )
  }
}
