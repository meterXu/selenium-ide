import React from 'react'
import { observer } from 'mobx-react'
import GraphDockBar from '../../components/Graph/DockBar'
import DesignGraph from '../Graph'
import GraphTool from '../../components/Graph/Tool'
import ItemMenu from '../../components/Graph/ItemMenu'
import './style.css'
import GraphState from '../../stores/view/GraphState'
import GraphDraw from '../../components/Graph/Draw/draw'
import ModalState from '../../stores/view/ModalState'
import UiState from '../../stores/view/UiState'

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
    if (UiState.project.processData.length === 0) {
      ModalState.toggleProcessWelcome()
    } else {
      if (GraphState.currentProcess == null) {
        GraphState.setCurrentProcess(UiState.project.processData[0])
      }
    }
  }

  render() {
    return (
      <div className="processDesign">
        <DesignGraph />
        {GraphState.currentProcess && (
          <>
            <GraphTool
              zoom={this.state.zoom}
              onEnlarge={this.onEnlarge}
              onReduce={this.onReduce}
            />
            <GraphDockBar itemClick={this.itemClick.bind(this)} />
          </>
        )}
        <ItemMenu />
      </div>
    )
  }
}
export default ProcessDesign
