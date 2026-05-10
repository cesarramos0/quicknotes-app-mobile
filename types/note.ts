export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type AIAction = 'improve' | 'summarize' | 'expand'