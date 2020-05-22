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

import { codeExport as exporter } from '../../side-utils/dist'
import emitter from './command'
import location from './location'
import { generateHooks } from './hook'

// Define language options
export const displayName = 'RobotFramework process'

export let opts = {}
opts.hooks = generateHooks()
opts.fileExtension = '.robot'
opts.commandPrefixPadding = '  '
opts.terminatingKeyword = ''
opts.commentPrefix = '#'
opts.testLevel = '0'
opts.commandLevel = '0'
opts.generateMethodDeclaration = generateMethodDeclaration
// Create generators for dynamic string creation of primary entities (e.g., filename, methods, test, and suite)
function generateTestDeclaration(process) {
  return `${process.name}`
}
function generateMethodDeclaration(name) {
  return `def ${exporter.parsers.uncapitalize(
    exporter.parsers.sanitizeName(name)
  )}(self):`
}
// eslint-disable-next-line no-unused-vars
function generateSuiteDeclaration(name) {
  return ``
}

function generateFilename(name) {
  return `process_${exporter.parsers.uncapitalize(
    exporter.parsers.sanitizeName(name)
  )}${opts.fileExtension}`
}

// Emit an individual test, wrapped in a suite (using the test name as the suite name)
export async function emitProcess({
  baseUrl,
  test,
  tests,
  process,
  project,
  enableOriginTracing,
  beforeEachOptions,
}) {
  opts.hooks = generateHooks(project)
  global.baseUrl = baseUrl
  const testDeclaration = generateTestDeclaration(process)
  let body = new emitter(process, project).generateBody()
  return {
    filename: `${process.name}.robot`,
    body: `${testDeclaration}\r\n${body}`,
  }
}

export default {
  emit: {
    test: emitProcess,
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
