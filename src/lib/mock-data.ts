import { Question, PaperBlueprint } from "@/types";

// ── Mock NEET Zoology Questions ───────────────────────────────────────────

export const mockQuestions: Question[] = [
  {
    id: "q_001",
    stem: "Which of the following is NOT a characteristic feature of chordates?",
    options: [
      "Presence of notochord at some stage of life",
      "Dorsal hollow nerve cord",
      "Pharyngeal gill slits",
      "Ventral solid nerve cord",
    ],
    correctAnswer: 3,
    explanation:
      "Chordates are characterized by a dorsal hollow nerve cord, not a ventral solid nerve cord. All other options are defining features of the phylum Chordata.",
    chapter: "Animal Kingdom",
    subtopic: "Phylum Chordata - General Features",
    difficulty: "easy",
    neetRelevance: 95,
    usageCount: 2,
    lastUsed: "2026-01-15",
    status: "approved",
    designNote: "Conceptual; tests core chordate definition",
    createdAt: "2026-01-10T08:00:00Z",
    classLevel: 11,
  },
  {
    id: "q_002",
    stem: "In the human heart, the bicuspid (mitral) valve is located between the:",
    options: [
      "Right atrium and right ventricle",
      "Left atrium and left ventricle",
      "Right ventricle and pulmonary artery",
      "Left ventricle and aorta",
    ],
    correctAnswer: 1,
    explanation:
      "The bicuspid (mitral) valve is located between the left atrium and left ventricle. It prevents backflow of blood into the left atrium during ventricular systole.",
    chapter: "Structural Organization in Animals",
    subtopic: "Heart - Structure and Valves",
    difficulty: "easy",
    neetRelevance: 98,
    usageCount: 5,
    lastUsed: "2026-02-01",
    status: "approved",
    designNote: "Direct recall; high NEET frequency",
    createdAt: "2026-01-12T10:30:00Z",
    classLevel: 11,
  },
  {
    id: "q_003",
    stem: "The gap junctions in cardiac muscle cells allow for:",
    options: [
      "Independent contraction of each cell",
      "Rapid transmission of electrical signals between cells",
      "Storage of calcium ions",
      "Synthesis of ATP during contraction",
    ],
    correctAnswer: 1,
    explanation:
      "Gap junctions are intercellular channels that allow ions to pass freely between adjacent cardiac muscle cells, enabling rapid transmission of action potentials and synchronized contraction of the heart muscle.",
    chapter: "Structural Organization in Animals",
    subtopic: "Muscle Tissue - Cardiac Muscle",
    difficulty: "medium",
    neetRelevance: 88,
    usageCount: 1,
    lastUsed: "2026-02-10",
    status: "approved",
    designNote: "Application-based; connects histology to physiology",
    createdAt: "2026-01-20T14:00:00Z",
    classLevel: 11,
  },
  {
    id: "q_004",
    stem: "Select the correct statement about the structure of nephron:",
    options: [
      "The descending limb of Loop of Henle is impermeable to water",
      "The proximal convoluted tubule reabsorbs only water and no solutes",
      "The distal convoluted tubule is lined by cuboidal epithelium with microvilli",
      "The glomerular filtrate is isotonic to plasma in the Bowman's capsule",
    ],
    correctAnswer: 3,
    explanation:
      "The glomerular filtrate in Bowman's capsule is isotonic to blood plasma as it contains all small molecules and ions present in plasma except proteins. The descending limb is permeable to water, PCT reabsorbs both water and solutes, and DCT lacks microvilli.",
    chapter: "Excretory Products and their Elimination",
    subtopic: "Nephron - Structure and Function",
    difficulty: "hard",
    neetRelevance: 92,
    usageCount: 0,
    lastUsed: null,
    status: "approved",
    designNote: "Multiple concepts tested; requires integration of kidney physiology",
    createdAt: "2026-02-01T09:00:00Z",
    classLevel: 11,
  },
  {
    id: "q_005",
    stem: "If a person has a tumor affecting the posterior lobe of the pituitary, which of the following would be most directly affected?",
    options: [
      "Growth hormone secretion",
      "Thyroid stimulating hormone secretion",
      "Antidiuretic hormone (ADH) secretion",
      "Adrenocorticotropic hormone (ACTH) secretion",
    ],
    correctAnswer: 2,
    explanation:
      "The posterior pituitary (neurohypophysis) stores and releases ADH (vasopressin) and oxytocin, which are synthesized in the hypothalamus. GH, TSH, and ACTH are all secreted by the anterior pituitary (adenohypophysis).",
    chapter: "Chemical Coordination and Integration",
    subtopic: "Endocrine Glands - Pituitary Gland",
    difficulty: "medium",
    neetRelevance: 90,
    usageCount: 1,
    lastUsed: "2026-01-28",
    status: "approved",
    designNote: "Clinical application; tests pituitary lobe differentiation",
    createdAt: "2026-01-25T11:00:00Z",
    classLevel: 11,
  },
  {
    id: "q_006",
    stem: "Which of the following hormones does NOT play a direct role in the regulation of blood glucose levels?",
    options: [
      "Glucagon",
      "Insulin",
      "Cortisol",
      "Parathyroid hormone (PTH)",
    ],
    correctAnswer: 3,
    explanation:
      "Parathyroid hormone (PTH) regulates calcium and phosphate metabolism, not blood glucose. Glucagon raises blood glucose, insulin lowers it, and cortisol promotes gluconeogenesis, thereby increasing blood glucose levels.",
    chapter: "Chemical Coordination and Integration",
    subtopic: "Hormones and their Functions",
    difficulty: "medium",
    neetRelevance: 93,
    usageCount: 3,
    lastUsed: "2026-02-05",
    status: "approved",
    designNote: "Comparative; requires knowledge of multiple hormone functions",
    createdAt: "2026-01-18T08:30:00Z",
    classLevel: 11,
  },
  {
    id: "q_007",
    stem: "The process of spermatogenesis in humans begins at:",
    options: [
      "Birth",
      "Onset of puberty",
      "Embryonic development (3rd month)",
      "Age of 25 years",
    ],
    correctAnswer: 1,
    explanation:
      "Spermatogenesis begins at puberty (around 12-14 years) under the influence of increased gonadotropin secretion (LH and FSH). Before puberty, seminiferous tubules contain only spermatogonia (germ stem cells).",
    chapter: "Human Reproduction",
    subtopic: "Male Reproductive System - Spermatogenesis",
    difficulty: "easy",
    neetRelevance: 96,
    usageCount: 4,
    lastUsed: "2026-02-08",
    status: "approved",
    designNote: "Foundational reproductive biology concept",
    createdAt: "2026-01-22T10:00:00Z",
    classLevel: 12,
  },
  {
    id: "q_008",
    stem: "During the menstrual cycle, the corpus luteum primarily secretes:",
    options: [
      "FSH and LH",
      "Estrogen and progesterone",
      "Only estrogen",
      "hCG (human chorionic gonadotropin)",
    ],
    correctAnswer: 1,
    explanation:
      "The corpus luteum, formed from the ruptured Graafian follicle during ovulation, primarily secretes estrogen and progesterone. These hormones maintain the endometrium and prepare it for possible implantation. hCG is secreted by the trophoblast after implantation, not by the corpus luteum.",
    chapter: "Human Reproduction",
    subtopic: "Female Reproductive System - Menstrual Cycle",
    difficulty: "medium",
    neetRelevance: 94,
    usageCount: 2,
    lastUsed: "2026-01-30",
    status: "approved",
    designNote: "Endocrine regulation of menstrual cycle; high NEET weightage",
    createdAt: "2026-01-24T13:00:00Z",
    classLevel: 12,
  },
  {
    id: "q_009",
    stem: "A man with blood group A (IAi) marries a woman with blood group B (IBi). What is the probability that their first child will have blood group O?",
    options: [
      "0%",
      "25%",
      "50%",
      "75%",
    ],
    correctAnswer: 1,
    explanation:
      "This is a dihybrid cross for ABO blood groups. Father (IAi) x Mother (IBi) produces offspring with genotypes: IAIB (AB), IAi (A), IBi (B), and ii (O) in a 1:1:1:1 ratio. Therefore, the probability of blood group O (ii) is 25%.",
    chapter: "Principles of Inheritance and Variation",
    subtopic: "Blood Groups - ABO System",
    difficulty: "medium",
    neetRelevance: 91,
    usageCount: 1,
    lastUsed: "2026-02-12",
    status: "approved",
    designNote: "Genetics problem; requires Punnett square application",
    createdAt: "2026-02-02T15:00:00Z",
    classLevel: 12,
  },
  {
    id: "q_010",
    stem: "In a DNA molecule, if the ratio of (A+T)/(G+C) is 0.25, what is the percentage of adenine in the molecule?",
    options: [
      "10%",
      "20%",
      "30%",
      "40%",
    ],
    correctAnswer: 0,
    explanation:
      "Given (A+T)/(G+C) = 0.25 = 1/4. Therefore, (G+C) = 4(A+T). Since A = T and G = C (Chargaff's rules), let A = T = x, so G = C = 4x. Total = 2x + 8x = 10x = 100%, so x = 10%. Hence, adenine = 10%.",
    chapter: "Molecular Basis of Inheritance",
    subtopic: "DNA Structure - Chargaff's Rules",
    difficulty: "hard",
    neetRelevance: 89,
    usageCount: 0,
    lastUsed: null,
    status: "approved",
    designNote: "Numerical; tests Chargaff's rules application",
    createdAt: "2026-02-06T09:30:00Z",
    classLevel: 12,
  },
];

