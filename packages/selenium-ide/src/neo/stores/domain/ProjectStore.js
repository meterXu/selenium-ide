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

import { action, observable, computed, reaction, toJS } from 'mobx'
import uuidv4 from 'uuid/v4'
import naturalCompare from 'string-natural-compare'
import TestCase from '../../models/TestCase'
import Suite from '../../models/Suite'
import Source from '../../models/Source/Source'
import File from '../../models/Source/File'
import Db from '../../models/Source/Db'
import Api from '../../models/Source/Api'
import { VERSIONS } from '../../IO/migrate'
import Process from '../../models/Graph/Process'

export default class ProjectStore {
  @observable
  id = uuidv4()
  @observable
  modified = false
  @observable
  name = ''
  @observable
  url = ''
  @observable
  defaultDelay = 300
  @observable
  defaultImplicitlyWait = 30
  @observable
  delay = this.defaultDelay
  @observable
  implicitlyWait = this.defaultImplicitlyWait
  @observable
  plugins = []
  @observable
  _tests = []
  @observable
  _suites = []
  @observable
  _urls = []
  @observable
  version = VERSIONS[VERSIONS.length - 1]
  @observable
  scTypeSwitch = 0
  @observable
  sourceData = {
    read: [],
    write: [],
  }
  @observable
  pluginConf = {
    backUrl: 'http://192.168.12.74:8000/',
    dataCatalog: 'api/v1/dataCatalog/',
  }

  @observable
  processData = []

  @observable
  selectedProcess = null

  constructor(name = 'Untitled Project') {
    this.name = name
    this.changedTestDisposer = reaction(
      () => this._tests.find(({ modified }) => modified),
      modified => {
        if (modified) this.setModified(true)
      }
    )
    this.changeTestsDisposer = reaction(
      () => this._tests.length,
      () => this.setModified(true)
    )
    this.changedSuiteDisposer = reaction(
      () => this._suites.find(({ modified }) => modified),
      modified => {
        if (modified) this.setModified(true)
      }
    )
    this.changeSuitesDisposer = reaction(
      () => this._suites.length,
      () => this.setModified(true)
    )
    this.toJS = this.toJS.bind(this)
    this.dispose = this.dispose.bind(this)
  }

  @computed
  get suites() {
    return this._suites
      .slice()
      .sort((s1, s2) => naturalCompare(s1.name, s2.name))
  }

  @computed
  get tests() {
    return this._tests
      .slice()
      .sort((t1, t2) => naturalCompare(t1.name, t2.name))
  }

  @computed
  get urls() {
    return this._urls.slice().sort()
  }

  @action.bound
  setUrl(url) {
    this.url = url
    this.setModified(true)
  }

  @action.bound
  addUrl(urlToAdd) {
    if (urlToAdd) {
      const url = new URL(urlToAdd).href
      if (!this._urls.find(u => u === url)) {
        this._urls.push(url)
        this.setModified(true)
      }
    }
  }

  @action.bound
  addCurrentUrl() {
    this.addUrl(this.url)
  }

  @action.bound
  changeName(name) {
    this.name = name.replace(/<[^>]*>/g, '') // firefox adds unencoded html elements to the string, strip them
    this.setModified(true)
  }
  @action.bound
  changeDelay(delay) {
    this.delay = delay
  }

  @action.bound
  changeImplicitlyWait(implicitlyWait) {
    this.implicitlyWait = implicitlyWait
  }

  @action.bound
  setModified(modified = true) {
    this.modified = modified
  }

  @action.bound
  createSuite(...argv) {
    const suite = new Suite(undefined, ...argv)
    this._suites.push(suite)

    return suite
  }

  @action.bound
  deleteSuite(suite) {
    this._suites.remove(suite)
  }

  @action.bound
  createTestCase(...argv) {
    const test = new TestCase(undefined, ...argv)
    this.addTestCase(test)

    return test
  }

  @action.bound
  addTestCase(test) {
    if (!test || !(test instanceof TestCase)) {
      throw new Error(
        `Expected to receive TestCase instead received ${
          test ? test.constructor.name : test
        }`
      )
    } else {
      let foundNumber = 0
      // handle duplicate names -> name (1)
      // by using the sorted array we can do it in one read of the array
      this.tests.forEach(t => {
        if (
          t.name === (foundNumber ? `${test.name} (${foundNumber})` : test.name)
        )
          foundNumber++
      })
      if (foundNumber) {
        test.name = `${test.name} (${foundNumber})`
      }
      this._tests.push(test)
      return test
    }
  }

  @action.bound
  createProcess(...argv) {
    const process = new Process(undefined, ...argv)
    this.addProcessData(process)
    this.setSelectedProcess(process.id)
    return process
  }

