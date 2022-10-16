import { Generator } from '@/data/protocols'
import { GeneratorAdapter } from '@/infra/generator/generator-adapter'

export const makeGenerator = (): Generator => {
  return new GeneratorAdapter()
}
