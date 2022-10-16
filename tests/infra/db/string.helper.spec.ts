import * as StringHelper from '@/infra/db/redis/string.helper'
import { mockInvalidJSON, mockValidJSON } from '@/tests/infra/mocks'
describe('StringHelper', () => {
  describe('isValidJSON()', () => {
    test('Should return false if value empty', () => {
      expect(StringHelper.isValidJSON('')).toBe(false)
    })

    test('Should return true', () => {
      expect(StringHelper.isValidJSON('{}')).toBe(true)
    })

    test('Should return true', () => {
      expect(StringHelper.isValidJSON(JSON.stringify(mockValidJSON()))).toBe(true)
    })

    test('Should return false', () => {
      expect(StringHelper.isValidJSON(mockInvalidJSON())).toBe(false)
    })

    test('Should return false', () => {
      expect(StringHelper.isValidJSON(undefined as any)).toBe(false)
    })
  })

  describe('isEmpty()', () => {
    test('Should return false', () => {
      expect(StringHelper.isEmpty('')).toBe(false)
    })

    test('Should return false', () => {
      expect(StringHelper.isEmpty(undefined as any)).toBe(false)
    })

    test('Should return false', () => {
      expect(StringHelper.isEmpty(null as any)).toBe(false)
    })

    test('Should return true', () => {
      expect(StringHelper.isEmpty('y')).toBe(true)
    })
  })

  describe('deserializeJSON()', () => {
    test('Should return value correct', () => {
      const json = mockValidJSON()
      const value = StringHelper.deserializeJSON(JSON.stringify(json))
      expect(value).toEqual(json)
    })

    test('Should return null', () => {
      const value = StringHelper.deserializeJSON(JSON.stringify(null))
      expect(value).toBeNull()
    })

    test('Should return null if isValidJson return false', () => {
      jest.spyOn(StringHelper, 'isValidJSON').mockImplementationOnce(() => false)
      const value = StringHelper.deserializeJSON(JSON.stringify('null'))
      expect(value).toBe(null)
    })

    test('Should return value if isValidJson and isEmpty return false', () => {
      jest.spyOn(StringHelper, 'isValidJSON').mockImplementationOnce(() => false)
      jest.spyOn(StringHelper, 'isEmpty').mockImplementationOnce(() => false)
      const value = StringHelper.deserializeJSON(JSON.stringify('null'))
      expect(value).toContain('null')
    })
  })
})
