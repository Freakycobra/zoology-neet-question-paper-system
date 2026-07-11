import { NextRequest, NextResponse } from 'next/server'
import { generateQuestions, createBlueprint } from '@/lib/question-generator'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      classLevel,
      weeklyTopics,
      numQuestions = 25,
      difficultySplit = { easy: 20, medium: 50, hard: 30 },
      includeAnswers = true,
      includeExplanations = 'brief',
      avoidRecentWeeks = 4,
    } = body

    if (!classLevel || !weeklyTopics || weeklyTopics.length === 0) {
      return NextResponse.json(
        { error: 'classLevel and weeklyTopics are required' },
        { status: 400 }
      )
    }

    const blueprint = createBlueprint({
      classLevel,
      weeklyTopics,
      numQuestions,
      difficultySplit,
      includeAnswers,
      includeExplanations,
      avoidRecentWeeks,
    })

    const questions = await generateQuestions(blueprint)

    return NextResponse.json({
      paperId: blueprint.id,
      blueprint,
      questions,
      metadata: {
        totalQuestions: questions.length,
        difficultyMix: {
          easy: questions.filter(q => q.difficulty === 'easy').length,
          medium: questions.filter(q => q.difficulty === 'medium').length,
          hard: questions.filter(q => q.difficulty === 'hard').length,
        },
        chapterCoverage: weeklyTopics.reduce((acc: Record<string, number>, topic: string) => {
          acc[topic] = questions.filter(q => q.chapter === topic).length
          return acc
        }, {}),
      },
    })
  } catch (error) {
    console.error('Generate paper error:', error)
    return NextResponse.json(
      { error: 'Failed to generate paper' },
      { status: 500 }
    )
  }
}
