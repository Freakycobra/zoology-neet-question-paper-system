import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, UnderlineType } from 'docx'
import { Question } from '@/types'

interface PaperData {
  title: string
  questions: Question[]
  includeAnswers: boolean
  includeExplanations: 'none' | 'brief' | 'full'
}

export async function generateStudentPaper(data: PaperData): Promise<Blob> {
  const { title, questions } = data
  const children: Paragraph[] = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: `Total Questions: ${questions.length} | Time: 45 minutes`,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: 'Instructions: Each question carries 4 marks. For each wrong answer, 1 mark will be deducted.',
      spacing: { after: 400 },
    }),
  ]

  questions.forEach((q, idx) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Q${idx + 1}. `, bold: true }),
          new TextRun({ text: q.stem }),
        ],
        spacing: { before: 200, after: 100 },
      })
    )
    const labels = ['A', 'B', 'C', 'D']
    q.options.forEach((opt, oIdx) => {
      children.push(
        new Paragraph({
          text: `    ${labels[oIdx]}) ${opt}`,
          spacing: { after: 60 },
        })
      )
    })
  })

  const doc = new Document({ sections: [{ properties: {}, children }] })
  return await Packer.toBlob(doc)
}

export async function generateTeacherKey(data: PaperData): Promise<Blob> {
  const { title, questions } = data
  const children: Paragraph[] = [
    new Paragraph({
      text: `${title} — TEACHER KEY`,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({ text: '', spacing: { after: 200 } }),
  ]

  questions.forEach((q, idx) => {
    const labels = ['A', 'B', 'C', 'D']
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Q${idx + 1}. `, bold: true }),
          new TextRun({ text: q.stem }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Answer: ${labels[q.correctAnswer]}) ${q.options[q.correctAnswer]}`, bold: true, color: '0D9488' }),
        ],
        spacing: { after: 100 },
      })
    )
    if (data.includeExplanations !== 'none') {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Explanation: ', bold: true, italics: true }),
            new TextRun({ text: q.explanation, italics: true }),
          ],
          spacing: { after: 200 },
        })
      )
    }
  })

  const doc = new Document({ sections: [{ properties: {}, children }] })
  return await Packer.toBlob(doc)
}

export async function generateExplanationSheet(data: PaperData): Promise<Blob> {
  const { title, questions } = data
  const children: Paragraph[] = [
    new Paragraph({
      text: `${title} — EXPLANATIONS`,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  ]

  questions.forEach((q, idx) => {
    const labels = ['A', 'B', 'C', 'D']
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Q${idx + 1}. `, bold: true }),
          new TextRun({ text: q.stem }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Correct Answer: ${labels[q.correctAnswer]}) ${q.options[q.correctAnswer]}`, bold: true, color: '0D9488' }),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Explanation: ', bold: true }),
          new TextRun({ text: q.explanation }),
        ],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Chapter: ', bold: true }),
          new TextRun({ text: q.chapter }),
        ],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Difficulty: ', bold: true }),
          new TextRun({ text: q.difficulty.toUpperCase() }),
        ],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Why other options are wrong: ', bold: true }),
          new TextRun({ text: q.designNote }),
        ],
        spacing: { after: 200 },
      }),
    )
  })

  const doc = new Document({ sections: [{ properties: {}, children }] })
  return await Packer.toBlob(doc)
}
