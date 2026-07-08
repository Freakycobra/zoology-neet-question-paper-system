import { StudentPaper, PaperResult, StudentDashboardData, NEETQuestion } from "@/types/student";

export const mockQuestions: NEETQuestion[] = [
  {
    id: "q1",
    stem: "Which of the following is the correct sequence of events in the transmission of a nerve impulse across a chemical synapse?",
    options: [
      "Depolarisation of presynaptic membrane → Release of neurotransmitter → Binding to receptors on postsynaptic membrane → Opening of ion channels → Postsynaptic potential",
      "Release of neurotransmitter → Depolarisation of presynaptic membrane → Binding to receptors → Opening of ion channels → Postsynaptic potential",
      "Depolarisation of presynaptic membrane → Binding to receptors → Release of neurotransmitter → Opening of ion channels → Postsynaptic potential",
      "Opening of ion channels → Depolarisation of presynaptic membrane → Release of neurotransmitter → Binding to receptors → Postsynaptic potential"
    ],
    correctAnswer: 0,
    explanation: "At a chemical synapse, the nerve impulse (action potential) first depolarises the presynaptic membrane. This depolarisation opens voltage-gated calcium channels, causing Ca²⁺ influx which triggers the release of neurotransmitter from synaptic vesicles. The neurotransmitter diffuses across the synaptic cleft and binds to receptors on the postsynaptic membrane, leading to the opening of ligand-gated ion channels and generation of a postsynaptic potential.",
    chapter: "Human Physiology",
    subtopic: "Neural Control and Coordination",
    difficulty: "medium",
    neetRelevance: 95,
    classLevel: 11
  },
  {
    id: "q2",
    stem: "The ciliated epithelium in the respiratory tract of humans helps in:",
    options: [
      "Absorption of oxygen from inspired air",
      "Removal of dust particles and microorganisms from inhaled air",
      "Exchange of gases between air and blood",
      "Production of mucus that traps bacteria"
    ],
    correctAnswer: 1,
    explanation: "The respiratory tract is lined by pseudostratified ciliated columnar epithelium. The cilia beat in a coordinated manner to move mucus (produced by goblet cells) along with trapped dust particles, microorganisms, and other foreign particles upward toward the pharynx, where they can be swallowed or expelled. This is known as the mucociliary escalator and is an important defense mechanism.",
    chapter: "Human Physiology",
    subtopic: "Breathing and Exchange of Gases",
    difficulty: "easy",
    neetRelevance: 85,
    classLevel: 11
  },
  {
    id: "q3",
    stem: "Which of the following hormones does NOT increase the blood glucose level?",
    options: [
      "Glucagon",
      "Cortisol",
      "Insulin",
      "Adrenaline"
    ],
    correctAnswer: 2,
    explanation: "Insulin is the only hormone among the options that decreases blood glucose levels. It is secreted by the beta cells of the islets of Langerhans in the pancreas. Insulin promotes the uptake of glucose by cells, glycogen synthesis in liver and muscle, and inhibits gluconeogenesis. Glucagon, cortisol, and adrenaline (epinephrine) are all hyperglycemic hormones that raise blood glucose levels.",
    chapter: "Human Physiology",
    subtopic: "Chemical Coordination and Integration",
    difficulty: "easy",
    neetRelevance: 90,
    classLevel: 11
  },
  {
    id: "q4",
    stem: "In a cross between a male Drosophila with genotype AaBb and a female with genotype aabb, the progeny showed the following ratio: AaBb : aaBb : Aabb : aabb = 1:1:1:1. What can be concluded about the genes A and B?",
    options: [
      "The genes are linked on the same chromosome",
      "The genes are on different chromosomes and assort independently",
      "The genes show incomplete linkage",
      "The genes are sex-linked"
    ],
    correctAnswer: 1,
    explanation: "The 1:1:1:1 ratio obtained from a test cross (AaBb × aabb) is characteristic of independent assortment. If the genes were linked, we would see a significantly higher proportion of parental types (AaBb and aabb) compared to recombinant types (aaBb and Aabb). The equal proportions of all four types indicate that the genes are on different chromosomes and follow Mendel's law of independent assortment.",
    chapter: "Genetics and Evolution",
    subtopic: "Principles of Inheritance and Variation",
    difficulty: "hard",
    neetRelevance: 92,
    classLevel: 12
  },
  {
    id: "q5",
    stem: "The process of spermatogenesis in humans begins at:",
    options: [
      "Birth",
      "Puberty",
      "Embryonic stage",
      "Throughout life from conception"
    ],
    correctAnswer: 1,
    explanation: "Spermatogenesis (sperm production) begins at puberty in males, triggered by increased secretion of Gonadotropin-Releasing Hormone (GnRH) from the hypothalamus. This stimulates the anterior pituitary to release Follicle-Stimulating Hormone (FSH) and Luteinizing Hormone (LH). FSH acts on Sertoli cells in the seminiferous tubules to stimulate spermatogenesis, while LH stimulates Leydig cells to produce testosterone.",
    chapter: "Reproduction",
    subtopic: "Human Reproduction",
    difficulty: "easy",
    neetRelevance: 88,
    classLevel: 12
  },
  {
    id: "q6",
    stem: "Which of the following statements about restriction enzymes is CORRECT?",
    options: [
      "They are found only in eukaryotic cells",
      "They cut DNA at random sequences",
      "They protect bacteria by cutting foreign DNA",
      "They always produce blunt ends"
    ],
    correctAnswer: 2,
    explanation: "Restriction enzymes (restriction endonucleases) are found in bacteria and archaea. They function as a defense mechanism by cutting foreign DNA (such as viral DNA) at specific recognition sequences. The bacterial cell's own DNA is protected by methylation at these sites. Restriction enzymes produce either sticky ends (overhanging single-stranded ends) or blunt ends depending on the enzyme type.",
    chapter: "Biotechnology",
    subtopic: "Biotechnology: Principles and Processes",
    difficulty: "medium",
    neetRelevance: 93,
    classLevel: 12
  },
  {
    id: "q7",
    stem: "The haemoglobin content per 100 mL of blood in a healthy adult human is approximately:",
    options: [
      "5-8 grams",
      "12-16 grams",
      "20-25 grams",
      "2-4 grams"
    ],
    correctAnswer: 1,
    explanation: "In a healthy adult human, the normal haemoglobin concentration is approximately 12-16 g/dL (grams per deciliter, or per 100 mL) in females and 13.5-17.5 g/dL in males. Haemoglobin is the oxygen-carrying protein in red blood cells, composed of four polypeptide chains (two alpha and two beta) and four heme groups, each containing an iron atom that binds to one oxygen molecule.",
    chapter: "Human Physiology",
    subtopic: "Body Fluids and Circulation",
    difficulty: "easy",
    neetRelevance: 80,
    classLevel: 11
  },
  {
    id: "q8",
    stem: "Which type of immunity is provided by the injection of antiserum containing antibodies?",
    options: [
      "Active natural immunity",
      "Active artificial immunity",
      "Passive natural immunity",
      "Passive artificial immunity"
    ],
    correctAnswer: 3,
    explanation: "The injection of antiserum (serum containing pre-formed antibodies) provides passive artificial immunity. It is 'passive' because the recipient's immune system does not produce the antibodies itself, and 'artificial' because it is introduced through medical intervention. Examples include antitetanus serum (ATS) and antirabies serum. This provides immediate but temporary protection as the antibodies are gradually catabolized.",
    chapter: "Human Health and Disease",
    subtopic: "Immunity",
    difficulty: "medium",
    neetRelevance: 90,
    classLevel: 12
  },
  {
    id: "q9",
    stem: "According to the Hardy-Weinberg equilibrium, which of the following would NOT disturb the genetic equilibrium of a population?",
    options: [
      "Gene flow",
      "Genetic drift",
      "Random mating",
      "Mutation"
    ],
    correctAnswer: 2,
    explanation: "Random mating is one of the conditions REQUIRED for Hardy-Weinberg equilibrium, not a disturbing factor. The five conditions for maintaining genetic equilibrium are: (1) large population size, (2) random mating, (3) no mutations, (4) no gene flow (migration), and (5) no natural selection. Gene flow, genetic drift, mutation, and natural selection are all evolutionary forces that can disturb the equilibrium.",
    chapter: "Genetics and Evolution",
    subtopic: "Evolution",
    difficulty: "medium",
    neetRelevance: 87,
    classLevel: 12
  },
  {
    id: "q10",
    stem: "The amphibians first appeared on Earth during the:",
    options: [
      "Devonian period",
      "Carboniferous period",
      "Permian period",
      "Silurian period"
    ],
    correctAnswer: 0,
    explanation: "Amphibians first appeared during the Devonian period (approximately 419-359 million years ago). The first amphibians, such as Ichthyostega and Acanthostega, evolved from lobe-finned fishes (Sarcopterygii) and are considered the first vertebrates to colonize land. The Devonian period is often called the 'Age of Fishes' and saw the transition of vertebrate life from aquatic to terrestrial environments.",
    chapter: "Animal Kingdom",
    subtopic: "Classification of Animals",
    difficulty: "hard",
    neetRelevance: 75,
    classLevel: 11
  },
  {
    id: "q11",
    stem: "Which of the following is a characteristic feature of birds that helps in flight?",
    options: [
      "Four-chambered heart",
      "Pneumatic bones",
      "Endothermy",
      "Feathers"
    ],
    correctAnswer: 1,
    explanation: "Pneumatic bones (hollow bones filled with air spaces) are a specific adaptation in birds that reduces body weight, making flight easier. While all the options are characteristics of birds, pneumatic bones are the most directly related to flight adaptation. They are connected to the respiratory system and contain extensions of air sacs. This reduces the overall body density while maintaining structural strength.",
    chapter: "Animal Kingdom",
    subtopic: "Aves",
    difficulty: "medium",
    neetRelevance: 82,
    classLevel: 11
  },
  {
    id: "q12",
    stem: "During muscle contraction, the length of which of the following remains unchanged?",
    options: [
      "A-band",
      "I-band",
      "H-zone",
      "Thin filament"
    ],
    correctAnswer: 0,
    explanation: "During muscle contraction, the A-band (the dark band containing the entire length of thick myosin filaments) remains constant in length. The I-band (containing only thin actin filaments) shortens, the H-zone (the central region of the A-band containing only thick filaments) shortens or disappears, and the thin filaments slide past the thick filaments. This is explained by the sliding filament theory of muscle contraction.",
    chapter: "Human Physiology",
    subtopic: "Locomotion and Movement",
    difficulty: "medium",
    neetRelevance: 88,
    classLevel: 11
  },
  {
    id: "q13",
    stem: "The enzyme nitrogenase functions under which of the following conditions?",
    options: [
      "Aerobic, high temperature",
      "Anaerobic, room temperature",
      "Anaerobic, high temperature",
      "Aerobic, room temperature"
    ],
    correctAnswer: 1,
    explanation: "Nitrogenase, the enzyme responsible for biological nitrogen fixation, functions under anaerobic conditions at room temperature. The enzyme is extremely sensitive to oxygen and is irreversibly inactivated by O₂. Nitrogen-fixing organisms have evolved various mechanisms to protect nitrogenase from oxygen, such as heterocyst formation in cyanobacteria (which have thickened cell walls and lack photosystem II), leghemoglobin in legume root nodules, or rapid respiration in free-living bacteria like Azotobacter.",
    chapter: "Biotechnology",
    subtopic: "Microbes in Human Welfare",
    difficulty: "hard",
    neetRelevance: 85,
    classLevel: 12
  },
  {
    id: "q14",
    stem: "In which part of the human digestive system does maximum absorption of nutrients occur?",
    options: [
      "Stomach",
      "Large intestine",
      "Small intestine",
      "Oesophagus"
    ],
    correctAnswer: 2,
    explanation: "The small intestine is the primary site for the digestion and absorption of nutrients. It has several structural adaptations for absorption: (1) Circular folds (plicae circulares) that increase surface area, (2) Villi - finger-like projections lined with epithelial cells, (3) Microvilli on the epithelial cells forming a 'brush border' that further increases surface area. The total absorptive surface area of the small intestine is approximately 200-250 square meters.",
    chapter: "Human Physiology",
    subtopic: "Digestion and Absorption",
    difficulty: "easy",
    neetRelevance: 85,
    classLevel: 11
  },
  {
    id: "q15",
    stem: "Which of the following contraceptive methods works by preventing implantation?",
    options: [
      "Rhythm method",
      "Condoms",
      "Intrauterine devices (IUDs)",
      "Coitus interruptus"
    ],
    correctAnswer: 2,
    explanation: "Intrauterine devices (IUDs) such as Copper-T (Cu-T) work primarily by preventing implantation of the blastocyst in the uterine wall. Copper ions released from Cu-T increase the number of phagocytic cells in the endometrium and accelerate tubal motility, preventing fertilization and implantation. Hormonal IUDs (like LNG-20) also thicken cervical mucus, making sperm penetration difficult, and cause endometrial changes that prevent implantation.",
    chapter: "Reproduction",
    subtopic: "Reproductive Health",
    difficulty: "medium",
    neetRelevance: 86,
    classLevel: 12
  },
  {
    id: "q16",
    stem: "The excretory organs of cockroach (Periplaneta) are:",
    options: [
      "Nephridia",
      "Malpighian tubules",
      "Green glands",
      "Flame cells"
    ],
    correctAnswer: 1,
    explanation: "Cockroaches (Periplaneta americana) have Malpighian tubules as their excretory organs. These are fine, yellow, thread-like blind tubules present at the junction of the midgut and hindgut. They absorb nitrogenous waste products and water from the haemolymph and release them into the hindgut. Nephridia are found in earthworms, green glands in crustaceans (like Prawn), and flame cells in flatworms (like Planaria).",
    chapter: "Animal Kingdom",
    subtopic: "Structural Organisation in Animals",
    difficulty: "medium",
    neetRelevance: 78,
    classLevel: 11
  },
  {
    id: "q17",
    stem: "Polymerase Chain Reaction (PCR) does NOT require:",
    options: [
      "DNA template",
      "Taq polymerase",
      "Primers",
      "Reverse transcriptase"
    ],
    correctAnswer: 3,
    explanation: "Standard PCR does not require reverse transcriptase. Reverse transcriptase is used in RT-PCR (Reverse Transcription PCR) to first convert RNA to cDNA before amplification. Standard PCR requires: (1) DNA template containing the target sequence, (2) two primers (forward and reverse) complementary to the sequences flanking the target, (3) Taq polymerase (a thermostable DNA polymerase from Thermus aquaticus), (4) dNTPs (deoxynucleotide triphosphates), and (5) buffer with Mg²⁺ ions.",
    chapter: "Biotechnology",
    subtopic: "Biotechnology: Principles and Processes",
    difficulty: "medium",
    neetRelevance: 91,
    classLevel: 12
  },
  {
    id: "q18",
    stem: "The sliding filament theory of muscle contraction was proposed by:",
    options: [
      "H.E. Huxley and A.F. Huxley",
      "A.F. Huxley and Niedergerke",
      "H.E. Huxley and J. Hanson",
      "Watson and Crick"
    ],
    correctAnswer: 2,
    explanation: "The sliding filament theory of muscle contraction was independently proposed by H.E. Huxley and J. Hanson in 1954. According to this theory, during muscle contraction, the thin (actin) filaments slide past the thick (myosin) filaments, causing the sarcomere to shorten. The myosin heads bind to actin, forming cross-bridges, and undergo a power stroke that pulls the thin filaments toward the center of the sarcomere. The length of the thick and thin filaments remains constant; only their degree of overlap changes.",
    chapter: "Human Physiology",
    subtopic: "Locomotion and Movement",
    difficulty: "hard",
    neetRelevance: 80,
    classLevel: 11
  },
  {
    id: "q19",
    stem: "Which of the following diseases is caused by a prion?",
    options: [
      "AIDS",
      "Hepatitis B",
      "Creutzfeldt-Jakob disease",
      "Malaria"
    ],
    correctAnswer: 2,
    explanation: "Creutzfeldt-Jakob disease (CJD) is a fatal neurodegenerative disorder caused by prions - infectious protein particles that lack nucleic acid (DNA or RNA). Prions are misfolded forms of normal cellular prion protein (PrPᶜ). They convert normal PrPᶜ into the abnormal PrPˢᶜ form, leading to aggregation and neuronal damage. Other prion diseases include BSE (Bovine Spongiform Encephalopathy or 'mad cow disease') in cattle and scrapie in sheep. AIDS is caused by HIV (a retrovirus), Hepatitis B by HBV (a DNA virus), and Malaria by Plasmodium (a protozoan parasite).",
    chapter: "Human Health and Disease",
    subtopic: "Common Human Diseases",
    difficulty: "hard",
    neetRelevance: 88,
    classLevel: 12
  },
  {
    id: "q20",
    stem: "The corpus luteum secretes which hormone to maintain the endometrium during early pregnancy?",
    options: [
      "Estrogen",
      "Progesterone",
      "FSH",
      "LH"
    ],
    correctAnswer: 1,
    explanation: "The corpus luteum (formed from the ruptured Graafian follicle after ovulation) secretes progesterone, which is essential for maintaining the thickened endometrium (secretory phase) for implantation and early pregnancy. If fertilization occurs, the developing blastocyst produces human Chorionic Gonadotropin (hCG) which maintains the corpus luteum during the first trimester. After about 12 weeks, the placenta takes over progesterone production.",
    chapter: "Reproduction",
    subtopic: "Human Reproduction",
    difficulty: "medium",
    neetRelevance: 90,
    classLevel: 12
  },
  {
    id: "q21",
    stem: "Which of the following groups of animals are homeothermic?",
    options: [
      "Reptiles and amphibians",
      "Birds and mammals",
      "Fishes and reptiles",
      "Amphibians and fishes"
    ],
    correctAnswer: 1,
    explanation: "Homeothermy (or endothermy) is the ability to maintain a constant body temperature independent of the environment. Birds and mammals are homeothermic (warm-blooded) animals. They maintain high body temperature through metabolic heat production. Reptiles, amphibians, and fishes are poikilothermic (cold-blooded/ectothermic), meaning their body temperature varies with the environmental temperature.",
    chapter: "Animal Kingdom",
    subtopic: "Classification of Animals",
    difficulty: "easy",
    neetRelevance: 80,
    classLevel: 11
  },
  {
    id: "q22",
    stem: "The refractive power of the eye is primarily changed by:",
    options: [
      "Changing the curvature of the lens",
      "Changing the curvature of the cornea",
      "Changing the distance between lens and retina",
      "Changing the pupil size"
    ],
    correctAnswer: 0,
    explanation: "Accommodation (the ability of the eye to focus on objects at different distances) is achieved primarily by changing the curvature of the lens. When viewing near objects, the ciliary muscles contract, relaxing the suspensory ligaments and allowing the elastic lens to become more convex (thicker), increasing its refractive power. When viewing distant objects, the ciliary muscles relax, tightening the suspensory ligaments and flattening the lens.",
    chapter: "Human Physiology",
    subtopic: "Sensory Mechanism",
    difficulty: "medium",
    neetRelevance: 85,
    classLevel: 11
  },
  {
    id: "q23",
    stem: "In Mendel's dihybrid cross, the phenotypic ratio in F₂ generation is:",
    options: [
      "1:2:1",
      "9:3:3:1",
      "3:1",
      "1:1:1:1"
    ],
    correctAnswer: 1,
    explanation: "In Mendel's dihybrid cross (cross between parents differing in two pairs of contrasting characters), the phenotypic ratio in the F₂ generation is 9:3:3:1. This represents: 9 individuals showing both dominant traits, 3 showing the first dominant and second recessive trait, 3 showing the first recessive and second dominant trait, and 1 showing both recessive traits. This ratio is the result of the independent assortment of two different gene pairs during gamete formation.",
    chapter: "Genetics and Evolution",
    subtopic: "Principles of Inheritance and Variation",
    difficulty: "easy",
    neetRelevance: 95,
    classLevel: 12
  },
  {
    id: "q24",
    stem: "The enzyme pepsin in the stomach is active at a pH of approximately:",
    options: [
      "2.0",
      "7.0",
      "8.5",
      "10.0"
    ],
    correctAnswer: 0,
    explanation: "Pepsin, a proteolytic enzyme secreted by the chief cells of the gastric glands in the stomach, is active at a highly acidic pH of approximately 2.0. It is secreted as an inactive precursor pepsinogen, which is activated to pepsin by hydrochloric acid (HCl) secreted by parietal cells. Pepsin hydrolyzes proteins into smaller peptides (proteoses and peptones). At neutral or alkaline pH, pepsin becomes denatured and inactive.",
    chapter: "Human Physiology",
    subtopic: "Digestion and Absorption",
    difficulty: "easy",
    neetRelevance: 82,
    classLevel: 11
  },
  {
    id: "q25",
    stem: "Vaccination works on the principle of:",
    options: [
      "Passive immunity",
      "Developing immunological memory",
      "Direct destruction of pathogens",
      "Stimulating immediate allergic response"
    ],
    correctAnswer: 1,
    explanation: "Vaccination (immunization) works on the principle of developing immunological memory. A vaccine contains weakened, killed, or inactivated pathogens or their antigenic components (subunit vaccines). When administered, the vaccine stimulates the primary immune response, producing memory B cells and memory T cells without causing the disease. Upon subsequent exposure to the actual pathogen, these memory cells mount a rapid and enhanced secondary immune response, preventing infection or reducing its severity.",
    chapter: "Human Health and Disease",
    subtopic: "Immunity",
    difficulty: "easy",
    neetRelevance: 88,
    classLevel: 12
  }
];

