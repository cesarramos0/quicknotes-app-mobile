import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '../../hooks/useTheme'
import { useNotes } from '../../context/NotesContext'
import { NoteForm } from '../../components/NoteForm'
import { Toast } from '../../components/Toast'

export default function NewNoteScreen() {
  const { createNote } = useNotes()
  const router = useRouter()
  const { colors } = useTheme()
  const [toastVisible, setToastVisible] = useState(false)

  const handleSubmit = async (title: string, content: string) => {
    await createNote({ title, type: 'note', content })
    router.back()
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <NoteForm onSubmit={handleSubmit} />
      <Toast message="✓ Nota creada" visible={toastVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})