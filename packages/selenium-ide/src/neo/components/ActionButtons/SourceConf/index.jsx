import React from 'react'
import ActionButton from '../ActionButton'
import classNames from 'classnames'
import { parse } from 'modifier-keys'
export default class SourceConf extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const props = { ...this.props }
    return (
      <ActionButton
        data-tip={`<p>配置数据源<span style="color: #929292;padding-left: 5px;">${parse(
          'd',
          { primaryKey: true, shiftKey: true }
        )}</span></p>`}
        {...props}
        className={classNames('si-source-conf', this.props.className)}
      /> // eslint-disable-line react/prop-types
    )
  }
}
