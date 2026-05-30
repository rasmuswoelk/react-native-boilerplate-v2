import { getBorderRadiusFromPath, getColorFromPath } from '../colorTypes'
import { borderRadius } from '@/lib/theme/variables/borderRadius'

const colors = {
  white: '#fff',
  background: '#ffffff',
  gray: { 200: '#e0e0e0', 500: '#757575' },
  brand: { 600: '#0284c7' },
}

describe('getColorFromPath', () => {
  it('returns a top-level color string', () => {
    expect(getColorFromPath(colors, 'background')).toBe('#ffffff')
  })

  it('resolves a dot-separated nested path', () => {
    expect(getColorFromPath(colors, 'gray.200')).toBe('#e0e0e0')
  })

  it('resolves a deeply nested path', () => {
    expect(getColorFromPath(colors, 'brand.600')).toBe('#0284c7')
  })

  it('throws when the top-level key does not exist', () => {
    expect(() => getColorFromPath(colors, 'nonexistent')).toThrow(
      'Color path "nonexistent" not found in theme colors'
    )
  })

  it('throws when the path resolves to an object, not a string', () => {
    expect(() => getColorFromPath(colors, 'gray')).toThrow(
      'Color path "gray" does not resolve to a color string'
    )
  })

  it('throws when a nested key does not exist', () => {
    expect(() => getColorFromPath(colors, 'gray.999')).toThrow(
      'Color path "gray.999" not found in theme colors'
    )
  })
})

describe('getBorderRadiusFromPath', () => {
  it('returns the numeric value for xs', () => {
    expect(getBorderRadiusFromPath(borderRadius, 'xs')).toBe(4)
  })

  it('returns the numeric value for md', () => {
    expect(getBorderRadiusFromPath(borderRadius, 'md')).toBe(16)
  })

  it('returns the numeric value for xl', () => {
    expect(getBorderRadiusFromPath(borderRadius, 'xl')).toBe(32)
  })
})
