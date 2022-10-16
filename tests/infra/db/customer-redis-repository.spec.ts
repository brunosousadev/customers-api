import { CustomerRedisRepository } from '@/infra/db'
import { mockValidJSON } from '@/tests/infra/mocks'
import * as StringHelper from '@/infra/db/redis/string.helper'
import { mockRedis, GeneratorSpy } from '../mocks'
import { Generator } from '@/data/protocols'
import { mockAddCustomerParams, mockUpdateCustomerParams, throwError } from '@/tests/domain'

interface SutTypes {
  sut: CustomerRedisRepository
  cacheSpy: any
  generate: Generator
  prefix: string
}

const makeSut = (): SutTypes => {
  const cacheSpy = mockRedis
  const generate = new GeneratorSpy()
  const prefix = 'prefix'
  const sut = new CustomerRedisRepository(cacheSpy, generate, prefix)

  return {
    sut,
    cacheSpy,
    generate,
    prefix
  }
}

describe('CustomerRedisRepository', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    mockRedis.del.mockRestore()
  })

  describe('isConnected()', () => {
    test('Should return true if Redis.ping returns a value', async () => {
      const { sut } = makeSut()
      mockRedis.ping.mockResolvedValueOnce('any_value')

      const result = await sut.isConnected()

      expect(result).toBe(true)
    })

    test('Should return false if Redis.ping returns undefined', async () => {
      const { sut } = makeSut()
      mockRedis.ping.mockResolvedValueOnce(undefined as any)

      const result = await sut.isConnected()

      expect(result).toBe(false)
    })

    test('Should return false if Redis.ping throws', async () => {
      const { sut } = makeSut()
      mockRedis.ping.mockRejectedValue(Error('oxi'))

      const result = await sut.isConnected()

      expect(result).toBe(false)
    })
  })

  describe('add()', () => {
    test('Should call generatorId correct', async () => {
      const { sut, generate } = makeSut()

      const generatorId = jest.spyOn(generate, 'generatorId')

      await sut.add(mockAddCustomerParams())

      expect(generatorId).toHaveBeenCalled()
    })
    test('Should call set with correct values', async () => {
      const { sut, generate, prefix } = makeSut()
      const payload = {
        ...mockAddCustomerParams(),
        id: 'id'
      }

      jest.spyOn(generate, 'generatorId').mockImplementationOnce(async () => Promise.resolve(payload.id))

      await sut.add(payload)

      expect(mockRedis.set).toHaveBeenCalledWith(`${prefix}:id`, JSON.stringify(payload))
    })
    test('Should throws if Redis.set throws', async () => {
      const { sut } = makeSut()
      mockRedis.set.mockImplementationOnce(throwError)
      const promise = sut.add(mockAddCustomerParams())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('findById()', () => {
    test('Should call get with correct values', async () => {
      const { sut, prefix } = makeSut()
      await sut.findById('id')
      expect(mockRedis.get).toHaveBeenCalledWith(`${prefix}:id`)
    })

    test('Should call deserializeJSON whith correct values', async () => {
      const { sut } = makeSut()
      const payload = mockValidJSON()
      mockRedis.get.mockResolvedValueOnce(payload)

      const deserializeJSONSpy = jest.spyOn(StringHelper, 'deserializeJSON')
      await sut.findById('id')
      expect(deserializeJSONSpy).toHaveBeenCalledWith(payload)
    })

    test('Should return null if Redis.get return null', async () => {
      const { sut } = makeSut()
      mockRedis.get.mockResolvedValueOnce(null)

      const response = await sut.findById('id')
      expect(response).toBeNull()
    })

    test('Should throws if Redis.get throws', async () => {
      const { sut } = makeSut()
      mockRedis.get.mockImplementationOnce(throwError)
      const promise = sut.findById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('update()', () => {
    test('Should call set with correct values', async () => {
      const { sut, prefix } = makeSut()
      const payload = mockUpdateCustomerParams()

      await sut.update(payload)

      expect(mockRedis.set).toHaveBeenCalledWith(`${prefix}:id`, JSON.stringify(payload))
    })

    test('Should throws if Redis.set throws', async () => {
      const { sut } = makeSut()
      mockRedis.set.mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateCustomerParams())
      await expect(promise).rejects.toThrow()
    })
  })
})
