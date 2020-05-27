export default class LibMethod {
  id = ''
  iconCls = ''
  name = ''
  params = ''
  doc = ''
  constructor(id, iconCls, name, params, doc) {
    this.id = id
    this.iconCls = iconCls
    this.name = name
    this.params = params
    this.doc = doc
  }
  static fromJS(jsRep) {
    let libMethod = new LibMethod(
      jsRep.id,
      jsRep.iconCls,
      jsRep.name,
      jsRep.params,
      jsRep.doc
    )
    return libMethod
  }
}
