#!/usr/bin/env node
import prompts from 'prompts'
import { color } from 'console-log-colors'

import { EComponentType, fileOptions } from './constants'
import createFiles from './utils/createFiles'

const componentOptions = Object.values(EComponentType).map((value) => ({
  title: value,
  value,
}))

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
    console.log(color.cyan.bgRed.bold.underline('Aborted'))
    process.exit(0)
  }
}

;(async () => {
  // get component type
  const componentResponse = await prompts([
    {
      type: 'select',
      name: 'componentType',
      message: 'Pick a component type',
      choices: componentOptions,
      initial: 0,
      onState: handleAbort,
    },
  ])

  const { componentType } = componentResponse

  // get component name
  const { componentName } = await prompts([
    {
      type: 'text',
      name: 'componentName',
      message: namePromptMessage(componentType),
      validate: (value: string) => (value ? true : 'Name is required'),
      onState: handleAbort,
    },
  ])

  // get file options
  const { options } = await prompts([
    {
      type: 'multiselect',
      name: 'options',
      message: 'Pick files to include',
      choices: Object.entries(fileOptions).map(([title, value]) => ({
        title,
        value,
        selected: true,
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
})()
