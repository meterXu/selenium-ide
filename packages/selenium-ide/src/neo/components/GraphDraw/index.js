import { action, computed, observable, observe, extendObservable } from 'mobx'
import GraphState from '../../stores/view/GraphState'
class ProcessStart {
  @action.bound
  processStart() {
    let st = GraphState.paper.set()
    let width = 100
    let height = 40
    let radius = 6
    let fontSize = 18
    let start = GraphState.paper
      .rect(
        GraphState.offsetLeft + GraphState.firstLeft * GraphState.zoom,
        GraphState.offsetTop + GraphState.firstTop * GraphState.zoom,
        width * GraphState.zoom,
        height * GraphState.zoom,
        radius * GraphState.zoom
      )
      .attr({
        fill: '#41C1A6',
        stroke: '#818283',
        'stroke-width': 2 * GraphState.zoom,
      })
    let txt = GraphState.paper
      .text(
        GraphState.offsetLeft +
          (GraphState.firstLeft + width / 2) * GraphState.zoom,
        GraphState.offsetTop +
          (GraphState.firstTop + height / 2) * GraphState.zoom,
        '开始'
      )
      .attr({
        'font-size': fontSize * GraphState.zoom,
        fill: '#fff',
      })
    st.push(start, txt)
    return st
  }
}

if (!window._processStart) window._processStart = new ProcessStart()

export default window._processStart
