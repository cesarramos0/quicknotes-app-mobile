import { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useNotes } from '../../context/NotesContext'
import { NoteForm } from '../../components/NoteForm'
import { notesApi } from '../../api/client'
import type { Note } from '../../types/note'

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { updateNote } = useNotes()
  const router = useRouter()
  const [note, setNote] = useState<Note | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    notesApi.getById(id)
      .then(setNote)
      .catch(() => setError('No se encontró la nota'))
      .finally(() => setLoading(false))
  }, [id])

const handleSubmit = async (title: string, content: string) => {
  await updateNote(id, title, content)
  router.replace('/(notes)')
}

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0f62fe" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <NoteForm initialNote={note} onSubmit={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#da1e28',
    fontSize: 14,
  },
})