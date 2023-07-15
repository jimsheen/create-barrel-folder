/**
 * A utility script to update properties in a package.json file.
 *
 * @packageDocumentation
 */

/* eslint-disable */
const fs = require('fs')
const Path = require('path')
const fileName = '../package.json'
const file = require(fileName)
/* eslint-enable *

/**
 * Command line arguments passed when invoking the script.
 * The arguments are expected to be pairs of property and value,
 * that will be used to update the `file`.
 *
 * @example
 * ```
 * // Invoking the script
 * // The command line arguments here are: prop1 value1 prop2 value2
 * node script.js prop1 value1 prop2 value2
 * ```
 *
 * @type {string[]}
 */
const args = process.argv.slice(2)

/**
 * Loop over the command-line arguments.
 * For each pair of arguments, update the property (arg[i]) with the value (arg[i+1]).
 */
for (let i = 0, l = args.length; i < l; i++) {
  if (i % 2 === 0) {
    file[args[i]] = args[i + 1]
  }
}

/**
 * Write the updated JSON back to the file.
 * Log the file name being written to.
 */
fs.writeFile(
  Path.join(__dirname, fileName),
  JSON.stringify(file, null, 2),
  (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('Writing to ' + fileName)
  }
)
