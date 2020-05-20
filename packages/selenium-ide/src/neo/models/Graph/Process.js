import uuidv4 from 'uuid/v4'
export default class Process {
  id = null
  name = null
  graphData = []

  constructor(id = uuidv4(), name, graphData) {
    this.id = id
    this.name = name
    this.graphData = graphData
    this.export = this.export.bind(this)
  }

  export() {
    return {
      id: this.id,
      name: this.name,
      graphData: this.graphData.map(c => c.export()),
    }
  }
}
