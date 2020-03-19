import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
export default class GraphDockBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dockItemList: [
        { type: 'case', img: require('../../../icons/case.svg'), text: '用例' },
        {
          type: 'while',
          img: require('../../../icons/while.svg'),
          text: '循环',
        },
        {
          type: 'excelRead',
          img: require('../../../icons/excel_read.svg'),
          text: 'Excel读',
        },
        {
          type: 'excelWrite',
          img: require('../../../icons/excel_write.svg'),
          text: 'Excel写',
        },
        {
          type: 'oracleRead',
          img: require('../../../icons/oracle_read.svg'),
          text: 'Oracle读',
        },
        {
          type: 'oracleWrite',
          img: require('../../../icons/oracle_write.svg'),
          text: 'Oracle写',
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
                <li key={c.type} onClick={this.props.itemClick.bind(this,{type:c.type, img:c.img,text:c.text})}>
                  <img src={c.img} alt={c.type} />
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
