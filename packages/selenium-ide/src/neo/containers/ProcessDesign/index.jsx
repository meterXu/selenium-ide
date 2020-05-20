import React from 'react'
import GraphDockBar from '../../components/Graph/DockBar'
import DesignGraph from '../Graph'
import GraphTool from '../../components/Graph/Tool'
import './style.css'
import GraphState from '../../stores/view/GraphState'
import GraphDraw from '../../components/Graph/Draw'
import ModalState from '../../stores/view/ModalState'
import UiState from '../../stores/view/UiState'
import uuidv4 from 'uuid/v4'
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
      c => {
        switch (item.type) {
          case 'case':
            {
              ModalState.toggleCaseConfig()
            }
            break
        }
      },
      d => {
        alert(item.type)
      }
    )
  }
  componentDidMount() {
    GraphState.setCurrentProcess({
      processId: uuidv4(),
      processName: 'process_1',
      graphData: [],
    })
    UiState.project.setProcessData([GraphState.currentProcess])
    UiState.project.setSelectedProcess(GraphState.currentProcess.id)
  }

  render() {
    return (
      <div className="processDesign">
        <DesignGraph />
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
