import { IdValidator } from '@/validation/protocols'

export class IdValidatorSpy implements IdValidator {
  isValid (id: string): boolean {
    return true
  }
}
