import React from 'react'
import ReactDom from 'react-dom'
import Raphael from 'raphael'
import DockBar from '../../components/DockBar'
import './style.css'
class ProcessDesign extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let container = ReactDom.findDOMNode(this.refs.container)
    let paper = new Raphael(
      container,
      container.clientWidth,
      container.clientHeight
    )
    paper.circle(200, 200, 50)
  }

  render() {
    return (
      <div className="graphContainer">
        {/* eslint-disable-next-line react/no-string-refs */}
        <div className="container" ref="container" />
        <DockBar />
      </div>
    )
  }
}
export default ProcessDesign
