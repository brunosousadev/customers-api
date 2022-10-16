import { IsConnectedRepository } from '@/data/protocols'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { badGateway } from '@/presentation/helpers'

export class CheckCacheDecorator implements Controller {
  constructor (private readonly checkCache: IsConnectedRepository, private readonly controller: Controller) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const isConnected = await this.checkCache.isConnected()
    if (!isConnected) {
      return badGateway('cache unavailable')
    }
    return this.controller.handle(request)
  }
}
