import { action, computed, observable, observe, extendObservable } from 'mobx'
import GraphState from '../../../stores/view/GraphState'
class ProcessStart {
  @observable
  itemList = []
  @observable
  rectParam = {
    width: 80,
    height: 32,
    radius: 4,
    strokeWidth: 2,
    fontSize: 16,
    color: '#fff',
  }
  nodeParam = {
    width: 48,
    height: 48,
    fontSize: 14,
    color: '#333',
    pathStrokeWidth: 2,
    pathStroke: '#818283',
  }
  processStart() {
    let st = GraphState.paper.set()
    let { x, y } = this.getPosition(0, 0)
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
        0,
        this.rectParam.radius * GraphState.zoom
      )
      .attr({
        fill: '#41C1A6',
        stroke: '#818283',
        'stroke-width': this.rectParam.strokeWidth * GraphState.zoom,
      })
      .animate(
        {
          height: this.rectParam.height * GraphState.zoom,
        },
        500,
        'bounce'
      )
      .data('vc', [0, 0])
    let txt = GraphState.paper
      .text(txtX, txtY, '开始')
      .attr({
        'font-size': 0,
        fill: this.rectParam.color,
        class: 'graph-txt',
      })
      .animate(
        {
          'font-size': this.rectParam.fontSize * GraphState.zoom,
        },
        500,
        'elastic'
      )
      .data('from', 'rect')
    st.push(cc)
    st.push(txt)
    this.itemList.push([st])
  }
  getPosition(hIndex, vIndex) {
    let startHeight = null
    let startWidth = null
    let vNodeIndex = null
    let hNodeIndex = null
    let cacleWidth = null
    if (vIndex === 0) {
      startHeight = 0
      vNodeIndex = 0
      cacleWidth = this.rectParam.width
    } else {
      startHeight = this.rectParam.height
      vNodeIndex = vIndex - 1
      cacleWidth = this.nodeParam.width
    }
    if (hIndex === 0) {
      hNodeIndex = 0
      startWidth = 0
    } else {
      hNodeIndex = hIndex - 1
      startWidth = vIndex === 0 ? this.rectParam.width : this.nodeParam.width
    }
    let x =
      GraphState.offsetLeft +
      GraphState.firstDrawX -
      (cacleWidth / 2) * GraphState.zoom +
      (startWidth +
        GraphState.LevelInterval * hIndex +
        this.nodeParam.width * hNodeIndex) *
        GraphState.zoom
    let y =
      GraphState.offsetTop +
      (GraphState.firstDrawY +
        (startHeight +
          GraphState.verticalInterval * vIndex +
          this.nodeParam.height * vNodeIndex)) *
        GraphState.zoom
    let ps = []
    let pe = []
    if (hIndex === 0) {
      ps = [
        x +
          (vIndex === 0 ? this.rectParam.width / 2 : this.nodeParam.width / 2) *
            GraphState.zoom,
        y - (vIndex === 0 ? 0 : 3) * GraphState.zoom,
      ]
      pe = [
        ps[0],
        y +
          ((vIndex === 0 ? this.rectParam.height : this.nodeParam.height) +
            (vIndex === 0 ? 0 : 18)) *
            GraphState.zoom,
      ]
    } else {
      ps = [
        x,
        y +
          (vIndex === 0
            ? this.rectParam.height / 2
            : this.nodeParam.height / 2) *
            GraphState.zoom,
      ]
      pe = [
        x +
          (vIndex == 0 ? this.rectParam.width : this.nodeParam.width) *
            GraphState.zoom,
        ps[1],
      ]
    }
    return { x, y, ps, pe }
  }
  getPositionText(x, y, width, height, position) {
    position = position || 'center'
    switch (position) {
      case 'center': {
        let txtX = x + (width * GraphState.zoom) / 2
        let txtY = y + (height * GraphState.zoom) / 2
        return { txtX, txtY }
      }
      case 'bottomCenter':
      default: {
        let txtX = x + (width * GraphState.zoom) / 2
        let txtY = y + (height + 10) * GraphState.zoom
        return { txtX, txtY }
      }
    }
  }
  @action.bound
  drawProcess() {
    this.processStart()
  }
  drawVerticalItem(item, func, contentMenuFunc) {
    let st = GraphState.paper.set()
    let coordinate = [0, this.itemList.length].join(',')
    let { x, y, ps } = this.getPosition(0, this.itemList.length)
    let lPosition = this.getPosition(0, this.itemList.length - 1)
    let lpe = lPosition.pe
    let { txtX, txtY } = this.getPositionText(
      x,
      y,
      this.nodeParam.width,
      this.nodeParam.height,
      'bottomCenter'
    )
    let cc = GraphState.paper
      .image(
        item.img,
        500,
        3000,
        this.nodeParam.width * GraphState.zoom,
        this.nodeParam.height * GraphState.zoom
      )
      .attr({
        cursor: 'pointer',
      })
      .animate(
        {
          x,
          y,
        },
        500,
        '<>'
      )
      .data('coordinate', coordinate)
    let txt = GraphState.paper
      .text(500, 3000, item.text)
      .attr({
        'font-size': this.nodeParam.fontSize * GraphState.zoom,
        fill: this.nodeParam.color,
        class: 'graph-txt',
      })
      .animate(
        {
          x: txtX,
          y: txtY,
        },
        500,
        '<>'
      )
      .data('from', 'image')
    let ll = this.drawLine(lpe, ps)
    st.push(cc)
    st.push(txt)
    st.push(ll)
    this.itemList.push([st])
    let graphData = {
      text: item.text,
      type: item.type,
      coordinate: coordinate,
      data: null,
    }
    GraphState.addGraphData(graphData)
    this.bindNodeClick(cc, item.type, func, contentMenuFunc)
  }
  drawLine(from, to) {
    return GraphState.paper
      .path(`M${from[0]} ${from[1]}L${from[0]} ${from[1]}`)
      .attr({
        stroke: this.nodeParam.pathStroke,
        'stroke-width': this.nodeParam.pathStrokeWidth * GraphState.zoom,
      })
      .animate(
        {
          path: `M${from[0]} ${from[1]}L${to[0]} ${to[1]}M${to[0]} ${
            to[1]
          }L${to[0] - 2 * GraphState.zoom} ${to[1] -
            4 * GraphState.zoom}L${to[0] + 2 * GraphState.zoom} ${to[1] -
            4 * GraphState.zoom}Z`,
          fill: '#818283',
        },
        200,
        '<>'
      )
  }
  bindNodeClick(node, type, func, contentMenuFunc) {
    if (type === 'while') {
      node.mousedown(function() {
        let coordinate = this.data('coordinate')
        GraphState.setCurrentActiveNode(coordinate)
        if (event.which == 3) {
          contentMenuFunc && contentMenuFunc()
        }
      })
    } else {
      node.click(function() {
        let coordinate = this.data('coordinate')
        GraphState.setCurrentActiveNode(coordinate)
        func && func()
      })
    }
  }
  @action.bound
  resizeGraph() {
    this.itemList.forEach((c, v) => {
      c.forEach((k, h) => {
        switch (k.type) {
          case 'set':
            {
              k.forEach(s => {
                switch (s.type) {
                  case 'rect':
                    {
                      let { x, y } = this.getPosition(h, v)
                      s.animate(
                        {
                          x,
                          y,
                          width: this.rectParam.width * GraphState.zoom,
                          height: this.rectParam.height * GraphState.zoom,
                          r: this.rectParam.radius * GraphState.zoom,
                          'stroke-width':
                            this.rectParam.strokeWidth * GraphState.zoom,
                        },
                        300,
                        '<>'
                      )
                    }
                    break
                  case 'image':
                    {
                      let { x, y } = this.getPosition(h, v)
                      s.animate(
                        {
                          x,
                          y,
                          width: this.nodeParam.width * GraphState.zoom,
                          height: this.nodeParam.height * GraphState.zoom,
                        },
                        300,
                        '<>'
                      )
                    }
                    break
                  case 'text':
                    {
                      let { x, y } = this.getPosition(h, v)
                      let { txtX, txtY } = this.getPositionText(
                        x,
                        y,
                        s.data('from') === 'rect'
                          ? this.rectParam.width
                          : this.nodeParam.width,
                        s.data('from') === 'rect'
                          ? this.rectParam.height
                          : this.nodeParam.height,
                        s.data('from') === 'rect' ? 'center' : 'bottomCenter'
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
                  case 'path':
                    {
                      let pe = this.getPosition(h, v).ps
                      let ps = (h === 0
                        ? this.getPosition(h, v - 1)
                        : this.getPosition(h - 1, v)
                      ).pe
                      s.animate(
                        {
                          path:
                            h === 0
                              ? `M${ps[0]} ${ps[1]}L${pe[0]} ${pe[1]}M${
                                  pe[0]
                                } ${pe[1]}L${pe[0] -
                                  2 * GraphState.zoom} ${pe[1] -
                                  4 * GraphState.zoom}L${pe[0] +
                                  2 * GraphState.zoom} ${pe[1] -
                                  4 * GraphState.zoom}Z`
                              : `M${ps[0]} ${ps[1]}L${pe[0]} ${pe[1]}M${
                                  pe[0]
                                } ${pe[1]}L${pe[0] -
                                  4 * GraphState.zoom} ${pe[1] -
                                  2 * GraphState.zoom}L${pe[0] -
                                  4 * GraphState.zoom} ${pe[1] +
                                  2 * GraphState.zoom}Z`,
                          'stroke-width':
                            this.nodeParam.pathStrokeWidth * GraphState.zoom,
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
    })
  }
  @action.bound
  resetGraph() {
    GraphState.paper.clear()
    this.itemList = []
  }
}

if (!window._processStart) window._processStart = new ProcessStart()

export default window._processStart
