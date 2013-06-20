#!/usr/bin/env node

var versionify = require('../')

if (process.argv.indexOf('--help') != -1 || process.argv.indexOf('-h') != -1) {
  console.log('Check that the verison number has been incremented:')
  console.log()
  console.log('  versionify')
} else {
  versionify(process.cwd(), function (err) {
    if (err) throw err
  })
}