import { HttpRequest } from '@/presentation/protocols'

export const checkHeaderToken = (httpRequest: HttpRequest): string | null => {
  const authorization = httpRequest.headers?.['authorization']
  if(!authorization) return null
  const [type, token] = authorization.split(' ')
  if (type !== 'Bearer') return null 
  return token
}