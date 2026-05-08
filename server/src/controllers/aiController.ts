import { Request, Response } from 'express'
import { notesService } from '../services/notesService'
import { aiService } from '../services/aiService'

export const aiController = {
  async processNote(req: Request, res: Response) {
    const id = req.params.id as string
    const { action } = req.body

    if (!action || !['improve', 'summarize', 'expand'].includes(action)) {
      res.status(400).json({ error: 'action debe ser improve, summarize o expand' })
      return
    }

    const note = notesService.getById(id)
    if (!note) {
      res.status(404).json({ error: 'Nota no encontrada' })
      return
    }

    try {
        const result = await aiService.processNote(note.content, action)
        res.status(200).json({ result })
    } catch (error) {
        console.error('Error IA:', error)  // ← añade esta línea
        res.status(500).json({ error: 'Error al procesar la nota con IA' })
    }
  },
}