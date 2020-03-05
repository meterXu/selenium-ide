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
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  declareDependencies,
  declareMethods: empty,
  declareVariables: empty,
  inEachBegin: empty,
  inEachEnd: empty,
}

function generate(hookName) {
  return new exporter.hook(emitters[hookName]())
}

export function generateHooks() {
  let result = {}
  Object.keys(emitters).forEach(hookName => {
    result[hookName] = generate(hookName)
  })
  return result
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
        // { level: 1, statement: 'def quitCase(self):' },
        // { level: 2, statement: 'self.driver.quit()' },
      ],
    },
    endingSyntax: {
      commands: [{ level: 0, statement: '' }],
    },
  }
  return params
}

function beforeAll() {
  const params = {
    startingSyntax: {
      commands: [{ level: 0, statement: 'def setup_class(cls):' }],
    },
    endingSyntax: {
      commands: [{ level: 0, statement: '' }],
    },
    registrationLevel: 1,
  }
  return params
}

function beforeEach() {
  const params = {
    startingSyntax: ({ browserName, gridUrl } = {}) => ({
      commands: [
        // { level: 1, statement: 'def getDriver(self):' },
        // { level: 2, statement: 'time.sleep(self.delay)' },
        // { level: 2, statement: 'if self.driver is None:' },
        // {
        //   level: 3,
        //   statement: gridUrl
        //     ? `self.driver = webdriver.Remote(command_executor='${gridUrl}', desired_capabilities=DesiredCapabilities.${
        //         browserName ? browserName.toUpperCase() : 'CHROME'
        //       })`
        //     : `self.driver = webdriver.${
        //         browserName ? browserName : 'Chrome'
        //       }()`,
        // },
        // { level: 3, statement: 'self.driver.implicitly_wait(self.waitTime)' },
        // { level: 3, statement: 'self.vars = {}' },
        // { level: 2, statement: 'return self.driver' },
      ],
    }),
    endingSyntax: {
      commands: [{ level: 0, statement: '' }],
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
      ],
    },
  }
  return params
}

function empty() {
  return {}
}
