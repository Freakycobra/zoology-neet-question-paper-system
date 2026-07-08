'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface TestTimerProps {
  duration: number // in minutes
  onTimeUp: () => void
}

export default function TestTimer({ duration, onTimeUp }: TestTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(duration * 60)

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp()
      return
    }
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsLeft, onTimeUp])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const isWarning = secondsLeft <= 300 // 5 minutes
  const isCritical = secondsLeft <= 120 // 2 minutes

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold ${
      isCritical ? 'bg-red-100 text-red-600 animate-pulse' :
      isWarning ? 'bg-amber-100 text-amber-600' :
      'bg-slate-100 text-slate-700'
    }`}>
      <Clock size={18} />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  )
}
