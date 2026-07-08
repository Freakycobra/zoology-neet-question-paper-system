import { Question, PaperBlueprint } from '@/types'
import { zoologySyllabus } from './syllabus'

// Mock question templates for development (sandbox can't reach OpenAI)
const mockQuestions: Record<string, Partial<Question>[]> = {
  'Animal Kingdom': [
    { stem: 'Which of the following is NOT a characteristic of chordates?', options: ['Notochord', 'Dorsal hollow nerve cord', 'Ventral solid nerve cord', 'Pharyngeal gill slits'], correctAnswer: 2, explanation: 'Chordates have a dorsal hollow nerve cord, not a ventral solid nerve cord. The ventral solid nerve cord is characteristic of non-chordates like arthropods.', difficulty: 'easy' as const },
    { stem: 'In which phylum is the water vascular system found?', options: ['Arthropoda', 'Mollusca', 'Echinodermata', 'Annelida'], correctAnswer: 2, explanation: 'The water vascular system is a unique characteristic of phylum Echinodermata. It helps in locomotion, capture of food, and respiration.', difficulty: 'medium' as const },
  ],
  'Structural Organisation in Animals': [
    { stem: 'Which tissue is responsible for transmitting electrical signals in the body?', options: ['Epithelial tissue', 'Connective tissue', 'Muscular tissue', 'Nervous tissue'], correctAnswer: 3, explanation: 'Nervous tissue is made up of neurons that are specialized to transmit electrical signals throughout the body.', difficulty: 'easy' as const },
    { stem: 'The gap junctions are found in which type of epithelial tissue?', options: ['Simple squamous', 'Simple cuboidal', 'Compound epithelium', 'Cardiac muscle'], correctAnswer: 3, explanation: 'Gap junctions are found in cardiac muscle tissue, allowing direct electrical communication between cells for synchronized contraction.', difficulty: 'hard' as const },
  ],
  'Biomolecules': [
    { stem: 'Which of the following is a reducing sugar?', options: ['Sucrose', 'Maltose', 'Starch', 'Cellulose'], correctAnswer: 1, explanation: 'Maltose is a reducing sugar because it has a free aldehyde group. Sucrose is a non-reducing sugar as it lacks a free aldehyde or ketone group.', difficulty: 'medium' as const },
    { stem: 'The primary structure of a protein refers to:', options: ['3D conformation', 'Sequence of amino acids', 'Alpha helices and beta sheets', 'Quaternary arrangement'], correctAnswer: 1, explanation: 'The primary structure of a protein is the linear sequence of amino acids linked by peptide bonds.', difficulty: 'easy' as const },
  ],
  'Body Fluids and Circulation': [
    { stem: 'Which blood group is known as the universal donor?', options: ['A+', 'B+', 'AB+', 'O-'], correctAnswer: 3, explanation: 'O- is the universal donor because it lacks A, B, and Rh antigens on RBCs, minimizing the risk of transfusion reactions.', difficulty: 'easy' as const },
    { stem: 'The second heart sound (dub) is produced due to:', options: ['Closure of AV valves', 'Closure of semilunar valves', 'Opening of AV valves', 'Ventricular contraction'], correctAnswer: 1, explanation: 'The second heart sound (dub) is produced by the closure of semilunar valves (aortic and pulmonary valves) at the beginning of ventricular diastole.', difficulty: 'medium' as const },
  ],
  'Excretory Products and Their Elimination': [
    { stem: 'The functional unit of the kidney is:', options: ['Nephron', 'Neuron', 'Alveolus', 'Nodule'], correctAnswer: 0, explanation: 'The nephron is the structural and functional unit of the kidney. Each kidney contains about 1 million nephrons.', difficulty: 'easy' as const },
    { stem: 'Which hormone decreases the GFR?', options: ['ADH', 'Aldosterone', 'ANF', 'Angiotensin II'], correctAnswer: 2, explanation: 'Atrial Natriuretic Factor (ANF) decreases GFR by causing vasoconstriction of afferent arteriole and vasodilation of efferent arteriole in the glomerulus.', difficulty: 'hard' as const },
  ],
  'Locomotion and Movement': [
    { stem: 'Myosin head has binding sites for:', options: ['Actin and Ca²⁺', 'Actin and ATP', 'Tropomyosin and Ca²⁺', 'Troponin and ATP'], correctAnswer: 1, explanation: 'The myosin head has binding sites for actin and ATP. ATP binding causes detachment of the myosin head from actin.', difficulty: 'medium' as const },
    { stem: 'Which joint is present between the atlas and axis?', options: ['Hinge joint', 'Pivot joint', 'Ball and socket joint', 'Gliding joint'], correctAnswer: 1, explanation: 'A pivot joint is present between the atlas and axis vertebrae, allowing rotational movement of the head.', difficulty: 'medium' as const },
  ],
  'Neural Control and Coordination': [
    { stem: 'The depolarization of the axon during nerve impulse conduction is due to:', options: ['Influx of K⁺', 'Efflux of Na⁺', 'Influx of Na⁺', 'Efflux of Ca²⁺'], correctAnswer: 2, explanation: 'Depolarization is caused by the rapid influx of Na⁺ ions through voltage-gated sodium channels, making the inside of the axon positive.', difficulty: 'medium' as const },
    { stem: 'Which part of the brain controls body temperature?', options: ['Cerebrum', 'Cerebellum', 'Hypothalamus', 'Medulla'], correctAnswer: 2, explanation: 'The hypothalamus is the thermoregulatory center of the brain. It maintains body temperature by controlling sweating, shivering, and blood flow to the skin.', difficulty: 'easy' as const },
  ],
  'Chemical Coordination and Integration': [
    { stem: 'Which hormone is responsible for the fight or flight response?', options: ['Insulin', 'Thyroxine', 'Adrenaline', 'Cortisol'], correctAnswer: 2, explanation: 'Adrenaline (epinephrine) is secreted by the adrenal medulla and prepares the body for emergency situations (fight or flight response).', difficulty: 'easy' as const },
    { stem: 'Graves disease is caused due to:', options: ['Hypothyroidism', 'Hyperthyroidism', 'Hypoparathyroidism', 'Hyperparathyroidism'], correctAnswer: 1, explanation: "Graves' disease is an autoimmune disorder causing hyperthyroidism due to overproduction of thyroid hormones. It leads to exophthalmic goitre.", difficulty: 'hard' as const },
  ],
  'Human Reproduction': [
    { stem: 'Which hormone triggers ovulation?', options: ['FSH', 'LH', 'Estrogen', 'Progesterone'], correctAnswer: 1, explanation: 'The LH (Luteinizing Hormone) surge triggers ovulation around the 14th day of the menstrual cycle.', difficulty: 'easy' as const },
    { stem: 'The process of spermatogenesis begins at:', options: ['Birth', 'Puberty', 'Adulthood', 'Fertilization'], correctAnswer: 1, explanation: 'Spermatogenesis begins at puberty under the influence of increased levels of gonadotropins (LH and FSH) and testosterone.', difficulty: 'easy' as const },
  ],
  'Reproductive Health': [
    { stem: 'Which contraceptive method works by preventing implantation?', options: ['Condom', 'Oral pills', 'IUDs', 'Rhythm method'], correctAnswer: 2, explanation: 'Intrauterine devices (IUDs) like copper-T release copper ions that suppress sperm motility and fertilizing capacity, and also prevent implantation.', difficulty: 'medium' as const },
    { stem: 'ZIFT is a technique in which:', options: ['Fertilization in vitro and embryo transfer', 'Fertilization in vivo and zygote transfer in fallopian tube', 'Gamete transfer into fallopian tube', 'Embryo transfer into uterus'], correctAnswer: 1, explanation: 'ZIFT (Zygote Intrafallopian Transfer) involves in vitro fertilization followed by transfer of the zygote into the fallopian tube.', difficulty: 'hard' as const },
  ],
  'Evolution': [
    { stem: 'Which evidence of evolution is shown by the forelimbs of whale, bat, cheetah, and human?', options: ['Convergent evolution', 'Divergent evolution', 'Adaptive radiation', 'Parallel evolution'], correctAnswer: 1, explanation: 'The forelimbs of whale, bat, cheetah, and human are homologous organs showing divergent evolution — same basic structure modified for different functions.', difficulty: 'medium' as const },
    { stem: 'The Hardy-Weinberg equilibrium will be disturbed by:', options: ['Random mating', 'No mutation', 'No gene flow', 'Natural selection'], correctAnswer: 3, explanation: 'Natural selection disturbs Hardy-Weinberg equilibrium by favoring certain alleles over others, changing allele frequencies in a population.', difficulty: 'hard' as const },
  ],
  'Human Health and Disease': [
    { stem: 'Which cells are primarily targeted by HIV?', options: ['B-lymphocytes', 'Helper T-cells (CD4+)', 'Cytotoxic T-cells', 'Macrophages'], correctAnswer: 1, explanation: 'HIV primarily infects and destroys helper T-cells (CD4+ T-lymphocytes), progressively weakening the immune system and leading to AIDS.', difficulty: 'medium' as const },
    { stem: 'Passive immunity is obtained by:', options: ['Vaccination', 'Antibody transfer', 'Infection', 'Natural exposure'], correctAnswer: 1, explanation: 'Passive immunity is obtained by transfer of pre-formed antibodies from one individual to another, e.g., maternal antibodies crossing the placenta.', difficulty: 'easy' as const },
  ],
  'Biotechnology: Principles and Processes': [
    { stem: 'Restriction enzymes belong to which class of enzymes?', options: ['Ligases', 'Nucleases', 'Polymerases', 'Transferases'], correctAnswer: 1, explanation: 'Restriction enzymes are nucleases that recognize specific DNA sequences (recognition sites) and cut the DNA at or near these sites.', difficulty: 'easy' as const },
    { stem: 'In recombinant DNA technology, the term vector refers to:', options: ['Restriction enzyme', 'Plasmid or viral DNA used to carry foreign DNA', 'DNA polymerase', 'Host bacterium'], correctAnswer: 1, explanation: 'A vector is a DNA molecule (plasmid, bacteriophage, etc.) used as a vehicle to carry foreign genetic material into a host cell.', difficulty: 'easy' as const },
  ],
  'Biotechnology and Its Applications': [
    { stem: 'Bt cotton is resistant to pests because it produces:', options: ['Insulin', 'Cry proteins', 'Growth hormone', 'Antibiotics'], correctAnswer: 1, explanation: 'Bt cotton produces Cry (crystal) proteins that are toxic to certain insect pests. When insects eat the plant, the Cry proteins damage their gut.', difficulty: 'easy' as const },
    { stem: 'RNA interference (RNAi) is used to:', options: ['Increase gene expression', 'Silence specific genes', 'Speed up transcription', 'Enhance translation'], correctAnswer: 1, explanation: 'RNA interference (RNAi) is a cellular mechanism that silences specific genes by degrading their mRNA, used in pest-resistant crops and gene therapy.', difficulty: 'medium' as const },
  ],
}

