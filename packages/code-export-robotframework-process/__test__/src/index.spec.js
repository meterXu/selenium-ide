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

import fs from 'fs'
import path from 'path'
import { emitProcess } from '../../src'

function readFile(filename) {
  return JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'side-utils',
        '__test__',
        'test-files',
        filename
      )
    )
  )
}

describe('Code Export Python pytest', () => {
  it('should export a test', async () => {
    const project = readFile('single-test.side')
    const results = await emitProcess({
      baseUrl: project.url,
      test: project.tests[0],
      tests: project.tests,
      process: project.processData[0],
      project: project,
    })
    console.log(results.body)
    expect(results.body).toBeDefined()
    expect(results.body).toMatchSnapshot()
  })
})
