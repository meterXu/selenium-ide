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

import { codeExport as exporter } from '@seleniumhq/side-utils'
import location from './location'

export const emitters = {
  addSelection: emitSelect,
  answerOnNextPrompt: skip,
  assert: emitAssert,
  assertAlert: emitAssertAlert,
  assertChecked: emitVerifyChecked,
  assertConfirmation: emitAssertAlert,
  assertEditable: emitVerifyEditable,
  assertElementPresent: emitVerifyElementPresent,
  assertElementNotPresent: emitVerifyElementNotPresent,
  assertNotChecked: emitVerifyNotChecked,
  assertNotEditable: emitVerifyNotEditable,
  assertNotSelectedValue: emitVerifyNotSelectedValue,
  assertNotText: emitVerifyNotText,
  assertPrompt: emitAssertAlert,
  assertSelectedLabel: emitVerifySelectedLabel,
  assertSelectedValue: emitVerifyValue,
  assertValue: emitVerifyValue,
  assertText: emitVerifyText,
  assertTitle: emitVerifyTitle,
  check: emitCheck,
  chooseCancelOnNextConfirmation: skip,
  chooseCancelOnNextPrompt: skip,
  chooseOkOnNextConfirmation: skip,
  click: emitClick,
  clickAt: emitClick,
  close: emitClose,
  debugger: skip,
  do: emitControlFlowDo,
  doubleClick: emitDoubleClick,
  doubleClickAt: emitDoubleClick,
  dragAndDropToObject: emitDragAndDrop,
  echo: emitEcho,
  editContent: emitEditContent,
  else: emitControlFlowElse,
  elseIf: emitControlFlowElseIf,
  end: emitControlFlowEnd,
  executeScript: emitExecuteScript,
  executeAsyncScript: emitExecuteAsyncScript,
  forEach: emitControlFlowForEach,
  if: emitControlFlowIf,
  mouseDown: emitMouseDown,
  mouseDownAt: emitMouseDown,
  mouseMove: emitMouseMove,
  mouseMoveAt: emitMouseMove,
  mouseOver: emitMouseMove,
  mouseOut: emitMouseOut,
  mouseUp: emitMouseUp,
  mouseUpAt: emitMouseUp,
  open: emitOpen,
  pause: emitPause,
  removeSelection: emitSelect,
  repeatIf: emitControlFlowRepeatIf,
  run: emitRun,
  runScript: emitRunScript,
  select: emitSelect,
  selectFrame: emitSelectFrame,
  selectWindow: emitSelectWindow,
  sendKeys: emitSendKeys,
  setSpeed: emitSetSpeed,
  setWindowSize: emitSetWindowSize,
  store: emitStore,
  storeAttribute: emitStoreAttribute,
  storeJson: emitStoreJson,
  storeText: emitStoreText,
  storeTitle: emitStoreTitle,
  storeValue: emitStoreValue,
  storeWindowHandle: emitStoreWindowHandle,
  storeXpathCount: emitStoreXpathCount,
  submit: emitSubmit,
  times: emitControlFlowTimes,
  type: emitType,
  uncheck: emitUncheck,
  verify: emitAssert,
  verifyChecked: emitVerifyChecked,
  verifyEditable: emitVerifyEditable,
  verifyElementPresent: emitVerifyElementPresent,
  verifyElementNotPresent: emitVerifyElementNotPresent,
  verifyNotChecked: emitVerifyNotChecked,
  verifyNotEditable: emitVerifyNotEditable,
  verifyNotSelectedValue: emitVerifyNotSelectedValue,
  verifyNotText: emitVerifyNotText,
  verifySelectedLabel: emitVerifySelectedLabel,
  verifySelectedValue: emitVerifyValue,
  verifyText: emitVerifyText,
  verifyTitle: emitVerifyTitle,
  verifyValue: emitVerifyValue,
  waitForElementEditable: emitWaitForElementEditable,
  waitForElementPresent: emitWaitForElementPresent,
  waitForElementVisible: emitWaitForElementVisible,
  waitForElementNotEditable: emitWaitForElementNotEditable,
  waitForElementNotPresent: emitWaitForElementNotPresent,
  waitForElementNotVisible: emitWaitForElementNotVisible,
  webdriverAnswerOnVisiblePrompt: emitAnswerOnNextPrompt,
  waitForText: emitWaitForText,
  webdriverChooseCancelOnVisibleConfirmation: emitChooseCancelOnNextConfirmation,
  webdriverChooseCancelOnVisiblePrompt: emitChooseCancelOnNextConfirmation,
  webdriverChooseOkOnVisibleConfirmation: emitChooseOkOnNextConfirmation,
  while: emitControlFlowWhile,
}

