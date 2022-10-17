import { AuthMiddleware } from '@/presentation/middlewares'
import { badGateway, ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { VerifyToken } from '@/data/protocols'
import { mockHttpRequest } from '@/tests/presentation/middlewares/mocks'
import { mockVerifyToken } from '@/tests/data/mock'
import * as HeaderHelper from '@/presentation/middlewares/header-helper'

type SutTypes = {
  sut: AuthMiddleware
  verifyTokenSpy: VerifyToken
}

const makeSut = (): SutTypes => {
  const verifyTokenSpy = mockVerifyToken()
  const sut = new AuthMiddleware(verifyTokenSpy)

  return {
    sut,
    verifyTokenSpy
  }
}

describe('Auth Middleware', () => {
  test('Should call checkHeaderToken with correct values', async () => {
    const { sut } = makeSut()
    const checkHeaderTokenSpy = jest.spyOn(HeaderHelper, 'checkHeaderToken')
    await sut.handle({} as any)
    expect(checkHeaderTokenSpy).toHaveBeenCalledWith({})
  })

  test('Should return 401 if checkHeaderToken return null', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({} as any)
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })
  test('Should call VerifyToken with correct values', async () => {
    const { sut, verifyTokenSpy } = makeSut()
    const verifyTokenMethodSpy = jest.spyOn(verifyTokenSpy, 'verifyToken')
    await sut.handle(mockHttpRequest())
    expect(verifyTokenMethodSpy).toHaveBeenCalledWith('value')
  })

  test('Should return 200 if VerifyToken return true', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok())
  })

  test('Should return unauthorized if VerifyToken throw', async () => {
    const { sut, verifyTokenSpy } = makeSut()
    jest.spyOn(verifyTokenSpy, 'verifyToken').mockRejectedValue({ status: 401 })
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should return unauthorized if VerifyToken throw', async () => {
    const { sut, verifyTokenSpy } = makeSut()
    jest.spyOn(verifyTokenSpy, 'verifyToken').mockRejectedValue({ status: 403 })
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should return badGateway if VerifyToken throw', async () => {
    const { sut, verifyTokenSpy } = makeSut()
    jest.spyOn(verifyTokenSpy, 'verifyToken').mockRejectedValue({ status: 502 })
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(badGateway())
  })

  test('Should return serverError if VerifyToken throw', async () => {
    const { sut, verifyTokenSpy } = makeSut()
    const mockErrro = new Error('err')
    jest.spyOn(verifyTokenSpy, 'verifyToken').mockRejectedValue(mockErrro)
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(serverError(mockErrro))
  })
})
