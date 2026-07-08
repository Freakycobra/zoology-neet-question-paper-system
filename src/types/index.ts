export interface Question {
  id: string
  stem: string
  options: string[]
  correctAnswer: number
  explanation: string
  chapter: string
  subtopic: string
  difficulty: 'easy' | 'medium' | 'hard'
  neetRelevance: number
  usageCount: number
  lastUsed: string | null
  status: 'draft' | 'approved' | 'rejected'
  designNote: string
  createdAt: string
  classLevel: 11 | 12
}

export interface PaperBlueprint {
  id: string
  classLevel: 11 | 12
  weeklyTopics: string[]
  chapterIds: string[]
  subtopicIds: string[]
  numQuestions: number
  difficultySplit: {
    easy: number
    medium: number
    hard: number
  }
  questionFormat: 'neet_mcq'
  includeAnswers: boolean
  includeExplanations: 'none' | 'brief' | 'full'
  avoidRecentWeeks: number
  language: 'english'
  status: 'draft' | 'generating' | 'review' | 'approved'
  createdAt: string
  generatedQuestions: Question[]
  approvedQuestions: Question[]
}

export interface PaperExport {
  studentPaper: string
  teacherKey: string
  explanationSheet: string
  metadata: {
    chapterCoverage: Record<string, number>
    difficultyMix: Record<string, number>
    totalQuestions: number
    generatedAt: string
  }
}

export interface SyllabusNode {
  id: string
  name: string
  classLevel: 11 | 12
  unit?: string
  chapter?: string
  subtopics: string[]
  neetWeightage?: number
}

export interface TeacherFormData {
  classLevel: 11 | 12
  weeklyTopics: string[]
  testPurpose: 'weekly' | 'revision' | 'neet_drill'
  numQuestions: number
  difficultySplit: {
    easy: number
    medium: number
    hard: number
  }
  includeAnswers: boolean
  includeExplanations: 'none' | 'brief' | 'full'
  avoidRecentWeeks: number
}

export interface User {
  id: string
  name: string
  role: 'teacher' | 'student'
  createdAt: string
}

export interface NEETQuestion {
  id: string
  stem: string
  options: string[]
  correctAnswer: number
  explanation: string
  chapter: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: 'zoology'
}

export interface StudentPaper {
  id: string
  title: string
  topics: string[]
  numQuestions: number
  difficulty: string
  timeLimit: number
  status: 'available' | 'completed'
  score?: number
}

export interface PaperResult {
  paperId: string
  paperTitle: string
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  unanswered: number
  neetScore: number
  percentage: number
  timeTaken: number
  chapterPerformance: ChapterPerformance[]
  difficultyBreakdown: {
    easy: { correct: number; total: number }
    medium: { correct: number; total: number }
    hard: { correct: number; total: number }
  }
}

export interface ChapterPerformance {
  chapter: string
  correct: number
  total: number
  percentage: number
}