exporter.register.preprocessors(emitters)
const waitTimeOut = 3000
function register(command, emitter) {
  exporter.register.emitter({ command, emitter, emitters })
}

function emit(command) {
  return exporter.emit.command(command, emitters[command.command], {
    variableLookup,
    emitNewWindowHandling,
  })
}

function canEmit(commandName) {
  return !!emitters[commandName]
}

function variableLookup(varName) {
  return '${' + varName + '}'
}

function variableSetter(varName, value) {
  return varName ? '${' + varName + '} = ' + value : ''
}

function emitWaitForWindow() {
  const generateMethodDeclaration = name => {
    return `def ${name}(self, timeout = 2):`
  }
  const commands = [
    { level: 0, statement: 'time.sleep(round(timeout / 1000))' },
    { level: 0, statement: 'wh_now = self.driver.window_handles' },
    {
      level: 0,
      statement: 'wh_then = self.vars["window_handles"]',
    },
    { level: 0, statement: 'if len(wh_now) > len(wh_then):' },
    {
      level: 0,
      statement: 'return set(wh_now).difference(set(wh_then)).pop()',
    },
  ]
  return Promise.resolve({
    name: 'wait_for_window',
    commands,
    generateMethodDeclaration,
  })
}

async function emitNewWindowHandling(command, emittedCommand) {
  return Promise.resolve(
    `self.vars["window_handles"] = self.driver.window_handles\n${await emittedCommand}\nself.vars["${
      command.windowHandleName
    }"] = self.wait_for_window(${command.windowTimeout})`
  )
}

function emitAssert(varName, value) {
  let _value
  if (value === 'true' || value === 'false') {
    _value = exporter.parsers.capitalize(value)
  } else if (value === '0' || !!Number(value)) {
    _value = value
  }
  const result = _value
    ? 'Should Be Equal    ${' + varName + '}    ' + _value
    : 'Should Be Equal    ${' + varName + '}    ' + value
  return Promise.resolve(result)
}

function emitAssertAlert(alertText) {
  return Promise.resolve(`Should Be Equal    Handle Alert    "${alertText}"`)
}

function emitAnswerOnNextPrompt(textToSend) {
  const commands = [
    { level: 0, statement: 'alert = self.driver.switch_to.alert' },
    { level: 0, statement: `alert.send_keys("${textToSend}")` },
    { level: 0, statement: 'alert.accept()' },
  ]
  return Promise.resolve({ commands })
}

async function emitCheck(locator) {
  const commands = [
    {
      level: 0,
      statement: {
        level: 0,
        statement: `Wait Until Element Is Visible    ${await location.emit(
          locator
        )}    ${waitTimeOut}`,
      },
    },
    {
      level: 0,
      statement: `Click Element    ${await location.emit(locator)}`,
    },
  ]
  return Promise.resolve({ commands })
}

function emitChooseCancelOnNextConfirmation() {
  return Promise.resolve(`self.driver.switch_to.alert.dismiss()`)
}

function emitChooseOkOnNextConfirmation() {
  return Promise.resolve(`self.driver.switch_to.alert.accept()`)
}

async function emitClick(target) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: `Wait Until Element Is Visible    ${await location.emit(
          target
        )}    ${waitTimeOut}`,
      },
      {
        level: 0,
        statement: `Click Element    ${await location.emit(target)}`,
      },
    ],
  })
}

async function emitClose() {
  return Promise.resolve(`Close Window`)
}

function generateExpressionScript(script) {
  return `Execute Javascript    return ${
    script.script
  }${generateScriptArguments(script)}`
}

function generateScriptArguments(script) {
  return `${script.argv.length ? '    ' : ''}${script.argv
    .map(varName => '${' + varName + '}')
    .join(',')}`
}

function emitControlFlowDo() {
  return Promise.resolve({
    commands: [
      { level: 0, statement: 'condition = True' },
      { level: 0, statement: 'while condition:' },
    ],
    endingLevelAdjustment: 1,
  })
}

function emitControlFlowElse() {
  return Promise.resolve({
    commands: [{ level: 0, statement: 'ELSE    ' }],
    startingLevelAdjustment: 0,
    endingLevelAdjustment: 0,
  })
}

function emitControlFlowElseIf(script) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: `ELSE IF    ${generateExpressionScript(script)}:`,
      },
    ],
    startingLevelAdjustment: 0,
    endingLevelAdjustment: 0,
  })
}

function emitControlFlowEnd() {
  return Promise.resolve({
    commands: [{ level: 0, statement: `` }],
    startingLevelAdjustment: 0,
    skipEmitting: true,
  })
}

