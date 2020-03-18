import React from 'react'
import DockBar from '../../components/DockBar'
import DesignGraph from '../DesignGraph'
import GraphTool from '../../components/GraphTool'
import './style.css'
class ProcessDesign extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="processDesign">
        <DesignGraph />
        <GraphTool />
        <DockBar />
      </div>
    )
  }
}
export default ProcessDesign
