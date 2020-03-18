import React from 'react'
import DockBar from '../../components/DockBar'
import DesignGraph from '../DesignGraph'
import GraphTool from '../../components/GraphTool'
import './style.css'
import GraphState from '../../stores/view/GraphState'
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
  render() {
    return (
      <div className="processDesign">
        <DesignGraph ref="designGraph" />
        <GraphTool
          zoom={this.state.zoom}
          onEnlarge={this.onEnlarge}
          onReduce={this.onReduce}
        />
        <DockBar />
      </div>
    )
  }
}
export default ProcessDesign
