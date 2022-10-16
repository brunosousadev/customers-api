import { ValidationComposite } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '../mocks'

const field = 'field'

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    jest.spyOn(validationSpies[1], 'validate').mockImplementationOnce(() => new MissingParamError(field))
    const error = sut.validate({ [field]: 'invalid_value' })
    expect(error).toEqual(new MissingParamError(field))
  })
  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()

    jest.spyOn(validationSpies[0], 'validate').mockImplementationOnce(() => new Error())
    jest.spyOn(validationSpies[1], 'validate').mockImplementationOnce(() => new MissingParamError(field))

    const error = sut.validate({ [field]: 'invalid_value' })
    expect(error).toEqual(new Error())
  })
  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: 'value' })
    expect(error).toBeFalsy()
  })
})
