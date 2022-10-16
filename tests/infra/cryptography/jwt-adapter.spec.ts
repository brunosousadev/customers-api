import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain'

jest.mock('jsonwebtoken', () => ({
  decode (): string {
    return 'any_token'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter()
}

describe('Jwt Adapter', () => {
  test('Should call decode with correct values', () => {
    const sut = makeSut()
    const decodeSpy = jest.spyOn(jwt, 'decode')
    sut.decode('value')
    expect(decodeSpy).toHaveBeenCalledWith('value', { complete: true })
  })
  test('Should throw if decode throws', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'decode').mockImplementationOnce(throwError)
    expect(() => sut.decode('value')).toThrow()
  })

  test('Should return null if jwt return null', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'decode').mockImplementationOnce(() => null)
    const response = sut.decode('value')
    expect(response).toBeNull()
  })
})
