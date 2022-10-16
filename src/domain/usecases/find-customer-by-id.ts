import { Customer } from '@/domain/models/customer'

export interface FindCustomerById {
  findCustomerById: (customerId: string) => Promise<FindCustomerById.Result>
}

export namespace FindCustomerById {
  export type Result = Customer | null
}
