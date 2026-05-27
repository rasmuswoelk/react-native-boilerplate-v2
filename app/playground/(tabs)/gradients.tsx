import React, { useState } from 'react'
import { View, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container } from '@/lib/components/Container'
import { Typography } from '@/lib/components/Typography'
import { Gradient, AnimatedGradient } from '@/lib/components/Gradient'
import { useUnistyles } from 'react-native-unistyles'

const GRADIENT_EXAMPLES = [
  {
    title: 'Static Horizontal',
    component: (
      <Gradient
        width={300}
        height={150}
        colors={['#ff6b6b', '#4ecdc4']}
        direction="horizontal"
        autoGenerate={false}
      />
    ),
  },
  {
    title: 'Animated Diagonal Shift',
    component: (
      <AnimatedGradient
        width={300}
        height={150}
        colors={['#667eea', '#764ba2', '#f093fb']}
        direction="diagonal"
        animationType="shift"
        speed="medium"
      />
    ),
  },
  {
    title: 'Animated Wave',
    component: (
      <AnimatedGradient
        width={300}
        height={150}
        colors={['#f093fb', '#f5576c', '#4facfe']}
        direction="vertical"
        animationType="wave"
        speed="slow"
      />
    ),
  },
  {
    title: 'Animated Breathe',
    component: (
      <AnimatedGradient
        width={300}
        height={150}
        colors={['#43e97b', '#38f9d7']}
        direction="radial"
        animationType="breathe"
        speed="slow"
      />
    ),
  },
  {
    title: 'Rotating Gradient',
    component: (
      <AnimatedGradient
        width={300}
        height={150}
        colors={['#fa709a', '#fee140', '#fa709a']}
        direction="diagonal"
        animationType="rotate"
        speed="medium"
      />
    ),
  },
]

export default function GradientsScreen() {
  const { theme } = useUnistyles()
  const [pausedAnimations, setPausedAnimations] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container style={{ flex: 1 }} gutter="lg" paddingVertical="lg">
        <Typography variant="h1" fontWeight="bold" marginBottom="lg">
          Gradient Components
        </Typography>

        <View style={{ marginBottom: theme.spacing.lg }}>
          <Pressable
            style={{
              backgroundColor: !pausedAnimations
                ? theme.colors.red[500]
                : theme.colors.green[700],
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: 8,
              alignSelf: 'flex-start',
            }}
            onPress={() => setPausedAnimations(!pausedAnimations)}
          >
            <Typography color="white" fontWeight="medium">
              {pausedAnimations ? 'Resume Animations' : 'Pause Animations'}
            </Typography>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
        >
          {GRADIENT_EXAMPLES.map((example, index) => (
            <View
              key={index}
              style={{
                marginBottom: theme.spacing.lg,
                backgroundColor: theme.colors.white,
                borderRadius: 12,
                padding: theme.spacing.md,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Typography variant="h3" fontWeight="bold" marginBottom="md" color="gray.700">
                {example.title}
              </Typography>
              <View style={{ borderRadius: 8, overflow: 'hidden', alignItems: 'center' }}>
                {React.cloneElement(example.component, {
                  paused:
                    example.component.type === AnimatedGradient
                      ? pausedAnimations
                      : undefined,
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </Container>
    </SafeAreaView>
  )
}