function emitControlFlowIf(script) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: `\${condition}=    ${generateExpressionScript(script)}`,
      },
      { level: 0, statement: `Run Keyword if    \${condition}` },
    ],
    endingLevelAdjustment: 0,
  })
}

function emitControlFlowForEach(collectionVarName, iteratorVarName) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: 'collection = ${' + collectionVarName + '}',
      },
      {
        level: 0,
        statement: `for entry in collection`,
      },
      {
        level: 0,
        statement: '${' + iteratorVarName + '} = entry',
      },
    ],
  })
}

function emitControlFlowRepeatIf(script) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: `condition = ${generateExpressionScript(script)}`,
      },
    ],
    endingLevelAdjustment: -1,
  })
}

function emitControlFlowTimes(target) {
  const commands = [
    { level: 0, statement: ':FOR ${i} IN RANGE    0    ' + target },
    { level: 0, statement: '\\' },
  ]
  return Promise.resolve({ commands, endingLevelAdjustment: 1 })
}

function emitControlFlowWhile(script) {
  return Promise.resolve({
    commands: [
      { level: 0, statement: `while ${generateExpressionScript(script)}:` },
    ],
    endingLevelAdjustment: 1,
  })
}

async function emitDoubleClick(target) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        target
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Double Click Element    ${await location.emit(target)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitDragAndDrop(dragged, dropped) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        dragged
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        dropped
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Drag And Drop    ${await location.emit(
        dragged
      )}    ${await location.emit(dropped)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitEcho(message) {
  return Promise.resolve(`Log    ${message}`)
}

async function emitEditContent(locator, content) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Input Text    ${await location.emit(
        locator
      )}    ${content}    clear=False`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitExecuteScript(script, varName) {
  const scriptString = script.script.replace(/"/g, "'")
  const commands = [
    {
      level: 0,
      statement:
        '${' +
        varName +
        '}=    Execute Javascript    ' +
        scriptString +
        '    ' +
        generateScriptArguments(script),
    },
    {
      level: 0,
      statement: 'Log    ${' + varName + '}',
    },
  ]
  return Promise.resolve({ commands })
}

async function emitExecuteAsyncScript(script, varName) {
  const commands = [
    {
      level: 0,
      statement:
        '${' +
        varName +
        '}=    Execute Javascript    ' +
        generateScriptArguments(script),
    },
    {
      level: 0,
      statement: 'Log    ${' + varName + '}',
    },
  ]
  return Promise.resolve({ commands })
}

async function emitMouseDown(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Mouse Down    ${await location.emit(locator)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitMouseMove(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Mouse Over    ${await location.emit(locator)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitMouseOut() {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    name:body`,
    },
    {
      level: 0,
      statement: `Mouse Out    name:body`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitMouseUp(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Mouse Up    ${await location.emit(locator)}`,
    },
  ]
  return Promise.resolve({ commands })
}

function emitOpen(target) {
  const url = /^(file|http|https):\/\//.test(target)
    ? `${target}`
    : `${global.baseUrl}${target}`
  return Promise.resolve(
    '[Setup]    Run Keywords    Open Browser    ' +
      url +
      '    ${BROWSER} \n' +
      '...    AND    Set Selenium Speed    ${SELSPEED}'
  )
}

async function emitPause(time) {
  const commands = [{ level: 0, statement: `sleep    ${time}` }]
  return Promise.resolve({ commands })
}

async function emitRun(testName) {
  return Promise.resolve(`self.${exporter.parsers.sanitizeName(testName)}()`)
}

async function emitRunScript(script) {
  return Promise.resolve(
    `Execute Javascript    ${generateScriptArguments(script)}`
  )
}

async function emitSetWindowSize(size) {
  const [width, height] = size.split('x')
  return Promise.resolve(`Set Window Size    ${width}    ${height}`)
}

async function emitSelect(selectElement, option) {
  const vaule = option.match(/(?<=>).*(?=<\/option)/g)[0]
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        selectElement
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Select From List By Value ${await location.emit(
        selectElement
      )} ${vaule}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitSelectFrame(frameLocation) {
  if (frameLocation === 'relative=top' || frameLocation === 'relative=parent') {
    return Promise.resolve('Switch Window')
  } else if (/^index=/.test(frameLocation)) {
    return Promise.resolve(
      `Select Frame    ${Math.floor(frameLocation.split('index=')[1])}`
    )
  } else {
    return Promise.resolve({
      commands: [
        {
          level: 0,
          statement: `Wait Until Element Is Visible    ${await location.emit(
            frameLocation
          )}    ${waitTimeOut}`,
        },
        {
          level: 0,
          statement: `Select Frame    ${await location.emit(frameLocation)}`,
        },
      ],
    })
  }
}

async function emitSelectWindow(windowLocation) {
  if (/^handle=/.test(windowLocation)) {
    return Promise.resolve(
      `Switch Window    ${windowLocation.split('handle=')[1]}`
    )
  } else if (/^name=/.test(windowLocation)) {
    return Promise.resolve(
      `Switch Window    ${windowLocation.split('name=')[1]}`
    )
  } else if (/^win_ser_/.test(windowLocation)) {
    if (windowLocation === 'win_ser_local') {
      return Promise.resolve({
        commands: [
          {
            level: 0,
            statement: 'Switch Window',
          },
        ],
      })
    } else {
      // eslint-disable-next-line no-unused-vars
      const index = parseInt(windowLocation.substr('win_ser_'.length))
      return Promise.resolve({
        commands: [
          {
            level: 0,
            statement: `Switch Window`,
          },
        ],
      })
    }
  } else {
    return Promise.reject(
      new Error('Can only emit `select window` using handles')
    )
  }
}

function generateSendKeysInput(value) {
  if (typeof value === 'object') {
    return value
      .map(s => {
        if (s.startsWith('self.vars[')) {
          return s
        } else if (s.startsWith('Key[')) {
          const key = s.match(/\['(.*)'\]/)[1]
          return `Keys.${key}`
        } else {
          return `${s}`
        }
      })
      .join(', ')
  } else {
    if (value.startsWith('self.vars[')) {
      return value
    } else {
      return `${value}`
    }
  }
}

async function emitSendKeys(target, value) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: `Wait Until Element Is Visible    ${await location.emit(
          target
        )}    ${waitTimeOut}`,
      },
      {
        level: 0,
        statement: `Input Text    ${await location.emit(
          target
        )}    ${generateSendKeysInput(value)}`,
      },
    ],
  })
}

function emitSetSpeed() {
  return Promise.resolve(
    'print("`set speed` is a no-op in code export, use `pause` instead")'
  )
}

async function emitStore(value, varName) {
  return Promise.resolve(variableSetter(varName, `"${value}"`))
}

async function emitStoreAttribute(locator, varName) {
  const attributePos = locator.lastIndexOf('@')
  const elementLocator = locator.slice(0, attributePos)
  const attributeName = locator.slice(attributePos + 1)
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        elementLocator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${' +
        varName +
        '} = Get Element Attribute    ' +
        (await location.emit(elementLocator)) +
        '    ${attributeName}',
    },
    { level: 0, statement: 'Log    ${' + varName + '}' },
  ]
  return Promise.resolve({ commands })
}

async function emitStoreJson(json, varName) {
  return Promise.resolve({
    commadns: [
      {
        level: 0,
        statement: '${' + varName + '}=    Get Element Attribute    ' + json,
      },
      { level: 0, statement: 'Log    ${' + varName + '}' },
    ],
  })
}

async function emitStoreText(locator, varName) {
  const commands = [
    {
      level: 0,
      statement: `WebDriverWait(self.driver, ${waitTimeOut}).until(expected_conditions.visibility_of_element_located((${await location.emit(
        locator
      )})))`,
    },
    {
      level: 0,
      statement:
        '${' + varName + '}=    Get Text    ' + (await location.emit(locator)),
    },
    {
      level: 0,
      statement: 'Log    ${' + varName + '}',
    },
  ]
  return Promise.resolve({ commands })
}

async function emitStoreTitle(_, varName) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: '${' + varName + '}=    Get Title',
      },
      {
        level: 0,
        statement: 'Log    ${' + varName + '}',
      },
    ],
  })
}

async function emitStoreValue(locator, varName) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${' + varName + '}=    Get Element Attribute    locator    value',
    },
    {
      level: 0,
      statement: 'Log    ${' + varName + '}',
    },
  ]
  return Promise.resolve({ commands })
}

async function emitStoreWindowHandle(varName) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: '${' + varName + '}=    Get Window Handles',
      },
      {
        level: 0,
        statement: 'Log    ${' + varName + '}',
      },
    ],
  })
}

async function emitStoreXpathCount(locator, varName) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${' +
        varName +
        '}=    Get Element Count    ' +
        (await location.emit(locator)),
    },
    {
      level: 0,
      statement: 'Log    ${' + varName + '}',
    },
  ]
  return Promise.resolve({ commands })
}

async function emitSubmit(_locator) {
  return Promise.resolve(
    `raise Exception("'submit' is not a supported command in Selenium WebDriver. Please re-record the step in the IDE.")`
  )
}

async function emitType(target, value) {
  return Promise.resolve({
    commands: [
      {
        level: 0,
        statement: `Wait Until Element Is Visible    ${await location.emit(
          target
        )}    ${waitTimeOut}`,
      },
      {
        level: 0,
        statement: `Input Text    ${await location.emit(
          target
        )}    ${generateSendKeysInput(value)}`,
      },
    ],
  })
}

async function emitUncheck(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Click Element    ${await location.emit(locator)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyChecked(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Click Element    ${await location.emit(locator)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyEditable(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Click Element    ${await location.emit(locator)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyElementPresent(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${count}=    Get Element Count    ' + (await location.emit(locator)),
    },
    { level: 0, statement: 'Should Be True    ${count}>0' },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyElementNotPresent(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${count}=    Get Element Count    ' + (await location.emit(locator)),
    },
    { level: 0, statement: 'Should Be True    ${count}==0' },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyNotChecked(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `CheckBox Should Be Selected    ${await location.emit(
        locator
      )}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyNotEditable(locator) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Element Should Be Disabled    ${await location.emit(
        locator
      )}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyNotSelectedValue(locator, expectedValue) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${value}=    Get Element Attribute    ' +
        (await location.emit(locator)) +
        '    value',
    },
    {
      level: 0,
      statement:
        'Should Be True    ${value}!= "' +
        exporter.emit.text(expectedValue) +
        '"',
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyNotText(locator, text) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Element Text Should Not Be    ${await location.emit(
        locator
      )}    ${exporter.emit.text(text)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifySelectedLabel(locator, labelValue) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${selected_text}=    Get Selected List Label    ' +
        (await location.emit(locator)),
    },
    {
      level: 0,
      statement: 'Should Be True    ${selected_text}==' + labelValue,
    },
  ]
  return Promise.resolve({
    commands,
  })
}

async function emitVerifyText(locator, text) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement: `Element Should Contain    ${await location.emit(
        locator
      )}    ${exporter.emit.text(text)}`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyValue(locator, value) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${waitTimeOut}`,
    },
    {
      level: 0,
      statement:
        '${value}=    Get Element Attribute    ' +
        (await location.emit(locator)),
    },
    { level: 0, statement: 'Should Be True    ${value}    ' + value },
  ]
  return Promise.resolve({ commands })
}

async function emitVerifyTitle(title) {
  return Promise.resolve(`assert self.driver.title == "${title}"`)
}

async function emitWaitForElementEditable(locator, timeout) {
  const commands = [
    {
      level: 0,
      statement: `WebDriverWait(self.driver, ${timeout}).until(expected_conditions.element_to_be_clickable((${await location.emit(
        locator
      )})))`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitWaitForText(locator, text) {
  const timeout = 30000
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Contains    ${await location.emit(
        locator
      )}    ${text}    ${timeout}`,
    },
  ]
  return Promise.resolve({ commands })
}

