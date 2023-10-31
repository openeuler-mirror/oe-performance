import {
  computeMean,
  computeStDiv,
  computeStddev,
  computeGeoMean,
  invalidNumberSymbol
} from '../utils'

describe('test suite of computeMean', function () {
  test('should calculate the mean of an array of numbers', () => {
    const inputArr = [1, 2, 3, 4, 5]
    const expectedMean = 3
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should return invalidNumberSymbol for an empty array', () => {
    const inputArr: number[] = []
    const expectedMean = invalidNumberSymbol
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the mean for an array with a single number', () => {
    const inputArr = [5]
    const expectedMean = 5
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the mean for an array with float numbers', () => {
    const inputArr = [2.5, 3.7, 1.8, 4.2, 2.1]
    const expectedMean = 2.86
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the mean for an array with limitation of Minimum value', () => {
    const inputArr = [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE]
    const expectedMean = Number.MIN_VALUE
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the mean for an array with limitation of maximum value', () => {
    const inputArr = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE]
    const expectedMean = Number.MAX_VALUE
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the mean for an array with limitation of negative infinity value', () => {
    const inputArr = [
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    ]
    const expectedMean = Number.NEGATIVE_INFINITY
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the mean for an array with limitation of positive infinity value', () => {
    const inputArr = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY
    ]
    const expectedMean = Number.POSITIVE_INFINITY
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the mean for an array with limitation of invalid(NaN) value', () => {
    const inputArr = [NaN, NaN, NaN]
    const expectedMean = invalidNumberSymbol
    expect(computeMean(inputArr)).toBe(expectedMean)
  })
})

describe('test suite of computeGeoMean', function () {
  test('should calculate the geometric mean of an array of positive value', () => {
    const inputArr = [2, 4, 8]
    const expectedMean = 4
    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
  test('should return invalidNumberSymbol for an empty array', () => {
    const inputArr: number[] = []
    const expectedMean = invalidNumberSymbol
    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
  test('should ignore negative numbers and calculate the geometric mean', () => {
    // attention, computeGeoMean would filter the negative numbers
    const inputArr = [2, -4, 8, -16]
    const expectedMean = 4
    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
  test('should handle an array with a single negative number', () => {
    const inputArr = [-5]
    const expectedMean = invalidNumberSymbol
    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the geometric mean for an array with float numbers', () => {
    const inputArr = [2.5, 3.7, 1.8, 4.2, 2.1]
    const expectedMean = 2.713
    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the geometric mean for an array with float numbers', () => {
    const inputArr = [123, 321, 456, 654, 789, 987]
    const expectedMean = 457.5
    const result = computeGeoMean(inputArr)
    expect(result).toBe(expectedMean)
  })
  test('should calculate the geometric mean for an array with limitation of Minimum value', () => {
    const inputArr = [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE]
    const expectedMean = Number.MIN_VALUE

    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the geometric mean for an array with limitation of positive infinity value', () => {
    const inputArr = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY
    ]
    const expectedMean = Number.POSITIVE_INFINITY
    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
  test('should calculate the geometric mean for an array with limitation of invalid(NaN) value', () => {
    const inputArr = [NaN, NaN, NaN]
    const expectedMean = invalidNumberSymbol
    expect(computeGeoMean(inputArr)).toBe(expectedMean)
  })
})

describe('test suite of standard division', function () {
  test('should calculate the standard division for an array with some normal value', () => {
    const inputArr = [2, 4, 6, 8, 10]
    const expectedAvg = 6
    const expectedSdDiv = 2.828
    expect(computeMean(inputArr)).toBe(expectedAvg)
    expect(computeStDiv(inputArr)).toBe(expectedSdDiv)
  })
  test('should calculate the standard division for an array with some normal value', () => {
    const inputArr = [123.5, 321.1, 456.9, 654.7, 789.1, 987.6]
    const expectedAvg = 555.483
    const expectedSdDiv = 289.37
    expect(computeMean(inputArr)).toBe(expectedAvg)
    expect(computeStDiv(inputArr)).toBe(expectedSdDiv)
  })
  test('should calculate the standard division for an array with limitation of invalid(NaN) value', () => {
    const inputArr = [NaN, NaN, NaN]
    const expectedMean = invalidNumberSymbol
    const result = computeStDiv(inputArr)
    expect(result).toBe(expectedMean)
  })
  test('should calculate the standard division for an array with limitation of Minimum value', () => {
    const inputArr = [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE]
    const expectedMean = 0
    expect(computeStDiv(inputArr)).toBe(expectedMean)
  })
  test('should calculate the standard division for an array with limitation of maximum value', () => {
    const inputArr = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE]
    const expectedMean = 0 // divided后为0

    expect(computeStDiv(inputArr)).toBe(expectedMean)
  })
  test('should calculate the standard division for an array with limitation of negative infinity value', () => {
    const inputArr = [
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    ]
    const expectedMean = -1
    expect(computeStDiv(inputArr)).toBe(expectedMean)
  })
  test('should calculate the standard division for an array with limitation of positive infinity value', () => {
    const inputArr = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY
    ]
    const expectedMean = Number.NaN
    expect(computeStDiv(inputArr)).toBe(expectedMean)
  })
})

describe('test suite of relation standard division', function () {
  test('should calculate the relation standard division for an array with some normal value', () => {
    const inputArr = [2, 4, 6, 8, 10]
    const expectedStddev = 0.566
    expect(computeStddev(inputArr)).toBe(expectedStddev)
  })

  test('should calculate the relation standard division for an array with some normal value', () => {
    const inputArr = [123.5, 321.1, 456.9, 654.7, 789.1, 987.6]
    const expectedStddev = 48.228
    expect(computeStddev(inputArr)).toBe(expectedStddev)
  })
})
