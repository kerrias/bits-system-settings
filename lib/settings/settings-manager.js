/**
Copyright 2017 LGS Innovations

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/

(() => {
  'use strict';

  const path = require('path');
  const CrudManager = global.helper.CrudManager;
  const BaseHelperApi = global.helper.BaseHelperApi;
  const SystemSettingsApi = require('./settings-api');
  const SettingsResourceManager = require('./settings-resource-manager');
  const API_FILE_PATH = path.resolve(__dirname, './settings-api.js');

  class SettingsManager extends CrudManager {
    constructor() {
      super(SystemSettingsApi.TAG, {readScopes: ['public'], writeScopes: null});
      this._settingsResourceManager = new SettingsResourceManager(this);
    }

    load(messageCenter) {
      return Promise.resolve()
      .then(() => {
        this._baseHelperApi = new BaseHelperApi(messageCenter);
      })
      .then(() => super.load(messageCenter))
      .then(() => this._settingsResourceManager.load(messageCenter))
      .then(() => this._baseHelperApi.add({name: 'SystemSettingsApi', filepath: API_FILE_PATH}));
    }

    unload() {
      return Promise.resolve()
      .then(() => this._settingsResourceManager.unload())
      .then(() => this.super())
      .then(() => {
        this._baseHelperApi = null;
      });
    }
  }

  module.exports = SettingsManager;
})();
