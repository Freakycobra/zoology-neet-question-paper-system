export interface NEETQuestion {
  id: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapter: string;
  subtopic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  neetRelevance: number;
  classLevel: 11 | 12;
}

export interface StudentPaper {
  id: string;
  title: string;
  topics: string[];
  numQuestions: number;
  difficultyMix: {
    easy: number;
    medium: number;
    hard: number;
  };
  date: string;
  duration: number;
  status: 'available' | 'completed' | 'expired';
  classLevel: 11 | 12;
  questions: NEETQuestion[];
}

export interface PaperResult {
  paperId: string;
  paperTitle: string;
  score: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  neetScore: number;
  totalNeetScore: number;
  percentage: number;
  grade: string;
  timeTaken: number;
  date: string;
  chapterPerformance: {
    chapter: string;
    correct: number;
    total: number;
  }[];
  difficultyPerformance: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
}

export interface StudentDashboardData {
  studentName: string;
  averageScore: number;
  papersTaken: number;
  bestChapter: string;
  totalPapers: number;
  rank: number;
  streak: number;
}

export type QuestionStatus = 'not-visited' | 'visited' | 'answered' | 'marked';

export interface TestState {
  answers: Record<number, number | null>;
  questionStatus: Record<number, QuestionStatus>;
  currentQuestion: number;
  timeRemaining: number;
  isSubmitted: boolean;
}

export interface ChapterPerformance {
  chapter: string;
  correct: number;
  total: number;
}
