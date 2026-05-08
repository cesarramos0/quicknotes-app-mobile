import Groq from 'groq-sdk'
import { env } from '../config/env'

const groq = new Groq({ apiKey: env.GROQ_API_KEY })

const prompts = {
  improve: (content: string) =>
    `Mejora la redacción del siguiente texto para que sea más claro y profesional. Devuelve solo el texto mejorado, sin explicaciones:\n\n${content}`,
  summarize: (content: string) =>
    `Resume el siguiente texto en 2-3 frases cortas. Devuelve solo el resumen, sin explicaciones:\n\n${content}`,
  expand: (content: string) =>
    `Amplía el siguiente texto con más detalle y contexto. Devuelve solo el texto ampliado, sin explicaciones:\n\n${content}`,
}

type AIAction = keyof typeof prompts

export const aiService = {
  async processNote(content: string, action: AIAction): Promise<string> {
    const prompt = prompts[action](content)
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
    })
    return completion.choices[0]?.message?.content ?? ''
  },
}

/*
import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../config/env'

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

const prompts = {
  improve: (content: string) =>
    `Mejora la redacción del siguiente texto para que sea más claro y profesional. Devuelve solo el texto mejorado, sin explicaciones:\n\n${content}`,
  summarize: (content: string) =>
    `Resume el siguiente texto en 2-3 frases cortas. Devuelve solo el resumen, sin explicaciones:\n\n${content}`,
  expand: (content: string) =>
    `Amplía el siguiente texto con más detalle y contexto. Devuelve solo el texto ampliado, sin explicaciones:\n\n${content}`,
}

type AIAction = keyof typeof prompts

export const aiService = {
  async processNote(content: string, action: AIAction): Promise<string> {
    const prompt = prompts[action](content)
    const result = await model.generateContent(prompt)
    return result.response.text()
  },
}
*/
