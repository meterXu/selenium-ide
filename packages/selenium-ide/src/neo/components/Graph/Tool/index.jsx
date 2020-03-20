import React from 'react'
import { PropTypes } from 'prop-types'
import './style.css'
export default class GraphTool extends React.Component {
  static propTypes = {
    onEnlarge: PropTypes.func.isRequired,
    onReduce: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="graph-tool">
        <ul>
          <li>
            <div
              className="graph-tool-item graph-tool-item-enlarge"
              onClick={this.props.onEnlarge}
            >
              +
            </div>
          </li>
          <li>
            <div
              className="graph-tool-item graph-tool-item-reduce"
              onClick={this.props.onReduce}
            >
              -
            </div>
          </li>
          <li>{this.props.zoom}x</li>
        </ul>
      </div>
    )
  }
}
