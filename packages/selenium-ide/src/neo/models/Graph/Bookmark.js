class Bookmark {
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
}

export default Bookmark
