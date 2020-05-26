import enumData from '../../../common/enum'
export default class Db {
  type = enumData.scType.数据库
  data = null
  name = null
  constructor(name, code) {
    this.name = name
    this.code = code
    this.createOracle = this.createOracle.bind(this)
    this.createSqlserver = this.createSqlserver.bind(this)
    this.createMysql = this.createMysql.bind(this)
  }
  createOracle(connStr, target, schema) {
    this.data = {
      type: enumData.scDbType.oracle,
      pro: {
        connStr: connStr,
        target: target,
      },
      schema: schema,
    }
  }
  createSqlserver(connStr, target, schema) {
    this.data = {
      type: enumData.scDbType.sqlServer,
      pro: {
        connStr: connStr,
        target: target,
      },
      schema: schema,
    }
  }
  createMysql(connStr, target, schema) {
    this.data = {
      type: enumData.scDbType.mysql,
      pro: {
        connStr: connStr,
        target: target,
      },
      schema: schema,
    }
  }
}
