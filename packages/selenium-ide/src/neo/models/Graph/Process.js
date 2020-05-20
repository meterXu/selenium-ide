import uuidv4 from 'uuid/v4'
export default class Process {
  id = null
  name = null
  graphData = null

  constructor(id = uuidv4(), name, graphData) {
    this.id = id
    this.name = name
    this.graphData = graphData
  }
}
