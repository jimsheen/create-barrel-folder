import validateRules, { defaultRequiredMessage } from './validateRules'
import { TRulesType } from '../../types'

describe('validateRules', () => {
  it('should return "Required" if the field is required and no value is provided', () => {
    const rules: TRulesType = {
      required: true,
      tests: [],
    }
    const value = ''
    expect(validateRules(rules, value)).toEqual(defaultRequiredMessage)
  })

  it('should return default error message if the field is required and no value is provided and no message is set', () => {
    const rules: TRulesType = {
      required: { message: '' },
      tests: [],
    }
    const value = ''
    expect(validateRules(rules, value)).toEqual(defaultRequiredMessage)
  })

  it('should return custom error message if the field is required and no value is provided', () => {
    const rules: TRulesType = {
      required: { message: 'Custom error message' },
      tests: [],
    }
    const value = ''
    expect(validateRules(rules, value)).toEqual('Custom error message')
  })

  it('should return an error message if a test fails', () => {
    const rules: TRulesType = {
      required: false,
      tests: [
        {
          validate: (v: string) => v.length < 10,
          message: 'Value is too long',
        },
      ],
    }
    const value = 'Value that is too long'
    expect(validateRules(rules, value)).toEqual('Value is too long')
  })

  it('should return true if all tests pass', () => {
    const rules: TRulesType = {
      required: false,
      tests: [
        {
          validate: (v: string) => v.length < 10,
          message: 'Value is too long',
        },
      ],
    }
    const value = 'short'
    expect(validateRules(rules, value)).toEqual(true)
  })
})
