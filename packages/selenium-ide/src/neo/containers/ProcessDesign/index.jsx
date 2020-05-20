import React from 'react'
import GraphDockBar from '../../components/Graph/DockBar'
import DesignGraph from '../Graph'
import GraphTool from '../../components/Graph/Tool'
import './style.css'
import GraphState from '../../stores/view/GraphState'
import GraphDraw from '../../components/Graph/Draw/draw'
import UiState from '../../stores/view/UiState'
import Process from '../../models/Graph/Process'
import prcItem from '../../models/Graph/prcItem'
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
    GraphState.setCurrentProcess(
      new Process(undefined, 'process_1', [
        new prcItem(
          '0,1',
          {
            caseId: null,
            caseName: '[smoke] A-HXHS-TEST1',
            paraNames: [],
            paraValues: [],
            sourceId: null,
          },
          UiState.enum.image.用例,
          '[smoke] A-HXHS-TEST1',
          'case'
        ),
      ])
    )
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
