import React from 'react'
import GraphDockBar from '../../components/Graph/DockBar'
import DesignGraph from '../Graph'
import GraphTool from '../../components/Graph/Tool'
import './style.css'
import GraphState from '../../stores/view/GraphState'
import GraphDraw from '../../components/Graph/Draw'
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
      () => GraphState.graphItemClick(item),
      () => GraphState.graphItemContentMenu(item)
    )
  }
  componentDidMount() {
    GraphState.setCurrentProcess({
      id: uuidv4(),
      name: 'process_1',
      graphData: [
        {
          coordinate: '0,1',
          data: {
            caseId: null,
            caseName: null,
            paraNames: [],
            paraValues: [],
            source: null,
          },
          img: 'case',
          text: '用例',
          type: 'case',
        },
      ],
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
