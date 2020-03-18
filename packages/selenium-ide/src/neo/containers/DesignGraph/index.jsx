import React from 'react'
import ReactDom from 'react-dom'
import Raphael from 'raphael'
import './style.css'
export default class DesignGraph extends React.Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let container = ReactDom.findDOMNode(this.refs.graph)
    let paper = new Raphael(
      container,
      container.clientWidth,
      container.clientHeight
    )
    paper.circle(200, 200, 50)
  }

  render() {
    return (
      <div className="design-container">
        <div className="design-bg" />
        <div className="design-graph" ref="graph"/>
      </div>
    )
  }
}
