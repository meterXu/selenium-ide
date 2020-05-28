export default class LibMethod {
  key = ''
  iconCls = ''
  title = ''
  params = ''
  doc = ''
  constructor(key, iconCls, title, params, doc) {
    this.key = key
    this.iconCls = iconCls
    this.title = title
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
