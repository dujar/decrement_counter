import { validateArg } from '../main'
import moment from 'moment'

describe('validate Arg function', () => {
  const errorMessage = 'counter needs to be an integer > 0'
  test('check argument is integer', () => {
    expect(validateArg('3')).toBe(3)
  })
  test('check error message if no arg', () => {
    try {
      expect(validateArg('')).toThrow(errorMessage)
    } catch (e) {
      expect(e).toBe(errorMessage)
    }
  })
  test('check error message if arg 0', () => {
    try {
      expect(validateArg('')).toThrow(errorMessage)
    } catch (e) {
      expect(e).toBe(errorMessage)
    }
  })
  test('check error message if arg hello', () => {
    try {
      expect(validateArg('hello')).toThrow(errorMessage)
    } catch (e) {
      expect(e).toBe(errorMessage)
    }
  })

  test('check error message if arg decimal', () => {
    try {
      expect(validateArg('3.4')).toThrow(errorMessage)
    } catch (e) {
      expect(e).toBe(errorMessage)
    }
  })
  test('check error message if arg is random', () => {
    try {
      expect(validateArg('3.hadf')).toThrow(errorMessage)
    } catch (e) {
      expect(e).toBe(errorMessage)
    }
  })
  test('check moment dates to be dispatched', () => {
    const nowUtc = moment.utc()
    const now = moment()
    console.log('now: ', now.toString())
    console.log('now utc: ', nowUtc.toString())
    console.log('now transformed:', nowUtc.local().toString())

    const nowUTCString = nowUtc.toString()

    // warning but works
    console.log(
      'converted from string: ',
      moment(nowUTCString).local().toString(),
    )
  })

  test('substract moment:', () => {
    let nowUtc = moment.utc()
    console.log('before', nowUtc.toString())
    nowUtc = nowUtc.subtract(123123123, 'seconds')
    console.log('after', nowUtc.toString())
    nowUtc = nowUtc.subtract(123123123, 'seconds')
    console.log('after 2', nowUtc.toString())
  })

  test('substract moment:', () => {
    let nowUtc = moment.utc()
    console.log('before', nowUtc.toString())
    nowUtc = nowUtc.subtract(5000000000000, 'seconds')
    console.log('after', nowUtc.toString())

  })
})
