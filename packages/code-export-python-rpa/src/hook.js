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
// KIND, either express or implied.  See the License for the specific language governing permissions and limitations
// under the License.

import { codeExport as exporter } from '@seleniumhq/side-utils'

const emitters = {
  afterAll: empty,
  afterEach: empty,
  beforeAll,
  beforeEach: empty,
  declareDependencies,
  declareMethods: empty,
  declareVariables: empty,
  inEachBegin: inEachBegin,
  inEachEnd: inEachEnd,
  testEnd: testEnd,
}

function generate(hookName,project) {
  return new exporter.hook(emitters[hookName](project))
}

export function generateHooks(project) {
  let result = {}
  Object.keys(emitters).forEach(hookName => {
    result[hookName] = generate(hookName,project)
  })
  return result
}

function beforeAll(project) {
  let delay = project ? project.delay : 300
  let implicitlyWait = project ? project.implicitlyWait : 3000
  delay = (delay / 1000).toFixed(1)
  const params = {
    startingSyntax: {
      commands: [
        { level: 0, statement: 'class RPAInfo:' },
        { level: 1, statement: 'driver = None' },
        { level: 1, statement: `delay = ${delay}` },
        { level: 1, statement: `waitTime = ${implicitlyWait}` },
        { level: 1, statement: 'vars = {}' },
        { level: 0, statement: '' },
        { level: 1, statement: 'def getDriver(self):' },
        { level: 2, statement: 'time.sleep(self.delay)' },
        { level: 2, statement: 'if self.driver is None:' },
        { level: 3, statement: 'self.driver = webdriver.Chrome()' },
        { level: 2, statement: 'self.driver.implicitly_wait(self.waitTime)' },
        { level: 2, statement: 'return self.driver' },
      ],
    },
    endingSyntax: {
      commands: [{ level: 0, statement: '' }, { level: 0, statement: '' }],
    },
    registrationLevel: 1,
  }
  return params
}

function afterAll() {
  const params = {
    startingSyntax: {
      commands: [{ level: 0, statement: 'def teardown_class(cls):' }],
    },
    endingSyntax: {
      commands: [{ level: 0, statement: '' }],
    },
    registrationLevel: 1,
  }
  return params
}

function afterEach() {
  const params = {
    startingSyntax: {
      commands: [
        { level: 1, statement: 'def quitCase(self):' },
        { level: 2, statement: 'self.driver.quit()' },
      ],
    },
    endingSyntax: {
      commands: [{ level: 0, statement: '' }],
    },
  }
  return params
}

function beforeEach() {
  const params = {
    startingSyntax: ({ browserName, gridUrl } = {}) => ({
      commands: [],
    }),
    endingSyntax: {
      commands: [{ level: 0, statement: '' }],
    },
  }
  return params
}

function inEachBegin() {
  const params = {
    startingSyntax: {
      commands: [
        { level: 1, statement: 'self = RPAInfo()' },
        { level: 1, statement: 'self.driver = driver' },
        { level: 1, statement: 'try:' },
      ],
    },
    endingSyntax: {
      commands: [],
    },
  }
  return params
}

function inEachEnd() {
  const params = {
    startingSyntax: {
      commands: [
        { level: 1, statement: 'except Exception as Error:' },
        { level: 2, statement: 'print(Error)' },
        { level: 1, statement: 'return self' },
        { level: 1, statement: '' },
        { level: 1, statement: '' },
      ],
    },
    endingSyntax: {
      commands: [],
    },
  }
  return params
}

function testEnd() {
  const params = {
    startingSyntax: {
      commands: [],
    },
    endingSyntax: {
      commands: [],
    },
  }
  return params
}

function declareDependencies() {
  const params = {
    startingSyntax: {
      commands: [
        { level: 0, statement: 'import pytest' },
        { level: 0, statement: 'import time' },
        { level: 0, statement: 'import json' },
        { level: 0, statement: 'from selenium import webdriver' },
        {
          level: 0,
          statement: 'from selenium.webdriver.common.by import By',
        },
        {
          level: 0,
          statement:
            'from selenium.webdriver.common.action_chains import ActionChains',
        },
        {
          level: 0,
          statement:
            'from selenium.webdriver.support import expected_conditions',
        },
        {
          level: 0,
          statement:
            'from selenium.webdriver.support.wait import WebDriverWait',
        },
        {
          level: 0,
          statement: 'from selenium.webdriver.common.keys import Keys',
        },
        {
          level: 0,
          statement:
            'from selenium.webdriver.common.desired_capabilities import DesiredCapabilities',
        },
        {
          level: 0,
          statement: '',
        },
        {
          level: 0,
          statement: '',
        },
      ],
    },
  }
  return params
}

function empty() {
  return {}
}
