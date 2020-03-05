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
import emitter from './command'
import location from './location'
import { generateHooks } from './hook'

// Define language options
export const displayName = 'Python RPA'

export let opts = {}
opts.emitter = emitter
opts.hooks = generateHooks()
opts.fileExtension = '.py'
opts.commandPrefixPadding = '  '
opts.terminatingKeyword = ''
opts.commentPrefix = '#'
opts.commandLevel = '0'
opts.testLevel = '0'
opts.generateMethodDeclaration = generateMethodDeclaration
// Create generators for dynamic string creation of primary entities (e.g., filename, methods, test, and suite)
function generateTestDeclaration(name) {
  return `def ${name}(driver):
  def getDriver():
    time.sleep(self.delay)
    if self.driver is None:
      if driver is None:
        self.driver = webdriver.Chrome()
      else:
        self.driver = driver
      self.driver.implicitly_wait(self.waitTime)
    return self.driver
        `
}
function generateMethodDeclaration(name) {
  return `def ${exporter.parsers.uncapitalize(
    exporter.parsers.sanitizeName(name)
  )}(self):`
}
// eslint-disable-next-line no-unused-vars
function generateSuiteDeclaration(name, delay, implicitlyWait) {
  return `self = type('', (), {})()
driver = None
delay = ${((delay || 300) / 1000).toFixed(1)}
waitTime = ${implicitlyWait}
`
}
function generateFilename(name) {
  return `rpa_${exporter.parsers.uncapitalize(
    exporter.parsers.sanitizeName(name)
  )}${opts.fileExtension}`
}

// Emit an individual test, wrapped in a suite (using the test name as the suite name)
export async function emitTest({
  baseUrl,
  test,
  tests,
  project,
  enableOriginTracing,
  beforeEachOptions,
}) {
  global.baseUrl = baseUrl
  const testDeclaration = generateTestDeclaration(test.name)
  let result = await exporter.emit.test(test, tests, {
    ...opts,
    testDeclaration,
    enableOriginTracing,
    project,
  })
  const suiteName = test.name
  // const suiteDeclaration = generateSuiteDeclaration(suiteName, project.delay, project.implicitlyWait)
  const suiteDeclaration = generateSuiteDeclaration(suiteName, 300, 3000)
  const _suite = await exporter.emit.suite(result, tests, {
    ...opts,
    suiteDeclaration,
    suiteName,
    project,
    beforeEachOptions,
  })
  return {
    filename: generateFilename(test.name),
    body: exporter.emit.orderedSuite(_suite),
  }
}

// Emit a suite with all of its tests
export async function emitSuite({
  baseUrl,
  suite,
  tests,
  project,
  enableOriginTracing,
  beforeEachOptions,
}) {
  global.baseUrl = baseUrl
  let result = await exporter.emit.testsFromSuite(tests, suite, opts, {
    enableOriginTracing,
    generateTestDeclaration,
    project,
  })
  // eslint-disable-next-line no-const-assign
  // const suiteDeclaration = generateSuiteDeclaration(suite.name, project.delay, project.implicitlyWait)
  const suiteDeclaration = generateSuiteDeclaration(suite.name, 300, 3000)
  const _suite = await exporter.emit.suite(result, tests, {
    ...opts,
    suiteDeclaration,
    suite,
    project,
    beforeEachOptions,
  })
  return {
    filename: generateFilename(suite.name),
    body: exporter.emit.orderedSuite(_suite),
  }
}

export default {
  emit: {
    test: emitTest,
    suite: emitSuite,
    locator: location.emit,
  },
  register: {
    command: emitter.register,
    variable: opts.hooks.declareVariables.register,
    dependency: opts.hooks.declareDependencies.register,
    beforeAll: opts.hooks.beforeAll.register,
    beforeEach: opts.hooks.beforeEach.register,
    afterEach: opts.hooks.afterEach.register,
    afterAll: opts.hooks.afterAll.register,
    inEachBegin: opts.hooks.inEachBegin.register,
    inEachEnd: opts.hooks.inEachEnd.register,
  },
}
