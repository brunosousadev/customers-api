import { AddCustomer } from 'domain/usecases'

export interface AddCustomerRepository {
  add: (data: AddCustomerRepository.Params) => Promise<AddCustomerRepository.Result>
}

export namespace AddCustomerRepository {
  export type Params = AddCustomer.Params
  export type Result = AddCustomer.Result
}