function generateMockQuestions(blueprint: PaperBlueprint): Question[] {
  const questions: Question[] = []
  const targetEasy = Math.round(blueprint.numQuestions * blueprint.difficultySplit.easy / 100)
  const targetMedium = Math.round(blueprint.numQuestions * blueprint.difficultySplit.medium / 100)
  const targetHard = blueprint.numQuestions - targetEasy - targetMedium

  const chapterNames = blueprint.weeklyTopics.length > 0
    ? blueprint.weeklyTopics
    : zoologySyllabus.filter(s => s.classLevel === blueprint.classLevel).map(s => s.name)

  let qId = 1
  const difficultyTargets = [
    ...Array(targetEasy).fill('easy'),
    ...Array(targetMedium).fill('medium'),
    ...Array(targetHard).fill('hard'),
  ]

  for (let i = 0; i < blueprint.numQuestions; i++) {
    const chapter = chapterNames[i % chapterNames.length]
    const chapterQuestions = mockQuestions[chapter] || mockQuestions['Animal Kingdom']
    const template = chapterQuestions[i % chapterQuestions.length]
    const targetDiff = difficultyTargets[i] as 'easy' | 'medium' | 'hard'

    questions.push({
      id: `q-${Date.now()}-${qId}`,
      stem: template.stem || `Question ${qId} about ${chapter}`,
      options: template.options || ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: template.correctAnswer ?? 0,
      explanation: template.explanation || `Explanation for ${chapter}`,
      chapter: chapter,
      subtopic: blueprint.weeklyTopics[0] || chapter,
      difficulty: targetDiff,
      neetRelevance: 4,
      usageCount: 0,
      lastUsed: null,
      status: 'draft',
      designNote: `Tests understanding of ${chapter}. Correct answer requires knowledge of key concepts.`,
      createdAt: new Date().toISOString(),
      classLevel: blueprint.classLevel,
    })
    qId++
  }

  return questions
}

