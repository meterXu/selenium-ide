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

import generate from 'project-name-generator'
// import { CommandsArray } from '../models/Command'
import Command from '../models/Command'
import UiState from './view/UiState'
import PrcItem from '../models/Graph/PrcItem'
import CaseConfState from './view/caseConf/CaseConfState'

export default function seed(store, numberOfSuites = 0) {
  function generateSuite() {
    return store.createSuite(generate({ words: 2 }).spaced)
  }
  function generateTestCase() {
    return store.createTestCase(generate({ words: 2 }).spaced)
  }
  const targets = ['a', 'button']
  function generateCommand(test) {
    const command = test.createCommand()
    // command.setCommand(
    //   CommandsArray[Math.floor(Math.random() * CommandsArray.length)]
    // )
    let targetChance = Math.floor(Math.random() * 10)
    command.setTarget(
      targetChance < targets.length ? targets[targetChance] : ''
    )
    command.setValue(
      Math.floor(Math.random() * 2) ? generate({ words: 1 }).spaced : ''
    )
    return command
  }
  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < numberOfSuites; i++) {
    let suite = generateSuite()
    for (let j = 0; j < randomBetween(3, 6); j++) {
      const testCase = generateTestCase()
      for (let k = 0; k < randomBetween(9, 16); k++) {
        generateCommand(testCase)
      }
      suite.addTestCase(testCase)
    }
  }

  const url = 'http://www.baidu.com'
  store.setUrl(url)
  store.addUrl(url)

  function initFirstSuite() {
    const unitTest1 = store.createTestCase('A_HXHS_TEST1')
    unitTest1.createCommand(undefined, 'open', 'https://www.baidu.com')
    unitTest1.createCommand(
      undefined,
      'type',
      'id=kw',
      'hello world',
      '搜索内容1',
      true
    )
    unitTest1.createCommand(
      undefined,
      'sendKeys',
      'id=kw',
      '${KEY_ENTER}',
      '',
      false
    )
    unitTest1.createCommand(
      undefined,
      'type',
      'id=kw',
      'hello jetRecord',
      '搜索内容2',
      true
    )
    unitTest1.createCommand(
      undefined,
      'sendKeys',
      'id=kw',
      '${KEY_ENTER}',
      '',
      false
    )

    const unitTest2 = store.createTestCase('A_HXHS_TEST2')
    unitTest2.createCommand(undefined, 'open', 'https://www.baidu.com')
    unitTest2.createCommand(
      undefined,
      'type',
      'id=kw',
      'hello world',
      '搜索内容1',
      true
    )
    unitTest2.createCommand(
      undefined,
      'sendKeys',
      'id=kw',
      '${KEY_ENTER}',
      '',
      false
    )
    unitTest2.createCommand(
      undefined,
      'type',
      'id=kw',
      'hello jetRecord',
      '搜索内容2',
      true
    )
    unitTest2.createCommand(
      undefined,
      'sendKeys',
      'id=kw',
      '${KEY_ENTER}',
      '',
      false
    )

    const unitTest3 = store.createTestCase('A_HXHS_TEST3')
    unitTest3.createCommand(undefined, 'open', 'https://www.baidu.com')
    unitTest3.createCommand(
      undefined,
      'type',
      'id=kw',
      'hello world',
      '搜索内容1',
      true
    )
    unitTest3.createCommand(
      undefined,
      'sendKeys',
      'id=kw',
      '${KEY_ENTER}',
      '',
      false
    )
    unitTest3.createCommand(
      undefined,
      'type',
      'id=kw',
      'hello jetRecord',
      '搜索内容2',
      true
    )
    unitTest3.createCommand(
      undefined,
      'sendKeys',
      'id=kw',
      '${KEY_ENTER}',
      '',
      false
    )
    unitTest3.createCommand(
      undefined,
      'type',
      'id=kw',
      'hello jetRecord',
      '搜索内容3',
      true
    )
    unitTest3.createCommand(
      undefined,
      'sendKeys',
      'id=kw',
      '${KEY_ENTER}',
      '',
      false
    )
    const firstSuite = store.createSuite('first')
    firstSuite.addTestCase(unitTest1)
    firstSuite.addTestCase(unitTest2)
    firstSuite.addTestCase(unitTest3)
  }
  function initDutiesSuite() {
    const gw_login = store.createTestCase('A_HXHS_LOGIN')
    gw_login.createCommand(
      undefined,
      'open',
      'http://192.168.10.134/login?redirect=%2Fhome'
    )
    gw_login.createCommand(undefined, 'click', 'xpath=//input', '', '', false)
    gw_login.createCommand(undefined, 'clear', 'xpath=//input', '', '', false)
    gw_login.createCommand(
      undefined,
      'type',
      'xpath=//input',
      'emstest',
      '用户名',
      true
    )
    gw_login.createCommand(
      undefined,
      'clear',
      'xpath=//div[2]/div/div/input',
      '',
      '',
      false
    )
    gw_login.createCommand(
      undefined,
      'type',
      'xpath=//div[2]/div/div/input',
      '888888',
      '密码',
      true
    )
    gw_login.createCommand(
      undefined,
      'click',
      "xpath=//span[contains(.,'登录')]",
      '',
      '',
      false
    )

    gw_login.createCommand(
      undefined,
      'click',
      "xpath=//li[contains(.,'选择账册')]",
      '',
      '',
      false
    )

    gw_login.createCommand(
      undefined,
      'click',
      "xpath=//a[contains(.,'ZC322394002500000002')]",
      '',
      '',
      true
    )

    const gw_add = store.createTestCase('A_HXHS_ADD')
    gw_add.createCommand(
      undefined,
      'click',
      "xpah=//span[contains(.,'新增')]",
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'clear',
      '//div/div[3]/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'type',
      '//div/div[3]/div/div/input',
      '1',
      '企业内部编号',
      true
    )
    gw_add.createCommand(
      undefined,
      'click',
      'xpath=//div[7]/div/div/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'click',
      "xpath=//a[contains(.,'0255 来料深加工')]",
      '',
      '监管方式',
      true
    )

    gw_add.createCommand(
      undefined,
      'click',
      'xpath=//div/div[9]/div/div/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'clear',
      'xpath=//div/div[9]/div/div/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'type',
      'xpath=//div/div[9]/div/div/div/div/input',
      '0000 海关总署',
      '所属海关',
      true
    )
    gw_add.createCommand(
      undefined,
      'sendKeys',
      'xpath=//div/div[9]/div/div/div/div/input',
      '${KEY_ENTER}',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'click',
      'xpath=//div[13]/div/div/div/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'type',
      'xpath=//div[13]/div/div/div/div/div/input',
      '3202381070 江苏佳利达国际物流股份有限公司',
      '所属企业',
      true
    )
    gw_add.createCommand(
      undefined,
      'sendKeys',
      'xpath=//div[13]/div/div/div/div/div/input',
      '${KEY_ENTER}',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'click',
      'xpath=//div[20]/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'type',
      'xpath=//div[20]/div/div/input',
      '1',
      '关联手(账)册编号',
      true
    )
    gw_add.createCommand(
      undefined,
      'click',
      'xpath=//div[23]/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'type',
      'xpath=//div[23]/div/div/input',
      '1',
      '关联手(账)册编号',
      true
    )
    gw_add.createCommand(
      undefined,
      'click',
      'xpath=//div[8]/div/div/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'click',
      "xpath=//a[contains(.,'2 水路运输')]",
      '',
      '运输方式',
      true
    )
    gw_add.createCommand(
      undefined,
      'click',
      'xpath=//div/div[11]/div/div/div/div/input',
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'click',
      "xpath=//a[contains(.,'105 文莱')]",
      '',
      '启运国(地区)',
      true
    )
    gw_add.createCommand(
      undefined,
      'click',
      "xpath=//span[contains(.,'保存')]",
      '',
      '',
      false
    )
    gw_add.createCommand(
      undefined,
      'click',
      "xpath=//span[contains(.,'返回')]",
      '',
      '',
      false
    )

    const gw_search = store.createTestCase('A_HXHS_SEARCH')
    gw_search.createCommand(
      undefined,
      'click',
      "xpath=//span[contains(.,'查询条件')]",
      '',
      '',
      false
    )
    gw_search.createCommand(undefined, 'click', 'xpath=//input', '', '', false)
    gw_search.createCommand(
      undefined,
      'type',
      'xpath=//input',
      'IC1-990335',
      '企业内部编号',
      true
    )
    gw_search.createCommand(
      undefined,
      'click',
      'xpath=//div[2]/button/span',
      '',
      '',
      false
    )
    gw_search.createCommand(
      undefined,
      'click',
      "xpath=//span[contains(.,'查询条件')]",
      '',
      '',
      false
    )

    const guanwuSuite = store.createSuite('关务')
    guanwuSuite.addTestCase(gw_login)
    guanwuSuite.addTestCase(gw_add)
    guanwuSuite.addTestCase(gw_search)
  }

  initFirstSuite()
  initDutiesSuite()
  UiState.changeView(UiState.lang.suites)
  store.suites.find(c => c.name === 'first').setOpen(true)
  UiState.selectTest(
    store.tests.find(c => c.name === 'A_HXHS_TEST1'),
    store.suites.find(c => c.name === 'first')
  )
  store.changeName('种子项目')

  let source = store.createSource(
    UiState.enum.scIOType.读取,
    store.createExcel(
      '核销报核',
      'A_HXHS_TEST1',
      'D:\\upload\\1.xls',
      'Sheet1',
      ['data', 'url']
    )
  )

  store.createProcess('流程图1', [
    new PrcItem(
      '0,1',
      {
        paraNames: ['param0', 'param1'],
        paraValues: ['data', 'url'],
        caseId: store.tests.find(c => c.name === 'A_HXHS_TEST1').id,
        caseName: store.tests.find(c => c.name === 'A_HXHS_TEST1').name,
        sourceId: source.id,
      },
      UiState.enum.itemImage.用例,
      store.tests.find(c => c.name === 'A_HXHS_TEST1').name,
      UiState.enum.itemType.用例
    ),
  ])

  UiState.saved()

  return store
}
