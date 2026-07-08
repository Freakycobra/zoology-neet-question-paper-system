'use client'

import { useEffect, useState } from 'react'

interface ScoreCardProps {
  correct: number
  incorrect: number
  unanswered: number
  total: number
  timeTaken: number
}

export default function ScoreCard({ correct, incorrect, unanswered, total, timeTaken }: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const neetScore = correct * 4 - incorrect * 1
  const maxScore = total * 4
  const percentage = Math.round((correct / total) * 100)
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  const getGrade = () => {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B'
    if (percentage >= 60) return 'C'
    if (percentage >= 50) return 'D'
    return 'F'
  }

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(percentage), 300)
    return () => clearTimeout(timer)
  }, [percentage])

  const minutes = Math.floor(timeTaken / 60)
  const seconds = timeTaken % 60

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <div className="flex flex-col items-center">
        {/* Score Circle */}
        <div className="relative w-36 h-36 mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444'}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900">{percentage}%</span>
            <span className="text-sm text-slate-500">Grade {getGrade()}</span>
          </div>
        </div>

        {/* NEET Score */}
        <div className="text-center mb-6">
          <p className="text-sm text-slate-500">NEET Score</p>
          <p className="text-4xl font-bold text-teal-600">{neetScore}<span className="text-lg text-slate-400">/{maxScore}</span></p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          <div className="text-center p-3 rounded-xl bg-emerald-50">
            <p className="text-2xl font-bold text-emerald-600">{correct}</p>
            <p className="text-xs text-emerald-600">Correct</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-red-50">
            <p className="text-2xl font-bold text-red-600">{incorrect}</p>
            <p className="text-xs text-red-600">Wrong</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-50">
            <p className="text-2xl font-bold text-slate-600">{unanswered}</p>
            <p className="text-xs text-slate-600">Skipped</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-teal-50">
            <p className="text-2xl font-bold text-teal-600">{minutes}:{String(seconds).padStart(2, '0')}</p>
            <p className="text-xs text-teal-600">Time</p>
          </div>
        </div>
      </div>
    </div>
  )
}
