import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import enumData from '../../../../common/enum'
import GraphState from '../../../stores/view/GraphState'
export default class GraphDockBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dockItemList: [
        enumData.prcItem.用例,
        enumData.prcItem.循环,
        enumData.prcItem.函数,
      ],
    }
  }
  static propTypes = {
    itemClick: PropTypes.func,
  }
  render() {
    return (
      <div className="dockBar">
        <div className="ul-container">
          <ul className="item-container">
            {this.state.dockItemList.map(c => {
              return (
                <li key={c.type} onClick={this.props.itemClick.bind(this, c)}>
                  <img src={GraphState.getImage(c.image)} alt={c.type} />
                  <span>{c.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
