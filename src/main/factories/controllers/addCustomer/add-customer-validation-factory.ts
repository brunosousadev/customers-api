import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeAddCustomerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'document']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
