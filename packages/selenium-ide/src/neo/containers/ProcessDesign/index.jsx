import React from 'react'
import { observer } from 'mobx-react'
import GraphDockBar from '../../components/Graph/DockBar'
import DesignGraph from '../Graph'
import GraphTool from '../../components/Graph/Tool'
import './style.css'
import GraphState from '../../stores/view/GraphState'
import GraphDraw from '../../components/Graph/Draw/draw'
import ModalState from '../../stores/view/ModalState'

@observer
class ProcessDesign extends React.Component {
  constructor(props) {
    super(props)
    this.onEnlarge = this.onEnlarge.bind(this)
    this.onReduce = this.onReduce.bind(this)
    this.state = {
      zoom: 1,
    }
  }
  onEnlarge() {
    GraphState.enlargeZoom()
    this.setState({
      zoom: GraphState.zoom,
    })
    GraphDraw.resizeGraph()
  }
  onReduce() {
    GraphState.reduceZoom()
    this.setState({
      zoom: GraphState.zoom,
    })
    GraphDraw.resizeGraph()
  }
  itemClick(item) {
    GraphDraw.drawVerticalItem(
      item,
      () => GraphState.graphItemClick(item),
      () => GraphState.graphItemContentMenu(item)
    )
  }
  componentDidMount() {
    if (GraphState.currentProcess == null) {
      ModalState.toggleProcessWelcome()
    }
  }

  render() {
    return (
      <div className="processDesign">
        {GraphState.currentProcess && (
          <>
            <DesignGraph />
            <GraphTool
              zoom={this.state.zoom}
              onEnlarge={this.onEnlarge}
              onReduce={this.onReduce}
            />
            <GraphDockBar itemClick={this.itemClick.bind(this)} />
          </>
        )}
      </div>
    )
  }
}
export default ProcessDesign
