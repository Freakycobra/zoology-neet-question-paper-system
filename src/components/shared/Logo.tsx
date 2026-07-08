'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 24, text: 'text-xl' },
    lg: { icon: 32, text: 'text-2xl' },
  }
  const s = sizes[size]

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-1.5 rounded-lg bg-teal-600 text-white group-hover:bg-teal-700 transition-colors">
        <BookOpen size={s.icon} />
      </div>
      <span className={`${s.text} font-bold text-slate-900 tracking-tight`}>
        NEET Zoology <span className="text-teal-600">QGen</span>
      </span>
    </Link>
  )
}
