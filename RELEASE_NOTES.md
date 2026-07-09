# NEET Zoology QGen - Release Notes

## Version 1.0.0 - July 9, 2026

### Overview
AI-powered question paper generation system for Telangana Intermediate Zoology and NEET coaching. Built for teachers to generate syllabus-aligned, NEET-standard test papers with quality-controlled MCQs.

---

### Core Features

#### Flexible Paper Generation
- Choose Class 11 or Class 12 Zoology topics
- Select specific subtopics from the NEET syllabus
- Configure question count: 10 to 50 questions per paper
- Adjustable difficulty split: Easy / Medium / Hard (customizable percentages)
- NEET-standard 4-option MCQs with single best answer format

#### AI-Powered Question Generation
- Primary: OpenAI GPT-4o-mini with structured prompt engineering
- Fallback: 70 high-quality diverse templates (5 per chapter) when AI is unavailable
- Questions never repeat within the same paper
- Even distribution across selected topics
- Exact difficulty matching per blueprint

#### Question Review & Approval
- Question-by-question review interface
- Approve, reject, or edit each question inline
- Collapsible explanation and design note sections
- Bulk approve all questions
- Visual progress tracking

#### Word Document Export
- Student paper (questions only)
- Teacher key (questions + correct answers + explanations)
- Explanation sheet (full explanations for each question)
- Professional formatting ready for printing

#### Question Bank
- Auto-collects all generated questions
- Search by topic, chapter, or keyword
- Deduplication by question stem
- Filter by difficulty

---

### Tech Stack
- Next.js 16 + TypeScript + Tailwind CSS v3
- OpenAI GPT-4o-mini for question generation
- Supabase (pgvector) for vector storage
- Glass UI / Glassmorphism design language
- shadcn/ui components

---

### Syllabus Coverage
**Class 11 (8 chapters):**
- Animal Kingdom, Structural Organisation in Animals, Biomolecules
- Body Fluids and Circulation, Excretory Products and Their Elimination
- Locomotion and Movement, Neural Control and Coordination
- Chemical Coordination and Integration

**Class 12 (6 chapters):**
- Human Reproduction, Reproductive Health, Evolution
- Human Health and Disease, Biotechnology: Principles and Processes
- Biotechnology and Its Applications

---

### Environment Variables Required
| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o-mini |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |

---

### Known Limitations
- Student section is a placeholder for future development
- OpenAI generation requires valid API key on deployed environment
- Question storage is session-based (per-tab) for the MVP
- PDF ingestion pipeline ready but requires manual trigger

---

### Future Roadmap
- [ ] NCERT PDF vector ingestion for true RAG retrieval
- [ ] NEET previous year question pattern matching
- [ ] Student analytics dashboard
- [ ] Bilingual support (English + Telugu)
- [ ] Question image/diagram generation
- [ ] Paper template customization
- [ ] Week-by-week auto-scheduling
