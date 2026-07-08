'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, AlertCircle, Send } from 'lucide-react'
import QuestionDisplay from '@/components/student/QuestionDisplay'
import TestTimer from '@/components/student/TestTimer'
import { NEETQuestion } from '@/types'
import { mockQuestions } from '@/lib/mock-data'

export default function TakeTestPage({ params }: { params: Promise<{ paperId: string }> }) {
  const router = useRouter()
  const [paperId, setPaperId] = useState<string>('')
  const [questions, setQuestions] = useState<NEETQuestion[]>(mockQuestions)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showSubmit, setShowSubmit] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    params.then(p => setPaperId(p.paperId))
  }, [params])

  const handleAnswer = useCallback((option: number) => {
    setAnswers(prev => ({ ...prev, [currentQ]: option }))
  }, [currentQ])

  const handleTimeUp = useCallback(() => {
    setTimeUp(true)
    handleSubmit()
  }, [])

  const handleSubmit = () => {
    const result = {
      paperId, questions, answers,
      correct: questions.filter((q, i) => answers[i] === q.correctAnswer).length,
      incorrect: questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correctAnswer).length,
      unanswered: questions.filter((_, i) => answers[i] === undefined).length,
    }
    localStorage.setItem(`result-${paperId}`, JSON.stringify(result))
    router.push(`/student/result/${paperId}`)
  }

  const visited = Object.keys(answers).map(Number)
  const answered = Object.keys(answers).filter(k => answers[Number(k)] !== undefined).map(Number)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/student" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft size={18} /> <span className="text-sm font-medium">Exit</span>
          </Link>
          <h1 className="text-sm font-semibold text-slate-900 hidden sm:block">NEET Zoology Weekly Test</h1>
          <TestTimer duration={45} onTimeUp={handleTimeUp} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Area */}
          <div className="lg:col-span-3">
            {questions[currentQ] && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <QuestionDisplay
                  question={questions[currentQ]}
                  selectedOption={answers[currentQ] ?? null}
                  onSelect={handleAnswer}
                  questionNumber={currentQ + 1}
                />

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                    disabled={currentQ === 0}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30 flex items-center gap-2">
                    <ArrowLeft size={14} /> Previous
                  </button>
                  {currentQ === questions.length - 1 ? (
                    <button onClick={() => setShowSubmit(true)}
                      className="px-5 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 flex items-center gap-2">
                      <Send size={14} /> Submit
                    </button>
                  ) : (
                    <button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 flex items-center gap-2">
                      Next <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-20">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Question Palette</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentQ(i)}
                    className={`aspect-square rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
                      i === currentQ ? 'bg-teal-600 text-white' :
                      answered.includes(i) ? 'bg-emerald-100 text-emerald-700' :
                      visited.includes(i) ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-100" /> Answered ({answered.length})</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-100" /> Visited ({visited.filter(v => !answered.includes(v)).length})</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-slate-100" /> Not visited ({questions.length - visited.length})</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-amber-500" size={24} />
              <h3 className="text-lg font-semibold text-slate-900">Submit Test?</h3>
            </div>
            <p className="text-slate-600 mb-6">
              You have answered {answered.length} out of {questions.length} questions.
              {answered.length < questions.length && ' Unanswered questions will be marked as skipped.'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowSubmit(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                Review
              </button>
              <button onClick={handleSubmit}
                className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
