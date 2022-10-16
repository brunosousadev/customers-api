import { Customer } from '@/domain/models/customer'

export interface UpdateCustomer {
  update: (customer: UpdateCustomer.Params) => Promise<UpdateCustomer.Result>
}

export namespace UpdateCustomer {
  export type Params = Customer
  export type Result = Customer | null
}
