import { UpdateCustomer } from 'domain/usecases'

export interface UpdateCustomerRepository {
  update: (data: UpdateCustomerRepository.Params) => Promise<UpdateCustomerRepository.Result>
}

export namespace UpdateCustomerRepository {
  export type Params = UpdateCustomer.Params
  export type Result = UpdateCustomer.Result
}
