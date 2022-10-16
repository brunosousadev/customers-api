export class Exception extends Error {
  status: number
  body: any
  constructor (status: number, body: any) {
    super()
    this.status = status
    this.body = body
  }
}
