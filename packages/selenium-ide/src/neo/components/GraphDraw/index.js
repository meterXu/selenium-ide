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
    let st = GraphState.paper.set()
    let { x, y } = this.getPositionVertical(0)
    let { txtX, txtY } = this.getPositionText(
      x,
      y,
      this.rectParam.width,
      this.rectParam.height
    )
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
    let txt = GraphState.paper
      .text(txtX, txtY, '开始')
      .attr({
        'font-size': this.rectParam.fontSize * GraphState.zoom,
        fill: '#fff',
      })
      .data('from', 'rect')
    st.push(cc)
    st.push(txt)
    this.itemList.push(st)
  }
  @action.bound
  resizeGraph() {
    this.itemList.forEach((c, index) => {
      switch (c.type) {
        case 'set':
          {
            let { x, y } = this.getPositionVertical(index)
            c.forEach(s => {
              switch (s.type) {
                case 'rect':
                  {
                    s.animate(
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
                case 'text':
                  {
                    let { txtX, txtY } = this.getPositionText(
                      x,
                      y,
                      s.data('from') === 'rect'
                        ? this.rectParam.width
                        : this.nodeParam.width,
                      s.data('from') === 'rect'
                        ? this.rectParam.height
                        : this.nodeParam.height
                    )
                    s.animate(
                      {
                        x: txtX,
                        y: txtY,
                        'font-size':
                          s.data('from') === 'rect'
                            ? this.rectParam.fontSize * GraphState.zoom
                            : this.nodeParam.fontSize * GraphState.zoom,
                      },
                      300,
                      '<>'
                    )
                  }
                  break
              }
            })
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
  @action.bound
  getPositionText(x, y, width, height) {
    let txtX = x + (width * GraphState.zoom) / 2
    let txtY = y + (height * GraphState.zoom) / 2
    return { txtX, txtY }
  }
  @action.bound
  drawProcess() {
    this.processStart()
  }
}

if (!window._processStart) window._processStart = new ProcessStart()

export default window._processStart
