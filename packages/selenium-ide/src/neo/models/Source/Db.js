import enumData from '../../../common/enum'
export default class Db {
  type = enumData.scType.数据库
  data = null
  name = null
  constructor(name,code) {
    this.name = name
    this.code = code
    this.createOracle = this.createOracle.bind(this)
    this.createSqlserver = this.createSqlserver.bind(this)
    this.createMysql = this.createMysql.bind(this)
  }
  createOracle(connStr,schema) {
    this.data = {
      type: enumData.scDbType.oracle,
      pro: {
        connStr: connStr,
      },
      schema:schema
    }
  }
  createSqlserver(connStr,schema) {
    this.data = {
      type: enumData.scDbType.sqlServer,
      pro: {
        connStr: connStr,
      },
      schema:schema
    }
  }
  createMysql(connStr,schema) {
    this.data = {
      type: enumData.scDbType.mysql,
      pro: {
        connStr: connStr,
      },
      schema:schema
    }
  }
}
