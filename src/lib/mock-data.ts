import { NEETQuestion, StudentPaper, PaperResult, ChapterPerformance } from '@/types'

export const mockQuestions: NEETQuestion[] = [
  { id: '1', stem: 'Which of the following is NOT a characteristic of chordates?', options: ['Notochord', 'Dorsal hollow nerve cord', 'Ventral solid nerve cord', 'Pharyngeal gill slits'], correctAnswer: 2, explanation: 'Chordates have a dorsal hollow nerve cord, not a ventral solid nerve cord.', chapter: 'Animal Kingdom', difficulty: 'easy', subject: 'zoology' },
  { id: '2', stem: 'In which phylum is the water vascular system found?', options: ['Arthropoda', 'Mollusca', 'Echinodermata', 'Annelida'], correctAnswer: 2, explanation: 'The water vascular system is unique to phylum Echinodermata.', chapter: 'Animal Kingdom', difficulty: 'medium', subject: 'zoology' },
  { id: '3', stem: 'The functional unit of the kidney is:', options: ['Nephron', 'Neuron', 'Alveolus', 'Nodule'], correctAnswer: 0, explanation: 'The nephron is the structural and functional unit of the kidney.', chapter: 'Excretory Products', difficulty: 'easy', subject: 'zoology' },
  { id: '4', stem: 'Which blood group is known as the universal donor?', options: ['A+', 'B+', 'AB+', 'O-'], correctAnswer: 3, explanation: 'O- lacks A, B, and Rh antigens, making it the universal donor.', chapter: 'Body Fluids and Circulation', difficulty: 'easy', subject: 'zoology' },
  { id: '5', stem: 'The depolarization of axon during nerve impulse conduction is due to:', options: ['Influx of K+', 'Efflux of Na+', 'Influx of Na+', 'Efflux of Ca2+'], correctAnswer: 2, explanation: 'Depolarization is caused by rapid influx of Na+ ions.', chapter: 'Neural Control', difficulty: 'medium', subject: 'zoology' },
  { id: '6', stem: 'Which hormone triggers ovulation?', options: ['FSH', 'LH', 'Estrogen', 'Progesterone'], correctAnswer: 1, explanation: 'LH surge triggers ovulation around day 14 of the menstrual cycle.', chapter: 'Human Reproduction', difficulty: 'easy', subject: 'zoology' },
  { id: '7', stem: 'Restriction enzymes belong to which class of enzymes?', options: ['Ligases', 'Nucleases', 'Polymerases', 'Transferases'], correctAnswer: 1, explanation: 'Restriction enzymes are nucleases that cut DNA at specific sequences.', chapter: 'Biotechnology', difficulty: 'easy', subject: 'zoology' },
  { id: '8', stem: 'Bt cotton is resistant to pests because it produces:', options: ['Insulin', 'Cry proteins', 'Growth hormone', 'Antibiotics'], correctAnswer: 1, explanation: 'Bt cotton produces Cry proteins toxic to certain insect pests.', chapter: 'Biotechnology', difficulty: 'easy', subject: 'zoology' },
  { id: '9', stem: 'Graves disease is caused due to:', options: ['Hypothyroidism', 'Hyperthyroidism', 'Hypoparathyroidism', 'Hyperparathyroidism'], correctAnswer: 1, explanation: "Graves' disease is an autoimmune disorder causing hyperthyroidism.", chapter: 'Chemical Coordination', difficulty: 'hard', subject: 'zoology' },
  { id: '10', stem: 'Passive immunity is obtained by:', options: ['Vaccination', 'Antibody transfer', 'Infection', 'Natural exposure'], correctAnswer: 1, explanation: 'Passive immunity involves transfer of pre-formed antibodies.', chapter: 'Human Health and Disease', difficulty: 'easy', subject: 'zoology' },
]

export const mockAvailablePapers: StudentPaper[] = [
  { id: 'p1', title: 'Weekly Test - Animal Kingdom & Structural Org', topics: ['Animal Kingdom', 'Structural Organisation'], numQuestions: 25, difficulty: 'Mixed', timeLimit: 45, status: 'available' },
  { id: 'p2', title: 'NEET Drill - Human Physiology', topics: ['Body Fluids', 'Excretion', 'Neural Control'], numQuestions: 25, difficulty: 'Hard', timeLimit: 45, status: 'available' },
  { id: 'p3', title: 'Revision Test - Reproduction & Biotech', topics: ['Human Reproduction', 'Biotechnology'], numQuestions: 25, difficulty: 'Medium', timeLimit: 45, status: 'available' },
]

export const mockCompletedPapers: StudentPaper[] = [
  { id: 'pc1', title: 'Weekly Test - Animal Kingdom', topics: ['Animal Kingdom'], numQuestions: 25, difficulty: 'Mixed', timeLimit: 45, status: 'completed', score: 84 },
  { id: 'pc2', title: 'Weekly Test - Human Physiology', topics: ['Body Fluids', 'Excretion'], numQuestions: 25, difficulty: 'Mixed', timeLimit: 45, status: 'completed', score: 72 },
]

export const mockPaperResult: PaperResult = {
  paperId: 'pc1', paperTitle: 'Weekly Test - Animal Kingdom', totalQuestions: 25,
  correctAnswers: 21, incorrectAnswers: 3, unanswered: 1,
  neetScore: 81, percentage: 84, timeTaken: 2340,
  chapterPerformance: [
    { chapter: 'Animal Kingdom', correct: 12, total: 14, percentage: 86 },
    { chapter: 'Structural Organisation', correct: 9, total: 11, percentage: 82 },
  ],
  difficultyBreakdown: {
    easy: { correct: 5, total: 5 },
    medium: { correct: 12, total: 13 },
    hard: { correct: 4, total: 7 },
  },
}

export const features = [
  { title: 'Smart Generation', desc: 'AI generates NEET-style MCQs aligned to weekly topics with proper difficulty distribution.' },
  { title: 'Quality Control', desc: 'Multi-layer validation ensures accurate questions, correct answer keys, and strong distractors.' },
  { title: 'Easy Export', desc: 'One-click Word document export for student papers, teacher keys, and explanation sheets.' },
]

export const howItWorks = [
  { step: 1, title: 'Select Topics', desc: 'Choose weekly Zoology topics from the NEET syllabus' },
  { step: 2, title: 'AI Generates', desc: 'Our RAG engine creates 25 NEET-standard MCQs' },
  { step: 3, title: 'Review & Approve', desc: 'Review each question, edit if needed, approve or reject' },
  { step: 4, title: 'Export & Print', desc: 'Download Word documents for students and teachers' },
]
