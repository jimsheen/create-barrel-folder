/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

// define the source package.json path and the destination path
const srcPath = './package.json'
const destPath = './dist/package.json'

// read the source package.json
fs.readFile(srcPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file from disk: ${err}`)
    return
  }

  // parse the JSON file to a JS object
  const packageObj = JSON.parse(data)

  // add/modify the object properties
  packageObj.type = 'module'
  packageObj.module = 'esnext'
  packageObj.bin.cbf = './esm/cli.js'
  packageObj.scripts = {}
  packageObj.dependencies = {}
  packageObj.devDependencies = {}

  // write the updated JSON back to the new package.json file in the destination directory
  fs.writeFile(destPath, JSON.stringify(packageObj, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file to disk: ${err}`)
    } else {
      console.log(
        `package.json has been copied to ${destPath} with modifications.`
      )
    }
  })
})
