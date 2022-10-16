import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { UpdateCustomer } from '@/domain/usecases'
import { ok, notFound, badRequest } from '@/presentation/helpers'

export class UpdateCustomerController implements Controller {
  constructor (
    private readonly updateCustomer: UpdateCustomer,
    private readonly validation: Validation) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params
    const body = request.body

    const error = this.validation.validate({ ...body, id })
    if (error) {
      return badRequest(error)
    }

    const response = await this.updateCustomer.update({
      ...body,
      id
    })

    return response ? ok(response) : notFound(`non-existent customer ${id}`)
  }
}
