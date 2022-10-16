import { IsConnectedRepository } from '@/data/protocols'

export class IsConnectedRepositorySpy implements IsConnectedRepository {
  async isConnected (): Promise<boolean> {
    return new Promise<boolean>((resolve) => resolve(true))
  }
}
