import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import notesRoutes from './routes/notesRoutes'
import aiRoutes from './routes/aiRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/notes', notesRoutes)
app.use('/api/v1/notes', aiRoutes)

app.listen(env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${env.PORT}`)
})