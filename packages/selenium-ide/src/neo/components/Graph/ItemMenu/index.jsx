import React from 'react'
import './index.css'
import GraphState from '../../../stores/view/GraphState'
import { observer } from 'mobx-react'
@observer
export default class ItemMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        {GraphState.prcMenuIsOpen && (
          <div
            className={'prc-item-menu'}
            style={{ top: GraphState.prcMenuX, left: GraphState.prcMenuY }}
          >
            <ul className={'prc-item-menu-container'}>
              <li>
                <a>修改</a>
              </li>
              <li className={'prc-item-menu-remove'}>
                <a>删除</a>
              </li>
            </ul>
          </div>
        )}
      </>
    )
  }
}
