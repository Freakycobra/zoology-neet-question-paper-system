export interface SyllabusNode {
  id: string
  name: string
  classLevel: 11 | 12
  unit?: string
  chapter?: string
  subtopics: string[]
  neetWeightage?: number
}

export const zoologySyllabus: SyllabusNode[] = [
  // CLASS 11
  {
    id: '11-ch4',
    name: 'Animal Kingdom',
    classLevel: 11,
    unit: 'Unit 1: Diversity in Living World',
    chapter: 'Chapter 4',
    subtopics: [
      'Basis of Classification (levels of organisation, symmetry, coelom)',
      'Classification of Animals (Porifera, Coelenterata, Platyhelminthes, Aschelminthes)',
      'Annelida, Arthropoda, Mollusca, Echinodermata, Hemichordata, Chordata',
      'Salient features and examples of each phylum',
    ],
    neetWeightage: 4,
  },
  {
    id: '11-ch7',
    name: 'Structural Organisation in Animals',
    classLevel: 11,
    unit: 'Unit 2: Structural Organisation in Plants and Animals',
    chapter: 'Chapter 7',
    subtopics: [
      'Animal tissues: epithelial, connective, muscular, nervous',
      'Tissue organisation in organs and organ systems',
      'Morphology and anatomy of frog (digestive, circulatory, respiratory)',
    ],
    neetWeightage: 3,
  },
  {
    id: '11-ch9',
    name: 'Biomolecules',
    classLevel: 11,
    unit: 'Unit 3: Cell: Structure and Function',
    chapter: 'Chapter 9',
    subtopics: [
      'Primary and secondary metabolites',
      'Biomacromolecules (proteins, polysaccharides, nucleic acids)',
      'Structure of proteins (primary, secondary, tertiary, quaternary)',
      'Nature of bond linking monomers in a polymer',
      'Dynamic state of body constituents — concept of metabolism',
      'Enzymes: properties, classification, mechanism of action, factors affecting enzyme activity',
    ],
    neetWeightage: 3,
  },
  {
    id: '11-ch18',
    name: 'Body Fluids and Circulation',
    classLevel: 11,
    unit: 'Unit 5: Human Physiology',
    chapter: 'Chapter 18',
    subtopics: [
      'Blood: composition, plasma, formed elements',
      'Blood groups (ABO, Rh)',
      'Coagulation of blood',
      'Lymph (tissue fluid)',
      'Human circulatory system: structure of heart, cardiac cycle, ECG',
      'Double circulation',
      'Regulation of cardiac activity',
      'Disorders: hypertension, coronary artery disease, heart failure',
    ],
    neetWeightage: 3,
  },
  {
    id: '11-ch19',
    name: 'Excretory Products and Their Elimination',
    classLevel: 11,
    unit: 'Unit 5: Human Physiology',
    chapter: 'Chapter 19',
    subtopics: [
      'Modes of excretion: ammonotelism, ureotelism, uricotelism',
      'Human excretory system: structure of kidney, nephron',
      'Urine formation: glomerular filtration, tubular reabsorption, tubular secretion',
      'Regulation of kidney function: RAAS, ADH, ANF',
      'Micturition',
      'Role of other organs in excretion',
      'Disorders: uremia, renal failure, renal calculi, glycosuria',
    ],
    neetWeightage: 3,
  },
  {
    id: '11-ch20',
    name: 'Locomotion and Movement',
    classLevel: 11,
    unit: 'Unit 5: Human Physiology',
    chapter: 'Chapter 20',
    subtopics: [
      'Types of movement: ciliary, flagellar, muscular',
      'Muscle: skeletal, smooth, cardiac — structure and function',
      'Skeletal system: axial and appendicular skeleton',
      'Joints: fibrous, cartilaginous, synovial',
      'Disorders: myasthenia gravis, tetany, muscular dystrophy, arthritis, osteoporosis, gout',
      'Mechanism of muscle contraction: sliding filament theory',
    ],
    neetWeightage: 3,
  },
  {
    id: '11-ch21',
    name: 'Neural Control and Coordination',
    classLevel: 11,
    unit: 'Unit 5: Human Physiology',
    chapter: 'Chapter 21',
    subtopics: [
      'Neuron: structure and function',
      'Generation and conduction of nerve impulse',
      'Central nervous system: brain and spinal cord',
      'Reflex action and reflex arc',
      'Sensory reception and processing: eye, ear',
    ],
    neetWeightage: 3,
  },
  {
    id: '11-ch22',
    name: 'Chemical Coordination and Integration',
    classLevel: 11,
    unit: 'Unit 5: Human Physiology',
    chapter: 'Chapter 22',
    subtopics: [
      'Endocrine glands and hormones',
      'Human endocrine system: hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal, pancreas, gonads',
      'Mechanism of hormone action',
      'Disorders: dwarfism, acromegaly, cretinism, goitre, exophthalmic goitre, diabetes mellitus, Addison disease, Cushing syndrome',
    ],
    neetWeightage: 3,
  },
  // CLASS 12
  {
    id: '12-ch2',
    name: 'Human Reproduction',
    classLevel: 12,
    unit: 'Unit 6: Reproduction',
    chapter: 'Chapter 2',
    subtopics: [
      'Male reproductive system: testis, accessory ducts and glands',
      'Female reproductive system: ovary, fallopian tube, uterus, vagina, external genitalia',
      'Gametogenesis: spermatogenesis and oogenesis',
      'Menstrual cycle: phases and hormonal regulation',
      'Fertilisation, implantation, pregnancy, placenta',
      'Parturition and lactation',
    ],
    neetWeightage: 3,
  },
  {
    id: '12-ch3',
    name: 'Reproductive Health',
    classLevel: 12,
    unit: 'Unit 6: Reproduction',
    chapter: 'Chapter 3',
    subtopics: [
      'Reproductive health: problems and strategies',
      'Population explosion and birth control',
      'Contraceptive methods: natural, barrier, IUDs, oral pills, injectables, implants, surgical methods',
      'Medical termination of pregnancy (MTP)',
      'Sexually transmitted diseases (STDs): syphilis, gonorrhoea, HIV/AIDS, hepatitis-B',
      'Infertility and assisted reproductive technologies (ART): IVF, ZIFT, IUT, GIFT, ICSI, AI',
    ],
    neetWeightage: 2,
  },
  {
    id: '12-ch6',
    name: 'Evolution',
    classLevel: 12,
    unit: 'Unit 7: Genetics and Evolution',
    chapter: 'Chapter 6',
    subtopics: [
      'Origin of life: theories, abiogenesis, biogenesis',
      'Evolution: evidences from comparative anatomy, embryology, molecular biology, paleontology',
      'Adaptive radiation',
      'Biological evolution: Lamarckism, Darwinism, natural selection',
      'Mechanism of evolution: Hardy-Weinberg principle, genetic drift, mutation, gene flow',
      'Origin and evolution of humans',
    ],
    neetWeightage: 3,
  },
  {
    id: '12-ch7',
    name: 'Human Health and Disease',
    classLevel: 12,
    unit: 'Unit 8: Biology in Human Welfare',
    chapter: 'Chapter 7',
    subtopics: [
      'Common diseases in humans: infectious (bacterial, viral, protozoan, fungal, helminth)',
      'Immunity: innate and acquired, active and passive',
      'AIDS, cancer, drugs and alcohol abuse',
      'Basic concepts of immunology: antigens, antibodies, B-cells, T-cells, vaccines',
    ],
    neetWeightage: 3,
  },
  {
    id: '12-ch11',
    name: 'Biotechnology: Principles and Processes',
    classLevel: 12,
    unit: 'Unit 9: Biotechnology',
    chapter: 'Chapter 11',
    subtopics: [
      'Principles of biotechnology: genetic engineering, bioreactors, downstream processing',
      'Tools of recombinant DNA technology: restriction enzymes, ligase, vectors (plasmids, bacteriophages)',
      'Competent host cells',
      'Processes of recombinant DNA technology: isolation of DNA, fragmentation, ligation, transformation, selection',
      'PCR, gel electrophoresis',
    ],
    neetWeightage: 3,
  },
  {
    id: '12-ch12',
    name: 'Biotechnology and Its Applications',
    classLevel: 12,
    unit: 'Unit 9: Biotechnology',
    chapter: 'Chapter 12',
    subtopics: [
      'Biotechnological applications in agriculture: Bt crops, RNAi, pest-resistant plants',
      'Biotechnological applications in medicine: genetically engineered insulin, gene therapy, molecular diagnosis (PCR, ELISA)',
      'Transgenic animals',
      'Ethical issues in biotechnology',
    ],
    neetWeightage: 3,
  },
]

export function getChaptersForClass(classLevel: 11 | 12): SyllabusNode[] {
  return zoologySyllabus.filter((s) => s.classLevel === classLevel)
}

export function getAllSubtopics(): { id: string; name: string; classLevel: 11 | 12; chapter: string }[] {
  const subtopics: { id: string; name: string; classLevel: 11 | 12; chapter: string }[] = []
  zoologySyllabus.forEach((chapter) => {
    chapter.subtopics.forEach((sub, idx) => {
      subtopics.push({
        id: `${chapter.id}-sub${idx}`,
        name: sub,
        classLevel: chapter.classLevel,
        chapter: chapter.name,
      })
    })
  })
  return subtopics
}

export function getChapterById(id: string): SyllabusNode | undefined {
  return zoologySyllabus.find((s) => s.id === id)
}
