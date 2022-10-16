import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'

export class ControllerSpy implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve) => resolve(ok()))
  }
}
