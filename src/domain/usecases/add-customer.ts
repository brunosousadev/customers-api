import { Customer } from '@/domain/models/customer'

export interface AddCustomer {
  add: (customer: AddCustomer.Params) => Promise<AddCustomer.Result>
}

export namespace AddCustomer {
  export type Params = Omit<Customer, 'id'>
  export type Result = Customer
}
