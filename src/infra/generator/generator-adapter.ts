import { v4 } from 'uuid'
import { Generator } from '@/data/protocols'

export class GeneratorAdapter implements Generator {
  async generatorId (): Promise<string> {
    const id = v4()
    return new Promise<string>((resolve) => resolve(id))
  }
}
