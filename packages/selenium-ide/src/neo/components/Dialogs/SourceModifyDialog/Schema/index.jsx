import React from 'react'
import './style.css'
import PropTypes from 'prop-types'
export default class Schema extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    data: PropTypes.array,
  }
  render() {
    return (
      <ul className={'schema-container'}>
        {this.props.data.map((c, i) => {
          return <li key={i}>{c}</li>
        })}
      </ul>
    )
  }
}
