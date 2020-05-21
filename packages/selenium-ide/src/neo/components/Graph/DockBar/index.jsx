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
          type: enumData.prcItemType.用例,
          img: enumData.image.用例,
          text: '用例',
        },
        {
          type: enumData.prcItemType.循环,
          img: enumData.image.循环,
          text: '循环',
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
