'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import { getChaptersForClass } from '@/lib/syllabus'

interface TopicSelectorProps {
  classLevel: 11 | 12
  selectedTopics: string[]
  onChange: (topics: string[]) => void
}

export default function TopicSelector({ classLevel, selectedTopics, onChange }: TopicSelectorProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')
  const chapters = getChaptersForClass(classLevel)

  const toggleChapter = (chapterId: string) => {
    setExpanded(prev => ({ ...prev, [chapterId]: !prev[chapterId] }))
  }

  const toggleSubtopic = (subtopic: string) => {
    onChange(
      selectedTopics.includes(subtopic)
        ? selectedTopics.filter(t => t !== subtopic)
        : [...selectedTopics, subtopic]
    )
  }

  const selectAllInChapter = (chapter: { subtopics: string[] }) => {
    const allSelected = chapter.subtopics.every(st => selectedTopics.includes(st))
    if (allSelected) {
      onChange(selectedTopics.filter(t => !chapter.subtopics.includes(t)))
    } else {
      const newTopics = [...selectedTopics]
      chapter.subtopics.forEach(st => {
        if (!newTopics.includes(st)) newTopics.push(st)
      })
      onChange(newTopics)
    }
  }

  const filtered = search
    ? chapters.filter(ch =>
        ch.name.toLowerCase().includes(search.toLowerCase()) ||
        ch.subtopics.some(st => st.toLowerCase().includes(search.toLowerCase()))
      )
    : chapters

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search chapters or topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {filtered.map(chapter => {
          const isExpanded = expanded[chapter.id] || !!search
          const allSelected = chapter.subtopics.every(st => selectedTopics.includes(st))
          const someSelected = chapter.subtopics.some(st => selectedTopics.includes(st)) && !allSelected

          return (
            <div key={chapter.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="flex items-center gap-2 w-full px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                {isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = someSelected }}
                  onChange={() => selectAllInChapter(chapter)}
                  onClick={e => e.stopPropagation()}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-slate-800 flex-1">{chapter.name}</span>
                <span className="text-xs text-slate-400">{chapter.subtopics.length}</span>
              </button>

              {isExpanded && (
                <div className="px-3 py-2 space-y-1 bg-white">
                  {chapter.subtopics
                    .filter(st => !search || st.toLowerCase().includes(search.toLowerCase()))
                    .map((subtopic, idx) => (
                    <label key={idx} className="flex items-start gap-2 py-1.5 px-2 rounded hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(subtopic)}
                        onChange={() => toggleSubtopic(subtopic)}
                        className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-slate-600 leading-snug">{subtopic}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-xs text-slate-500">
        {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
      </div>
    </div>
  )
}
