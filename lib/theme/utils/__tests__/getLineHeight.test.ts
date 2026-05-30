jest.mock('react-native')

import { getLineHeight } from '../getLineHeight'

describe('getLineHeight', () => {
  it('multiplies fontSize by lineHeight and rounds to nearest pixel', () => {
    // 16 × 1.2 = 19.2 → Math.round → 19
    expect(getLineHeight(16, 1.2)).toBe(19)
  })

  it('returns an integer result when multiplication is already whole', () => {
    // 20 × 1.5 = 30 → Math.round → 30
    expect(getLineHeight(20, 1.5)).toBe(30)
  })

  it('rounds down below 0.5', () => {
    // 14 × 1.1 = 15.4 → Math.round → 15
    expect(getLineHeight(14, 1.1)).toBe(15)
  })

  it('rounds up at or above 0.5', () => {
    // 10 × 1.35 = 13.5 → Math.round → 14
    expect(getLineHeight(10, 1.35)).toBe(14)
  })
})
