'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Database, CheckCircle, TrendingUp, Plus, Clock, Sparkles } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'
import { Question } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({ papers: 0, questions: 0, approved: 0, thisWeek: 0 })
  const [recentPapers, setRecentPapers] = useState<Array<{ id: string; title: string; date: string; questions: number; status: string }>>([])

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }

    // Calculate real stats from sessionStorage
    let totalQuestions = 0
    let approvedCount = 0
    const paperIds = new Set<string>()
    const papersList: Array<{ id: string; title: string; date: string; questions: number; status: string }> = []

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith('paper-') && !key.includes('blueprint')) {
        try {
          const qs = JSON.parse(sessionStorage.getItem(key) || '[]') as Question[]
          totalQuestions += qs.length
          const approved = qs.filter(q => q.status === 'approved').length
          approvedCount += approved
          paperIds.add(key)

          const date = new Date(parseInt(key.replace('paper-', ''))).toLocaleDateString()
          const status = qs.every(q => q.status === 'approved') ? 'approved' :
                        qs.some(q => q.status === 'approved') ? 'review' : 'draft'
          papersList.push({
            id: key,
            title: `Paper ${papersList.length + 1} - ${qs[0]?.chapter || 'Mixed Topics'}`,
            date,
            questions: qs.length,
            status,
          })
        } catch { /* ignore */ }
      }
    }

    setStats({
      papers: paperIds.size,
      questions: totalQuestions,
      approved: totalQuestions > 0 ? Math.round((approvedCount / totalQuestions) * 100) : 0,
      thisWeek: papersList.filter(p => {
        const d = new Date(p.date)
        const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7)
        return d >= weekAgo
      }).length,
    })
    setRecentPapers(papersList.slice(0, 5))
  }, [router])

  const statCards = [
    { label: 'Papers Generated', value: stats.papers.toString(), icon: FileText, color: 'bg-teal-50 text-teal-600', border: 'border-teal-100' },
    { label: 'Questions in Bank', value: stats.questions.toString(), icon: Database, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
    { label: 'Approved Rate', value: `${stats.approved}%`, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
    { label: 'This Week', value: stats.thisWeek.toString(), icon: TrendingUp, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your question papers and track progress</p>
        </div>

        {/* Stats with Glass UI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className={`bg-white/80 backdrop-blur-sm rounded-xl border ${s.border} p-5 shadow-sm hover:shadow-md transition-all`}>
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
          <Link href="/generate" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/15">
            <Sparkles size={16} /> Generate New Paper
          </Link>
          <Link href="/question-bank" className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white transition-colors">
            <Database size={16} /> Question Bank
          </Link>
        </div>

        {/* Recent Papers */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Papers</h2>
            <Link href="/export-history" className="text-sm text-teal-600 hover:underline">View All</Link>
          </div>
          {recentPapers.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-slate-500">No papers generated yet.</p>
              <Link href="/generate" className="text-sm text-teal-600 hover:underline mt-1 inline-block">Generate your first paper</Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentPapers.map(paper => (
                <div key={paper.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors">
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
          )}
        </div>
      </main>
    </div>
  )
}
