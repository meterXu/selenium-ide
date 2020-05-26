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
        {
          type: enumData.itemType.用例,
          img: enumData.itemImage.用例,
          text: enumData.itemName.用例,
        },
        {
          type: enumData.itemType.循环,
          img: enumData.itemImage.循环,
          text: enumData.itemName.循环,
        },
        {
          type: enumData.itemType.函数,
          img: enumData.itemImage.函数,
          text: enumData.itemName.函数,
        },
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
                <li
                  key={c.type}
                  onClick={this.props.itemClick.bind(this, {
                    type: c.type,
                    img: c.img,
                    text: c.text,
                  })}
                >
                  <img src={GraphState.getImage(c.img)} alt={c.type} />
                  <span>{c.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
