import React from 'react'
import Modal from '../../Modal'
import DialogContainer from '../Dialog'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'
import FlatButton from '../../FlatButton'
import LabelledInput from '../../LabelledInput'
import Combobox from '../../Graph/Combobox'
export default class CaseConfigDialog extends React.Component {
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
        <CaseConfigDialogContents {...this.props} />
      </Modal>
    )
  }
}

class CaseConfigDialogContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caseId: null,
      params: null,
      itemData: [],
    }
  }
  itemClick(value) {
    this.setState({
      caseId: value,
    })
  }
  componentDidMount() {
    this.setState({
      itemData: this.props.tests.map(c => {
        return { text: c.name, value: c.id }
      }),
    })
  }
  render() {
    const content = {
      title: '用例详细配置',
      bodyTop: '',
      bodyBottom: '',
      submitButton: '确定',
      cancelButton: '关闭',
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
            <FlatButton onClick={this.props.cancel}>
              {content.cancelButton}
            </FlatButton>
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
        <Combobox
          name="caseId"
          label="用例"
          itemData={this.state.itemData}
          itemClick={this.itemClick.bind(this)}
        />
        {content.bodyBottom}
      </DialogContainer>
    )
  }
}
