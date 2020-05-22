class FunLibs {
  constructor() {
    this.libs = {
      读取excel: {
        name: 'read_excel_to_df_withName',
        params: ['path', 'sheet'],
        return: 'dataframe',
        generate: (path, sheet) => {
          return `$\{readData\}=    read_excel_to_df_withName    ${path}    ${sheet}`
        },
      },
      转字符串: {
        name: 'evaluate',
        params: ['value'],
        return: 'resValue',
        generate: (key, index) => {
          return `$\{${key}\}    evaluate    str($\{readData.${key}[${index}]\})`
        },
      },
      创建数组: {
        name: 'Create List',
        params: ['value'],
        return: ['list'],
        generate: () => {
          return `$\{pgSourceArray\}=    Create List    $\{self.driver.page_source\}`
        },
      },
      写入excel: {
        name: 'read_excel_to_df_withName',
        params: ['path', 'sheet'],
        return: null,
        generate: (path, sheet) => {
          return `write_excel_row_fordf    ${path} ${sheet}`
        },
      },
    }
  }
}
export default new FunLibs()
