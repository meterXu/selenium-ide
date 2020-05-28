export default class LibMethod {
  key = ''
  iconCls = ''
  title = ''
  params = ''
  doc = ''
  pid = ''
  constructor(key, iconCls, title, params, doc, pid) {
    this.key = key
    this.iconCls = iconCls
    this.title = title
    this.params = params
    this.doc = doc
    this.pid = pid
  }
  static fromJS(jsRep) {
    let libMethod = new LibMethod(
      jsRep.id,
      jsRep.iconCls,
      jsRep.name,
      jsRep.params,
      jsRep.doc,
      jsRep.pid
    )
    return libMethod
  }
}
