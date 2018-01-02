(() => {
  'use strict';

  const {ResourceManager} = require('@skidder/bits-auto-discovery');
  const logger = global.LoggerFactory.getLogger();

  class SettingsResourceManager {
    constructor(manager) {
      this._manager = manager;
      this._settingResources = new ResourceManager({topic: 'system-settings'});
      this._settingResources.on('add', this._onAdd.bind(this));
      this._settingResources.on('remove', this._onRemove.bind(this));
      this._resourceIds = new Map();
    }

    _onAdd(res) {
      const uuid = res.getUuid();
      if (this._resourceIds.has(uuid)) {
        logger.warn('System Settings: Adding resource that already exists in resource map');
        return;
      }
      Promise.resolve()
        .then(() => this._manager.create(res.getValue()))
        .then(({id}) => this._resourceIds.set(uuid, id))
        .catch((err) => logger.error('Failed to add system settings resource: %s', err.message));
    }

    _onRemove(res) {
      const uuid = res.getUuid();
      if (!this._resourceIds.has(uuid)) {
        logger.warn('System Settings: Removing resource that does not exist in resource map');
        return;
      }
      Promise.resolve()
        .then(() => this._manager.delete(this._resourceIds.get(uuid)))
        .then(() => this._resourceIds.delete(uuid))
        .catch((err) => logger.error('Failed to remove system settings resource: %s', err.message));
      ;
    }

    load(messageCenter) {
      return Promise.resolve()
        .then(() => this._settingResources.load(messageCenter));
    }

    unload() {
      return Promise.resolve()
        .then(() => this._settingResources.unload());
    }
  }

  module.exports = SettingsResourceManager;
})();
