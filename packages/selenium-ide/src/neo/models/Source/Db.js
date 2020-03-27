import { action, observable, reaction } from 'mobx'
export default class Db {
  @observable
  type = 1
  @observable
  data = null
  constructor(name) {
    this.name = name
    this.createOracle = this.createOracle.bind(this)
    this.createSqlserver = this.createSqlserver.bind(this)
    this.createMysql = this.createMysql.bind(this)
  }
  @action.bound
  createOracle(connStr) {
    this.data = {
      type: 0,
      pro: {
        connStr: connStr,
      },
    }
  }
  @action.bound
  createSqlserver(connStr) {
    this.data = {
      type: 1,
      pro: {
        connStr: connStr,
      },
    }
  }
  @action.bound
  createMysql(connStr) {
    this.data = {
      type: 2,
      pro: {
        connStr: connStr,
      },
    }
  }
}
