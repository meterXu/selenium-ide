import React from 'react'
import Modal from '../../Modal'
import DialogContainer from '../Dialog'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'
import FlatButton from '../../FlatButton'
import ModalState from '../../../stores/view/ModalState'
import FileSource from './FileSource'
import DbSource from './DbSource'
import ApiSource from './ApiSource'
import enumData from '../../../../common/enum'
import { observer } from 'mobx-react'

@observer
export default class SourceModifyDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    isOpen: PropTypes.bool,
    modifyType: PropTypes.number,
    submit: PropTypes.func,
    cancel: PropTypes.func,
    sourceConfModel: PropTypes.object,
  }
  render() {
    return (
      <Modal
        className={classNames('stripped', 'rename-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <SourceModifyContainer {...this.props} />
      </Modal>
    )
  }
}

class SourceModifyContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      bodyTop: '',
      bodyBottom: '',
      cancelButton: '关闭',
    }
  }

  getTitle() {
    switch (this.props.modifyType) {
      case enumData.btnType.添加: {
        return '添加数据源 - ' + ModalState.sourceTypeName
      }
      case enumData.btnType.修改: {
        return '修改数据源 - ' + ModalState.sourceTypeName
      }
      case enumData.btnType.无: {
        return '查看数据源 - ' + ModalState.sourceTypeName
      }
    }
  }

  getBtn() {
    switch (this.props.modifyType) {
      case enumData.btnType.添加: {
        return (
          <FlatButton
            onClick={this.props.submit}
            style={{
              marginRight: '0',
            }}
          >
            添加
          </FlatButton>
        )
      }
      case enumData.btnType.修改: {
        return (
          <FlatButton
            onClick={this.props.submit}
            style={{
              marginRight: '0',
            }}
          >
            修改
          </FlatButton>
        )
      }

      case enumData.btnType.无: {
        return ''
      }
    }
  }

  render() {
    return (
      <DialogContainer
        title={this.getTitle()}
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
            {this.getBtn()}
          </span>
        )}
      >
        {this.state.bodyTop}
        {ModalState.sourceType === enumData.scType.文件 && (
          <FileSource model={this.sourceConfModel} />
        )}
        {ModalState.sourceType === enumData.scType.数据库 && (
          <DbSource model={this.sourceConfModel} />
        )}
        {ModalState.sourceType === enumData.scType.接口 && (
          <ApiSource model={this.sourceConfModel} />
        )}
        {this.state.bodyBottom}
      </DialogContainer>
    )
  }
}
