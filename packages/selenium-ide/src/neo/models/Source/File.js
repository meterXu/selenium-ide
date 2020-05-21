import enumData from '../../../common/enum'
export default class File {
  type = enumData.scType.文件
  name = null
  data = null
  constructor(name, code) {
    this.name = name
    this.code = code
    this.createExcel = this.createExcel.bind(this)
  }
  createExcel(path, sheet, schema) {
    this.data = {
      type: enumData.scFileType.excel,
      pro: {
        path: path,
        sheet: sheet,
      },
      schema: schema,
    }
  }
}
