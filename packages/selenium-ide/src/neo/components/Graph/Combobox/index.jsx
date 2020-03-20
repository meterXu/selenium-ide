import React from 'react'
import LabelledInput from '../../LabelledInput'
import PropTypes from 'prop-types'
import './style.css'
export default class Combobox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openItemContainer: false,
      text: null,
      _itemData: this.props.itemData
    }
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    itemData: PropTypes.array.isRequired,
    itemClick: PropTypes.func,
  }
  toggleItemContainer() {
    this.setState({
      openItemContainer: !this.state.openItemContainer,
    })
  }
  onChnage() {
    this.setState({
      text: event.target.value,
    })
    if (event.target.value) {
      this.setState({
        openItemContainer: true,
      })
    } else {
      this.setState({
        openItemContainer: false,
      })
    }
    this.setState({
      _itemData:this.props.itemData.filter(c=>c.text.indexOf(event.target.value)>-1)
    })
  }
  itemClick() {
    this.setState({
      text:event.target.innerText
    })
    this.toggleItemContainer()
    this.props.itemClick(event.target.getAttribute('data-value'))
  }
  render() {
    return (
      <div className={'combobox-container'}>
        <LabelledInput
          name={this.props.name}
          label={this.props.label}
          value={this.state.text}
          onChange={this.onChnage.bind(this)}
        />
        <span
          className={this.state.openItemContainer?'combobox-down combobox-down-active':'combobox-down'}
          onClick={this.toggleItemContainer.bind(this)}
        >
          ∨
        </span>
        <div
          className={
            this.state.openItemContainer
              ? 'combobox-item-container show-container'
              : 'combobox-item-container hide-container'
          }
        >
          <ul>
            {this.state._itemData.map((c,i) => {
              return <li tabIndex={i} data-value={c.value} onClick={this.itemClick.bind(this)}>{c.text}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}
