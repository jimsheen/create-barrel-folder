#!/usr/bin/env node

import { QuestionCollection } from 'inquirer'

enum EComponentType {
  Component = 'Component',
  Hook = 'Hook',
}

enum EOptions {
  Barrel = 'Barrel',
  Story = 'Story',
  Test = 'Test',
  Styled = 'Styled',
}

const componentPrompt: QuestionCollection = {
  type: 'list',
  name: 'componentType',
  message: 'What type of file do you want to create?',
  choices: [EComponentType.Component, EComponentType.Hook],
  default: [EComponentType.Component], // TODO - add default to config
}

const namePromptMessage = (componentType: EComponentType) => {
  const message = `What is the name of the ${componentType}?`

  if (componentType === EComponentType.Component) {
    return message + ' (e.g. Button)'
  }

  return message + ' (e.g. useButton)'
}
const namePromptFn = (componentType: EComponentType): QuestionCollection => ({
  type: 'input',
  name: 'name',
  message: namePromptMessage(componentType),
})

const barrelComponentPrompt: QuestionCollection = {
  type: 'checkbox',
  name: 'options',
  message: 'What files do you want to include?',
  choices: Object.values(EOptions),
  default: Object.values(EOptions), // TODO - add default to config
}

async function loadModule() {
  const inquirer = (await import('inquirer')).default

  // Component type
  let componentResponse = null

  try {
    componentResponse = await inquirer.prompt([componentPrompt])
  } catch {
    console.log('error')
  }

  if (!componentResponse) {
    console.log('No response')
    return
  }

  // Name
  const namePrompt = namePromptFn(componentResponse.componentType)

  let nameResponse = null

  try {
    nameResponse = await inquirer.prompt([namePrompt])
  } catch {
    console.log('Error')
  }

  if (!nameResponse || !nameResponse.name) {
    console.error('Error: Name is required!')
    return
  }

  // Options
  if (componentResponse?.componentType.includes(EComponentType.Component)) {
    let barrelResponse = null

    try {
      barrelResponse = await inquirer.prompt([barrelComponentPrompt])
    } catch {
      console.log('Error')
    }

    if (!barrelResponse) {
      console.log('No response')
      return
    }

    const { options } = barrelResponse

    console.log('componentResponse :>> ', componentResponse)
    console.log('nameResponse :>> ', nameResponse)
    console.log('options :>> ', options)

    // TODO - use these options to create the files
  }
}

loadModule()
