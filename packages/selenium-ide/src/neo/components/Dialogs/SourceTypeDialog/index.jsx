import React from 'react'
import './style.css'
import Modal from '../../Modal'
import classNames from 'classnames'
import DialogContainer from '../Dialog'
import FlatButton from '../../FlatButton'
import ModalState from '../../../stores/view/ModalState'
import enumData from '../../../../common/enum'
export default class SourceTypeDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Modal
        className={classNames('stripped', 'rename-dialog')}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.cancel}
      >
        <SourceTypeContents {...this.props} />
      </Modal>
    )
  }
}

class SourceTypeContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeData: enumData.scType.map(c=>{
        return {'text':c.key,'value':c}
      }),
    }
  }

  render() {
    const content = {
      title: '添加数据源 - 数据类型',
      bodyTop: '',
      bodyBottom: '',
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
            <FlatButton
              onClick={this.props.cancel}
              style={{
                marginRight: '0',
              }}
            >
              {content.cancelButton}
            </FlatButton>
          </span>
        )}
        onRequestClose={this.props.cancel}
      >
        {content.bodyTop}
        <ul className="source-type-container">
          {this.state.typeData.map(c => {
            return (
              <li
                key={c.type}
                className={
                  'source-type-' + ModalState.getSourceTypeNames(c.type)[1]
                }
                onClick={this.props.switchSource.bind(this, c.type)}
              >
                {c.text}
              </li>
            )
          })}
        </ul>
        {content.bodyBottom}
      </DialogContainer>
    )
  }
}
