import LibMethod from './LibMethod'

export default class LibClass {
  key = ''
  state = ''
  title = ''
  params = ''
  doc = ''
  pid = ''
  icon = null
  children = null
  constructor(key, state, title, params, doc, pid, children) {
    this.key = key
    this.state = state
    this.title = title
    this.params = params
    this.doc = doc
    this.pid = pid
    this.children = children
  }
  static fromJS(jsRep, data) {
    let _chlid = data.filter(c => c.pid === jsRep.id)
    let libClass = new LibClass(
      jsRep.id,
      jsRep.state,
      jsRep.name,
      jsRep.params,
      jsRep.doc,
      jsRep.pid,
      _chlid.map(c => LibMethod.fromJS(c))
    )
    return libClass
  }
}
