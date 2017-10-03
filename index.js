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

  const SettingManager = require('./lib/settings/settings-manager');

  class ModuleApi {
    constructor() {
      this._settingManager = new SettingManager();
    }

    load(messageCenter) {
      return this._settingManager.load(messageCenter);
    }

    unload() {
      return Promise.resolve()
      .then(() => this._settingManager.unload());
    }
  }

  module.exports = new ModuleApi();
})();
