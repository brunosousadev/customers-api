/* eslint-disable node/no-callback-literal */
import { Readable } from 'stream'

export const mockRedis: any = {
  keys: jest.fn(async (pattern: string) => []),
  get: jest.fn(async (key: string) => ''),
  set: jest.fn(async (key: string, data: string) => undefined),
  del: jest.fn(async (key: string) => undefined),
  ping: jest.fn(async () => 'pong'),
  exists: jest.fn(async (key: string) => 0),
  expire: jest.fn(async (key: string, time: number) => undefined),
  publish: jest.fn(async (channel: string, message: string) => undefined),
  subscribe: jest.fn((arg1: any, callback: (error: Error, count: number) => void) => {
    callback(null as any, 1)
  }) as any,
  on: jest.fn((eventName: string, callback: (channel: string, message: string) => void): any => {
    callback('a', 'b')
  }),
  scanStream: jest.fn((options) => {
    const readableStream = new Readable({
      read (size) {
        this.push(null)
      }
    })

    return readableStream
  })
}
