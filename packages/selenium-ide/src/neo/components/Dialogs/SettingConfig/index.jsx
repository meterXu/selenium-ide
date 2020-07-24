import { observer } from 'mobx-react'
import React from 'react'
import Modal from '../../Modal'
import DialogContainer from '../Dialog'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'
import FlatButton from '../../FlatButton'
import LabelledInput from '../../LabelledInput'
import UiState from '../../../stores/view/UiState'

export default class SettingConfigDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    isOpen: PropTypes.bool,
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
        <SettingConfigDialogContents {...this.props} />
      </Modal>
    )
  }
}
@observer
class SettingConfigDialogContents extends React.Component {
  constructor(props) {
    super(props)
  }
  handleChange(e) {
    UiState.changeBackUrl(e)
  }
  render() {
    const content = {
      title: '系统配置',
      bodyTop: '',
      bodyBottom: '',
      inputLabel: '后端地址',
      submitButton: '确定',
    }
    return (
      <DialogContainer
        title={content.title}
        type={'info'}
        renderFooter={() => (
          <span
            className="right"
            style={{
              display: 'flex',
            }}
          >
            <FlatButton
              onClick={this.props.submit}
              style={{
                marginRight: '0',
              }}
            >
              {content.submitButton}
            </FlatButton>
          </span>
        )}
      >
        {content.bodyTop}
        <LabelledInput
          name={'backurl'}
          label={content.inputLabel}
          value={UiState.pluginConf.backUrl}
          onChange={this.handleChange.bind(this)}
          autoFocus
        />

        {content.bodyBottom}
      </DialogContainer>
    )
  }
}
