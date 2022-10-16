import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { FindCustomerById } from '@/domain/usecases'
import { ok, notFound, badRequest } from '@/presentation/helpers'

export class GetCustomerByIdController implements Controller {
  constructor (
    private readonly findCustomerById: FindCustomerById,
    private readonly validation: Validation) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params

    const error = this.validation.validate({ id })
    if (error) {
      return badRequest(error)
    }
    const response = await this.findCustomerById.findCustomerById(id)

    return response ? ok(response) : notFound(`non-existent customer ${id}`)
  }
}
