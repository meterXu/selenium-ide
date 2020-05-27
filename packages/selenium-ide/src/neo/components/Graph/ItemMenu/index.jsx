import React from 'react'
import './index.css'
export default class ItemMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={"prc-item-menu"}>
        <ul className={"prc-item-menu-container"}>
          <li><a>修改</a></li>
          <li className={"prc-item-menu-remove"}><a>删除</a></li>
        </ul>
      </div>
    )
  }
}
