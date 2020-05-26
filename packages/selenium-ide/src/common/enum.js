export default {
  scIOType: {
    读取: 0,
    写入: 1,
  },
  scType: {
    文件: 0,
    数据库: 1,
    接口: 2,
  },
  scFileType: {
    excel: 0,
  },
  scDbType: {
    oracle: 0,
    sqlServer: 1,
    mysql: 2,
  },
  scApiType: {
    post: 'POST',
    get: 'Get',
  },
  scTypeName: {
    excel: 'excel',
    oracle: 'oracle',
    sqlserver: 'sqlserver',
    mysql: 'mysql',
    api: 'api',
    local: 'local',
  },
  btnType: {
    添加: 0,
    修改: 1,
    无: 2,
  },
  prcItem: {
    用例: {
      name: '用例',
      image: 'case',
      type: 1,
    },
    循环: {
      name: '循环',
      image: 'for',
      type: 2,
    },
    函数: {
      name: '函数',
      image: 'fun',
      type: 3,
    },
  }
}
