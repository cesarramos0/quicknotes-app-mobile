import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'
import type { AIAction } from '../types/note'

interface AIActionButtonsProps {
  onAction: (action: AIAction) => void
  loading: boolean
}

export function AIActionButtons({ onAction, loading }: AIActionButtonsProps) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0f62fe" />
        <Text style={styles.loadingText}>Procesando con IA...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onAction('improve')}>
        <Text style={styles.buttonText}>✨ Mejorar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onAction('summarize')}>
        <Text style={styles.buttonText}>📝 Resumir</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onAction('expand')}>
        <Text style={styles.buttonText}>🔎 Expandir</Text>
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
  },
  button: {
    borderWidth: 1,
    borderColor: '#0f62fe',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  buttonText: {
    color: '#0f62fe',
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
    color: '#525252',
    fontSize: 14,
  },
})