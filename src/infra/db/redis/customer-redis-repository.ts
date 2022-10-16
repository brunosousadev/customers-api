import Redis from 'ioredis'
import { AddCustomerRepository, FindCustomerByIdRepository, UpdateCustomerRepository, IsConnectedRepository } from '@/data/protocols/db'
import { Generator } from '@/data/protocols'
import { deserializeJSON } from './string.helper'

export class CustomerRedisRepository implements AddCustomerRepository, FindCustomerByIdRepository, UpdateCustomerRepository, IsConnectedRepository {
  constructor (
    private readonly redisClient: Redis,
    private readonly generator: Generator,
    private readonly prefix: string) {
    console.log('Redis Client started')
  }

  async add (data: AddCustomerRepository.Params): Promise<AddCustomerRepository.Result> {
    const key = await this.generator.generatorId()
    const payload = { ...data, id: key }

    await this.redisClient.set(`${this.prefix}:${key}`, JSON.stringify(payload))
    return payload
  }

  async findById (id: string): Promise<FindCustomerByIdRepository.Result> {
    const response = await this.redisClient.get(`${this.prefix}:${id}`)

    return response ? deserializeJSON<FindCustomerByIdRepository.Result>(response) : null
  }

  async update (data: UpdateCustomerRepository.Params): Promise<UpdateCustomerRepository.Result> {
    await this.redisClient.set(`${this.prefix}:${data.id}`, JSON.stringify(data))
    return data
  }

  async isConnected (): Promise<boolean> {
    try {
      const pong = await this.redisClient?.ping()
      return !!pong?.length
    } catch (error) {
      return false
    }
  }
}
