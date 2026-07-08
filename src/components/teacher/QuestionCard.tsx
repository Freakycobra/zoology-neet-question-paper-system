'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Check, X, RefreshCw, Edit2 } from 'lucide-react'
import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onEdit: (id: string, updates: Partial<Question>) => void
}

export default function QuestionCard({ question, questionNumber, onApprove, onReject, onEdit }: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false)
  const [showDesignNote, setShowDesignNote] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedStem, setEditedStem] = useState(question.stem)
  const [editedOptions, setEditedOptions] = useState([...question.options])
  const labels = ['A', 'B', 'C', 'D']

  const diffColors = {
    easy: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-rose-100 text-rose-700',
  }

  const statusColors = {
    draft: 'border-l-4 border-slate-300',
    approved: 'border-l-4 border-emerald-500',
    rejected: 'border-l-4 border-red-500',
  }

  const handleSaveEdit = () => {
    onEdit(question.id, { stem: editedStem, options: editedOptions })
    setIsEditing(false)
  }

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${statusColors[question.status]} p-5 space-y-4`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">Q{questionNumber}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${diffColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">{question.chapter}</span>
        </div>
        <div className="flex items-center gap-1">
          {question.status === 'draft' && (
            <>
              <button onClick={() => setIsEditing(!isEditing)} className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                <Edit2 size={14} />
              </button>
              <button onClick={() => onApprove(question.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                <Check size={16} />
              </button>
              <button onClick={() => onReject(question.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                <X size={16} />
              </button>
            </>
          )}
          {question.status === 'approved' && <span className="text-emerald-500"><Check size={18} /></span>}
          {question.status === 'rejected' && <span className="text-red-500"><X size={18} /></span>}
        </div>
      </div>

      {/* Stem */}
      {isEditing ? (
        <textarea
          value={editedStem}
          onChange={e => setEditedStem(e.target.value)}
          className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          rows={2}
        />
      ) : (
        <p className="text-slate-900 font-medium leading-relaxed">{question.stem}</p>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {editedOptions.map((opt, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              idx === question.correctAnswer
                ? 'border-teal-300 bg-teal-50'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
              idx === question.correctAnswer
                ? 'bg-teal-600 text-white'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {labels[idx]}
            </span>
            {isEditing ? (
              <input
                value={opt}
                onChange={e => {
                  const newOpts = [...editedOptions]
                  newOpts[idx] = e.target.value
                  setEditedOptions(newOpts)
                }}
                className="flex-1 bg-transparent border-b border-slate-300 focus:border-teal-500 focus:outline-none text-sm"
              />
            ) : (
              <span className={`text-sm ${idx === question.correctAnswer ? 'text-teal-900 font-medium' : 'text-slate-700'}`}>
                {opt}
              </span>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex gap-2">
          <button onClick={handleSaveEdit} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700">Save</button>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200">Cancel</button>
        </div>
      )}

      {/* Collapsible sections */}
      <div className="border-t border-slate-100 pt-3 space-y-2">
        <button onClick={() => setShowExplanation(!showExplanation)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors">
          {showExplanation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          Explanation
        </button>
        {showExplanation && (
          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{question.explanation}</p>
        )}

        <button onClick={() => setShowDesignNote(!showDesignNote)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors">
          {showDesignNote ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          Design Note
        </button>
        {showDesignNote && (
          <p className="text-sm text-slate-500 bg-amber-50 p-3 rounded-lg italic">{question.designNote}</p>
        )}
      </div>
    </div>
  )
}
