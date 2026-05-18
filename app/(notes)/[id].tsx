import { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTheme } from '../../hooks/useTheme'
import { useNotes } from '../../context/NotesContext'
import { NoteForm } from '../../components/NoteForm'
import { notesApi } from '../../api/client'
import { Toast } from '../../components/Toast'
import type { Note } from '../../types/note'

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { updateNote, deleteNote } = useNotes()
  const router = useRouter()
  const { colors } = useTheme()
  const [note, setNote] = useState<Note | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    notesApi.getById(id)
      .then(setNote)
      .catch(() => setError('No se encontró la nota'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (title: string, content: string) => {
    await updateNote(id, { title, content })
    router.back()
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar nota',
      '¿Estás seguro de que quieres eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteNote(id)
            router.replace('/(notes)')
          }
        }
      ]
    )
  }

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <NoteForm initialNote={note} onSubmit={handleSubmit} />
      <TouchableOpacity
        style={[styles.deleteButton, { borderColor: colors.error }]}
        onPress={handleDelete}
      >
        <Text style={[styles.deleteButtonText, { color: colors.error }]}>🗑 Eliminar nota</Text>
      </TouchableOpacity>
      <Toast message="✓ Cambios guardados" visible={toastVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
})