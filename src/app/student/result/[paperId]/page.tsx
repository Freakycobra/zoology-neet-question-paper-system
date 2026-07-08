'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronUp, Check, X, Minus } from 'lucide-react'
import ScoreCard from '@/components/student/ScoreCard'
import { mockQuestions, mockPaperResult } from '@/lib/mock-data'

export default function ResultPage({ params }: { params: { paperId: string } }) {
  const paperId = params.paperId
  void paperId
  const result = mockPaperResult
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const questions = mockQuestions.slice(0, result.totalQuestions)
  const userAnswers: Record<number, number> = { 0: 0, 1: 2, 2: 0, 3: 3, 4: 2, 5: 1, 6: 1, 7: 1, 8: 0, 9: 1 }

  const getOptionStatus = (qIdx: number, optIdx: number) => {
    const correct = questions[qIdx]?.correctAnswer
    const user = userAnswers[qIdx]
    if (optIdx === correct) return 'correct'
    if (optIdx === user && user !== correct) return 'wrong'
    return 'neutral'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link href="/student" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft size={18} /> <span className="text-sm font-medium">Back to Tests</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{result.paperTitle}</h1>
        <p className="text-slate-500 mb-6">Test Results</p>

        <ScoreCard
          correct={result.correctAnswers}
          incorrect={result.incorrectAnswers}
          unanswered={result.unanswered}
          total={result.totalQuestions}
          timeTaken={result.timeTaken}
        />

        {/* Chapter Performance */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Chapter Performance</h2>
          <div className="space-y-3">
            {result.chapterPerformance.map((ch, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700">{ch.chapter}</span>
                  <span className="font-medium text-slate-900">{ch.correct}/{ch.total} ({ch.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${ch.percentage >= 80 ? 'bg-emerald-500' : ch.percentage >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${ch.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Difficulty Breakdown</h2>
          <div className="grid grid-cols-3 gap-4">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <div key={d} className="text-center p-3 rounded-lg bg-slate-50">
                <p className="text-lg font-bold text-slate-900">{result.difficultyBreakdown[d].correct}/{result.difficultyBreakdown[d].total}</p>
                <p className="text-xs text-slate-500 capitalize">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Question Review */}
        <div className="mt-8 space-y-3">
          <h2 className="font-semibold text-slate-900">Question Review</h2>
          {questions.map((q, i) => {
            const isCorrect = userAnswers[i] === q.correctAnswer
            const isExpanded = expandedQuestion === i
            return (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <button onClick={() => setExpandedQuestion(isExpanded ? null : i)}
                  className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors">
                  {isCorrect ? <Check size={18} className="text-emerald-500 shrink-0" /> :
                   userAnswers[i] !== undefined ? <X size={18} className="text-red-500 shrink-0" /> :
                   <Minus size={18} className="text-slate-400 shrink-0" />}
                  <span className="text-sm font-medium text-slate-500 shrink-0">Q{i + 1}</span>
                  <span className="text-sm text-slate-900 flex-1 truncate">{q.stem}</span>
                  {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-slate-100 pt-3">
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const status = getOptionStatus(i, oi)
                        return (
                          <div key={oi} className={`flex items-center gap-3 p-2.5 rounded-lg text-sm ${
                            status === 'correct' ? 'bg-emerald-50 border border-emerald-200' :
                            status === 'wrong' ? 'bg-red-50 border border-red-200' :
                            'bg-slate-50'
                          }`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              status === 'correct' ? 'bg-emerald-500 text-white' :
                              status === 'wrong' ? 'bg-red-500 text-white' :
                              'bg-slate-200 text-slate-600'
                            }`}>
                              {['A', 'B', 'C', 'D'][oi]}
                            </span>
                            <span className={status === 'correct' ? 'text-emerald-800 font-medium' : status === 'wrong' ? 'text-red-800' : 'text-slate-700'}>
                              {opt}
                            </span>
                            {status === 'correct' && <Check size={14} className="text-emerald-500 ml-auto" />}
                            {status === 'wrong' && <X size={14} className="text-red-500 ml-auto" />}
                          </div>
                        )
                      })}
                    </div>
                    <p className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg"><strong>Explanation:</strong> {q.explanation}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
