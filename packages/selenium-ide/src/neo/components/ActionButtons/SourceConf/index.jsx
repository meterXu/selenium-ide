import React from 'react'
import ActionButton from '../ActionButton'
import classNames from 'classnames'
import { parse } from 'modifier-keys'
export default class SourceConf extends React.Component {
  constructor(props) {
    super(props)
    this.switchBtn = this.switchBtn.bind(this)
  }

  switchBtn() {
    let btnPro
    switch (this.props.type) {
      case 0:
        {
          btnPro = {
            text: '首页',
            icon: 'si-home',
            hotkey: 'h',
          }
        }
        break
      case 1:
      default: {
        btnPro = {
          text: '配置数据源',
          icon: 'si-source-conf',
          hotkey: 'd',
        }
      }
    }
    return btnPro
  }

  render() {
    const props = { ...this.props }
    let btnPro = this.switchBtn()
    return (
      <ActionButton
        data-tip={`<p>${btnPro.text}<span style="color: #929292;padding-left: 5px;">${parse(btnPro.hotkey, { primaryKey: true, shiftKey: true })}</span></p>`}
        {...props}
        className={classNames(btnPro.icon, this.props.className)}
      />
    )
  }
}
