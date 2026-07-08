'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Brain, FileCheck, Download, Check, ChevronRight, Dna } from 'lucide-react'
import { features, howItWorks } from '@/lib/mock-data'
import { zoologySyllabus } from '@/lib/syllabus'

export default function LandingPage() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  const class11 = zoologySyllabus.filter(s => s.classLevel === 11)
  const class12 = zoologySyllabus.filter(s => s.classLevel === 12)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-600 text-white">
              <BookOpen size={22} />
            </div>
            <span className="text-lg font-bold text-slate-900">NEET Zoology <span className="text-teal-600">QGen</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 px-3 py-2">Login</Link>
            <Link href="/login" className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={`py-20 sm:py-28 px-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6">
            <Dna size={14} /> For Telangana Zoology & NEET Coaching
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            AI-Powered Question Papers<br />for <span className="text-teal-600">NEET Zoology</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Generate syllabus-aligned, NEET-standard weekly test papers in minutes. 
            Quality-controlled MCQs with proper answer keys and explanations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors font-semibold text-base">
              <Brain size={18} /> Teacher Login
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-base">
              Student Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">Built for NEET Coaching Excellence</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  {i === 0 ? <Brain size={20} /> : i === 1 ? <FileCheck size={20} /> : <Download size={20} />}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
                {i < howItWorks.length - 1 && (
                  <ChevronRight className="hidden sm:block absolute top-5 -right-3 text-slate-300" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Coverage */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">Complete Zoology Syllabus Coverage</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 text-lg">Class 11</h3>
              <div className="space-y-2">
                {class11.map(ch => (
                  <div key={ch.id} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check size={14} className="text-emerald-500 shrink-0" /> {ch.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 text-lg">Class 12</h3>
              <div className="space-y-2">
                {class12.map(ch => (
                  <div key={ch.id} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check size={14} className="text-emerald-500 shrink-0" /> {ch.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-teal-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to transform your test preparation?</h2>
          <p className="text-teal-100 mb-8">Join teachers across Telangana who are saving hours every week.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-colors">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 text-slate-400 text-center text-sm">
        <p> 2026 NEET Zoology QGen. Built for NEET coaching excellence.</p>
      </footer>
    </div>
  )
}
