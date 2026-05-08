import { randomUUID } from 'crypto'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const notes: Note[] = []

export const notesService = {
  getAll(): Note[] {
    return notes
  },

  getById(id: string): Note | undefined {
    return notes.find(note => note.id === id)
  },

  create(title: string, content: string): Note {
    const note: Note = {
      id: randomUUID(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    notes.push(note)
    return note
  },

  update(id: string, title: string, content: string): Note | undefined {
    const note = notes.find(note => note.id === id)
    if (!note) return undefined
    note.title = title
    note.content = content
    note.updatedAt = new Date().toISOString()
    return note
  },

  delete(id: string): boolean {
    const index = notes.findIndex(note => note.id === id)
    if (index === -1) return false
    notes.splice(index, 1)
    return true
  },
}