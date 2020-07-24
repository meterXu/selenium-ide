import React from 'react'
import ActionButton from '../ActionButton'
import classNames from 'classnames'
import { parse } from 'modifier-keys'
export default class SourceConf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      btnPro: {
        text: '系统设置',
        icon: 'si-setting',
        hotkey: 's',
      },
    }
  }

  render() {
    return (
      <ActionButton
        data-tip={`<p>${
          this.state.btnPro.text
        }<span style="color: #929292;padding-left: 5px;">${parse(
          this.state.btnPro.hotkey,
          { primaryKey: true, shiftKey: true }
        )}</span></p>`}
        {...this.props}
        className={classNames(this.state.btnPro.icon, this.props.className)}
      />
    )
  }
}
