import React from 'react'
import './style.css'
import FormInput from '../../../FormInput'
import FormSelect from '../../../FormSelect'
import FormGroup from '../../../FormGroup'
import enumData from '../../../../../common/enum'
import ModalState from '../../../../stores/view/ModalState'
import { observer } from 'mobx-react'
@observer
export default class DbSource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemData: [
        { text: 'oracle', value: enumData.scDbType.oracle },
        { text: 'sqlserver', value: enumData.scDbType.sqlServer },
        { text: 'mysql', value: enumData.scDbType.mysql },
      ],
      dbData: {
        name: ModalState.sourceConfModel && ModalState.sourceConfModel.name,
        code: ModalState.sourceConfModel && ModalState.sourceConfModel.code,
        type: enumData.scType.数据库,
        data: {
          type: enumData.scDbType.oracle,
          pro: {
            connstr:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.connStr,
            objName:
              ModalState.sourceConfModel &&
              ModalState.sourceConfModel.data.pro.objName,
          },
        },
      },
    }
  }
  nameChange() {
    let newDbData = Object.assign({}, this.state.dbData)
    newDbData.name = event.target.value
    this.setState({
      dbData: newDbData,
    })
    ModalState.setSourceConfModel(newDbData)
  }
  connstrChange() {
    let newDbData = Object.assign({}, this.state.dbData)
    newDbData.data.pro.connstr = event.target.value
    this.setState({
      dbData: newDbData,
    })
    ModalState.setSourceConfModel(newDbData)
  }

  objNameChange() {
    let newDbData = Object.assign({}, this.state.dbData)
    newDbData.data.pro.objName = event.target.value
    this.setState({
      dbData: newDbData,
    })
    ModalState.setSourceConfModel(newDbData)
  }
  render() {
    return (
      <>
        <FormInput
          label="名称"
          name="name"
          value={this.state.dbData.name}
          onChange={this.nameChange.bind(this)}
        />
        <FormSelect
          label="类型"
          name="type"
          itemdata={this.state.itemData}
          value={this.state.dbData.data.type}
        />
        <FormGroup label="属性" name="">
          <FormInput
            label="连接字符串"
            name="connstr"
            value={this.state.dbData.data.pro.connstr}
            onChange={this.connstrChange.bind(this)}
          />
          <FormInput
            label="对象名称"
            name="objName"
            value={this.state.dbData.data.pro.objName}
            onChange={this.objNameChange.bind(this)}
          />
        </FormGroup>
      </>
    )
  }
}
