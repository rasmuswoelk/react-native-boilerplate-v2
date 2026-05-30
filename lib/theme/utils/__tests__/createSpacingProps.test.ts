jest.mock('react-native')
jest.mock('react-native-unistyles')

import {
  createSpacingStyles,
  getSpacingPropertiesByComponentProps,
  omitSpacingProps,
} from '../createSpacingProps'
import { spacing } from '@/lib/theme/variables/spacing'

describe('createSpacingStyles', () => {
  it('converts a single spacing key to its pixel value', () => {
    expect(createSpacingStyles({ margin: 'md' }, spacing)).toEqual({ margin: 16 })
  })

  it('converts multiple spacing keys in one call', () => {
    expect(
      createSpacingStyles({ padding: 'lg', marginTop: 'sm' }, spacing)
    ).toEqual({ padding: 24, marginTop: 8 })
  })

  it('ignores keys not present in the spacing scale', () => {
    expect(createSpacingStyles({ margin: 'unknown' as any }, spacing)).toEqual({})
  })

  it('returns an empty object when no spacing props are passed', () => {
    expect(createSpacingStyles({}, spacing)).toEqual({})
  })
})

describe('omitSpacingProps', () => {
  it('removes all spacing keys from the object', () => {
    const result = omitSpacingProps({ margin: 'md', color: 'red', padding: 'sm' })
    expect(result).toEqual({ color: 'red' })
  })

  it('returns the object unchanged when it has no spacing keys', () => {
    const result = omitSpacingProps({ color: 'red', fontSize: 16 })
    expect(result).toEqual({ color: 'red', fontSize: 16 })
  })
})

describe('getSpacingPropertiesByComponentProps', () => {
  it('picks only spacing-related props', () => {
    const result = getSpacingPropertiesByComponentProps({
      margin: 'md',
      color: 'red',
      padding: 'lg',
      testID: 'box',
    })
    expect(result).toEqual({ margin: 'md', padding: 'lg' })
  })

  it('returns an empty object when no spacing keys are present', () => {
    expect(getSpacingPropertiesByComponentProps({ color: 'red' })).toEqual({})
  })
})
