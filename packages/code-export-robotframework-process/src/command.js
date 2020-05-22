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
    let bodycodes = this.process.graphData.map(c => {
      switch (c.type) {
        case 1: {
          return this.generateCaseCode(c)
        }
        case 2:
          break
      }
    })
    let bodycode = bodycodes.join('\r\n')
    return bodycode
  }

  generateCaseCode(prcItem) {
    const commands = [
      {
        level: 1,
        statement: `login $\{None\} `,
      },
    ]
    return this.generateCode(commands)
  }

  generateCode(commands) {
    let codes = commands.map(c => {
      return this.generateTab(c.level) + c.statement
    })
    return codes.join('\n')
  }
  generateTab(level) {
    let tabs = Array(level).fill('\t')
    return tabs.join('')
  }
}
