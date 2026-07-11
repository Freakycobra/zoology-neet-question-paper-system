'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Database, CheckCircle, TrendingUp, Clock, Sparkles, BarChart3 } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'
import { getRegistry, loadQuestions, PaperMeta } from '@/lib/paper-storage'

export default function DashboardPage() {
  const router = useRouter()
  const [papers, setPapers] = useState<PaperMeta[]>([])

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }
    setPapers(getRegistry())
  }, [router])

  // Compute stats from registry + actual questions
  const totalQuestions = papers.reduce((s, p) => s + p.totalCount, 0)
  const totalApproved = papers.reduce((s, p) => s + p.approvedCount, 0)
  const approvedRate = totalQuestions > 0 ? Math.round((totalApproved / totalQuestions) * 100) : 0
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7)
  const thisWeek = papers.filter(p => new Date(p.createdAt) >= weekAgo).length

  const statCards = [
    { label: 'Papers Generated', value: papers.length.toString(), icon: FileText, color: 'bg-teal-50 text-teal-600', border: 'border-teal-100' },
    { label: 'Questions in Bank', value: totalQuestions.toString(), icon: Database, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
    { label: 'Approved Rate', value: `${approvedRate}%`, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
    { label: 'This Week', value: thisWeek.toString(), icon: TrendingUp, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  ]

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
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/generate" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/15">
            <Sparkles size={16} /> Generate New Paper
          </Link>
          <Link href="/analytics" className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white transition-colors">
            <BarChart3 size={16} /> Analytics
          </Link>
          <Link href="/question-bank" className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white transition-colors">
            <Database size={16} /> Question Bank
          </Link>
        </div>

        {/* Recent Papers — Clickable */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Papers</h2>
            <span className="text-sm text-slate-400">{papers.length} total</span>
          </div>
          {papers.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-slate-500">No papers generated yet.</p>
              <Link href="/generate" className="text-sm text-teal-600 hover:underline mt-1 inline-block">Generate your first paper</Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {papers.map(paper => (
                <Link
                  key={paper.id}
                  href={`/review/${paper.id}`}
                  className="px-6 py-4 flex items-center justify-between hover:bg-teal-50/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-teal-700 transition-colors">{paper.title}</p>
                      <p className="text-xs text-slate-500">{paper.numQuestions} questions · Class {paper.classLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      paper.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      paper.status === 'review' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {paper.status}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {new Date(paper.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">Review →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
