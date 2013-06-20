# Versionify

Ensure the version number of a package is always updated.  This keeps track of the version the last time `versionify` was run by adding a `versionify` field to package.json.  If the `versionify` field is less than the `version` field it prompts the user for an updated version.

## Installation

    npm install versionify

## Usage

CLI:

    versionify

API:

```js
versionify(path, function (err) {
  if (err) throw err
})
```

## License

  MIT