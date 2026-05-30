import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act, create } from 'react-test-renderer'

vi.mock('react-native')
vi.mock('react-native-unistyles')
vi.mock('@/src/theme/fonts', () => ({
  fontMapper: {
    primary: {
      regular: { normal: 'SourceSans3_400Regular', italic: 'SourceSans3_400Regular_Italic' },
      bold:    { normal: 'SourceSans3_700Bold',    italic: 'SourceSans3_700Bold_Italic' },
      black:   { normal: 'SourceSans3_900Black',   italic: 'SourceSans3_900Black_Italic' },
      light:   { normal: 'SourceSans3_300Light',   italic: 'SourceSans3_300Light_Italic' },
      medium:  { normal: 'SourceSans3_500Medium',  italic: 'SourceSans3_500Medium_Italic' },
    },
  },
  availableFontKeys: {},
  fonts: {},
}))

import { Typography } from '../Typography'

const render = (element: React.ReactElement) => {
  let renderer: ReturnType<typeof create>
  act(() => { renderer = create(element) })
  return renderer!.toJSON() as any
}

describe('Typography', () => {
  it('renders without crashing', () => {
    expect(() => { act(() => { create(<Typography>Hello</Typography>) }) }).not.toThrow()
  })

  it('renders its children', () => {
    const tree = render(<Typography>Hello world</Typography>)
    expect(JSON.stringify(tree)).toContain('Hello world')
  })

  it('accepts a variant prop without crashing', () => {
    expect(() =>
      act(() => { create(<Typography variant="paragraph">Text</Typography>) })
    ).not.toThrow()
  })

  it('accepts a fontWeight prop without crashing', () => {
    expect(() =>
      act(() => { create(<Typography fontWeight="bold">Text</Typography>) })
    ).not.toThrow()
  })

  it('matches snapshot with variant="body"', () => {
    const tree = render(<Typography variant="body">Body text</Typography>)
    expect(tree).toMatchSnapshot()
  })

  it('matches snapshot with variant="caption" and fontWeight="bold"', () => {
    const tree = render(
      <Typography variant="caption" fontWeight="bold">
        Caption
      </Typography>
    )
    expect(tree).toMatchSnapshot()
  })
})
