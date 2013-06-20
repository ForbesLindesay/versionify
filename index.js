'use strict'

var fs = require('fs')
var join = require('path').join

var semver = require('semver')
var read = require('read')

module.exports = versionify
function versionify(path, callback) {
  var assert = arguments[2]
  var pkg = require(join(path, 'package.json'))
  if (!assert && pkg.version === pkg.versionify) {
    read({prompt: pkg.version + ' is already released, enter a new version: ', timeout: 20000, default: semver.inc(pkg.version, 'patch')},
      function (err, result) {
        if (err) return callback(err)
        if (!semver.valid(result)) return callback(new Error(result + ' is not a valid Semantic Version.'))
        if (!semver.gt(result, pkg.versionify)) return callback(new Error('Semantic Version entered was too low.'))
        pkg.version = result
        fs.writeFile(join(path, 'package.json'), JSON.stringify(pkg, null, '  '), function (err) {
          if (err) return callback(err)
          versionify(path, callback)
        })
      })
  } else {
    if (pkg.versionify && !semver.gt(pkg.version, pkg.versionify)) {
      return callback(new Error('Semantic Version was too low.  It must be higher than the last release.'))
    }
    pkg.versionify = pkg.version
    fs.writeFile(join(path, 'package.json'), JSON.stringify(pkg, null, '  '), callback)
  }
}
module.exports.assert = assert
function assert(path, callback) {
  versionify(path, callback, true)
}