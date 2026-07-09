'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Loader2, FileText, Target, Zap, BookOpen, LayoutGrid, Sparkles } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import TopicSelector from '@/components/teacher/TopicSelector'
import DifficultySlider from '@/components/teacher/DifficultySlider'
import { getUser, isTeacher } from '@/lib/auth'
import { Question } from '@/types'

type Step = 0 | 1 | 2 | 3 | 4

interface Template {
  id: string
  name: string
  icon: React.ElementType
  numQuestions: number
  easy: number
  medium: number
  hard: number
  desc: string
}

const templates: Template[] = [
  { id: 'standard', name: 'Standard Weekly', icon: FileText, numQuestions: 25, easy: 20, medium: 50, hard: 30, desc: 'Balanced weekly test' },
  { id: 'drill', name: 'NEET Drill', icon: Target, numQuestions: 50, easy: 10, medium: 40, hard: 50, desc: 'Full-length practice' },
  { id: 'quiz', name: 'Quick Quiz', icon: Zap, numQuestions: 10, easy: 40, medium: 40, hard: 20, desc: 'Rapid concept check' },
  { id: 'revision', name: 'Revision Test', icon: BookOpen, numQuestions: 30, easy: 15, medium: 45, hard: 40, desc: 'Pre-exam revision' },
]

export default function GeneratePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(0)
  const [classLevel, setClassLevel] = useState<11 | 12>(11)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [numQuestions, setNumQuestions] = useState(25)
  const [difficulty, setDifficulty] = useState({ easy: 20, medium: 50, hard: 30 })
  const [includeAnswers, setIncludeAnswers] = useState(true)
  const [includeExplanations, setIncludeExplanations] = useState<'none' | 'brief' | 'full'>('brief')
  const [avoidRecent, setAvoidRecent] = useState(4)
  const [generating, setGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([])
  const [paperId, setPaperId] = useState('')

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }
  }, [router])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classLevel, weeklyTopics: selectedTopics, numQuestions,
          difficultySplit: difficulty, includeAnswers, includeExplanations, avoidRecentWeeks: avoidRecent,
        }),
      })
      const data = await res.json()
      if (data.questions) {
        // CRITICAL FIX: Save questions to sessionStorage so review page can access them
        sessionStorage.setItem(`paper-${data.paperId}`, JSON.stringify(data.questions))
        sessionStorage.setItem(`paper-blueprint-${data.paperId}`, JSON.stringify(data.blueprint))
        setGeneratedQuestions(data.questions)
        setPaperId(data.paperId)
        setStep(4)
      }
    } catch (err) {
      console.error('Generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }

  const canProceed = () => {
    if (step === 1) return true
    if (step === 2) return selectedTopics.length > 0
    if (step === 3) return numQuestions >= 5 && numQuestions <= 50
    return true
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-teal-600 flex items-center gap-1 mb-4">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Generate Paper</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {['Template', 'Class', 'Topics', 'Config', 'Done'].map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= i ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {step > i ? '✓' : i}
              </div>
              {i < 4 && <div className={`flex-1 h-0.5 ${step > i ? 'bg-teal-600' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 p-6 shadow-sm">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <LayoutGrid size={20} className="text-teal-600" /> Choose a Template
              </h2>
              <p className="text-sm text-slate-500">Select a preset or configure manually</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {templates.map(t => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setNumQuestions(t.numQuestions)
                        setDifficulty({ easy: t.easy, medium: t.medium, hard: t.hard })
                        setStep(1)
                      }}
                      className="p-5 rounded-xl border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all text-left glass hover-lift"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{t.name}</p>
                          <p className="text-xs text-slate-500">{t.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">{t.numQuestions} Qs</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden flex">
                          <div className="h-full bg-emerald-400" style={{ width: `${t.easy}%` }} />
                          <div className="h-full bg-amber-400" style={{ width: `${t.medium}%` }} />
                          <div className="h-full bg-rose-400" style={{ width: `${t.hard}%` }} />
                        </div>
                      </div>
                    </button>
                  )
                })}
                <button
                  onClick={() => setStep(1)}
                  className="p-5 rounded-xl border-2 border-dashed border-slate-300 hover:border-teal-400 hover:bg-teal-50/30 transition-all text-left sm:col-span-2"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} className="text-slate-400" />
                    <div>
                      <p className="font-semibold text-slate-700">Custom Configuration</p>
                      <p className="text-xs text-slate-500">Manually set question count, difficulty, and all options</p>
                    </div>
                    <ArrowRight size={18} className="text-slate-400 ml-auto" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Select Class</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setClassLevel(11)}
                  className={`p-6 rounded-xl border-2 text-center transition-all ${
                    classLevel === 11 ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-3xl font-bold text-slate-900">11th</p>
                  <p className="text-sm text-slate-500 mt-1">Intermediate 1st Year</p>
                </button>
                <button
                  onClick={() => setClassLevel(12)}
                  className={`p-6 rounded-xl border-2 text-center transition-all ${
                    classLevel === 12 ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-3xl font-bold text-slate-900">12th</p>
                  <p className="text-sm text-slate-500 mt-1">Intermediate 2nd Year</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Select Weekly Topics</h2>
              <p className="text-sm text-slate-500">Choose the topics covered this week</p>
              <TopicSelector classLevel={classLevel} selectedTopics={selectedTopics} onChange={setSelectedTopics} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Configure Paper</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Questions: {numQuestions}</label>
                <input type="range" min={5} max={50} value={numQuestions}
                  onChange={e => setNumQuestions(Number(e.target.value))}
                  className="w-full accent-teal-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>5</span><span>50</span></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Difficulty Split</label>
                <DifficultySlider easy={difficulty.easy} medium={difficulty.medium} hard={difficulty.hard} onChange={setDifficulty} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Include Answers</label>
                  <button onClick={() => setIncludeAnswers(!includeAnswers)}
                    className={`w-full py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                      includeAnswers ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-500'
                    }`}>
                    {includeAnswers ? 'Yes' : 'No'}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Explanations</label>
                  <select value={includeExplanations}
                    onChange={e => setIncludeExplanations(e.target.value as 'none' | 'brief' | 'full')}
                    className="w-full py-2.5 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="none">None</option>
                    <option value="brief">Brief</option>
                    <option value="full">Full</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <FileText size={28} />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Paper Generated!</h2>
                <p className="text-sm text-slate-500 mt-1">{generatedQuestions.length} questions ready for review</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Class</span><span className="font-medium">{classLevel}th</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Topics</span><span className="font-medium">{selectedTopics.length} selected</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Questions</span><span className="font-medium">{numQuestions}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Difficulty</span><span className="font-medium">{difficulty.easy}% / {difficulty.medium}% / {difficulty.hard}%</span></div>
              </div>

              <Link href={`/review/${paperId}`}
                className="block w-full py-3 bg-teal-600 text-white rounded-xl font-semibold text-center hover:bg-teal-700 transition-colors">
                Review Questions
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 4 && step > 0 && (
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(Math.max(0, step - 1) as Step)}
              disabled={step === 0}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-30 transition-colors">
              Previous
            </button>
            {step < 3 ? (
              <button onClick={() => setStep(Math.min(4, step + 1) as Step)}
                disabled={!canProceed()}
                className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors flex items-center gap-2">
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={handleGenerate}
                disabled={!canProceed() || generating}
                className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors flex items-center gap-2">
                {generating ? <><Loader2 size={14} className="animate-spin" /> Generating...</> : <><FileText size={14} /> Generate Paper</>}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
