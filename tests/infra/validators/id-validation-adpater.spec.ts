import { IdValidatorAdapter } from '@/infra/validators'
import uuid from 'uuid'

jest.mock('uuid', () => ({
  version (): number {
    return 4
  },
  validate (): boolean {
    return true
  }
}))

const uuidVersion: number = 4

const makeut = (): IdValidatorAdapter => {
  return new IdValidatorAdapter(uuidVersion)
}

describe('IdValidatorAdapter', () => {
  test('Should call version and validate with correct value', () => {
    const sut = makeut()
    const validateSpy = jest.spyOn(uuid, 'validate')
    const versionSpy = jest.spyOn(uuid, 'version')

    sut.isValid('id')
    expect(validateSpy).toHaveBeenCalledWith('id')
    expect(versionSpy).toHaveBeenCalledWith('id')
  })

  test('Should return false if validate return false', () => {
    const sut = makeut()
    jest.spyOn(uuid, 'validate').mockImplementationOnce(() => false)

    const isValid = sut.isValid('id')
    expect(isValid).toBe(false)
  })

  test('Should return false if validate return diff 4', () => {
    const sut = makeut()
    jest.spyOn(uuid, 'version').mockImplementationOnce(() => 3)

    const isValid = sut.isValid('id')
    expect(isValid).toBe(false)
  })

  test('Should return true if validate and version return values correct', () => {
    const sut = makeut()
    const isValid = sut.isValid('id')
    expect(isValid).toBe(true)
  })
})