  @action.bound
  duplicateTestCase(test) {
    const test2 = test.export()
    delete test2.id
    test2.commands.forEach(cmd => {
      delete cmd.id
    })
    const toBeAdded = TestCase.fromJS(test2)
    this.addTestCase(toBeAdded)
  }

  @action.bound
  deleteTestCase(test) {
    if (!test || !(test instanceof TestCase)) {
      throw new Error(
        `Expected to receive TestCase instead received ${
          test ? test.constructor.name : test
        }`
      )
    } else {
      this.suites.forEach(suite => {
        suite.removeTestCase(test)
      })
      this._tests.remove(test)
    }
  }
  @action.bound
  createSource(io, obj) {
    const source = new Source(undefined, io, obj)
    this.addSource(source, io)
    return source
  }
  @action.bound
  createExcel(name, code, path, sheet, schema) {
    const excel = new File(name, code)
    excel.createExcel(path, sheet, schema)
    return excel
  }
  @action.bound
  createOracle(name, code, connStr, target, schema) {
    const db = new Db(name, code)
    db.createOracle(connStr, target, schema)
    return db
  }
  @action.bound
  createSqlserver(name, code, connStr, target, schema) {
    const db = new Db(name, code)
    db.createSqlserver(connStr, target, schema)
    return db
  }
  @action.bound
  createMysql(name, code, connStr, target, schema) {
    const db = new Db(name, code)
    db.createMysql(connStr, target, schema)
    return db
  }
  @action.bound
  createApi(name, code, url, type, contentType, data, header, schema) {
    const api = new Api(name, code)
    api.createApi(url, type, contentType, data, header, schema)
    return api
  }
  @action.bound
  addSource(source, io) {
    switch (io) {
      case 0:
        {
          let xxx = Object.assign({}, this.sourceData)
          xxx.read.push(source)
          this.sourceData = xxx
        }
        break
      case 1:
        {
          this.sourceData.write.push(source)
        }
        break
    }
  }
  @action.bound
  emptySource() {
    this.sourceData = {
      read: [],
      write: [],
    }
  }

  @action.bound
  setProcessData(value) {
    this.processData = value
  }

  @action.bound
  addProcessData(value) {
    this.processData.push(value)
  }

  @action.bound
  setSelectedProcess(id) {
    this.selectedProcess = id
  }
  @action.bound
  removeProcess(process) {
    this.processData.remove(process)
  }

  @action.bound
  registerPlugin(plugin) {
    const existsInPlugins = this.plugins.findIndex(p => p.id === plugin.id)
    if (existsInPlugins !== -1) {
      this.plugins[existsInPlugins] = plugin
    } else {
      this.plugins.push(plugin)
    }
  }

  @action.bound
  saved() {
    this._tests.forEach(test => {
      test.modified = false
    })
    this._suites.forEach(test => {
      test.modified = false
    })
    this.setModified(false)
  }

  @action.bound
  fromJS(jsRep) {
    this.name = jsRep.name
    this.setUrl(jsRep.url)
    this._tests.replace(jsRep.tests.map(TestCase.fromJS))
    this._suites.replace(
      jsRep.suites.map(suite => Suite.fromJS(suite, this.tests))
    )
    this._urls.clear()
    jsRep.urls.forEach(url => {
      this.addUrl(url)
    })
    this.plugins.replace(jsRep.plugins)
    this.version = jsRep.version
    this.id = jsRep.id || uuidv4()
    this.delay = jsRep.delay || this.defaultDelay
    this.implicitlyWait = jsRep.implicitlyWait || this.defaultImplicitlyWait
    this.sourceData = jsRep.sourceData
    this.pluginConf = jsRep.pluginConf
    this.processData = jsRep.processData.map(c => Process.fromJs(c))
    if (this.processData.length > 0) {
      this.selectedProcess = this.processData[0].id
    }
    window._playbackState.delay = this.delay
    window._playbackState.implicitlyWait = this.implicitlyWait
    this.saved()
  }
  @action.bound
  changeScTypeSwitch(type) {
    this.scTypeSwitch = type
  }

  dispose() {
    this.changeTestsDisposer()
    this.changedTestDisposer()
    this.changeSuitesDisposer()
    this.changedSuiteDisposer()
  }

  toJS() {
    return toJS({
      id: this.id,
      version: this.version,
      name: this.name,
      url: this.url,
      tests: this._tests.map(t => t.export()),
      suites: this._suites.map(s => s.export()),
      sourceData: this.sourceData,
      pluginConf: this.pluginConf,
      processData: this.processData.map(c => c.export()),
      urls: this._urls,
      plugins: this.plugins,
      delay: this.delay,
      implicitlyWait: this.implicitlyWait,
    })
  }
}
