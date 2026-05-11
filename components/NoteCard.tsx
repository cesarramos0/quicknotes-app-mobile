import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '../hooks/useTheme'
import type { Note } from '../types/note'

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const router = useRouter()
  const { colors } = useTheme()

  const preview = note.content.length > 100
    ? note.content.slice(0, 100) + '...'
    : note.content

  const formattedDate = new Date(note.updatedAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/(notes)/${note.id}`)}
    >
      <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>
      <Text style={[styles.preview, { color: colors.subtext }]}>{preview}</Text>
      <Text style={[styles.date, { color: colors.placeholder }]}>{formattedDate}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
  },
})