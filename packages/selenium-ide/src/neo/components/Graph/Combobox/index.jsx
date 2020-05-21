import React from 'react'
import LabelledInput from '../../LabelledInput'
import PropTypes from 'prop-types'
import './style.css'
export default class Combobox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openItemContainer: false,
      text: '',
      _itemdata: this.props.itemdata,
    }
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultText: PropTypes.string.isRequired,
    itemdata: PropTypes.array.isRequired,
    itemClick: PropTypes.func,
  }
  downActiveClick() {
    this.setState({
      openItemContainer: !this.state.openItemContainer,
      _itemdata: this.state.text
        ? this.props.itemdata.filter(c => c.text.indexOf(this.state.text) > -1)
        : this.props.itemdata,
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
      _itemdata: this.props.itemdata.filter(
        c => c.text.indexOf(event.target.value) > -1
      ),
    })
  }
  itemClick() {
    this.setState({
      openItemContainer: !this.state.openItemContainer,
      text: event.target.innerText,
    })
    this.props.itemClick({
      text: event.target.innerText,
      value: event.target.getAttribute('data-value'),
      hideValue: event.target.getAttribute('data-hidevalue'),
    })
  }
  componentDidMount() {
    this.setState({
      text: this.props.defaultText,
    })
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
          className={
            this.state.openItemContainer
              ? 'combobox-down combobox-down-active'
              : 'combobox-down'
          }
          onClick={this.downActiveClick.bind(this)}
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
            {this.state._itemdata.map((c, i) => {
              return (
                <li
                  key={i}
                  tabIndex={i}
                  data-value={c.value}
                  data-hidevalue={c.hideValue}
                  onClick={this.itemClick.bind(this)}
                >
                  {c.text}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
