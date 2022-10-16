export const isValidJSON = (value: string): boolean => {
  if (typeof value !== 'string') return false
  try {
    JSON.parse(value)
  } catch (error) {
    return false
  }
  return true
}

export const isEmpty = (value: string): boolean => {
  // eslint-disable-next-line eqeqeq
  return !(value == '' || value === null || value === undefined)
}

export const deserializeJSON = <Result = Record<string, any>>(value: string): Result =>
  isValidJSON(value)
    ? JSON.parse(value)
    : (isEmpty(value) || ['null', 'undefined'].includes(value) ? null : value)
