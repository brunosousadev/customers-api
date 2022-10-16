import { GeneratorAdapter } from '@/infra/generator/generator-adapter'
import { throwError } from '@/tests/domain'
import uuid from 'uuid'

jest.mock('uuid', () => ({
  v4 (): string {
    return 'uuid'
  }
}))

const makeSut = (): GeneratorAdapter => {
  return new GeneratorAdapter()
}

describe('Uuid Adapter', () => {
  test('Should return a valid uuid on generatorId succes', async () => {
    const sut = makeSut()
    const response = await sut.generatorId()
    expect(response).toBe('uuid')
  })

  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(uuid, 'v4').mockImplementationOnce(throwError)
    const promise = sut.generatorId()
    await expect(promise).rejects.toThrow()
  })
})
