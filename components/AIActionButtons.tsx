import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import type { AIAction } from '../types/note'

interface AIActionButtonsProps {
  onAction: (action: AIAction) => void
  loading: boolean
}

export function AIActionButtons({ onAction, loading }: AIActionButtonsProps) {
  const { colors } = useTheme()

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.subtext }]}>Procesando con IA...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { borderColor: colors.primary }]}
        onPress={() => onAction('improve')}
      >
        <Text style={[styles.buttonText, { color: colors.primary }]}>✨ Mejorar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { borderColor: colors.primary }]}
        onPress={() => onAction('summarize')}
      >
        <Text style={[styles.buttonText, { color: colors.primary }]}>📝 Resumir</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { borderColor: colors.primary }]}
        onPress={() => onAction('expand')}
      >
        <Text style={[styles.buttonText, { color: colors.primary }]}>🔎 Expandir</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 12,
  justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  loadingText: {
    fontSize: 14,
  },
})