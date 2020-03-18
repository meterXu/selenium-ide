import React from 'react'
import DockBar from '../../components/DockBar'
import DesignGraph from '../DesignGraph'
import './style.css'
class ProcessDesign extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="processDesign">
        <DesignGraph />
        <div className="graph-tool">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <DockBar />
      </div>
    )
  }
}
export default ProcessDesign
