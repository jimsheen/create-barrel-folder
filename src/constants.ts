import { TDefaultConfig } from './types'

export enum EComponentType {
  Component = 'component',
  Hook = 'hook',
}

export const componentTypeOptions = [
  {
    title: 'Component',
    value: EComponentType.Component,
  },
  {
    title: 'Hook',
    value: EComponentType.Hook,
  },
]

export enum EOptions {
  Barrel = 'barrel',
  Story = 'story',
  Test = 'test',
  Styled = 'styled',
}

export const defaultConfig: TDefaultConfig = {
  [EComponentType.Component]: {
    [EOptions.Barrel]: true,
    [EOptions.Story]: true,
    [EOptions.Test]: true,
    [EOptions.Styled]: true,
    rules: {
      required: {
        message: 'Component name is required',
      },
      tests: [
        {
          validate: (value: string) => /^[A-Z]/.test(value),
          message: 'Component name should start with a capital letter',
        },
        {
          validate: (value: string) => value.length >= 3,
          message: 'Component name should be at least 3 characters long',
        },
      ],
    },
  },
  [EComponentType.Hook]: {
    [EOptions.Barrel]: true,
    [EOptions.Test]: true,
    [EOptions.Styled]: false,
    rules: {
      required: {
        message: 'Hook name is required',
      },
      tests: [
        {
          validate: (value: string) => /^use/.test(value),
          message: 'Hook name should start with "use"',
        },
      ],
    },
  },
}

export const componentOptionLabels = {
  [EOptions.Barrel]: 'Barrel',
  [EOptions.Story]: 'Story',
  [EOptions.Test]: 'Test',
  [EOptions.Styled]: 'Styled',
}

export const componentOptions = [
  {
    title: 'Barrel',
    value: EOptions.Barrel,
  },
  {
    title: 'Story',
    value: EOptions.Story,
  },
  {
    title: 'Test',
    value: EOptions.Test,
  },
  {
    title: 'Styled',
    value: EOptions.Styled,
  },
]

export const hookOptions = [
  {
    title: 'Barrel',
    value: EOptions.Barrel,
  },
  {
    title: 'Test',
    value: EOptions.Test,
  },
]
