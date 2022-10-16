import { IdValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { IdValidatorSpy } from '../mocks'
import { throwError } from '@/tests/domain'

const field = 'field'

type SutTypes = {
  sut: IdValidation
  idValidatorSpy: IdValidatorSpy
}

const makeSut = (): SutTypes => {
  const idValidatorSpy = new IdValidatorSpy()
  const sut = new IdValidation(field, idValidatorSpy)
  return {
    sut,
    idValidatorSpy
  }
}

describe('Id Validation', () => {
  test('Should return an error if idValidator returns false', () => {
    const { sut, idValidatorSpy } = makeSut()
    jest.spyOn(idValidatorSpy, 'isValid').mockImplementationOnce(() => false)
    const error = sut.validate({ [field]: 'id' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call IdValidator with correct email', () => {
    const { sut, idValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(idValidatorSpy, 'isValid')

    sut.validate({ [field]: 'id' })

    expect(isValidSpy).toBeCalledWith('id')
  })

  test('Should throw if IdValidator throws', () => {
    const { sut, idValidatorSpy } = makeSut()
    jest.spyOn(idValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
