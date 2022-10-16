import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { makeIdValidation } from '@/main/factories/infra'

export const makeGetCustomerByIdValidation = (): ValidationComposite => {
  const idValidation = makeIdValidation()
  return new ValidationComposite([new RequiredFieldValidation('id'), idValidation])
}
