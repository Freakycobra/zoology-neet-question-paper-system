'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Database, CheckCircle, TrendingUp, Plus, Clock } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'

const stats = [
  { label: 'Papers Generated', value: '12', icon: FileText, color: 'bg-teal-50 text-teal-600' },
  { label: 'Questions in Bank', value: '186', icon: Database, color: 'bg-blue-50 text-blue-600' },
  { label: 'Approved', value: '94%', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'This Week', value: '3', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
]

const recentPapers = [
  { id: 'p1', title: 'Weekly Test - Animal Kingdom', date: '2026-07-05', questions: 25, status: 'approved' as const },
  { id: 'p2', title: 'Weekly Test - Human Physiology', date: '2026-07-01', questions: 25, status: 'review' as const },
  { id: 'p3', title: 'NEET Drill - Biotech', date: '2026-06-28', questions: 25, status: 'approved' as const },
]

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your question papers and track progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                  <Icon size={20} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-8">
          <Link href="/generate" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors">
            <Plus size={16} /> Generate New Paper
          </Link>
          <Link href="/question-bank" className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
            <Database size={16} /> Question Bank
          </Link>
        </div>

        {/* Recent Papers */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Papers</h2>
            <Link href="/export-history" className="text-sm text-teal-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentPapers.map(paper => (
              <div key={paper.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{paper.title}</p>
                    <p className="text-xs text-slate-500">{paper.questions} questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    paper.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {paper.status}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {paper.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
