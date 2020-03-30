import React from 'react'
import './style.css'
import FormInput from '../../../FormInput'
import FormSelect from '../../../FormSelect'
import FormGroup from '../../../FormGroup'
export default class FileSource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemData: [{ text: 'Excel', value: 0 }],
    }
  }
  render() {
    return (
      <>
        <FormInput label="名称" name="name" />
        <FormSelect label="类型" name="type" itemData={this.state.itemData} />
        <FormGroup label="属性" name="">
          <FormInput label="地址" name="path" />
        </FormGroup>
      </>
    )
  }
}
