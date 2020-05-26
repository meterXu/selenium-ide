import { observer } from 'mobx-react'
import React from 'react'
import './style.css'
import FormInput from '../../../FormInput'
import FormSelect from '../../../FormSelect'
import FormGroup from '../../../FormGroup'
import Schema from '../Schema'
import ModalState from '../../../../stores/view/ModalState'
import enumData from '../../../../../common/enum'

@observer
export default class FileSource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemData: Object.keys(enumData.scFileType).map(c => {
        return { text: c, value: enumData.scFileType[c] }
      }),
      fileData: {
        name: ModalState.sourceConfModel && ModalState.sourceConfModel.name,
        code: ModalState.sourceConfModel && ModalState.sourceConfModel.code,
        type: enumData.scType.文件,
        data: {
          type: enumData.scFileType.excel,
          pro: {
            path:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.path,
            sheet:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.sheet,
          },
          schema:
            ModalState.sourceConfModel &&
            ModalState.sourceConfModel.data.schema,
        },
      },
    }
    if (!ModalState.sourceConfModel) {
      ModalState.setSourceConfModel(this.state.fileData)
    }
  }
  nameChange() {
    let newFileData = Object.assign({}, this.state.fileData)
    newFileData.name = event.target.value
    this.setState({
      fileData: newFileData,
    })
    ModalState.setSourceConfModel(newFileData)
  }
  pathChange() {
    let newFileData = Object.assign({}, this.state.fileData)
    newFileData.data.pro.path = event.target.value
    this.setState({
      fileData: newFileData,
    })
    ModalState.setSourceConfModel(newFileData)
  }
  sheetChange() {
    let newFileData = Object.assign({}, this.state.fileData)
    newFileData.data.pro.sheet = event.target.value
    this.setState({
      fileData: newFileData,
    })
    ModalState.setSourceConfModel(newFileData)
  }

  render() {
    return (
      <>
        <FormInput
          label="名称"
          name="name"
          value={this.state.fileData.name}
          onChange={this.nameChange.bind(this)}
        />
        <FormSelect
          label="类型"
          name="type"
          itemdata={this.state.itemData}
          value={this.state.fileData.data.type}
        />
        <FormGroup label="属性" name="">
          <FormInput
            label="地址"
            name="path"
            value={this.state.fileData.data.pro.path}
            onChange={this.pathChange.bind(this)}
          />
          <FormInput
            label="sheet"
            name="sheet"
            value={this.state.fileData.data.pro.sheet}
            onChange={this.sheetChange.bind(this)}
          />
        </FormGroup>
        <FormGroup label="数据格式" name="">
          <Schema data={this.state.fileData.data.schema} />
        </FormGroup>
      </>
    )
  }
}