// ── Mock Paper Blueprints ─────────────────────────────────────────────────

export const mockPapers: PaperBlueprint[] = [
  {
    id: "pb_001",
    classLevel: 11,
    weeklyTopics: [
      "Phylum Chordata - General Features",
      "Class Mammalia - Characteristics",
    ],
    chapterIds: ["ch_ak_01", "ch_ak_05"],
    subtopicIds: ["st_001", "st_045"],
    numQuestions: 30,
    difficultySplit: { easy: 10, medium: 15, hard: 5 },
    questionFormat: "neet_mcq",
    includeAnswers: true,
    includeExplanations: "brief",
    avoidRecentWeeks: 4,
    language: "english",
    status: "approved",
    createdAt: "2026-02-01T10:00:00Z",
    generatedQuestions: mockQuestions.filter((q) => q.classLevel === 11).slice(0, 5),
    approvedQuestions: mockQuestions.filter((q) => q.classLevel === 11).slice(0, 5),
  },
  {
    id: "pb_002",
    classLevel: 12,
    weeklyTopics: [
      "Male Reproductive System - Spermatogenesis",
      "Female Reproductive System - Menstrual Cycle",
      "Fertilization and Implantation",
    ],
    chapterIds: ["ch_hr_01", "ch_hr_02"],
    subtopicIds: ["st_101", "st_110", "st_125"],
    numQuestions: 45,
    difficultySplit: { easy: 15, medium: 20, hard: 10 },
    questionFormat: "neet_mcq",
    includeAnswers: true,
    includeExplanations: "full",
    avoidRecentWeeks: 2,
    language: "english",
    status: "approved",
    createdAt: "2026-02-10T08:00:00Z",
    generatedQuestions: mockQuestions.filter((q) => q.classLevel === 12).slice(0, 4),
    approvedQuestions: mockQuestions.filter((q) => q.classLevel === 12).slice(0, 4),
  },
  {
    id: "pb_003",
    classLevel: 11,
    weeklyTopics: [
      "Nephron - Structure and Function",
      "Urine Formation - Counter Current Mechanism",
    ],
    chapterIds: ["ch_ep_01"],
    subtopicIds: ["st_060", "st_065"],
    numQuestions: 25,
    difficultySplit: { easy: 8, medium: 12, hard: 5 },
    questionFormat: "neet_mcq",
    includeAnswers: true,
    includeExplanations: "brief",
    avoidRecentWeeks: 6,
    language: "english",
    status: "review",
    createdAt: "2026-02-15T11:00:00Z",
    generatedQuestions: mockQuestions.filter((q) => q.chapter.includes("Excretory")),
    approvedQuestions: [],
  },
];

