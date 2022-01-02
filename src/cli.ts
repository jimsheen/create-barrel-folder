#!/usr/bin/env node

import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import createDirAndFiles from './utils/createDirAndFiles';
import { Config } from './types';

const defaultConfig = {
  "fileType": "tsx",
  "typescript": true,
  "barrel": true,
  "scss": false,
  "test": true,
  "story": false,
  type: "rfc"
} as Config

// cli options
const optionDefinitions = [{
  name: 'src',
  type: String,
  multiple: true,
  defaultOption: true
},
{
  name: 'help',
  alias: 'h',
  type: Boolean,
  description: 'Display the usage guide'
},
{
  name: 'proptypes',
  alias: 'p',
  type: Boolean,
  description: 'Create JS file with prop types'
},
{
  name: 'story',
  alias: 's',
  type: Boolean,
  description: 'Create a storybook file'
},
{
  name: 'test',
  alias: 'j',
  type: Boolean,
  description: 'Create a test file'
},
{
  name: 'scss',
  alias: 'c',
  type: Boolean,
  description: 'Create an scss file'
}, {
  name: 'fileType',
  alias: 'f',
  type: String,
  description: 'File type to create (tsx, ts, js, jsx)'
}, {
  name: 'type',
  alias: 't',
  type: String,
  description: 'Type of component to create rfc or hook (default rfc)'
}]

const options = commandLineArgs(optionDefinitions)

// usage help guide
if (options.help) {
  const usage = commandLineUsage([{
    header: 'Create Barrel File',
    content: 'Auto create react files and folder with a barrel file'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
  ])
  console.log(usage)

} else {
  console.log(options)
}

// TODO - pass config file or use a .rc file
const config = {
  ...defaultConfig,
  ...options
}


if (options.src && options.src.length > 0) {
  options.src.forEach((fileName: string) => createDirAndFiles(fileName, config))
}
