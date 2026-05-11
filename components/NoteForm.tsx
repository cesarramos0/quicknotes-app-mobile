import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import type { Note, AIAction } from '../types/note'
import { AIActionButtons } from './AIActionButtons'
import { notesApi } from '../api/client'

interface NoteFormProps {
  initialNote?: Note
  onSubmit: (title: string, content: string) => Promise<void>
}

export function NoteForm({ initialNote, onSubmit }: NoteFormProps) {
  const { colors } = useTheme()
  const [title, setTitle] = useState(initialNote?.title || '')
  const [content, setContent] = useState(initialNote?.content || '')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    let valid = true
    if (!title.trim()) {
      setTitleError('El título es obligatorio')
      valid = false
    } else {
      setTitleError('')
    }
    if (!content.trim()) {
      setContentError('El contenido es obligatorio')
      valid = false
    } else {
      setContentError('')
    }
    return valid
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit(title, content)
    } finally {
      setSubmitting(false)
    }
  }

  const handleAIAction = async (action: AIAction) => {
    if (!initialNote) return
    setAiLoading(true)
    try {
      const result = await notesApi.applyAI(initialNote.id, action)
      setContent(result)
    } catch {
      Alert.alert('Error IA', 'Error al procesar la IA. Inténtalo de nuevo.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Título</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: titleError ? colors.error : colors.border, color: colors.text }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Título de la nota"
        placeholderTextColor={colors.placeholder}
      />
      {!!titleError && <Text style={[styles.errorText, { color: colors.error }]}>{titleError}</Text>}

      <Text style={[styles.label, { color: colors.text }]}>Contenido</Text>
      <TextInput
        style={[styles.input, styles.textArea, { backgroundColor: colors.card, borderColor: contentError ? colors.error : colors.border, color: colors.text }]}
        value={content}
        onChangeText={setContent}
        placeholder="Escribe aquí tu nota..."
        placeholderTextColor={colors.placeholder}
        multiline
        numberOfLines={8}
        textAlignVertical="top"
      />
      {!!contentError && <Text style={[styles.errorText, { color: colors.error }]}>{contentError}</Text>}

      {initialNote && (
        <AIActionButtons onAction={handleAIAction} loading={aiLoading} />
      )}

      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting
          ? <ActivityIndicator size="small" color="#fff" />
          : <Text style={styles.submitButtonText}>
              {initialNote ? 'Guardar cambios' : 'Crear nota'}
            </Text>
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textArea: {
    height: 180,
    paddingTop: 10,
  },
  errorText: {
    fontSize: 12,
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: '#0f62fe',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#a8c7fa',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})