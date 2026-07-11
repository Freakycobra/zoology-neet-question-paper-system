import { NextRequest, NextResponse } from 'next/server'
import { generateStudentPaper, generateTeacherKey, generateExplanationSheet } from '@/lib/export-docx'
import { Question } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { questions, type = 'student', title = 'NEET Zoology Test Paper' } = body

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'questions array is required' }, { status: 400 })
    }

    const paperData = {
      title,
      questions: questions as Question[],
      includeAnswers: type !== 'student',
      includeExplanations: type === 'explanation' ? 'full' as const : 'brief' as const,
    }

    let blob: Blob
    let filename: string

    switch (type) {
      case 'teacher':
        blob = await generateTeacherKey(paperData)
        filename = `${title.replace(/\s+/g, '_')}_Teacher_Key.docx`
        break
      case 'explanation':
        blob = await generateExplanationSheet(paperData)
        filename = `${title.replace(/\s+/g, '_')}_Explanations.docx`
        break
      default:
        blob = await generateStudentPaper(paperData)
        filename = `${title.replace(/\s+/g, '_')}_Student_Paper.docx`
    }

    const arrayBuffer = await blob.arrayBuffer()

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Failed to export document' }, { status: 500 })
  }
}
