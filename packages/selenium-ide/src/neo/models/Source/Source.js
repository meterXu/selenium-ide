import uuidv4 from 'uuid/v4'
export default class Source {
  id = null
  io = null
  type = null
  name = null
  code = null
  data = {}

  constructor(id = uuidv4(), io, sourceObj) {
    this.id = id
    this.name = sourceObj.name
    this.code = sourceObj.code
    this.io = io
    this.type = sourceObj.type
    this.data = sourceObj.data
  }
}
