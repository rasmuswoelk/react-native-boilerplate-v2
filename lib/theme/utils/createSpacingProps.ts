import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { useMemo } from 'react'
import { ViewStyle } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { SpacingKeyType, SpacingType } from '../variables/spacing'

export const spacingStyleProperties = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginHorizontal',
  'marginVertical',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingHorizontal',
  'paddingVertical',
]

type SpacingStyleProperty = (typeof spacingStyleProperties)[number]

export type SpacingProps = {
  margin?: SpacingKeyType
  marginTop?: SpacingKeyType
  marginRight?: SpacingKeyType
  marginBottom?: SpacingKeyType
  marginLeft?: SpacingKeyType
  marginHorizontal?: SpacingKeyType
  marginVertical?: SpacingKeyType
  padding?: SpacingKeyType
  paddingTop?: SpacingKeyType
  paddingRight?: SpacingKeyType
  paddingBottom?: SpacingKeyType
  paddingLeft?: SpacingKeyType
  paddingHorizontal?: SpacingKeyType
  paddingVertical?: SpacingKeyType
}

export const createSpacingStyles = (
  props: SpacingProps,
  spacing: SpacingType
): Partial<ViewStyle> => {
  const styles: Partial<ViewStyle> = {}

  Object.entries(props).forEach(([property, spacingKey]) => {
    if (spacingKey && spacingKey in spacing) {
      const styleProperty = property as SpacingStyleProperty
      ;(styles as any)[styleProperty] = spacing[spacingKey]
    }
  })

  return styles
}

export const getSpacingPropertiesByComponentProps = (
  props: Record<string, unknown>
): SpacingProps => {
  return pick(props, spacingStyleProperties) as SpacingProps
}

export const omitSpacingProps = (
  props: Record<string, unknown>
): Record<string, unknown> => {
  return omit(props, spacingStyleProperties)
}

export const useGetSpacingStylesByComponentProps = (
  props: Record<string, unknown>
): Partial<ViewStyle> => {
  const { theme } = useUnistyles()
  return useMemo(() => {
    const spacingProps = getSpacingPropertiesByComponentProps(props)
    return createSpacingStyles(spacingProps, theme.spacing)
  }, [props, theme.spacing])
}
