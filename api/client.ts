import type { AIAction, Note } from '../types/note'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL!

export const notesApi = {
  getAll: async (): Promise<Note[]> => {
  console.log('BASE_URL:', BASE_URL)
  const res = await fetch(`${BASE_URL}/notes`)
  console.log('status:', res.status)
  if (!res.ok) throw new Error('Error al obtener las notas')
  return res.json()
  },

  getById: async (id: string): Promise<Note> => {
    const res = await fetch(`${BASE_URL}/notes/${id}`)
    if (!res.ok) throw new Error('Nota no encontrada')
    return res.json()
  },

  create: async (title: string, content: string): Promise<Note> => {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    if (!res.ok) throw new Error('Error al crear la nota')
    return res.json()
  },

  update: async (id: string, title: string, content: string): Promise<Note> => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    if (!res.ok) throw new Error('Error al actualizar la nota')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Error al eliminar la nota')
  },

  applyAI: async (id: string, action: AIAction): Promise<string> => {
    const res = await fetch(`${BASE_URL}/notes/${id}/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    })
    if (!res.ok) throw new Error('Error al procesar la IA')
    const data = await res.json()
    return data.result
  },
}