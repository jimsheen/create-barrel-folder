import { color } from 'console-log-colors'
import prompts from 'prompts'
import rc from 'rc'

import {
  componentTypeOptions,
  EComponentType,
  defaultConfig,
  componentOptions,
  hookOptions,
} from './constants'
import createFiles from './utils/createFiles/createFiles'
import validateRules from './utils/validateRules'

const namePromptMessage = (componentType: EComponentType): string => {
  let message = `Give the ${componentType} a name`
  if (componentType === EComponentType.Component) {
    message += ' e.g. Button'
  } else {
    message += ' e.g. useButton'
  }
  // required
  return message + ' (required)'
}

// handle abort event from prompts
const handleAbort = ({ aborted }: { aborted: boolean }): void => {
  if (aborted) {
    console.error(color.cyan.bgRed.bold.underline('Aborted'))
    process.exit(0)
  }
}

// merge default config with rc config
const config = rc('ggcbf', defaultConfig)

const start = async () => {
  // get component type
  const { componentType } = (await prompts([
    {
      type: 'select',
      name: 'componentType',
      message: 'Pick a component type',
      choices: componentTypeOptions,
      initial: 0,
      onState: handleAbort,
    },
  ])) as { componentType: EComponentType }

  if (!componentType) {
    console.error(color.cyan.bgRed.bold.underline('Aborted'))
    process.exit(0)
  }

  // get rules
  const rules = config[componentType]?.rules || {}

  // get component name
  const { componentName } = await prompts([
    {
      type: 'text',
      name: 'componentName',
      message: namePromptMessage(componentType),
      validate: (value: string) => validateRules(rules, value),
      onState: handleAbort,
    },
  ])

  const fileOptions =
    componentType === EComponentType.Component ? componentOptions : hookOptions

  // get file options
  const { options } = await prompts([
    {
      type: 'multiselect',
      name: 'options',
      message: 'Pick files to include',
      choices: fileOptions.map((option) => ({
        ...option,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        selected: config[componentType][option.value],
      })),
      onState: handleAbort,
    },
  ])

  // create files
  await createFiles({
    componentName,
    componentType,
    options,
  })
}

export default start