function skip() {
  return Promise.resolve(undefined)
}

async function emitWaitForElementPresent(locator, timeout) {
  const commands = [
    {
      level: 0,
      statement: `WebDriverWait(self.driver, ${timeout}).until(expected_conditions.presence_of_element_located((${await location.emit(
        locator
      )})))`,
    },
  ]
  return Promise.resolve({ commands })
}

async function emitWaitForElementVisible(locator, timeout) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Visible    ${await location.emit(
        locator
      )}    ${timeout}`,
    },
  ]
  return Promise.resolve({
    commands,
  })
}

async function emitWaitForElementNotEditable(locator, timeout) {
  const commands = [
    {
      level: 0,
      statement: `WebDriverWait(self.driver, ${timeout}).until_not(expected_conditions.element_to_be_clickable((${await location.emit(
        locator
      )})))`,
    },
  ]
  return Promise.resolve({
    commands,
  })
}

async function emitWaitForElementNotPresent(locator, timeout) {
  const commands = [
    {
      level: 0,
      statement: `WebDriverWait(self.driver, ${timeout}).until(expected_conditions.invisibility_of_element_located((${await location.emit(
        locator
      )})))`,
    },
  ]
  return Promise.resolve({
    commands,
  })
}

async function emitWaitForElementNotVisible(locator, timeout) {
  const commands = [
    {
      level: 0,
      statement: `Wait Until Element Is Not Visible    ${await location.emit(
        locator
      )}    ${timeout}`,
    },
  ]
  return Promise.resolve({
    commands,
  })
}

export default {
  canEmit,
  emit,
  register,
  extras: { emitWaitForWindow },
}
