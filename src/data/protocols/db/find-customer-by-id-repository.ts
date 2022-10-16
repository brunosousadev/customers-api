import { FindCustomerById } from 'domain/usecases'

export interface FindCustomerByIdRepository {
  findById: (id: string) => Promise<FindCustomerByIdRepository.Result>
}

export namespace FindCustomerByIdRepository {
  export type Result = FindCustomerById.Result
}
