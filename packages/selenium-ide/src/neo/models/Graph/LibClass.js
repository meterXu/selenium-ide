import LibMethod from './LibMethod'

export default class LibClass {
  id = ''
  state = ''
  name = ''
  params = ''
  doc = ''
  children = null
  constructor(id, state, name, params, doc, children) {
    this.id = id
    this.state = state
    this.name = name
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
