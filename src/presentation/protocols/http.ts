export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest = {
  url: string
  headers: {}
  method: string
  params: any
  query: any
  body: any
  token?: any
}
