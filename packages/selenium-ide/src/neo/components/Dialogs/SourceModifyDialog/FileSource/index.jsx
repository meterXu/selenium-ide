import React from 'react'
import './style.css'
import FormInput from '../../../FormInput'
import FormSelect from '../../../FormSelect'
export default class FileSource extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <FormInput label="名称" name="name" />
        <FormSelect label="类型" name="type" />
      </>
    )
  }
}
