import { EComponentType, EOptions } from '../constants'

export type TRequired =
  | {
      message: string
    }
  | boolean

export type TRulesTest = {
  validate: (value: string) => boolean
  message?: string
}

export type TRulesType = {
  required?: TRequired
  tests?: TRulesTest[]
}

export type TDefaultConfig = {
  [key in EComponentType]?: {
    [key in EOptions]?: boolean
  } & {
    rules?: TRulesType
  }
}
