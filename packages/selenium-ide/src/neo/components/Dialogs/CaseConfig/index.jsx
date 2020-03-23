import React from 'react'
import Modal from '../../Modal'
import DialogContainer from '../Dialog'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'
import FlatButton from '../../FlatButton'
import Combobox from '../../Graph/Combobox'
import GraphState from '../../../stores/view/GraphState'
import CycleFormInput from '../../Graph/CycleFormInput'
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
      itemData: [],
      paraNames: [],
    }
  }
  itemClick(obj) {
    GraphState.currentActiveNode.data.caseId = obj.value
    GraphState.currentActiveNode.data.caseName = obj.text
    GraphState.currentActiveNode.text = obj.text
    GraphState.currentActiveNode.st[1].attr({
      text: obj.text,
    })
    GraphState.currentActiveNode.data.paraNames = [
      'webDriver',
      'param1',
      'param2',
    ]
    this.setState({
      paraNames: GraphState.currentActiveNode.data.paraNames,
    })
  }

  componentDidMount() {
    this.setState({
      itemData: this.props.tests
        .map(c => {
          return {
            suite: c.suite,
            text: (c.suite ? '[' + c.suite + '] ' : '') + c.name,
            value: c.id,
          }
        })
        .sort((a, b) => {
          if (a.suite < b.suite) {
            return -1
          } else if (a.suite > b.suite) {
            return 1
          } else if (a.text < b.text) {
            return -1
          } else if (a.text > b.text) {
            return 1
          } else {
            return 0
          }
        }),
    })
  }
  render() {
    const content = {
      title: '用例详细配置',
      bodyTop: '',
      bodyBottom: '',
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
        <Combobox
          name="caseId"
          label="用例"
          itemData={this.state.itemData}
          defaultText={GraphState.currentActiveNode.data.caseName}
          itemClick={this.itemClick.bind(this)}
        />
        <CycleFormInput label={'参数'} cycleKeys={this.state.paraNames} />
        {content.bodyBottom}
      </DialogContainer>
    )
  }
}
