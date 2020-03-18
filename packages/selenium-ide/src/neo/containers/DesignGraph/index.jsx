import React from 'react'
import Raphael from 'raphael'
import './style.css'
export default class DesignGraph extends React.Component {
  static defaultProps = {
    graph: {
      offsetLeft: 0,
      offsetTop: 0,
      paper: null,
    },
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.refs.graphContainer.scrollLeft =
      (this.refs.graphContainer.scrollWidth -
        this.refs.graphContainer.clientWidth) /
      2
    this.refs.graphContainer.scrollTop = this.refs.designBg.offsetTop - 80
    this.props.graph.offsetLeft = this.refs.designBg.offsetLeft
    this.props.graph.offsetTop = this.refs.designBg.offsetTop
    this.props.graph.paper = new Raphael(this.refs.graph)
    this.props.graph.paper.circle(
      this.props.graph.offsetLeft + 50,
      this.props.graph.offsetTop + 50,
      40
    )
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
