import React from 'react'
import Modal from '../../Modal'
import PropTypes from 'prop-types'
import DialogContainer from '../Dialog'
import './LibModifyDialog.css'
import classNames from 'classnames'
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
        className={classNames('stripped', 'rename-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <DialogContainer>LibModifyDialog</DialogContainer>
      </Modal>
    )
  }
}
