import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act, create } from 'react-test-renderer'

vi.mock('react-native')
vi.mock('react-native-unistyles')

import { Box } from '../Box'

const render = (element: React.ReactElement) => {
  let renderer: ReturnType<typeof create>
  act(() => { renderer = create(element) })
  return renderer!.toJSON() as any
}

const flatStyle = (style: unknown): Record<string, any> => {
  if (!style) return {}
  if (Array.isArray(style)) return Object.assign({}, ...style.map(flatStyle))
  return style as Record<string, any>
}

describe('Box', () => {
  it('renders without crashing', () => {
    expect(() => { act(() => { create(<Box />) }) }).not.toThrow()
  })

  it('renders children', () => {
    const tree = render(<Box>{React.createElement('Text', null, 'hello')}</Box>)
    expect(JSON.stringify(tree)).toContain('hello')
  })

  it('applies a spacing key as a pixel value in the style', () => {
    const tree = render(<Box marginTop="sm" />)
    const style = flatStyle(tree?.props?.style)
    expect(style.marginTop).toBe(8) // sm = 8 in mockTheme.spacing
  })

  it('applies multiple spacing keys', () => {
    const tree = render(<Box padding="md" marginBottom="lg" />)
    const style = flatStyle(tree?.props?.style)
    expect(style.padding).toBe(16)     // md = 16
    expect(style.marginBottom).toBe(24) // lg = 24
  })

  it('resolves a top-level color path for backgroundColor', () => {
    const tree = render(<Box backgroundColor="background" />)
    const style = flatStyle(tree?.props?.style)
    expect(style.backgroundColor).toBe('#ffffff')
  })

  it('resolves a borderRadius token', () => {
    const tree = render(<Box borderRadius="md" />)
    const style = flatStyle(tree?.props?.style)
    expect(style.borderRadius).toBe(16) // md = 16
  })

  it('matches snapshot', () => {
    const tree = render(<Box marginTop="sm" paddingHorizontal="md" backgroundColor="ground" />)
    expect(tree).toMatchSnapshot()
  })
})
