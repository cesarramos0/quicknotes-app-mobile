import type { AIAction, Note, CreateNoteInput, UpdateNoteInput, ChecklistItem } from '../types/note'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api'

let authToken: string | null = null

export function setAuthToken(token: string | null) {
  authToken = token
}

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  }
}

export const notesApi = {
  getAll: async (): Promise<Note[]> => {
    const res = await fetch(`${BASE_URL}/notes`, { headers: authHeaders() })
    if (!res.ok) throw new Error('Error al obtener las notas')
    return res.json()
  },

  getById: async (id: string): Promise<Note> => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, { headers: authHeaders() })
    if (!res.ok) throw new Error('Nota no encontrada')
    return res.json()
  },

  create: async (data: CreateNoteInput): Promise<Note> => {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al crear la nota')
    return res.json()
  },

  update: async (id: string, data: UpdateNoteInput): Promise<Note> => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al actualizar la nota')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    if (!res.ok) throw new Error('Error al eliminar la nota')
  },

  applyAI: async (id: string, action: AIAction): Promise<string> => {
    const res = await fetch(`${BASE_URL}/notes/${id}/ai`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ action }),
    })
    if (!res.ok) throw new Error('Error al procesar la IA')
    const data = await res.json()
    return data.result
  },
}

export const checklistApi = {
  getItems: async (noteId: string): Promise<ChecklistItem[]> => {
    const res = await fetch(`${BASE_URL}/notes/${noteId}/checklist-items`, { headers: authHeaders() })
    if (!res.ok) throw new Error('Error al obtener items')
    return res.json()
  },

  addItem: async (noteId: string, text: string): Promise<ChecklistItem> => {
    const res = await fetch(`${BASE_URL}/notes/${noteId}/checklist-items`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ text }),
    })
    if (!res.ok) throw new Error('Error al agregar item')
    return res.json()
  },

  updateItem: async (itemId: string, data: { is_completed?: boolean; text?: string }): Promise<ChecklistItem> => {
    const res = await fetch(`${BASE_URL}/checklist-items/${itemId}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al actualizar item')
    return res.json()
  },

  deleteItem: async (itemId: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/checklist-items/${itemId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    if (!res.ok) throw new Error('Error al eliminar item')
  },
}

export const authApi = {
  register: async (email: string, password: string): Promise<{ token: string; user: { id: string; email: string } }> => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error ?? 'Error al registrarse')
    }
    return res.json()
  },

  login: async (email: string, password: string): Promise<{ token: string; user: { id: string; email: string } }> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error ?? 'Credenciales inválidas')
    }
    return res.json()
  },
}
