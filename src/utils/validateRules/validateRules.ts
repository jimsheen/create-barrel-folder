import { TRulesType } from '../../types'

export const defaultRequiredMessage = 'Required'
export const defaultErrorMessage = 'Invalid value'

const validateRules = (rules: TRulesType, value: string): string | boolean => {
  const { required, tests } = rules

  // if required and no value, return error message
  if (required && !value) {
    return required === true || !required.message
      ? defaultRequiredMessage
      : required.message
  }

  // if rules exist and is array, loop through each rule
  // if rules exist and is array, loop through each rule
  if (tests && Array.isArray(tests)) {
    const failedTest = tests.find(({ validate }) => !validate(value))
    return failedTest ? failedTest?.message || defaultErrorMessage : true
  }

  // if no rules or all rules pass, return true
  return true
}

export default validateRules