export const mockPapers: StudentPaper[] = [
  {
    id: "paper-1",
    title: "Weekly Test - Human Physiology & Animal Kingdom",
    topics: ["Human Physiology", "Animal Kingdom"],
    numQuestions: 25,
    difficultyMix: { easy: 8, medium: 12, hard: 5 },
    date: "2026-01-15",
    duration: 45,
    status: "available",
    classLevel: 11,
    questions: mockQuestions
  },
  {
    id: "paper-2",
    title: "NEET Drill - Biotechnology & Reproduction",
    topics: ["Biotechnology", "Reproduction"],
    numQuestions: 25,
    difficultyMix: { easy: 6, medium: 12, hard: 7 },
    date: "2026-01-18",
    duration: 45,
    status: "available",
    classLevel: 12,
    questions: mockQuestions
  },
  {
    id: "paper-3",
    title: "Revision Test - Genetics & Human Health",
    topics: ["Genetics and Evolution", "Human Health and Disease"],
    numQuestions: 25,
    difficultyMix: { easy: 7, medium: 11, hard: 7 },
    date: "2026-01-22",
    duration: 45,
    status: "available",
    classLevel: 12,
    questions: mockQuestions
  }
];

export const mockCompletedResults: PaperResult[] = [
  {
    paperId: "paper-0",
    paperTitle: "Weekly Test - Animal Kingdom Basics",
    score: 72,
    totalQuestions: 25,
    correct: 19,
    incorrect: 3,
    unanswered: 3,
    neetScore: (19 * 4) - (3 * 1),
    totalNeetScore: 25 * 4,
    percentage: 76,
    grade: "B+",
    timeTaken: 2430,
    date: "2026-01-08",
    chapterPerformance: [
      { chapter: "Animal Kingdom", correct: 14, total: 18 },
      { chapter: "Structural Organisation", correct: 5, total: 7 }
    ],
    difficultyPerformance: {
      easy: { correct: 7, total: 8 },
      medium: { correct: 9, total: 12 },
      hard: { correct: 3, total: 5 }
    }
  },
  {
    paperId: "paper-prev-1",
    paperTitle: "NEET Mock - Human Physiology Focus",
    score: 84,
    totalQuestions: 25,
    correct: 22,
    incorrect: 2,
    unanswered: 1,
    neetScore: (22 * 4) - (2 * 1),
    totalNeetScore: 25 * 4,
    percentage: 88,
    grade: "A",
    timeTaken: 2580,
    date: "2026-01-02",
    chapterPerformance: [
      { chapter: "Human Physiology", correct: 18, total: 20 },
      { chapter: "Body Fluids", correct: 4, total: 5 }
    ],
    difficultyPerformance: {
      easy: { correct: 8, total: 8 },
      medium: { correct: 11, total: 12 },
      hard: { correct: 3, total: 5 }
    }
  }
];

export const mockDashboardData: StudentDashboardData = {
  studentName: "Priya Sharma",
  averageScore: 78,
  papersTaken: 8,
  bestChapter: "Human Physiology",
  totalPapers: 12,
  rank: 3,
  streak: 5
};
