// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import funlist from './FunLibs'
export default class emitters {
  constructor(process, project) {
    this.process = process
    this.projetc = project
    this.generateBody = this.generateBody.bind(this)
    this.generateHead = this.generateHead.bind(this)
  }
  generateHead(command) {
    return this.generateCode(command)
  }
  generateBody() {
    let bodycodes = this.process.graphData.map((c, i) => {
      switch (c.type) {
        case 1: {
          return this.generateCaseCode(c, i)
        }
        case 2:
          break
      }
    })
    let bodycode = bodycodes.join('\r\n')
    return bodycode
  }

  generateCaseCode(prcItem, index) {
    let sourceData = []
    if (this.projetc.sourceData) {
      sourceData = [
        ...this.projetc.sourceData.read,
        ...this.projetc.sourceData.write,
      ]
    }
    let test = this.projetc.tests.find(c => c.id === prcItem.data.caseId)
    let source = sourceData.find(c => c.id === prcItem.data.sourceId)
    let funName = undefined
    if (test) {
      funName = test.name.trim()
    }
    const ioReadCommands = this.generateIoRead(source)
    const ioWriteCommands = this.generateIoWrite(source)
    let formatCommands = []
    let paramstr = prcItem.data.paraValues
      .map(c => {
        formatCommands.push({
          level: 1,
          statement: funlist.libs.转字符串.generate(c, 0),
        })
        return `$\{${c}\}`
      })
      .join(' ')
    let firstParam = index === 0 ? '${None}' : '${self}'
    const commands = [
      {
        level: 1,
        statement: `$\{self\}=    ${funName}    ${firstParam}    ${paramstr}`,
      },
    ]
    return this.generateCode([
      ...ioReadCommands,
      ...formatCommands,
      ...commands,
      ...ioWriteCommands,
    ])
  }

  generateCode(commands) {
    let codes = commands.map(c => {
      return this.generateTab(c.level) + c.statement
    })
    return codes.join('\n')
  }
  generateTab(level) {
    let tabs = Array(level).fill('    ')
    return tabs.join('')
  }

  generateIoRead(source) {
    if (source && source.type === 0) {
      switch (source.data.type) {
        case 0: {
          return [
            {
              level: 1,
              statement: funlist.libs.读取excel.generate(
                source.data.pro.path,
                source.data.pro.sheet
              ),
            },
          ]
        }
        default:
          return []
      }
    }
    return []
  }

  generateIoWrite(source) {
    if (source && source.type === 1) {
      switch (source.data.type) {
        case 0: {
          return [
            {
              level: 1,
              statement: funlist.libs.写入excel.generate(
                source.data.pro.path,
                source.data.pro.sheet
              ),
            },
          ]
        }
        default:
          return []
      }
    }
    return []
  }
}
