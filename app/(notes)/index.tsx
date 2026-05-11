import { useCallback, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import { useTheme } from '../../hooks/useTheme'
import { useNotes } from '../../context/NotesContext'
import { NoteCard } from '../../components/NoteCard'
import { SkeletonCard } from '../../components/SkeletonCard'

export default function HomeScreen() {
  const { notes, loading, error, fetchNotes } = useNotes()
  const router = useRouter()
  const { colors } = useTheme()
  const [query, setQuery] = useState('')

  useFocusEffect(
    useCallback(() => {
      fetchNotes()
    }, [fetchNotes])
  )

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.content.toLowerCase().includes(query.toLowerCase())
  )

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        placeholder="Buscar notas..."
        placeholderTextColor={colors.placeholder}
        value={query}
        onChangeText={setQuery}
      />

      {loading && notes.length === 0 ? (
        <View style={{ padding: 16 }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={note => note.id}
          renderItem={({ item }) => <NoteCard note={item} />}
          refreshing={loading}
          onRefresh={fetchNotes}
          ListEmptyComponent={
            <View style={styles.empty}>
              {query ? (
                <Text style={[styles.emptyTitle, { color: colors.text }]}>No hay notas con "{query}"</Text>
              ) : (
                <>
                  <Text style={[styles.emptyTitle, { color: colors.text }]}>No tienes ninguna nota todavía</Text>
                  <Text style={[styles.emptySubtitle, { color: colors.subtext }]}>Crea tu primera nota con el botón de abajo</Text>
                </>
              )}
            </View>
          }
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/(notes)/new')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
  },
  list: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
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