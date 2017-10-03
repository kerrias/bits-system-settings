System Settings
===

This BITS module provides helpers to quickly add system settings that allows the user to update the settings in one place.

## Example

``` javascript
return Promise.resolve()
.then(() => {
  const SystemSettingsApi = global.helper.SystemSettingsApi;
  this._systemSettingsApi = new SystemSettingsApi(this._messageCenter);
})
.then(() => this._systemSettingsApi.create({
    element: 'element-name',
    import: '/elements/module/element-name.html'
}))
```
