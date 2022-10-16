export class AccessDeniedError extends Error {
  constructor (error?: string) {
    super('Access denied')
    this.name = error || 'AccessDeniedError'
  }
}
