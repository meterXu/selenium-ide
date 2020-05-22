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
import enumData from '../../selenium-ide/src/common/enum'
export default class emitters {
  constructor(process, project) {
    this.process = process
    this.projetc = project
    this.generateBody = this.generateBody.bind(this)
  }
  generateBody() {
    let bodycodes = process.graphData.map(c => {
      switch (c.type) {
        case enumData.prcItemType.用例:
          {
            this.generateCaseCode(c)
          }
          break
        case enumData.prcItemType.循环:
          break
      }
    })
    let bodycode = bodycodes.join('\r\n')
    return bodycode
  }

  generateCaseCode(prcItem) {
    debugger
  }
}
