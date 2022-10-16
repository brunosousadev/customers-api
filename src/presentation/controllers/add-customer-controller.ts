import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { AddCustomer } from '@/domain/usecases'
import { badRequest, created } from '@/presentation/helpers'

export class AddCustomerController implements Controller {
  constructor (
    private readonly addCustomer: AddCustomer,
    private readonly validation: Validation) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { body } = request
    const error = this.validation.validate(body)

    if (error) {
      return badRequest(error)
    }

    const response = await this.addCustomer.add(body)
    return created(response)
  }
}
