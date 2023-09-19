import { computeGeoMean, computeMean, invalidNumberSymbol } from '../utils'

describe('test suite of computeMean', () => {
  test('should calculate the mean of an array of numbers', () => {
    const inputArr = [1, 2, 3, 4, 5]
    const expectedMean = 3
    expect(computeMean(inputArr)).toBe(expectedMean)
  })

  test('should return invalidNumberSymbol for an empty array', () => {
    const inputArr: number[] = []
    const expectedMean = invalidNumberSymbol

    const result = computeMean(inputArr)

    expect(result).toBe(expectedMean)
  })

  test('should calculate the mean for an array with a single number', () => {
    const inputArr = [5]
    const expectedMean = 5

    const result = computeMean(inputArr)

    expect(result).toBe(expectedMean)
  })
})

describe('test suite of computeGeoMean', () => {
  test('should calculate the geometric mean of an array of positive numbers', () => {
    const inputArr = [2, 4, 8]
    const expectedMean = 4

    const result = computeGeoMean(inputArr)

    expect(result).toBe(expectedMean)
  })

  test('should return invalidNumberSymbol for an empty array', () => {
    const inputArr: number[] = []
    const expectedMean = invalidNumberSymbol

    const result = computeGeoMean(inputArr)

    expect(result).toBe(expectedMean)
  })

  test('should ignore negative numbers and calculate the geometric mean', () => {
    const inputArr = [2, -4, 8, -16]
    const expectedMean = 4

    const result = computeGeoMean(inputArr)

    expect(result).toBe(expectedMean)
  })

  test('should handle an array with a single negative number', () => {
    const inputArr = [-5]
    const expectedMean = invalidNumberSymbol

    const result = computeGeoMean(inputArr)

    expect(result).toBe(expectedMean)
  })
})
