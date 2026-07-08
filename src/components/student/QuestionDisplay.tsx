'use client'

import { NEETQuestion } from '@/types'

interface QuestionDisplayProps {
  question: NEETQuestion
  selectedOption: number | null
  onSelect: (option: number) => void
  questionNumber: number
}

export default function QuestionDisplay({ question, selectedOption, onSelect, questionNumber }: QuestionDisplayProps) {
  const labels = ['A', 'B', 'C', 'D']

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full bg-teal-600 text-white text-sm font-semibold">
          Q{questionNumber}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs capitalize">
          {question.difficulty}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs">
          {question.chapter}
        </span>
      </div>

      <h3 className="text-lg font-medium text-slate-900 leading-relaxed">
        {question.stem}
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              selectedOption === idx
                ? 'border-teal-500 bg-teal-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              selectedOption === idx
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {labels[idx]}
            </span>
            <span className={`text-sm ${selectedOption === idx ? 'text-teal-900 font-medium' : 'text-slate-700'}`}>
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
