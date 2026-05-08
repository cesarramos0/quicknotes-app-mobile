import { Router } from 'express'
import { aiController } from '../controllers/aiController'

const router = Router()

router.post('/:id/ai', aiController.processNote)

export default router