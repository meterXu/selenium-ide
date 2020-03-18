import React from 'react'
import './style.css'
export default class GraphTool extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="graph-tool">
        <ul>
          <li>
            <div className="graph-tool-item graph-tool-item-enlarge">+</div>
          </li>
          <li>
            <div className="graph-tool-item graph-tool-item-reduce">-</div>
          </li>
          <li>1x</li>
        </ul>
      </div>
    )
  }
}
