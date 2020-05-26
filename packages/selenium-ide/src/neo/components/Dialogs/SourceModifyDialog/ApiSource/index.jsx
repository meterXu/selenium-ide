import React from 'react'
import './style.css'
import FormInput from '../../../FormInput'
import FormSelect from '../../../FormSelect'
import FormGroup from '../../../FormGroup'
import enumData from '../../../../../common/enum'
import ModalState from '../../../../stores/view/ModalState'
import Schema from '../Schema'
export default class ApiSource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemData: [
        { text: 'get', value: enumData.scApiType.get },
        { text: 'post', value: enumData.scApiType.post },
      ],
      apiData: {
        name: ModalState.sourceConfModel && ModalState.sourceConfModel.name,
        code: ModalState.sourceConfModel && ModalState.sourceConfModel.code,
        type: enumData.scType.接口,
        data: {
          pro: {
            path:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.path,
            type:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.type,
            contentType:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.contentType,
            header:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.header,
          },
          schema:
            ModalState.sourceConfModel &&
            ModalState.sourceConfModel.data.schema,
        },
      },
    }
  }
  nameChange() {
    let newApiData = Object.assign({}, this.state.apiData)
    newApiData.name = event.target.value
    this.setState({
      apiData: newApiData,
    })
    ModalState.setSourceConfModel(newApiData)
  }
  urlChange() {
    let newApiData = Object.assign({}, this.state.apiData)
    newApiData.data.pro.path = event.target.value
    this.setState({
      apiData: newApiData,
    })
    ModalState.setSourceConfModel(newApiData)
  }
  contentTypeChange() {
    let newApiData = Object.assign({}, this.state.apiData)
    newApiData.data.pro['content-type'] = event.target.value
    this.setState({
      apiData: newApiData,
    })
    ModalState.setSourceConfModel(newApiData)
  }
  headerChange() {
    let newApiData = Object.assign({}, this.state.apiData)
    newApiData.data.pro.header = event.target.value
    this.setState({
      apiData: newApiData,
    })
    ModalState.setSourceConfModel(newApiData)
  }
  render() {
    return (
      <>
        <FormInput
          label="名称"
          name="name"
          value={this.state.apiData.name}
          onChange={this.nameChange.bind(this)}
        />
        <FormGroup label="参数" name="">
          <FormInput
            label="网址"
            name="url"
            value={this.state.apiData.data.pro.path}
            onChange={this.urlChange.bind(this)}
          />
          <FormSelect
            label="请求方式"
            name="type"
            itemdata={this.state.itemData}
            value={this.state.apiData.data.pro.type}
          />
          <FormInput
            label="content-type"
            name="contentType"
            value={this.state.apiData.data.pro.contentType}
            onChange={this.contentTypeChange.bind(this)}
          />
          <FormInput
            label="header"
            name="header"
            value={this.state.apiData.data.pro.header}
            onChange={this.headerChange.bind(this)}
          />
        </FormGroup>
        <FormGroup label="数据格式" name="">
          <Schema data={this.state.apiData.data.schema} />
        </FormGroup>
      </>
    )
  }
}
