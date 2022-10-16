import { IsConnectedRepository } from '@/data/protocols'
import { CheckCacheDecorator } from '@/presentation/decorators'
import { throwError } from '@/tests/domain'
import { IsConnectedRepositorySpy } from '@/tests/infra/mocks'
import { ControllerSpy } from '@/tests/presentation/mocks'
import { ok, badGateway } from '@/presentation/helpers'

const mockHttpRequest = (): any => ({})

type SutTypes = {
  sut: CheckCacheDecorator
  controllerSpy: ControllerSpy
  checkCacheSpy: IsConnectedRepository
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const checkCacheSpy = new IsConnectedRepositorySpy()
  const sut = new CheckCacheDecorator(checkCacheSpy, controllerSpy)
  return {
    sut,
    checkCacheSpy,
    controllerSpy
  }
}

describe('CheckCacheDecorator', () => {
  test('Should call IsConnectedRepository isConnected', async () => {
    const { sut, checkCacheSpy } = makeSut()
    const isConnectedSpy = jest.spyOn(checkCacheSpy, 'isConnected')
    await sut.handle(mockHttpRequest())
    expect(isConnectedSpy).toBeCalledWith()
  })

  test('Should return badGateway if IsConnectedRepository isConnected return false', async () => {
    const { sut, checkCacheSpy } = makeSut()
    jest.spyOn(checkCacheSpy, 'isConnected').mockResolvedValue(false)
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(badGateway('cache unavailable'))
  })

  test('Should throw if IsConnectedRepository throws', async () => {
    const { sut, checkCacheSpy } = makeSut()
    jest.spyOn(checkCacheSpy, 'isConnected').mockImplementationOnce(throwError)
    const promise = sut.handle(mockHttpRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Controller handle with correct values', async () => {
    const { sut, controllerSpy } = makeSut()
    const handleSpy = jest.spyOn(controllerSpy, 'handle')

    await sut.handle(mockHttpRequest())

    expect(handleSpy).toHaveBeenCalledWith({})
  })

  test('Should throw if Controller throws', async () => {
    const { sut, controllerSpy } = makeSut()
    jest.spyOn(controllerSpy, 'handle').mockImplementationOnce(throwError)
    const promise = sut.handle(mockHttpRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return controller return correct', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(ok())
  })
})
