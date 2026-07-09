import {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  PageBreak, BorderStyle, Table, TableRow, TableCell, WidthType,
  PageNumber, Header, Footer, convertInchesToTwip, UnderlineType,
  Border, VerticalAlign,
} from 'docx'
import { Question } from '@/types'

const MARGIN = convertInchesToTwip(1)

interface PaperData {
  title: string
  questions: Question[]
  includeAnswers: boolean
  includeExplanations: 'none' | 'brief' | 'full'
  classLevel?: number
  subject?: string
}

/* ── Helpers ── */
function headerParagraph(text: string, options?: object) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 28, font: 'Times New Roman', ...options })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  })
}

function bodyParagraph(text: string, options?: object) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: 'Times New Roman', ...options })],
    spacing: { after: 80 },
  })
}

function optionParagraph(label: string, text: string, isCorrect?: boolean) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}) `, bold: true, size: 22, font: 'Times New Roman', color: isCorrect ? '0D9488' : undefined }),
      new TextRun({ text, size: 22, font: 'Times New Roman', color: isCorrect ? '0D9488' : undefined }),
    ],
    spacing: { after: 60 },
    indent: { left: 360 },
  })
}

/* ── Student Paper ── */
export async function generateStudentPaper(data: PaperData): Promise<Blob> {
  const { title, questions, classLevel = 11 } = data
  const children: any[] = []

  // Header
  children.push(headerParagraph('NEET ZOOLOGY TEST PAPER'))
  children.push(new Paragraph({
    children: [
      new TextRun({ text: 'Class: ', bold: true, size: 22, font: 'Times New Roman' }),
      new TextRun({ text: `${classLevel}th      `, size: 22, font: 'Times New Roman' }),
      new TextRun({ text: 'Date: ', bold: true, size: 22, font: 'Times New Roman' }),
      new TextRun({ text: '__________      ', size: 22, font: 'Times New Roman', underline: { type: UnderlineType.SINGLE } }),
      new TextRun({ text: 'Name: ', bold: true, size: 22, font: 'Times New Roman' }),
      new TextRun({ text: '________________', size: 22, font: 'Times New Roman', underline: { type: UnderlineType.SINGLE } }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }))
  children.push(new Paragraph({
    children: [new TextRun({ text: 'Roll No: ', bold: true, size: 22, font: 'Times New Roman' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }))

  // Separator
  children.push(new Paragraph({
    border: { bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 120 },
  }))

  // Instructions
  children.push(bodyParagraph('Instructions:', { bold: true }))
  const instructions = [
    'Each question carries 4 marks.',
    '1 mark will be deducted for each wrong answer (NEET pattern).',
    `Time allowed: ${Math.round(questions.length * 1.8)} minutes.`,
    'Use of calculators or mobile phones is strictly prohibited.',
  ]
  instructions.forEach(inst =>
    children.push(new Paragraph({
      children: [new TextRun({ text: `  \u2022  ${inst}`, size: 20, font: 'Times New Roman' })],
      spacing: { after: 40 },
    }))
  )
  children.push(new Paragraph({ spacing: { after: 200 } }))

  // Questions
  questions.forEach((q, idx) => {
    const qNum = idx + 1
    children.push(renderQuestion(q, qNum, false))
    children.push(new Paragraph({ spacing: { after: 160 } }))
  })

  // End marker
  children.push(new Paragraph({ children: [new TextRun({ text: '*** END OF QUESTION PAPER ***', bold: true, size: 20, color: '999999' })], alignment: AlignmentType.CENTER, spacing: { before: 400 } }))

  const doc = new Document({
    sections: [{
      properties: {
        page: { margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } },
      },
      headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: 'NEET Zoology — Confidential', italics: true, size: 16, color: '999999' })], alignment: AlignmentType.RIGHT })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ children: [new TextRun({ text: 'Page ', size: 18 }), new TextRun({ children: [PageNumber.CURRENT], size: 18 }), new TextRun({ text: ' of ', size: 18 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18 })], alignment: AlignmentType.CENTER })] }) },
      children,
    }],
  })

  return await Packer.toBlob(doc)
}

/* ── Teacher Key ── */
export async function generateTeacherKey(data: PaperData): Promise<Blob> {
  const { title, questions } = data
  const children: any[] = []

  children.push(headerParagraph('ANSWER KEY — TEACHER COPY'))
  children.push(new Paragraph({
    children: [new TextRun({ text: '[CONFIDENTIAL — Do Not Distribute to Students]', italics: true, size: 20, color: 'EF4444' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }))
  children.push(new Paragraph({
    border: { bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 120 },
  }))

  questions.forEach((q, idx) => {
    children.push(renderQuestion(q, idx + 1, true))
    children.push(new Paragraph({ spacing: { after: 200 } }))
  })

  const doc = new Document({
    sections: [{
      properties: {
        page: { margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } },
      },
      children,
    }],
  })

  return await Packer.toBlob(doc)
}

/* ── Explanation Sheet ── */
export async function generateExplanationSheet(data: PaperData): Promise<Blob> {
  const { title, questions } = data
  const children: any[] = []

  children.push(headerParagraph('DETAILED EXPLANATIONS'))
  children.push(new Paragraph({
    border: { bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 200 },
  }))

  questions.forEach((q, idx) => {
    const labels = ['A', 'B', 'C', 'D']
    children.push(new Paragraph({
      children: [
        new TextRun({ text: `Q${idx + 1}. `, bold: true, size: 22 }),
        new TextRun({ text: q.stem, size: 22 }),
      ],
      spacing: { after: 60 },
    }))
    children.push(new Paragraph({
      children: [
        new TextRun({ text: `Answer: ${labels[q.correctAnswer]}) ${q.options[q.correctAnswer]}`, bold: true, color: '0D9488', size: 22 }),
      ],
      spacing: { after: 60 },
    }))
    children.push(new Paragraph({
      children: [
        new TextRun({ text: 'Explanation: ', bold: true, italics: true, size: 22 }),
        new TextRun({ text: q.explanation, italics: true, size: 22 }),
      ],
      spacing: { after: 60 },
    }))
    children.push(new Paragraph({
      children: [
        new TextRun({ text: 'Chapter: ', bold: true, size: 20 }),
        new TextRun({ text: q.chapter, size: 20 }),
      ],
      spacing: { after: 60 },
    }))
    children.push(new Paragraph({
      children: [
        new TextRun({ text: 'Difficulty: ', bold: true, size: 20 }),
        new TextRun({ text: q.difficulty.toUpperCase(), size: 20 }),
      ],
      spacing: { after: 60 },
    }))
    children.push(new Paragraph({
      children: [
        new TextRun({ text: 'Design Note: ', bold: true, size: 20 }),
        new TextRun({ text: q.designNote, size: 20 }),
      ],
      spacing: { after: 200 },
    }))
  })

  const doc = new Document({ sections: [{ properties: { page: { margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, children }] })
  return await Packer.toBlob(doc)
}

/* ── Question Renderer ── */
function renderQuestion(q: Question, qNum: number, showAnswers: boolean): any[] {
  const result: any[] = []
  const labels = ['A', 'B', 'C', 'D']

  switch (q.type) {
    case 'match':
      result.push(new Paragraph({
        children: [
          new TextRun({ text: `Q${qNum}. `, bold: true, size: 22 }),
          new TextRun({ text: q.stem, size: 22 }),
          new TextRun({ text: '  [MATCH]', bold: true, size: 16, color: '8B5CF6' }),
        ],
        spacing: { after: 100 },
      }))
      if (q.columnA && q.columnB) {
        const rows = Math.max(q.columnA.length, q.columnB.length)
        result.push(new Table({
          rows: Array.from({ length: rows }, (_, i) => new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: q.columnA?.[i] || '', size: 20 })], alignment: AlignmentType.CENTER })], width: { size: 40, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '——', size: 20 })], alignment: AlignmentType.CENTER })], width: { size: 20, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: q.columnB?.[i] || '', size: 20 })], alignment: AlignmentType.CENTER })], width: { size: 40, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER }),
            ],
          })),
          width: { size: 80, type: WidthType.PERCENTAGE },
        }))
      }
      break

    case 'assertion_reason':
      result.push(new Paragraph({
        children: [
          new TextRun({ text: `Q${qNum}. `, bold: true, size: 22 }),
          new TextRun({ text: '[ASSERTION-REASON]  ', bold: true, size: 16, color: 'F59E0B' }),
        ],
        spacing: { after: 60 },
      }))
      result.push(new Paragraph({
        children: [
          new TextRun({ text: 'Assertion (A): ', bold: true, size: 22, color: 'D97706' }),
          new TextRun({ text: q.assertion || q.stem, size: 22 }),
        ],
        spacing: { after: 60 },
        indent: { left: 240 },
      }))
      result.push(new Paragraph({
        children: [
          new TextRun({ text: 'Reason (R): ', bold: true, size: 22, color: '2563EB' }),
          new TextRun({ text: q.reason || '', size: 22 }),
        ],
        spacing: { after: 100 },
        indent: { left: 240 },
      }))
      // Standard AR options
      const arOptions = [
        'Both A and R are true and R is the correct explanation of A',
        'Both A and R are true but R is NOT the correct explanation of A',
        'A is true but R is false',
        'A is false but R is true',
      ]
      arOptions.forEach((opt, i) => {
        const isCorrect = showAnswers && i === q.correctAnswer
        result.push(optionParagraph(labels[i], opt, isCorrect))
      })
      break

    case 'diagram':
      result.push(new Paragraph({
        children: [
          new TextRun({ text: `Q${qNum}. `, bold: true, size: 22 }),
          new TextRun({ text: q.stem, size: 22 }),
          new TextRun({ text: '  [DIAGRAM]', bold: true, size: 16, color: '10B981' }),
        ],
        spacing: { after: 60 },
      }))
      result.push(new Paragraph({
        children: [
          new TextRun({ text: `Diagram: ${q.diagramDescription || 'Refer to standard diagram'}`, italics: true, size: 20, color: '10B981' }),
        ],
        spacing: { after: 100 },
        indent: { left: 240 },
      }))
      q.options.forEach((opt, i) => {
        result.push(optionParagraph(labels[i], opt, showAnswers && i === q.correctAnswer))
      })
      break

    default: // mcq
      result.push(new Paragraph({
        children: [
          new TextRun({ text: `Q${qNum}. `, bold: true, size: 22 }),
          new TextRun({ text: q.stem, size: 22 }),
        ],
        spacing: { after: 100 },
      }))
      q.options.forEach((opt, i) => {
        result.push(optionParagraph(labels[i], opt, showAnswers && i === q.correctAnswer))
      })
  }

  if (showAnswers) {
    result.push(new Paragraph({
      children: [
        new TextRun({ text: `Answer: ${labels[q.correctAnswer]}) ${q.options[q.correctAnswer]}`, bold: true, color: '0D9488', size: 22 }),
      ],
      spacing: { before: 80, after: 60 },
    }))
    result.push(new Paragraph({
      children: [
        new TextRun({ text: 'Explanation: ', bold: true, italics: true, size: 20 }),
        new TextRun({ text: q.explanation, italics: true, size: 20 }),
      ],
      spacing: { after: 60 },
    }))
  }

  return result
}
