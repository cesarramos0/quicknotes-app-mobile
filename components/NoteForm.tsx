import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import type { Note, AIAction } from '../types/note'
import { AIActionButtons } from './AIActionButtons'
import { notesApi } from '../api/client'

interface NoteFormProps {
  initialNote?: Note
  onSubmit: (title: string, content: string) => Promise<void>
}

export function NoteForm({ initialNote, onSubmit }: NoteFormProps) {
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
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={[styles.input, !!titleError && styles.inputError]}
        value={title}
        onChangeText={setTitle}
        placeholder="Título de la nota"
        placeholderTextColor="#a8a8a8"
      />
      {!!titleError && <Text style={styles.errorText}>{titleError}</Text>}

      <Text style={styles.label}>Contenido</Text>
      <TextInput
        style={[styles.input, styles.textArea, !!contentError && styles.inputError]}
        value={content}
        onChangeText={setContent}
        placeholder="Escribe aquí tu nota..."
        placeholderTextColor="#a8a8a8"
        multiline
        numberOfLines={8}
        textAlignVertical="top"
      />
      {!!contentError && <Text style={styles.errorText}>{contentError}</Text>}

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
    color: '#161616',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#161616',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#da1e28',
  },
  textArea: {
    height: 180,
    paddingTop: 10,
  },
  errorText: {
    color: '#da1e28',
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