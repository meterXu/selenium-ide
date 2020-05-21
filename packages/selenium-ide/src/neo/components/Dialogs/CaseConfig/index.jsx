import { observer } from 'mobx-react'
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
import FormGroup from '../../FormGroup'
import FormSelect from '../../FormSelect'
import CaseConfigState from '../../../stores/view/caseConf/CaseConfState'
import UiState from '../../../stores/view/UiState'

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
@observer
class CaseConfigDialogContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemdata: [],
    }
  }

  itemClick(obj) {
    GraphState.setCurrentActiveNodeObj(
      obj.value,
      obj.text,
      this.props.tests
        .find(c => c.name === obj.hideValue)
        .commands.filter(c => c.isParam)
        .map((c, i) => {
          return 'param' + i
        }),
      null
    )
    CaseConfigState.getSelectSource(obj.hideValue)
    CaseConfigState.setSelectedSource(null)
  }

  componentDidMount() {
    this.setState({
      itemdata: this.props.tests
        .map(c => {
          return {
            suite: c.suite,
            text: (c.suite ? '[' + c.suite + '] ' : '') + c.name,
            value: c.id,
            hideValue: c.name,
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
    if (GraphState.currentActiveNode.data.caseId) {
      let _test = this.props.tests.find(
        c => c.id === GraphState.currentActiveNode.data.caseId
      )
      CaseConfigState.getSelectSource(_test.name)
      CaseConfigState.setSelectedSource(
        GraphState.currentActiveNode.data.sourceId
      )
    } else {
      UiState.emptyResponseSource()
    }
  }
  formSelectChange() {
    CaseConfigState.setSelectedSource(event.target.value)
    if (CaseConfigState.selectedSource) {
      GraphState.setCurrentActiveNodeSource(CaseConfigState.selectedSource.id)
    } else {
      GraphState.setCurrentActiveNodeSource(null)
    }
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
          itemdata={this.state.itemdata}
          defaultText={GraphState.currentActiveNode.data.caseName}
          itemClick={this.itemClick.bind(this)}
        />
        <FormGroup label="数据源" name="">
          <FormSelect
            name="type"
            itemdata={CaseConfigState.selectSourceList}
            value={CaseConfigState.sourceValue}
            onChange={this.formSelectChange.bind(this)}
          />
        </FormGroup>
        <CycleFormInput
          label={'参数绑定'}
          cycleKeys={GraphState.currentActiveNode.data.paraNames}
          cycleValues={CaseConfigState.cycleValues}
        />
        {content.bodyBottom}
      </DialogContainer>
    )
  }
}
