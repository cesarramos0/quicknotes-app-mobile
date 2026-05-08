import { Request, Response } from 'express'
import { notesService } from '../services/notesService'

export const notesController = {
  getAll(req: Request, res: Response) {
    const notes = notesService.getAll()
    res.status(200).json(notes)
  },

  getById(req: Request, res: Response) {
    const id = req.params.id as string
    const note = notesService.getById(id)
    if (!note) {
      res.status(404).json({ error: 'Nota no encontrada' })
      return
    }
    res.status(200).json(note)
  },

  create(req: Request, res: Response) {
    const { title, content } = req.body
    if (!title || !content) {
      res.status(400).json({ error: 'title y content son obligatorios' })
      return
    }
    const note = notesService.create(title, content)
    res.status(201).json(note)
  },

  update(req: Request, res: Response) {
    const { title, content } = req.body
    const id = req.params.id as string
    if (!title || !content) {
      res.status(400).json({ error: 'title y content son obligatorios' })
      return
    }
    const note = notesService.update(id, title, content)
    if (!note) {
      res.status(404).json({ error: 'Nota no encontrada' })
      return
    }
    res.status(200).json(note)
  },

  delete(req: Request, res: Response) {
    const id = req.params.id as string
    const deleted = notesService.delete(id)
    if (!deleted) {
      res.status(404).json({ error: 'Nota no encontrada' })
      return
    }
    res.status(204).send()
  },
}