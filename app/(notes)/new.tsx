import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useNotes } from '../../context/NotesContext'
import { NoteForm } from '../../components/NoteForm'

export default function NewNoteScreen() {
  const { createNote } = useNotes()
  const router = useRouter()

const handleSubmit = async (title: string, content: string) => {
  console.log('handleSubmit llamado', title, content)
  try {
    await createNote(title, content)
    console.log('nota creada, navegando...')
    router.replace('/(notes)')
  } catch (e) {
    console.log('error:', e)
  }
}

  return (
    <View style={styles.container}>
      <NoteForm onSubmit={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
})