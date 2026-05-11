import { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export function SkeletonCard() {
  const { colors } = useTheme()
  const opacity = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  return (
    <Animated.View style={[styles.card, { backgroundColor: colors.card, opacity }]}>
      <View style={[styles.title, { backgroundColor: colors.skeleton }]} />
      <View style={[styles.line, { backgroundColor: colors.skeleton }]} />
      <View style={[styles.line, { width: '60%', backgroundColor: colors.skeleton }]} />
      <View style={[styles.date, { backgroundColor: colors.skeleton }]} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    height: 16,
    borderRadius: 4,
    marginBottom: 12,
    width: '60%',
  },
  line: {
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
    width: '100%',
  },
  date: {
    height: 10,
    borderRadius: 4,
    width: '30%',
    marginTop: 4,
  },
})