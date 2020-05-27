import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import GraphState from '../../../stores/view/GraphState'
import { observer } from 'mobx-react'
@observer
export default class ItemMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuData: [
        { code: 'edit', name: '修改' },
        { code: 'remove', name: '删除' },
      ],
    }
  }
  static propTypes = {
    onMenuClick: PropTypes.func.isRequired,
  }
  menuClick(code) {
    this.props.onMenuClick(code)
  }
  componentDidUpdate() {
    if (GraphState.prcMenuIsOpen) {
      this.refs.prcItemMenu.focus()
      this.refs.prcItemMenu.addEventListener('focusout', () => {
        GraphState.hidePrcMenu()
      })
    }
  }

  render() {
    return (
      <>
        {GraphState.prcMenuIsOpen && (
          <div
            className={'prc-item-menu'}
            style={{ top: GraphState.prcMenuY, left: GraphState.prcMenuX }}
            tabIndex={1}
            ref="prcItemMenu"
          >
            <ul className={'prc-item-menu-container'}>
              {this.state.menuData.map(c => {
                return (
                  <li
                    key={c.code}
                    className={
                      c.code === 'remove' ? 'prc-item-menu-remove' : ''
                    }
                    onClick={this.menuClick.bind(this, c.code)}
                  >
                    <a>{c.name}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </>
    )
  }
}
