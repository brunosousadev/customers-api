import { Generator } from '@/data/protocols'

export class GeneratorSpy implements Generator {
  async generatorId (): Promise<string> {
    return new Promise<string>((resolve) => resolve(''))
  }
}
