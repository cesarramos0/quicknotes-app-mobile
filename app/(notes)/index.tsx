import { useCallback } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import { useNotes } from '../../context/NotesContext'
import { NoteCard } from '../../components/NoteCard'

export default function HomeScreen() {
  const { notes, loading, error, fetchNotes } = useNotes()
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      fetchNotes()
    }, [fetchNotes])
  )

  console.log('notas en lista:', notes.length, notes)
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0f62fe" />
        <Text style={styles.loadingText}>Cargando notas...</Text>
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
      <FlatList
        data={notes}
        keyExtractor={note => note.id}
        renderItem={({ item }) => <NoteCard note={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No tienes ninguna nota todavía</Text>
            <Text style={styles.emptySubtitle}>Crea tu primera nota con el botón de abajo</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/(notes)/new')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#525252',
    fontSize: 14,
  },
  errorText: {
    color: '#da1e28',
    fontSize: 14,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#161616',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#525252',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#0f62fe',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 32,
  },
})