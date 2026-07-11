'use client'

import { Question, PaperBlueprint } from '@/types'

export interface PaperMeta {
  id: string
  title: string
  classLevel: number
  topics: string[]
  numQuestions: number
  difficulty: string
  status: 'draft' | 'review' | 'approved'
  createdAt: string
  approvedCount: number
  totalCount: number
}

const REGISTRY_KEY = 'paper-registry'

/* ── Paper Registry ── */
export function getRegistry(): PaperMeta[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(REGISTRY_KEY) || '[]')
  } catch { return [] }
}

function saveRegistry(registry: PaperMeta[]) {
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry))
}

export function registerPaper(meta: PaperMeta) {
  const registry = getRegistry()
  // Remove existing entry with same ID
  const filtered = registry.filter(p => p.id !== meta.id)
  filtered.unshift(meta) // Add to front
  saveRegistry(filtered.slice(0, 50)) // Keep last 50
}

export function updatePaperMeta(id: string, updates: Partial<PaperMeta>) {
  const registry = getRegistry()
  const idx = registry.findIndex(p => p.id === id)
  if (idx >= 0) {
    registry[idx] = { ...registry[idx], ...updates }
    saveRegistry(registry)
  }
}

export function getPaperMeta(id: string): PaperMeta | undefined {
  return getRegistry().find(p => p.id === id)
}

/* ── Question Storage ── */
export function saveQuestions(paperId: string, questions: Question[]) {
  localStorage.setItem(`paper-${paperId}`, JSON.stringify(questions))
}

export function loadQuestions(paperId: string): Question[] | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(`paper-${paperId}`)
  if (!stored) return null
  try { return JSON.parse(stored) } catch { return null }
}

export function saveBlueprint(paperId: string, blueprint: PaperBlueprint) {
  localStorage.setItem(`paper-blueprint-${paperId}`, JSON.stringify(blueprint))
}

export function loadBlueprint(paperId: string): PaperBlueprint | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(`paper-blueprint-${paperId}`)
  if (!stored) return null
  try { return JSON.parse(stored) } catch { return null }
}

/* ── Sync questions back to storage ── */
export function syncQuestions(paperId: string, questions: Question[]) {
  saveQuestions(paperId, questions)
  // Update registry counts
  const approved = questions.filter(q => q.status === 'approved').length
  updatePaperMeta(paperId, {
    approvedCount: approved,
    status: approved === questions.length ? 'approved' : approved > 0 ? 'review' : 'draft',
  })
}
