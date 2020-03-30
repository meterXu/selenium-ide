import React from 'react'
import './style.css'
import FormInput from '../../../FormInput'
export default class FileSource extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <FormInput label="名称" name="name" />
      </>
    )
  }
}
