import { IdValidator } from '@/validation/protocols'
import { version as uuidVersion, validate as uuidValidate } from 'uuid'

export class IdValidatorAdapter implements IdValidator {
  constructor (private readonly uuidVersion: number) {}

  isValid (id: string): boolean {
    return uuidValidate(id) && uuidVersion(id) === this.uuidVersion
  }
}