export async function generateQuestions(blueprint: PaperBlueprint): Promise<Question[]> {
  // In sandbox: use mock questions
  // In production: this calls OpenAI with RAG retrieval
  // TODO: When deployed with real OpenAI key, implement full RAG pipeline here
  void blueprint // use blueprint to avoid unused param warning
  return generateMockQuestions(blueprint)
}

export function createBlueprint(formData: {
  classLevel: 11 | 12
  weeklyTopics: string[]
  numQuestions: number
  difficultySplit: { easy: number; medium: number; hard: number }
  includeAnswers: boolean
  includeExplanations: 'none' | 'brief' | 'full'
  avoidRecentWeeks: number
}): PaperBlueprint {
  return {
    id: `paper-${Date.now()}`,
    classLevel: formData.classLevel,
    weeklyTopics: formData.weeklyTopics,
    chapterIds: formData.weeklyTopics.map(t => {
      const ch = zoologySyllabus.find(s => s.name === t || s.subtopics.includes(t))
      return ch?.id || ''
    }).filter(Boolean),
    subtopicIds: [],
    numQuestions: formData.numQuestions,
    difficultySplit: formData.difficultySplit,
    questionFormat: 'neet_mcq',
    includeAnswers: formData.includeAnswers,
    includeExplanations: formData.includeExplanations,
    avoidRecentWeeks: formData.avoidRecentWeeks,
    language: 'english',
    status: 'draft',
    createdAt: new Date().toISOString(),
    generatedQuestions: [],
    approvedQuestions: [],
  }
}
