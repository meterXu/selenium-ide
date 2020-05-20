import enumData from '../../../common/enum'
export default class Api {
  type = enumData.scType.接口
  data = null
  name = null
  constructor(name,code) {
    this.name = name
    this.code = code
    this.createApi = this.createApi.bind(this)
  }
  createApi(
    url,
    type,
    contentType = 'application/x-www-form-urlencoded',
    data,
    header,
    schema
  ) {
    this.data = {
      type: enumData,
      pro: {
        path: url,
        type: type,
        contentType: contentType,
        data: data,
        header: header,
      },
      schema:schema
    }
  }
}
