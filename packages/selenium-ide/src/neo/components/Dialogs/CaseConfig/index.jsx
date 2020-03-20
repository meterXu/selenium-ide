import React from 'react'
import Modal from '../../Modal'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'
export default class CaseConfigDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    isOpen: PropTypes.bool,
    cancel: PropTypes.func,
  }
  render() {
    return (
      <Modal
        className={classNames('stripped', 'rename-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <div>hhhh</div>
      </Modal>
    )
  }
}
