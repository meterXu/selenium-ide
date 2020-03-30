import React from 'react'
import './style.css'
import Modal from '../../Modal'
import classNames from 'classnames'
import DialogContainer from '../Dialog'
import FlatButton from '../../FlatButton'
export default class SourceType extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Modal
        className={classNames('stripped', 'rename-dialog')}
        isOpen={this.props.isOpen}
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
      typeData: [
        { text: '文件', type: 0 },
        { text: '数据库', type: 1 },
        { text: '接口', type: 2 },
      ],
    }
    this.setTypeStyle = this.setTypeStyle.bind(this)
  }
  setTypeStyle(type) {
    switch (type) {
      case 0: {
        return 'file'
      }
      case 1: {
        return 'db'
      }
      case 2: {
        return 'api'
      }
    }
  }
  render() {
    const content = {
      title: this.props.isAdd ? '添加数据源 - 数据类型' : '维护数据源',
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
      >
        {content.bodyTop}
        <ul className="source-type-container">
          {this.state.typeData.map(c => {
            return (
              <li
                key={c.type}
                className={'source-type-' + this.setTypeStyle(c.type)}
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
