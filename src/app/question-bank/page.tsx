'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Database, SlidersHorizontal, ChevronDown, BookOpen, X, Filter } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'
import { Question } from '@/types'
import { loadQuestions, getRegistry } from '@/lib/paper-storage'

export default function QuestionBankPage() {
  const router = useRouter()
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [search, setSearch] = useState('')
  const [chapterFilter, setChapterFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'recent' | 'chapter' | 'difficulty'>('recent')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }

    // Load ALL questions from all papers in localStorage
    const registry = getRegistry()
    const seen = new Set<string>()
    const questions: Question[] = []

    registry.forEach(meta => {
      const qs = loadQuestions(meta.id)
      if (qs) {
        qs.forEach(q => {
          if (!seen.has(q.stem)) {
            seen.add(q.stem)
            questions.push(q)
          }
        })
      }
    })

    setAllQuestions(questions)
  }, [router])

  // Extract unique chapters for filter dropdown
  const chapters = Array.from(new Set(allQuestions.map(q => q.chapter))).sort()

  // Apply filters + sort
  let filtered = allQuestions

  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter(q =>
      q.stem.toLowerCase().includes(s) ||
      q.chapter.toLowerCase().includes(s) ||
      q.subtopic.toLowerCase().includes(s) ||
      q.explanation.toLowerCase().includes(s)
    )
  }

  if (chapterFilter !== 'all') filtered = filtered.filter(q => q.chapter === chapterFilter)
  if (difficultyFilter !== 'all') filtered = filtered.filter(q => q.difficulty === difficultyFilter)
  if (typeFilter !== 'all') filtered = filtered.filter(q => q.type === typeFilter)

  if (sortBy === 'chapter') filtered.sort((a, b) => a.chapter.localeCompare(b.chapter))
  else if (sortBy === 'difficulty') {
    const order = { hard: 0, medium: 1, easy: 2 }
    filtered.sort((a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0))
  }
  // 'recent' uses default order (already sorted by generation time)

  const typeConfig: Record<string, { label: string; color: string }> = {
    mcq: { label: 'MCQ', color: 'bg-blue-100 text-blue-700' },
    match: { label: 'MATCH', color: 'bg-violet-100 text-violet-700' },
    assertion_reason: { label: 'A / R', color: 'bg-amber-100 text-amber-700' },
    diagram: { label: 'DIAG', color: 'bg-emerald-100 text-emerald-700' },
  }

  const hasActiveFilters = chapterFilter !== 'all' || difficultyFilter !== 'all' || typeFilter !== 'all' || search !== ''

  const clearFilters = () => {
    setSearch('')
    setChapterFilter('all')
    setDifficultyFilter('all')
    setTypeFilter('all')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-slate-500 mt-1">{allQuestions.length} unique questions across all papers</p>
        </div>

        {/* Search + Filter Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 p-4 shadow-sm mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search questions, chapters, topics, explanations..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                showFilters || hasActiveFilters ? 'bg-teal-50 border-teal-200 text-teal-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-teal-500" />}
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
              {/* Chapter Filter */}
              <div className="relative">
                <select
                  value={chapterFilter}
                  onChange={e => setChapterFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Chapters</option>
                  {chapters.map(ch => (
                    <option key={ch} value={ch}>{ch}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  value={difficultyFilter}
                  onChange={e => setDifficultyFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Types</option>
                  <option value="mcq">MCQ</option>
                  <option value="match">Match</option>
                  <option value="assertion_reason">A / R</option>
                  <option value="diagram">Diagram</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'recent' | 'chapter' | 'difficulty')}
                  className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="recent">Sort: Recent</option>
                  <option value="chapter">Sort: Chapter</option>
                  <option value="difficulty">Sort: Difficulty</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          )}

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {search && <span className="px-2 py-1 rounded-full bg-teal-50 text-teal-700 text-xs flex items-center gap-1"><Search size={10} /> {search} <button onClick={() => setSearch('')}><X size={10} /></button></span>}
              {chapterFilter !== 'all' && <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs flex items-center gap-1"><BookOpen size={10} /> {chapterFilter} <button onClick={() => setChapterFilter('all')}><X size={10} /></button></span>}
              {difficultyFilter !== 'all' && <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-xs flex items-center gap-1"><Filter size={10} /> {difficultyFilter} <button onClick={() => setDifficultyFilter('all')}><X size={10} /></button></span>}
              {typeFilter !== 'all' && <span className="px-2 py-1 rounded-full bg-violet-50 text-violet-700 text-xs flex items-center gap-1">{typeFilter} <button onClick={() => setTypeFilter('all')}><X size={10} /></button></span>}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            Showing {filtered.length} of {allQuestions.length} questions
          </p>
        </div>

        {/* Questions Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Database className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-slate-500">{hasActiveFilters ? 'No questions match your filters.' : 'No questions yet.'}</p>
              <p className="text-sm text-slate-400 mt-1">
                {hasActiveFilters ? 'Try adjusting your search or filters.' : 'Generate a paper to start building your question bank.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((q, i) => {
                const tConfig = typeConfig[q.type] || typeConfig.mcq
                const diffColors = {
                  easy: 'bg-emerald-100 text-emerald-700',
                  medium: 'bg-amber-100 text-amber-700',
                  hard: 'bg-rose-100 text-rose-700',
                }
                return (
                  <div key={q.id} className="px-6 py-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-semibold shrink-0 mt-0.5">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 font-medium leading-relaxed">{q.stem}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tConfig.color}`}>{tConfig.label}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${diffColors[q.difficulty]}`}>{q.difficulty}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">{q.chapter}</span>
                          <span className="text-xs text-slate-400">Ans: {['A', 'B', 'C', 'D'][q.correctAnswer]}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            q.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                            q.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>{q.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
