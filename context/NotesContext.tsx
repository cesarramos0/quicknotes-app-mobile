import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Note } from '../types/note'
import { notesApi } from '../api/client'

interface NotesContextType {
  notes: Note[]
  loading: boolean
  error: string | null
  fetchNotes: () => Promise<void>
  createNote: (title: string, content: string) => Promise<Note>
  updateNote: (id: string, title: string, content: string) => Promise<Note>
  deleteNote: (id: string) => Promise<void>
}

const NotesContext = createContext<NotesContextType | null>(null)

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await notesApi.getAll()
      setNotes(data)
    } catch (err) {
      setError('Error al cargar las notas')
    } finally {
      setLoading(false)
    }
  }, [])

  const createNote = useCallback(async (title: string, content: string) => {
    const note = await notesApi.create(title, content)
    setNotes(prev => [note, ...prev])
    return note
  }, [])

  const updateNote = useCallback(async (id: string, title: string, content: string) => {
    const note = await notesApi.update(id, title, content)
    setNotes(prev => prev.map(n => n.id === id ? note : n))
    return note
  }, [])

  const deleteNote = useCallback(async (id: string) => {
    await notesApi.delete(id)
    setNotes(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <NotesContext.Provider value={{ notes, loading, error, fetchNotes, createNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (!context) throw new Error('useNotes debe usarse dentro de NotesProvider.')
  return context
}