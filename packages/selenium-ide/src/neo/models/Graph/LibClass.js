import LibMethod from './LibMethod'

export default class LibClass {
  key = ''
  state = ''
  title = ''
  params = ''
  doc = ''
  children = null
  constructor(key, state, title, params, doc, children) {
    this.key = key
    this.state = state
    this.title = title
    this.params = params
    this.doc = doc
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
      _chlid.map(c => LibMethod.fromJS(c))
    )
    return libClass
  }
}
