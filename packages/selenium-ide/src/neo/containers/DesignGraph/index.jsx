import React from 'react'
import Raphael from 'raphael'
import './style.css'
import { PropTypes } from 'prop-types'
import GraphState from '../../stores/view/GraphState'
export default class DesignGraph extends React.Component {
  constructor(props) {
    super(props)
    this.offsetLeft = 0
    this.offsetTop = 0
    this.paper = null
  }
  componentDidMount() {
    this.refs.graphContainer.scrollLeft =
      (this.refs.graphContainer.scrollWidth -
        this.refs.graphContainer.clientWidth) /
      2
    this.refs.graphContainer.scrollTop = this.refs.designBg.offsetTop - 80
    this.offsetLeft = this.refs.designBg.offsetLeft
    this.offsetTop = this.refs.designBg.offsetTop
    this.paper = new Raphael(this.refs.graph)

    let st0 = this.paper.set()
    let start0 = this.paper
      .rect(this.offsetLeft + 360, this.offsetTop + 90, 100, 40, 6)
      .attr({
        fill: '#41C1A6',
        stroke: '#818283',
        'stroke-width': 2,
      })
    let txt0 = this.paper
      .text(this.offsetLeft + 410, this.offsetTop + 110, '开始')
      .attr({
        'font-size': 18,
        fill: '#fff',
      })
    st0.push(start0, txt0)
    this.paper
      .path(
        `M${this.offsetLeft + 410} ${this.offsetTop + 130}L${this.offsetLeft +
          410} ${this.offsetTop + 150}`
      )
      .attr({
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper.image(
      require('../../../icons/excel_read.svg'),
      this.offsetLeft + 380,
      this.offsetTop + 150,
      60,
      60
    )
    this.paper
      .path(
        `M${this.offsetLeft + 410} ${this.offsetTop + 210}L${this.offsetLeft +
          410} ${this.offsetTop + 240}`
      )
      .attr({
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper.image(
      require('../../../icons/case.svg'),
      this.offsetLeft + 380,
      this.offsetTop + 240,
      60,
      60
    )
    this.paper
      .path(
        `M${this.offsetLeft + 410} ${this.offsetTop + 300}L${this.offsetLeft +
          410} ${this.offsetTop + 330}`
      )
      .attr({
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper.image(
      require('../../../icons/while.svg'),
      this.offsetLeft + 380,
      this.offsetTop + 330,
      60,
      60
    )
    this.paper
      .path(
        `M${this.offsetLeft + 410} ${this.offsetTop + 390}L${this.offsetLeft +
          410} ${this.offsetTop + 420}`
      )
      .attr({
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper
      .path(
        `M${this.offsetLeft + 440} ${this.offsetTop + 360}L${this.offsetLeft +
          470} ${this.offsetTop + 360}`
      )
      .attr({
        'stroke-dasharray': '-',
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper.image(
      require('../../../icons/case.svg'),
      this.offsetLeft + 470,
      this.offsetTop + 330,
      60,
      60
    )
    this.paper
      .path(
        `M${this.offsetLeft + 530} ${this.offsetTop + 360}L${this.offsetLeft +
          560} ${this.offsetTop + 360}`
      )
      .attr({
        'stroke-dasharray': '-',
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper.image(
      require('../../../icons/excel_write.svg'),
      this.offsetLeft + 560,
      this.offsetTop + 330,
      60,
      60
    )
    this.paper.image(
      require('../../../icons/excel_read.svg'),
      this.offsetLeft + 380,
      this.offsetTop + 420,
      60,
      60
    )
    this.paper
      .path(
        `M${this.offsetLeft + 410} ${this.offsetTop + 480}L${this.offsetLeft +
          410} ${this.offsetTop + 510}`
      )
      .attr({
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper.image(
      require('../../../icons/while.svg'),
      this.offsetLeft + 380,
      this.offsetTop + 510,
      60,
      60
    )
    this.paper
      .path(
        `M${this.offsetLeft + 440} ${this.offsetTop + 540}L${this.offsetLeft +
          470} ${this.offsetTop + 540}`
      )
      .attr({
        'stroke-dasharray': '-',
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    this.paper.image(
      require('../../../icons/case.svg'),
      this.offsetLeft + 470,
      this.offsetTop + 510,
      60,
      60
    )
    this.paper
      .path(
        `M${this.offsetLeft + 410} ${this.offsetTop + 570}L${this.offsetLeft +
          410} ${this.offsetTop + 600}`
      )
      .attr({
        'stroke-width': 2,
        stroke: '#7e7e7e',
      })
    let st = this.paper.set()
    let end = this.paper
      .rect(this.offsetLeft + 360, this.offsetTop + 600, 100, 40, 6)
      .attr({
        fill: '#c1513e',
        stroke: '#68696a',
        'stroke-width': 2,
      })
    let txt = this.paper
      .text(this.offsetLeft + 410, this.offsetTop + 620, '结束')
      .attr({
        'font-size': 18,
        fill: '#fff',
      })
    st.push(end, txt)
  }

  render() {
    return (
      <div className="design-container" ref="graphContainer">
        <div className="design-bg" ref="designBg" />
        <div className="design-graph" ref="graph" />
      </div>
    )
  }
}
