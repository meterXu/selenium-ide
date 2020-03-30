import React from 'react'
import './style.css'
import classNames from 'classnames'
import PropTypes from 'prop-types'
export default class FormGroup extends React.Component{
  constructor(props) {
    super(props)
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    width: PropTypes.number,
    children: PropTypes.element,
  }
  render() {
    return (
      <div className={classNames('form-group', this.props.className)}>
        <label
          htmlFor={this.props.name}
          style={{
            width: `${this.props.width}px`,
          }}
        >
          {this.props.label}
        </label>
        {this.props.children}
      </div>
    )
  }
}
