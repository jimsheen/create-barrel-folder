#!/usr/bin/env node

// import fs from 'fs';
// import path from 'path';
// import ejs from 'ejs';
// import { Config } from 'types';

// let defaultConfig = require('./config.json')

// accept cli options

// create a directory

// render files based on options

// render file function - render file based on options

import commandLineArgs from 'command-line-args'

/* first - parse the main command */
const mainDefinitions = [{ name: 'command', defaultOption: true }]
const mainOptions = commandLineArgs(mainDefinitions, {
  stopAtFirstUnknown: true,
})
const argv = mainOptions._unknown || []

console.log('mainOptions\n===========')
console.log(mainOptions)

/* second - parse the merge command options */
if (mainOptions.command === 'merge') {
  const mergeDefinitions = [
    { name: 'squash', type: Boolean },
    { name: 'message', alias: 'm' },
  ]
  const mergeOptions = commandLineArgs(mergeDefinitions, { argv })

  console.log('\nmergeOptions\n============')
  console.log(mergeOptions)
}
