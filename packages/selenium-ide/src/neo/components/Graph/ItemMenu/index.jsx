import React from 'react'
import './index.css'
export default class ItemMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={"prc-item-menu"}>
        <ul>
          <li>删除</li>
        </ul>
      </div>
    )
  }
}