// ── Syllabus Coverage Data ────────────────────────────────────────────────

export const class11Chapters = [
  "The Living World",
  "Biological Classification",
  "Plant Kingdom",
  "Animal Kingdom",
  "Morphology of Flowering Plants",
  "Anatomy of Flowering Plants",
  "Structural Organisation in Animals",
  "Cell: The Unit of Life",
  "Biomolecules",
  "Cell Cycle and Cell Division",
  "Transport in Plants",
  "Mineral Nutrition",
  "Photosynthesis in Higher Plants",
  "Respiration in Plants",
  "Plant Growth and Development",
  "Digestion and Absorption",
  "Breathing and Exchange of Gases",
  "Body Fluids and Circulation",
  "Excretory Products and their Elimination",
  "Locomotion and Movement",
  "Neural Control and Coordination",
  "Chemical Coordination and Integration",
];

export const class12Chapters = [
  "Reproduction in Organisms",
  "Sexual Reproduction in Flowering Plants",
  "Human Reproduction",
  "Reproductive Health",
  "Principles of Inheritance and Variation",
  "Molecular Basis of Inheritance",
  "Evolution",
  "Human Health and Disease",
  "Strategies for Enhancement in Food Production",
  "Microbes in Human Welfare",
  "Biotechnology: Principles and Processes",
  "Biotechnology and its Applications",
  "Organisms and Populations",
  "Ecosystem",
  "Biodiversity and Conservation",
  "Environmental Issues",
];

