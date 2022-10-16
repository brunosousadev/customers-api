import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeIdValidation } from '@/main/factories/infra'

export const makeUpdateCustomerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'document', 'id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(makeIdValidation())
  return new ValidationComposite(validations)
}
