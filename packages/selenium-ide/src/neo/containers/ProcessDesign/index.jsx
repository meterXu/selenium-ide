import React from 'react'
import GraphDockBar from '../../components/GraphDockBar'
import DesignGraph from '../DesignGraph'
import GraphTool from '../../components/GraphTool'
import './style.css'
import GraphState from '../../stores/view/GraphState'
import GraphDraw from '../../components/GraphDraw'
class ProcessDesign extends React.Component {
  constructor(props) {
    super(props)
    this.onEnlarge = this.onEnlarge.bind(this)
    this.onReduce = this.onReduce.bind(this)
    this.state = {
      zoom: GraphState.zoom,
    }
  }
  onEnlarge() {
    GraphState.enlargeZoom()
    this.setState({
      zoom: GraphState.zoom,
    })
    this.refs.designGraph.zoomGraph()
  }
  onReduce() {
    GraphState.reduceZoom()
    this.setState({
      zoom: GraphState.zoom,
    })
    this.refs.designGraph.zoomGraph()
  }
  itemClick(item) {
    GraphDraw.drawItem(item)
  }
  render() {
    return (
      <div className="processDesign">
        <DesignGraph ref="designGraph" />
        <GraphTool
          zoom={this.state.zoom}
          onEnlarge={this.onEnlarge}
          onReduce={this.onReduce}
        />
        <GraphDockBar itemClick={this.itemClick.bind(this)} />
      </div>
    )
  }
}
export default ProcessDesign
