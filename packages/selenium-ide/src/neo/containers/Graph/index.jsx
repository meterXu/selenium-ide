import React from 'react'
import Raphael from 'raphael'
import './style.css'
import GraphState from '../../stores/view/GraphState'
import GraphDraw from '../../components/Graph/Draw/draw'
export default class DesignGraph extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    GraphState.setZoom(1)
    this.refs.graphContainer.scrollLeft =
      (this.refs.graphContainer.scrollWidth -
        this.refs.graphContainer.clientWidth) /
      2
    this.refs.graphContainer.scrollTop = this.refs.designBg.offsetTop - 80
    GraphState.setOffsetLeft(this.refs.designBg.offsetLeft)
    GraphState.setOffsetTop(this.refs.designBg.offsetTop)
    if (GraphState.paper) {
      GraphDraw.resetGraph()
    }
    let paper = new Raphael(this.refs.graph)
    GraphState.setPaper(paper)
    this.refs.graph.oncontextmenu = function() {
      return false
    }
    // this.refs.graphContainer.addEventListener('click', () => {
    //   GraphState.hidePrcMenu()
    // })
  }
  render() {
    return (
      <div className="design-container" ref="graphContainer">
        <div className="design-bg" ref="designBg" />
        <div className="design-graph" ref="graph" />
      </div>
    )
  }
}
