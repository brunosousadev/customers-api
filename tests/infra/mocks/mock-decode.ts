import { Decode } from '@/data/protocols'
import { mockTokenDecoded } from './mock-token'

export const mockDecode = (): Decode => {
  class DecodeSpy implements Decode {
    decode (value: string): string {
      return mockTokenDecoded()
    }
  }

  return new DecodeSpy()
}
