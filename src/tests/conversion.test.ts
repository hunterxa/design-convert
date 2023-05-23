import { expect, test } from 'vitest'
import { convertPxToRem, convertRemToPx, roundToTwoDecimals } from '../utils/conversion'

test('convertPxToRem', () => {
  expect(convertPxToRem(16, 16)).toBe(1)
  expect(convertPxToRem(16, 32)).toBe(2)
  expect(convertPxToRem(16, 8)).toBe(0.5)
})

test('convertRemToPx', () => {
  expect(convertRemToPx(16, 1)).toBe(16)
  expect(convertRemToPx(16, 2)).toBe(32)
  expect(convertRemToPx(16, 0.5)).toBe(8)
})

test('roundToTwoDecimals', () => {
  expect(roundToTwoDecimals(1.234)).toBe(1.23)
  expect(roundToTwoDecimals(1.235)).toBe(1.24)
  expect(roundToTwoDecimals(1.2)).toBe(1.2)
  expect(roundToTwoDecimals(8)).toBe(8)
})