// ── Chapter Performance Data (for student dashboard) ─────────────────────

export interface ChapterPerformance {
  chapter: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  lastAttempted: string;
}

export const mockChapterPerformance: ChapterPerformance[] = [
  {
    chapter: "Animal Kingdom",
    totalQuestions: 30,
    correctAnswers: 24,
    accuracy: 80,
    lastAttempted: "2026-02-12",
  },
  {
    chapter: "Structural Organization in Animals",
    totalQuestions: 25,
    correctAnswers: 20,
    accuracy: 80,
    lastAttempted: "2026-02-10",
  },
  {
    chapter: "Chemical Coordination and Integration",
    totalQuestions: 20,
    correctAnswers: 16,
    accuracy: 80,
    lastAttempted: "2026-02-08",
  },
  {
    chapter: "Excretory Products and their Elimination",
    totalQuestions: 18,
    correctAnswers: 12,
    accuracy: 67,
    lastAttempted: "2026-02-05",
  },
  {
    chapter: "Human Reproduction",
    totalQuestions: 22,
    correctAnswers: 19,
    accuracy: 86,
    lastAttempted: "2026-02-14",
  },
  {
    chapter: "Principles of Inheritance and Variation",
    totalQuestions: 28,
    correctAnswers: 21,
    accuracy: 75,
    lastAttempted: "2026-02-13",
  },
  {
    chapter: "Molecular Basis of Inheritance",
    totalQuestions: 24,
    correctAnswers: 15,
    accuracy: 63,
    lastAttempted: "2026-02-11",
  },
  {
    chapter: "Body Fluids and Circulation",
    totalQuestions: 20,
    correctAnswers: 14,
    accuracy: 70,
    lastAttempted: "2026-02-01",
  },
];

// ── Feature cards data (for landing page) ─────────────────────────────────

export const features = [
  {
    icon: "Brain",
    title: "Smart Generation",
    description:
      "AI generates NEET-style MCQs aligned to weekly topics with proper difficulty distribution and Bloom's taxonomy levels.",
  },
  {
    icon: "ShieldCheck",
    title: "Quality Control",
    description:
      "Multi-layer validation ensures accurate questions, correct answer keys, and medically sound explanations.",
  },
  {
    icon: "FileOutput",
    title: "Easy Export",
    description:
      "One-click Word document export for printing. Separate student paper and teacher answer key generated automatically.",
  },
];

// ── How It Works steps ────────────────────────────────────────────────────

export const howItWorksSteps = [
  {
    number: 1,
    title: "Select Weekly Topics",
    description: "Choose chapters and subtopics from the Telangana zoology syllabus for the week.",
  },
  {
    number: 2,
    title: "AI Generates Questions",
    description: "Our AI creates syllabus-aligned, NEET-standard MCQs with proper difficulty distribution.",
  },
  {
    number: 3,
    title: "Review and Approve",
    description: "Preview generated questions, edit if needed, and approve for final export.",
  },
  {
    number: 4,
    title: "Export and Print",
    description: "Download formatted Word document with student paper and teacher answer key.",
  },
];
