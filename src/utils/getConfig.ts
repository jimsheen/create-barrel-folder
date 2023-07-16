import { rcFile } from 'rc-config-loader'
import merge from 'merge-deep'

import { defaultConfig } from '../constants'

function loadRcFile(rcFileName: string) {
  try {
    const results = rcFile(rcFileName)
    // Not Found
    if (!results) {
      return {}
    }
    return results.config
  } catch (error) {
    // Found it, but it is parsing error
    return {} // default value
  }
}

const ggcbfConfig = loadRcFile('ggcbf')

const config = merge(defaultConfig, ggcbfConfig)

export default config
