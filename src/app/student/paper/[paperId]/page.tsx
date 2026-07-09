'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, AlertCircle, Send } from 'lucide-react'
import QuestionDisplay from '@/components/student/QuestionDisplay'
import TestTimer from '@/components/student/TestTimer'
import { Question } from '@/types'

export default function TakeTestPage({ params }: { params: { paperId: string } }) {
  const router = useRouter()
  const paperId = params.paperId
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showSubmit, setShowSubmit] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // Load questions from sessionStorage or localStorage
    const stored = sessionStorage.getItem(`paper-${paperId}`) || localStorage.getItem(`paper-${paperId}`)
    if (stored) {
      try {
        const qs = JSON.parse(stored) as Question[]
        // Only use approved questions for the test
        const approved = qs.filter((q: Question) => q.status === 'approved')
        setQuestions(approved.length > 0 ? approved : qs)
      } catch {
        setNotFound(true)
      }
    } else {
      setNotFound(true)
    }
  }, [paperId])

  const handleAnswer = useCallback((option: number) => {
    setAnswers(prev => ({ ...prev, [currentQ]: option }))
  }, [currentQ])

  const handleTimeUp = useCallback(() => {
    handleSubmit()
  }, [])

  const handleSubmit = () => {
    const result = {
      paperId,
      paperTitle: `Test Paper ${paperId.slice(0, 8)}`,
      questions,
      answers,
      totalQuestions: questions.length,
      correctAnswers: questions.filter((q, i) => answers[i] === q.correctAnswer).length,
      incorrectAnswers: questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correctAnswer).length,
      unanswered: questions.filter((_, i) => answers[i] === undefined).length,
      neetScore: questions.filter((q, i) => answers[i] === q.correctAnswer).length * 4
        - questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correctAnswer).length * 1,
      percentage: questions.length > 0
        ? Math.round((questions.filter((q, i) => answers[i] === q.correctAnswer).length / questions.length) * 100)
        : 0,
    }
    localStorage.setItem(`result-${paperId}`, JSON.stringify(result))

    // Add to completed papers
    const completed = JSON.parse(localStorage.getItem('completed-papers') || '[]')
    completed.push({ paperId, paperTitle: result.paperTitle, score: result.percentage, date: new Date().toLocaleDateString() })
    localStorage.setItem('completed-papers', JSON.stringify(completed))

    router.push(`/student/result/${paperId}`)
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Paper Not Found</h2>
          <p className="text-slate-500 mb-4">This test paper is not available.</p>
          <Link href="/student" className="text-teal-600 hover:underline">Back to My Tests</Link>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    )
  }

  const visited = Object.keys(answers).map(Number)
  const answered = Object.keys(answers).filter(k => answers[Number(k)] !== undefined).map(Number)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/student" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft size={18} /> <span className="text-sm font-medium">Exit</span>
          </Link>
          <h1 className="text-sm font-semibold text-slate-900 hidden sm:block">NEET Zoology Test</h1>
          <TestTimer duration={45} onTimeUp={handleTimeUp} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {questions[currentQ] && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <QuestionDisplay
                  question={{
                    id: questions[currentQ].id,
                    stem: questions[currentQ].stem,
                    options: questions[currentQ].options,
                    correctAnswer: questions[currentQ].correctAnswer,
                    explanation: questions[currentQ].explanation,
                    chapter: questions[currentQ].chapter,
                    difficulty: questions[currentQ].difficulty,
                    subject: 'zoology',
                  }}
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
