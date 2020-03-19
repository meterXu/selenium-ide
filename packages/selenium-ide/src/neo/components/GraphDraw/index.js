import { action, computed, observable, observe, extendObservable } from 'mobx'
import GraphState from '../../stores/view/GraphState'
class ProcessStart {
  @observable
  itemList = []
  @observable
  rectParam = {
    width: 100,
    height: 40,
    radius: 6,
    strokeWidth: 2,
    fontSize: 18,
  }
  nodeParam = {
    width: 60,
    height: 60,
    fontSize: 18,
  }
  @action.bound
  processStart() {
    let { x, y } = this.getPositionVertical(0)
    let cc = GraphState.paper
      .rect(
        x,
        y,
        this.rectParam.width * GraphState.zoom,
        this.rectParam.height * GraphState.zoom,
        this.rectParam.radius * GraphState.zoom
      )
      .attr({
        fill: '#41C1A6',
        stroke: '#818283',
        'stroke-width': this.rectParam.strokeWidth * GraphState.zoom,
      })
    // let txt = GraphState.paper
    //   .text(
    //     GraphState.offsetLeft + GraphState.firstDrawX,
    //     GraphState.offsetTop + GraphState.firstDrawY,
    //     '开始'
    //   )
    //   .attr({
    //     'font-size': fontSize * GraphState.zoom,
    //     fill: '#fff',
    //   })
    this.itemList.push(cc)
  }
  @action.bound
  resizeGraph() {
    this.itemList.forEach((c, index) => {
      switch (c.type) {
        case 'rect':
          {
            let { x, y } = this.getPositionVertical(index)
            c.animate(
              {
                x,
                y,
                width: this.rectParam.width * GraphState.zoom,
                height: this.rectParam.height * GraphState.zoom,
                r: this.rectParam.radius * GraphState.zoom,
              },
              300,
              '<>'
            )
          }
          break
      }
    })
  }
  @action.bound
  getPositionVertical(index) {
    let startHeight = null
    let nodeIndex = null
    let cacleWidth = null
    if (index === 0) {
      startHeight = 0
      nodeIndex = 0
      cacleWidth = this.rectParam.width
    } else {
      startHeight = this.rectParam.height
      nodeIndex = index - 1
      cacleWidth = this.nodeParam.width
    }
    let x =
      GraphState.offsetLeft +
      GraphState.firstDrawX -
      (cacleWidth / 2) * GraphState.zoom
    let y =
      GraphState.offsetTop +
      GraphState.firstDrawY +
      (startHeight +
        GraphState.verticalInterval * index -
        startHeight / 2 -
        (this.nodeParam.height * (nodeIndex - 1)) / 2) *
        GraphState.zoom
    return { x, y }
  }
}

if (!window._processStart) window._processStart = new ProcessStart()

export default window._processStart
