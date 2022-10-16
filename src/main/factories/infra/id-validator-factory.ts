import { IdValidation } from '@/validation/validators'
import { IdValidatorAdapter } from '@/infra/validators'

export const makeIdValidation = (): IdValidation => {
  return new IdValidation('id', new IdValidatorAdapter(4))
}
