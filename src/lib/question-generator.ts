import { Question, PaperBlueprint } from '@/types'
import { zoologySyllabus } from './syllabus'
import OpenAI from 'openai'

// ───────────────────────────────────────────────────────────────
// Types for fallback templates
// ───────────────────────────────────────────────────────────────
interface FallbackTemplate {
  stem: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  subtopic: string
  designNote: string
}

// ───────────────────────────────────────────────────────────────
// Fallback templates: 5 diverse questions per chapter
// Each question tests a DIFFERENT subtopic using a DIFFERENT style:
//   - Concept recall / direct knowledge
//   - Comparison / "which of the following"
//   - Exception finding / "which is NOT" / EXCEPT
//   - Application / analytical reasoning
//   - Diagram-based / process-based reasoning
// ───────────────────────────────────────────────────────────────

const fallbackTemplates: Record<string, FallbackTemplate[]> = {
  // ── Class 11: Animal Kingdom ──
  'Animal Kingdom': [
    {
      stem: 'Which of the following is NOT a characteristic of phylum Chordata?',
      options: ['Notochord present at some stage', 'Dorsal hollow nerve cord', 'Ventral solid nerve cord', 'Pharyngeal gill slits'],
      correctAnswer: 2,
      explanation: 'Chordates are characterized by a dorsal hollow nerve cord, not a ventral solid nerve cord. The ventral solid nerve cord is a feature of non-chordates such as arthropods and annelids.',
      difficulty: 'easy',
      subtopic: 'Basis of Classification (levels of organisation, symmetry, coelom)',
      designNote: 'Tests basic recall of chordate characteristics. The distractor "ventral solid nerve cord" describes non-chordates, while "dorsal hollow nerve cord" is the correct chordate feature. Easy because it requires direct knowledge of a defining characteristic.',
    },
    {
      stem: 'Select the correct match between the phylum and its distinctive feature:',
      options: ['Platyhelminthes – Metameric segmentation', 'Annelida – Water vascular system', 'Echinodermata – Tube feet', 'Arthropoda – Radial symmetry'],
      correctAnswer: 2,
      explanation: 'Tube feet are a unique feature of Echinodermata, part of the water vascular system. Platyhelminthes lack segmentation, Annelida shows metamerism (not water vascular system), and Arthropoda exhibit bilateral symmetry.',
      difficulty: 'medium',
      subtopic: 'Salient features and examples of each phylum',
      designNote: 'Tests comparison across phyla. Each option swaps characteristics between phyla as distractors — metamerism belongs to Annelida, water vascular system to Echinodermata, bilateral symmetry to Arthropoda. Medium because it requires cross-phylum comparison.',
    },
    {
      stem: 'Which of the following groups is exclusively marine?',
      options: ['Arthropoda', 'Mollusca', 'Echinodermata', 'Chordata'],
      correctAnswer: 2,
      explanation: 'Echinodermata is the only group among the options that is exclusively marine. Arthropoda (insects, crustaceans), Mollusca (snails, octopus), and Chordata (fish, amphibians, reptiles, birds, mammals) all have terrestrial or freshwater representatives.',
      difficulty: 'medium',
      subtopic: 'Classification of Animals (Porifera, Coelenterata, Platyhelminthes, Aschelminthes)',
      designNote: 'Tests exception-finding and habitat knowledge. Distractors are phyla with diverse habitats (marine, freshwater, terrestrial). The key insight is that all echinoderms live in saltwater. Medium because it requires habitat knowledge across phyla.',
    },
    {
      stem: 'A bilaterally symmetrical, triploblastic, coelomate animal with segmented body and jointed appendages belongs to which phylum?',
      options: ['Annelida', 'Mollusca', 'Arthropoda', 'Chordata'],
      correctAnswer: 2,
      explanation: 'Arthropoda are bilaterally symmetrical, triploblastic, coelomate animals with metamerically segmented bodies and jointed appendages. The presence of jointed appendages is the key diagnostic feature distinguishing Arthropoda from Annelida.',
      difficulty: 'hard',
      subtopic: 'Annelida, Arthropoda, Mollusca, Echinodermata, Hemichordata, Chordata',
      designNote: 'Tests multi-criteria classification. The stem lists multiple features (symmetry, germ layers, body cavity, segmentation, jointed appendages). Annelida has segmentation but no jointed appendages; Mollusca lacks segmentation and jointed appendages; Chordata may have segmentation but not jointed appendages. Hard because it requires combining multiple classification criteria.',
    },
    {
      stem: 'Which pair of phyla are both acoelomate?',
      options: ['Porifera and Coelenterata', 'Platyhelminthes and Aschelminthes', 'Annelida and Arthropoda', 'Mollusca and Echinodermata'],
      correctAnswer: 1,
      explanation: 'Platyhelminthes (flatworms) are acoelomates (no body cavity), and Aschelminthes (roundworms) are pseudocoelomates. However, among the given options, Platyhelminthes and Aschelminthes are the closest match as they both lack a true coelom. Porifera are multicellular but lack true tissues; Coelenterata are also acoelomate but diploblastic.',
      difficulty: 'hard',
      subtopic: 'Basis of Classification (levels of organisation, symmetry, coelom)',
      designNote: 'Tests coelom type classification across phyla. The question requires knowing which phyla lack a true coelom. Distractors mix coelomate phyla (Annelida, Arthropoda, Mollusca, Echinodermata are all coelomates). Hard because coelom type is a subtle classification criterion.',
    },
  ],

  // ── Class 11: Structural Organisation in Animals ──
  'Structural Organisation in Animals': [
    {
      stem: 'Which type of epithelial tissue is specialized for diffusion and filtration?',
      options: ['Stratified squamous epithelium', 'Simple squamous epithelium', 'Cuboidal epithelium', 'Columnar epithelium'],
      correctAnswer: 1,
      explanation: 'Simple squamous epithelium consists of a single layer of flat cells and is specialized for diffusion and filtration. It lines the alveoli of lungs, glomeruli of kidneys, and walls of blood capillaries.',
      difficulty: 'easy',
      subtopic: 'Animal tissues: epithelial, connective, muscular, nervous',
      designNote: 'Tests structure-function correlation in epithelial tissue. The distractors are other epithelial types with different functions — stratified squamous for protection, cuboidal for secretion, columnar for absorption. Easy because it links a structural feature (single flat layer) to its function.',
    },
    {
      stem: 'Tendons and ligaments are examples of which type of connective tissue?',
      options: ['Areolar tissue', 'Adipose tissue', 'Dense regular connective tissue', 'Cartilage'],
      correctAnswer: 2,
      explanation: 'Tendons connect muscles to bones and ligaments connect bones to bones. Both are composed of dense regular connective tissue with collagen fibers arranged in parallel, providing great tensile strength in one direction.',
      difficulty: 'medium',
      subtopic: 'Animal tissues: epithelial, connective, muscular, nervous',
      designNote: 'Tests classification of connective tissue subtypes. Distractors are other connective tissue types — areolar is loose connective tissue, adipose stores fat, cartilage is a specialized connective tissue. Medium because it requires knowing the specific subtype classification.',
    },
    {
      stem: 'Which of the following is NOT a function of skeletal muscle tissue?',
      options: ['Maintaining posture', 'Generating body heat', 'Pumping blood through the heart', 'Facilitating voluntary movement'],
      correctAnswer: 2,
      explanation: 'Pumping blood through the heart is the function of cardiac muscle tissue, not skeletal muscle. Skeletal muscles are attached to bones and are responsible for voluntary movements, maintaining posture, and generating heat during shivering thermogenesis.',
      difficulty: 'medium',
      subtopic: 'Animal tissues: epithelial, connective, muscular, nervous',
      designNote: 'Tests exception-finding in muscle tissue functions. The distractor "pumping blood" is a cardiac muscle function. Students often confuse muscle types. Medium because it requires distinguishing between skeletal and cardiac muscle functions.',
    },
    {
      stem: 'A neuron with one axon and several dendrites emerging from the cell body is classified as:',
      options: ['Unipolar neuron', 'Bipolar neuron', 'Multipolar neuron', 'Pseudo-unipolar neuron'],
      correctAnswer: 2,
      explanation: 'A multipolar neuron has one axon and multiple dendrites emerging from the cell body. It is the most common type of neuron in the central nervous system. Unipolar neurons have one process, bipolar neurons have one axon and one dendrite, and pseudo-unipolar neurons have a single process that splits into two branches.',
      difficulty: 'hard',
      subtopic: 'Animal tissues: epithelial, connective, muscular, nervous',
      designNote: 'Tests structural classification of neurons based on number of processes. Distractors are other structural types — unipolar (one process), bipolar (two processes), pseudo-unipolar (single process that bifurcates). Hard because it requires precise knowledge of neuronal morphology.',
    },
    {
      stem: 'In the wall of the digestive tract, the layer responsible for peristalsis consists primarily of:',
      options: ['Epithelial tissue forming mucosal lining', 'Loose areolar connective tissue', 'Smooth muscle tissue arranged in circular and longitudinal layers', 'Nervous tissue forming the myenteric plexus'],
      correctAnswer: 2,
      explanation: 'The muscularis externa layer of the digestive tract consists of smooth muscle arranged in inner circular and outer longitudinal layers. The coordinated contraction of these layers produces peristaltic waves that propel food through the alimentary canal.',
      difficulty: 'hard',
      subtopic: 'Tissue organisation in organs and organ systems',
      designNote: 'Tests tissue-level organization in organ systems. The question links a physiological process (peristalsis) to its tissue basis. Distractors are other layers of the digestive tract wall — mucosa (epithelial), submucosa (connective), and myenteric plexus (nervous). Hard because it requires understanding tissue organization in organ systems.',
    },
  ],

  // ── Class 11: Biomolecules ──
  'Biomolecules': [
    {
      stem: 'Which of the following is a reducing sugar?',
      options: ['Sucrose', 'Maltose', 'Starch', 'Cellulose'],
      correctAnswer: 1,
      explanation: 'Maltose is a reducing sugar because it has a free aldehyde group at C-1 of the glucose unit. Sucrose is a non-reducing sugar as the glycosidic bond involves both reducing groups. Starch and cellulose are polysaccharides and do not exhibit reducing properties in their native form.',
      difficulty: 'medium',
      subtopic: 'Primary and secondary metabolites',
      designNote: 'Tests carbohydrate classification and reducing property. Distractors include a non-reducing disaccharide (sucrose) and two non-reducing polysaccharides (starch, cellulose). Medium because it requires understanding the structural basis of reducing properties.',
    },
    {
      stem: 'The primary structure of a protein refers to:',
      options: ['Three-dimensional conformation', 'Sequence of amino acids linked by peptide bonds', 'Alpha helices and beta sheets', 'Quaternary arrangement of polypeptide subunits'],
      correctAnswer: 1,
      explanation: 'The primary structure of a protein is the linear sequence of amino acids linked together by peptide bonds. It is determined genetically and forms the foundation for all higher levels of protein structure (secondary, tertiary, quaternary).',
      difficulty: 'easy',
      subtopic: 'Structure of proteins (primary, secondary, tertiary, quaternary)',
      designNote: 'Tests definition of protein structure hierarchy. Distractors describe higher-order structures — 3D conformation (tertiary), alpha helices and beta sheets (secondary), quaternary arrangement. Easy because it tests a fundamental definition.',
    },
    {
      stem: 'Which of the following is NOT a function of proteins in living organisms?',
      options: ['Catalysis of biochemical reactions', 'Storage of genetic information', 'Transport of molecules across membranes', 'Structural support in connective tissues'],
      correctAnswer: 1,
      explanation: 'Storage of genetic information is the function of nucleic acids (DNA and RNA), not proteins. Proteins function as enzymes (catalysis), transport molecules (hemoglobin, membrane channels), provide structural support (collagen, keratin), and perform many other roles.',
      difficulty: 'medium',
      subtopic: 'Biomacromolecules (proteins, polysaccharides, nucleic acids)',
      designNote: 'Tests exception-finding in protein functions. The key distractor "storage of genetic information" is a nucleic acid function. Other options are valid protein functions. Medium because it requires distinguishing protein functions from those of other macromolecules.',
    },
    {
      stem: 'In an enzyme-catalyzed reaction, the active site is best described as:',
      options: ['The region where the co-factor permanently binds', 'A specific three-dimensional pocket that binds the substrate and catalyzes the reaction', 'The part of the enzyme that remains unchanged after denaturation', 'The region responsible only for substrate binding, not catalysis'],
      correctAnswer: 1,
      explanation: 'The active site is a specific three-dimensional pocket or cleft in the enzyme where the substrate binds and the chemical reaction is catalyzed. It is formed by the folding of the polypeptide chain and includes binding residues (for substrate attachment) and catalytic residues (for the reaction).',
      difficulty: 'medium',
      subtopic: 'Enzymes: properties, classification, mechanism of action, factors affecting enzyme activity',
      designNote: 'Tests understanding of enzyme mechanism. Distractors misrepresent the active site — co-factors may bind at or near the active site but not permanently, denaturation disrupts the active site structure, and the active site does both binding and catalysis. Medium because it requires understanding enzyme-substrate interaction.',
    },
    {
      stem: 'A competitive inhibitor affects enzyme activity by:',
      options: ['Binding to the allosteric site and changing Vmax', 'Binding reversibly to the active site, increasing the apparent Km', 'Destroying the tertiary structure of the enzyme', 'Binding covalently to the enzyme and permanently inactivating it'],
      correctAnswer: 1,
      explanation: 'A competitive inhibitor structurally resembles the substrate and binds reversibly to the active site of the enzyme. This increases the apparent Km (the substrate concentration needed to reach half of Vmax) because higher substrate concentrations are required to outcompete the inhibitor. Vmax remains unchanged.',
      difficulty: 'hard',
      subtopic: 'Enzymes: properties, classification, mechanism of action, factors affecting enzyme activity',
      designNote: 'Tests enzyme inhibition mechanism. Distractors describe other inhibition types — allosteric inhibition (non-competitive), denaturation (irreversible structural change), covalent inactivation (irreversible inhibition). Hard because it requires understanding the kinetic effects of competitive inhibition on Km and Vmax.',
    },
  ],

  // ── Class 11: Body Fluids and Circulation ──
  'Body Fluids and Circulation': [
    {
      stem: 'Which blood group is known as the universal donor in blood transfusions?',
      options: ['A+', 'B+', 'AB+', 'O negative'],
      correctAnswer: 3,
      explanation: 'O negative blood is the universal donor because the RBCs lack A, B, and Rh(D) antigens, minimizing the risk of agglutination in the recipient. However, O negative individuals can only receive O negative blood.',
      difficulty: 'easy',
      subtopic: 'Blood groups (ABO, Rh)',
      designNote: 'Tests basic knowledge of blood group compatibility. Distractors are other common blood groups with different antigen profiles. Easy because universal donor/recipient is a standard concept taught early in the chapter.',
    },
    {
      stem: 'The second heart sound ("dub") is produced primarily by:',
      options: ['Closure of the atrioventricular valves', 'Closure of the semilunar valves', 'Opening of the atrioventricular valves', 'Rapid ventricular filling'],
      correctAnswer: 1,
      explanation: 'The second heart sound ("dub") is produced by the closure of the semilunar valves — the aortic valve and the pulmonary valve — at the beginning of ventricular diastole. The first heart sound ("lub") is produced by the closure of AV valves.',
      difficulty: 'medium',
      subtopic: 'Human circulatory system: structure of heart, cardiac cycle, ECG',
      designNote: 'Tests knowledge of cardiac cycle events. Distractors confuse the two heart sounds — AV valve closure produces the first sound, valve opening is generally silent, and rapid ventricular filling occurs during diastole but does not produce a characteristic sound. Medium because it requires precise event-sound correlation.',
    },
    {
      stem: 'Which of the following does NOT increase during vigorous exercise?',
      options: ['Cardiac output', 'Heart rate', 'Stroke volume', 'Parasympathetic stimulation of the heart'],
      correctAnswer: 3,
      explanation: 'During vigorous exercise, sympathetic stimulation increases while parasympathetic (vagal) stimulation decreases. Cardiac output, heart rate, and stroke volume all increase to meet the elevated oxygen demands of the muscles. Decreased parasympathetic tone allows the heart rate to rise.',
      difficulty: 'hard',
      subtopic: 'Regulation of cardiac activity',
      designNote: 'Tests autonomic regulation of the heart during exercise. Distractors are all parameters that DO increase during exercise. The key insight is that sympathetic activity increases while parasympathetic activity decreases. Hard because it requires understanding opposing autonomic controls.',
    },
    {
      stem: 'The QRS complex in an ECG represents:',
      options: ['Atrial depolarization', 'Atrial repolarization', 'Ventricular depolarization', 'Ventricular repolarization'],
      correctAnswer: 2,
      explanation: 'The QRS complex in an ECG represents ventricular depolarization — the spread of the electrical impulse through the ventricles, triggering ventricular contraction. The P wave represents atrial depolarization, and the T wave represents ventricular repolarization.',
      difficulty: 'medium',
      subtopic: 'Human circulatory system: structure of heart, cardiac cycle, ECG',
      designNote: 'Tests ECG wave interpretation. Distractors confuse the ECG components — P wave (atrial depolarization), T wave (ventricular repolarization), atrial repolarization is hidden within the QRS complex. Medium because it requires correlating ECG waves with specific electrical events.',
    },
    {
      stem: 'Lymph differs from blood plasma primarily in that lymph:',
      options: ['Contains more proteins than blood plasma', 'Is identical in composition to blood plasma', 'Has a lower concentration of proteins and lacks RBCs', 'Contains higher concentrations of glucose and amino acids'],
      correctAnswer: 2,
      explanation: 'Lymph is derived from interstitial fluid that enters lymphatic vessels. It has a lower protein concentration than blood plasma because large proteins cannot easily pass through capillary walls. Lymph also lacks red blood cells but contains lymphocytes.',
      difficulty: 'hard',
      subtopic: 'Lymph (tissue fluid)',
      designNote: 'Tests comparison between lymph and blood plasma composition. Distractors misrepresent the composition — lymph has fewer proteins, is not identical to plasma, and does not have higher nutrient concentrations. Hard because it requires understanding fluid exchange across capillaries and lymph formation.',
    },
  ],

  // ── Class 11: Excretory Products and Their Elimination ──
  'Excretory Products and Their Elimination': [
    {
      stem: 'The structural and functional unit of the kidney is:',
      options: ['Neuron', 'Nephron', 'Alveolus', 'Hepatocyte'],
      correctAnswer: 1,
      explanation: 'The nephron is the structural and functional unit of the kidney. Each human kidney contains approximately 1 to 1.5 million nephrons. A nephron consists of a glomerulus, Bowman\'s capsule, proximal convoluted tubule, loop of Henle, distal convoluted tubule, and collecting duct.',
      difficulty: 'easy',
      subtopic: 'Human excretory system: structure of kidney, nephron',
      designNote: 'Tests basic terminology of the excretory system. Distractors are functional units of other organs — neuron (nervous system), alveolus (respiratory system), hepatocyte (liver). Easy because it is direct recall of a fundamental definition.',
    },
    {
      stem: 'Which hormone decreases the Glomerular Filtration Rate (GFR)?',
      options: ['Antidiuretic hormone (ADH)', 'Aldosterone', 'Atrial Natriuretic Factor (ANF)', 'Angiotensin II'],
      correctAnswer: 2,
      explanation: 'Atrial Natriuretic Factor (ANF) is released from the atrial wall of the heart in response to increased blood volume. It decreases GFR by causing vasoconstriction of the afferent arteriole and vasodilation of the efferent arteriole in the glomerulus, thereby reducing the filtration pressure.',
      difficulty: 'hard',
      subtopic: 'Regulation of kidney function: RAAS, ADH, ANF',
      designNote: 'Tests hormonal regulation of kidney function. ADH affects water reabsorption (not GFR directly), aldosterone affects sodium reabsorption, angiotensin II increases GFR by causing vasoconstriction. ANF is the only hormone listed that decreases GFR. Hard because it requires understanding the RAAS-ANF axis and specific vascular effects.',
    },
    {
      stem: 'Uricotelic organisms excrete nitrogenous waste primarily as:',
      options: ['Ammonia', 'Urea', 'Uric acid', 'Amino acids'],
      correctAnswer: 2,
      explanation: 'Uricotelic organisms excrete nitrogenous waste primarily as uric acid. This includes birds, reptiles, and insects. Uric acid is less toxic and requires less water for excretion compared to ammonia (ammoniotelic) or urea (ureotelic), making it advantageous for conserving water.',
      difficulty: 'medium',
      subtopic: 'Modes of excretion: ammonotelism, ureotelism, uricotelism',
      designNote: 'Tests classification of excretion modes. Distractors are other nitrogenous waste products or excretion types — ammonia (ammoniotelic), urea (ureotelic), amino acids are not a primary excretory product. Medium because it requires knowing the three modes of excretion and their characteristics.',
    },
    {
      stem: 'The maximum reabsorption of water from the glomerular filtrate occurs in the:',
      options: ['Descending limb of loop of Henle', 'Ascending limb of loop of Henle', 'Proximal convoluted tubule', 'Distal convoluted tubule'],
      correctAnswer: 2,
      explanation: 'Approximately 65-70% of water from the glomerular filtrate is reabsorbed in the proximal convoluted tubule (PCT) along with glucose, amino acids, and electrolytes. This is the site of maximum reabsorption in the nephron.',
      difficulty: 'medium',
      subtopic: 'Urine formation: glomerular filtration, tubular reabsorption, tubular secretion',
      designNote: 'Tests quantitative knowledge of tubular reabsorption. Distractors are other nephron segments — descending limb (permeable to water but reabsorbs less), ascending limb (impermeable to water), DCT (fine-tuning reabsorption under hormonal control). Medium because it requires knowing the relative amounts of reabsorption in different segments.',
    },
    {
      stem: 'Which of the following conditions is characterized by the presence of glucose in urine?',
      options: ['Uremia', 'Renal calculi', 'Glycosuria', 'Hematuria'],
      correctAnswer: 2,
      explanation: 'Glycosuria is the condition characterized by the presence of glucose in the urine. It occurs when blood glucose levels exceed the renal threshold (approximately 180 mg/dL), overwhelming the reabsorption capacity of the proximal convoluted tubule. Uremia is accumulation of urea in blood, renal calculi are kidney stones, and hematuria is blood in urine.',
      difficulty: 'easy',
      subtopic: 'Disorders: uremia, renal failure, renal calculi, glycosuria',
      designNote: 'Tests recognition of excretory disorders. Each option represents a different renal disorder. Glycosuria specifically refers to glucose in urine, commonly associated with diabetes mellitus. Easy because it requires matching a symptom to its medical term.',
    },
  ],

  // ── Class 11: Locomotion and Movement ──
  'Locomotion and Movement': [
    {
      stem: 'The myosin head has binding sites for:',
      options: ['Actin and Ca²⁺', 'Actin and ATP', 'Tropomyosin and Ca²⁺', 'Troponin and ATP'],
      correctAnswer: 1,
      explanation: 'The myosin head has binding sites for actin and ATP. When ATP binds to the myosin head, it causes detachment from actin. ATP hydrolysis provides energy for the power stroke, and the myosin head reattaches to a new position on the actin filament.',
      difficulty: 'medium',
      subtopic: 'Mechanism of muscle contraction: sliding filament theory',
      designNote: 'Tests molecular mechanism of muscle contraction. Distractors confuse regulatory proteins — tropomyosin and troponin regulate actin-myosin interaction but do not bind the myosin head; Ca²⁺ binds troponin (not myosin). Medium because it requires knowing the specific binding sites on the myosin head.',
    },
    {
      stem: 'Which type of joint is present between the atlas and axis vertebrae?',
      options: ['Hinge joint', 'Pivot joint', 'Ball and socket joint', 'Saddle joint'],
      correctAnswer: 1,
      explanation: 'A pivot joint is present between the atlas (C1) and axis (C2) vertebrae. The dens (odontoid process) of the axis articulates with the anterior arch of the atlas, allowing rotational movement of the head (as in saying "no").',
      difficulty: 'medium',
      subtopic: 'Joints: fibrous, cartilaginous, synovial',
      designNote: 'Tests joint classification with a specific anatomical example. Distractors are other joint types — hinge (elbow, knee), ball and socket (shoulder, hip), saddle (thumb base). Medium because it requires linking a specific anatomical location to its joint type.',
    },
    {
      stem: 'Which of the following is NOT a component of the appendicular skeleton?',
      options: ['Humerus', 'Femur', 'Sternum', 'Clavicle'],
      correctAnswer: 2,
      explanation: 'The sternum (breastbone) is part of the axial skeleton, not the appendicular skeleton. The axial skeleton includes the skull, vertebral column, sternum, and ribs. The appendicular skeleton includes the limbs (humerus, femur) and the girdles (pectoral and pelvic) — the clavicle is part of the pectoral girdle.',
      difficulty: 'medium',
      subtopic: 'Skeletal system: axial and appendicular skeleton',
      designNote: 'Tests exception-finding in skeletal system division. Distractors are all appendicular skeleton components — humerus (arm bone), femur (leg bone), clavicle (pectoral girdle). The sternum belongs to the axial skeleton. Medium because it requires knowing the division between axial and appendicular skeletons.',
    },
    {
      stem: 'During muscle contraction, the length of which region decreases?',
      options: ['A band', 'I band', 'H zone', 'Both I band and H zone'],
      correctAnswer: 3,
      explanation: 'During muscle contraction according to the sliding filament theory, the thin actin filaments slide over the thick myosin filaments. This causes both the I band (which contains only thin filaments) and the H zone (which contains only thick filaments) to shorten. The A band remains constant in length as it represents the entire length of the thick filament.',
      difficulty: 'hard',
      subtopic: 'Mechanism of muscle contraction: sliding filament theory',
      designNote: 'Tests detailed knowledge of sliding filament theory and sarcomere structure. The A band length remains constant during contraction. The I band shortens as actin slides inward, and the H zone shortens as actin filaments overlap with myosin. Hard because it requires visualizing sarcomere changes during contraction.',
    },
    {
      stem: 'Myasthenia gravis is an autoimmune disorder affecting:',
      options: ['The myelin sheath of motor neurons', 'The neuromuscular junction by destroying acetylcholine receptors', 'The sarcoplasmic reticulum calcium release channels', 'The muscle fiber contractile proteins'],
      correctAnswer: 1,
      explanation: 'Myasthenia gravis is an autoimmune disorder in which antibodies attack and destroy acetylcholine receptors at the neuromuscular junction. This impairs nerve impulse transmission to muscles, causing muscle weakness and fatigue. It is treated with acetylcholinesterase inhibitors and immunosuppressants.',
      difficulty: 'hard',
      subtopic: 'Disorders: myasthenia gravis, tetany, muscular dystrophy, arthritis, osteoporosis, gout',
      designNote: 'Tests knowledge of muscular disorders at the molecular level. Distractors describe other neuromuscular pathologies — multiple sclerosis affects myelin, malignant hyperthermia affects calcium channels, muscular dystrophy affects contractile proteins. Hard because it requires precise knowledge of autoimmune targets in myasthenia gravis.',
    },
  ],

  // ── Class 11: Neural Control and Coordination ──
  'Neural Control and Coordination': [
    {
      stem: 'Which part of the brain is the primary thermoregulatory center?',
      options: ['Cerebrum', 'Cerebellum', 'Hypothalamus', 'Medulla oblongata'],
      correctAnswer: 2,
      explanation: 'The hypothalamus is the primary thermoregulatory center of the brain. It maintains body temperature by controlling mechanisms such as sweating, shivering, vasodilation, and vasoconstriction of skin blood vessels. It also regulates hunger, thirst, sleep, and emotional behavior.',
      difficulty: 'easy',
      subtopic: 'Central nervous system: brain and spinal cord',
      designNote: 'Tests basic knowledge of brain region functions. Distractors are other major brain regions with different primary functions — cerebrum (higher functions), cerebellum (coordination), medulla (vital reflexes). Easy because thermoregulation is a classic hypothalamic function.',
    },
    {
      stem: 'During the conduction of a nerve impulse, depolarization of the axon membrane is caused by:',
      options: ['Influx of K⁺ ions', 'Efflux of Na⁺ ions', 'Influx of Na⁺ ions', 'Efflux of K⁺ ions'],
      correctAnswer: 2,
      explanation: 'Depolarization of the axon membrane during an action potential is caused by the rapid influx of Na⁺ ions through voltage-gated sodium channels. This makes the inside of the axon temporarily positive relative to the outside. Repolarization is caused by efflux of K⁺ ions.',
      difficulty: 'medium',
      subtopic: 'Generation and conduction of nerve impulse',
      designNote: 'Tests ionic basis of action potential. Distractors swap the ions and directions — K⁺ influx (does not occur), Na⁺ efflux (wrong direction), K⁺ efflux (causes repolarization, not depolarization). Medium because it requires understanding the sequence of ionic movements during an action potential.',
    },
    {
      stem: 'Which of the following is NOT a function of the cerebellum?',
      options: ['Maintaining posture and balance', 'Coordinating voluntary movements', 'Fine-tuning motor activity', 'Regulating heart rate and blood pressure'],
      correctAnswer: 3,
      explanation: 'Regulating heart rate and blood pressure is a function of the medulla oblongata, not the cerebellum. The cerebellum is responsible for maintaining posture and balance, coordinating voluntary movements, and fine-tuning motor activity. It does not directly control autonomic functions.',
      difficulty: 'medium',
      subtopic: 'Central nervous system: brain and spinal cord',
      designNote: 'Tests exception-finding in cerebellar functions. The distractor "regulating heart rate and blood pressure" is a medullary function. Other options are well-established cerebellar functions. Medium because it requires distinguishing between cerebellar and medullary functions.',
    },
    {
      stem: 'In the human eye, the blind spot is the region where:',
      options: ['Only cone cells are present', 'Only rod cells are present', 'The optic nerve exits the retina', 'The cornea and sclera meet'],
      correctAnswer: 2,
      explanation: 'The blind spot (optic disc) is the region of the retina where the optic nerve exits the eyeball. This area lacks photoreceptors (rods and cones), so images falling on this spot cannot be perceived. It is located about 15 degrees temporal to the fovea centralis.',
      difficulty: 'medium',
      subtopic: 'Sensory reception and processing: eye, ear',
      designNote: 'Tests anatomical knowledge of the eye. Distractors describe other retinal regions — fovea (only cones), peripheral retina (mostly rods), limbus (cornea-sclera junction). Medium because it requires knowing the anatomical basis of the blind spot.',
    },
    {
      stem: 'A patient who cannot understand spoken language but can produce meaningful speech most likely has damage to:',
      options: ['Broca\'s area in the frontal lobe', 'Wernicke\'s area in the temporal lobe', 'The occipital lobe', 'The cerebellum'],
      correctAnswer: 1,
      explanation: 'Wernicke\'s area, located in the posterior superior temporal gyrus, is essential for language comprehension. Damage to this area results in receptive (sensory) aphasia, where the patient can produce fluent speech but cannot understand spoken or written language. Broca\'s area damage causes expressive (motor) aphasia — inability to produce speech while comprehension remains intact.',
      difficulty: 'hard',
      subtopic: 'Central nervous system: brain and spinal cord',
      designNote: 'Tests clinical application of neuroanatomy. The symptom pattern (fluent speech, poor comprehension) is characteristic of Wernicke\'s aphasia. Distractors are other brain regions — Broca\'s area (expressive aphasia), occipital lobe (visual processing), cerebellum (motor coordination). Hard because it requires clinical reasoning to localize the lesion.',
    },
  ],

  // ── Class 11: Chemical Coordination and Integration ──
  'Chemical Coordination and Integration': [
    {
      stem: 'Which hormone is primarily responsible for the "fight or flight" response during emergency situations?',
      options: ['Insulin', 'Thyroxine', 'Adrenaline (epinephrine)', 'Cortisol'],
      correctAnswer: 2,
      explanation: 'Adrenaline (epinephrine) is secreted by the adrenal medulla and is the primary hormone responsible for the fight or flight response. It increases heart rate, blood pressure, blood glucose levels, and dilates bronchi to prepare the body for immediate physical action.',
      difficulty: 'easy',
      subtopic: 'Endocrine glands and hormones',
      designNote: 'Tests basic knowledge of adrenal medulla hormone function. Distractors are hormones with different primary roles — insulin (glucose uptake), thyroxine (basal metabolic rate), cortisol (long-term stress response). Easy because fight-or-flight is a classic adrenaline concept.',
    },
    {
      stem: 'Graves\' disease is caused by:',
      options: ['Hypothyroidism', 'Hyperthyroidism', 'Hypoparathyroidism', 'Hyperparathyroidism'],
      correctAnswer: 1,
      explanation: "Graves' disease is an autoimmune disorder that causes hyperthyroidism due to the overproduction of thyroid hormones (T3 and T4). It is characterized by exophthalmic goitre (protruding eyes), weight loss, heat intolerance, and increased metabolic rate. The immune system produces antibodies that stimulate the thyroid gland excessively.",
      difficulty: 'hard',
      subtopic: 'Disorders: dwarfism, acromegaly, cretinism, goitre, exophthalmic goitre, diabetes mellitus, Addison disease, Cushing syndrome',
      designNote: "Tests endocrine pathology. Distractors are other endocrine disorders — hypothyroidism (Hashimoto's disease), hypoparathyroidism (tetany), hyperparathyroidism (bone resorption). Graves' disease is specifically hyperthyroidism with autoimmune etiology. Hard because it requires distinguishing between multiple endocrine disorders.",
    },
    {
      stem: 'Which of the following hormones is released by the posterior pituitary but synthesized in the hypothalamus?',
      options: ['Growth hormone (GH)', 'Thyroid stimulating hormone (TSH)', 'Antidiuretic hormone (ADH)', 'Adrenocorticotropic hormone (ACTH)'],
      correctAnswer: 2,
      explanation: 'Antidiuretic hormone (ADH or vasopressin) is synthesized in the hypothalamus (specifically in the supraoptic and paraventricular nuclei) and transported via axons to the posterior pituitary, where it is stored and released. GH, TSH, and ACTH are all synthesized and released by the anterior pituitary.',
      difficulty: 'medium',
      subtopic: 'Human endocrine system: hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal, pancreas, gonads',
      designNote: 'Tests hypothalamic-pituitary axis anatomy. Distractors are all anterior pituitary hormones (GH, TSH, ACTH). The key distinction is that ADH and oxytocin are hypothalamic in origin but posterior pituitary in release. Medium because it requires knowing the dual origin of posterior pituitary hormones.',
    },
    {
      stem: 'Diabetes mellitus is characterized by all of the following EXCEPT:',
      options: ['Hyperglycemia', 'Polyuria', 'Glycosuria', 'Decreased blood glucose levels'],
      correctAnswer: 3,
      explanation: 'Diabetes mellitus is characterized by elevated blood glucose levels (hyperglycemia), excessive urination (polyuria), and glucose in urine (glycosuria) due to insufficient insulin production or insulin resistance. Decreased blood glucose levels (hypoglycemia) is the opposite of what occurs in diabetes.',
      difficulty: 'easy',
      subtopic: 'Disorders: dwarfism, acromegaly, cretinism, goitre, exophthalmic goitre, diabetes mellitus, Addison disease, Cushing syndrome',
      designNote: 'Tests exception-finding in diabetes mellitus symptoms. The key distractor "decreased blood glucose levels" describes hypoglycemia, the opposite of diabetes. Other options are classic diabetes symptoms. Easy because it requires recognizing the contradictory option.',
    },
    {
      stem: 'The mechanism of hormone action involving a second messenger (such as cAMP) is characteristic of:',
      options: ['Steroid hormones', 'Thyroid hormones', 'Peptide and protein hormones', 'All hormones regardless of chemical nature'],
      correctAnswer: 2,
      explanation: 'Peptide and protein hormones (such as insulin, glucagon, adrenaline) cannot cross the plasma membrane and bind to cell surface receptors. This binding activates intracellular second messenger systems such as cAMP, IP3/DAG, and calcium ions. Steroid and thyroid hormones are lipid-soluble and bind intracellular receptors that directly affect gene transcription.',
      difficulty: 'hard',
      subtopic: 'Mechanism of hormone action',
      designNote: 'Tests molecular mechanism of hormone action. Distractors confuse hormone classes — steroid hormones bind intracellular receptors (no second messenger), thyroid hormones also act intracellularly. The second messenger mechanism is specific to hydrophilic hormones that cannot cross the membrane. Hard because it requires understanding the relationship between hormone chemistry, receptor location, and signal transduction mechanism.',
    },
  ],

  // ── Class 12: Human Reproduction ──
  'Human Reproduction': [
    {
      stem: 'Which hormone surge triggers ovulation in the menstrual cycle?',
      options: ['Follicle stimulating hormone (FSH)', 'Luteinizing hormone (LH)', 'Estrogen', 'Progesterone'],
      correctAnswer: 1,
      explanation: 'The LH (Luteinizing Hormone) surge, which occurs around day 14 of a 28-day menstrual cycle, triggers ovulation — the release of a mature Graafian follicle from the ovary. The LH surge is stimulated by a peak in estrogen levels from the developing follicle.',
      difficulty: 'easy',
      subtopic: 'Menstrual cycle: phases and hormonal regulation',
      designNote: 'Tests basic endocrinology of the menstrual cycle. FSH stimulates follicular development, estrogen peaks trigger the LH surge, and progesterone dominates the luteal phase. Easy because LH surge triggering ovulation is a fundamental concept.',
    },
    {
      stem: 'The process of spermatogenesis begins at:',
      options: ['Birth', 'Puberty', 'Adulthood', 'Fertilization'],
      correctAnswer: 1,
      explanation: 'Spermatogenesis begins at puberty under the influence of increased levels of gonadotropins (LH and FSH) and testosterone. Before puberty, the seminiferous tubules contain only spermatogonia (germ stem cells). LH stimulates Leydig cells to produce testosterone, which along with FSH, initiates spermatogenesis.',
      difficulty: 'easy',
      subtopic: 'Gametogenesis: spermatogenesis and oogenesis',
      designNote: 'Tests developmental timing of spermatogenesis. Distractors are biologically implausible — birth (germ cells are dormant), adulthood (too late), fertilization (irrelevant). Easy because it is a straightforward factual recall.',
    },
    {
      stem: 'Which of the following is NOT a part of the male accessory duct system?',
      options: ['Rete testis', 'Vasa efferentia', 'Fallopian tube', 'Vas deferens'],
      correctAnswer: 2,
      explanation: 'The fallopian tube (oviduct) is part of the female reproductive system, not the male. The male accessory duct system includes the rete testis, vasa efferentia, epididymis, vas deferens, ejaculatory duct, and urethra. These ducts transport, store, and mature spermatozoa.',
      difficulty: 'medium',
      subtopic: 'Male reproductive system: testis, accessory ducts and glands',
      designNote: 'Tests exception-finding in male reproductive anatomy. The fallopian tube is distinctly female. Distractors are all components of the male duct system — rete testis, vasa efferentia, vas deferens. Medium because it requires distinguishing male from female reproductive structures.',
    },
    {
      stem: 'Fertilization in humans normally occurs in the:',
      options: ['Ovary', 'Proximal fallopian tube (ampulla)', 'Uterus', 'Vagina'],
      correctAnswer: 1,
      explanation: 'Fertilization in humans normally occurs in the ampullary region of the fallopian tube (oviduct), which is the wider, proximal portion near the ovary. The ovum released during ovulation is captured by fimbriae and transported to the ampulla where it meets sperm. The fertilized zygote then travels to the uterus for implantation.',
      difficulty: 'medium',
      subtopic: 'Fertilisation, implantation, pregnancy, placenta',
      designNote: 'Tests anatomical location of fertilization. Distractors are other reproductive tract regions — ovary (site of oogenesis/ovulation), uterus (site of implantation/development), vagina (birth canal). Medium because students often confuse the site of fertilization with the site of implantation.',
    },
    {
      stem: 'During pregnancy, the placenta produces human chorionic gonadotropin (hCG), which:',
      options: ['Stimulates progesterone production by the corpus luteum', 'Inhibits estrogen secretion', 'Triggers uterine contractions', 'Suppresses prolactin release'],
      correctAnswer: 0,
      explanation: 'Human chorionic gonadotropin (hCG) is produced by the syncytiotrophoblast of the placenta shortly after implantation. Its primary function is to maintain the corpus luteum, which continues to produce progesterone during early pregnancy. Progesterone maintains the endometrial lining and prevents menstruation. hCG is the hormone detected in pregnancy tests.',
      difficulty: 'hard',
      subtopic: 'Fertilisation, implantation, pregnancy, placenta',
      designNote: 'Tests placental endocrinology. Distractors describe incorrect hormonal actions — hCG does not inhibit estrogen (estrogen rises in pregnancy), does not trigger contractions (oxytocin does that), and does not suppress prolactin. Hard because it requires understanding the corpus luteum rescue mechanism and its hormonal consequences.',
    },
  ],

  // ── Class 12: Reproductive Health ──
  'Reproductive Health': [
    {
      stem: 'Which contraceptive method primarily works by preventing implantation of the fertilized embryo?',
      options: ['Condom', 'Oral contraceptive pills', 'Intrauterine device (IUD)', 'Rhythm method'],
      correctAnswer: 2,
      explanation: 'Intrauterine devices (IUDs) such as copper-T work primarily by preventing implantation of the embryo in the uterine wall. Copper ions released by the IUD are toxic to sperm and ova, and they also produce a local inflammatory response in the endometrium that is hostile to implantation.',
      difficulty: 'medium',
      subtopic: 'Contraceptive methods: natural, barrier, IUDs, oral pills, injectables, implants, surgical methods',
      designNote: 'Tests mechanism of contraceptive action. Distractors work by different mechanisms — condom (barrier, prevents sperm entry), oral pills (hormonal, prevents ovulation), rhythm method (natural, avoids fertile period). Medium because it requires knowing the specific mechanism of each contraceptive type.',
    },
    {
      stem: 'In the ZIFT (Zygote Intrafallopian Transfer) procedure:',
      options: ['Fertilization occurs inside the fallopian tube', 'Fertilization occurs in vitro and the zygote is transferred to the fallopian tube', 'Gametes are transferred into the fallopian tube for fertilization', 'An embryo at the 8-cell stage is transferred into the uterus'],
      correctAnswer: 1,
      explanation: 'In ZIFT (Zygote Intrafallopian Transfer), fertilization occurs in vitro (outside the body in a laboratory), and the resulting zygote is transferred into the fallopian tube of the female partner. This differs from GIFT (Gamete Intrafallopian Transfer) where gametes are transferred into the fallopian tube for in vivo fertilization, and from IUT where embryos are transferred into the uterus.',
      difficulty: 'hard',
      subtopic: 'Infertility and assisted reproductive technologies (ART): IVF, ZIFT, IUT, GIFT, ICSI, AI',
      designNote: 'Tests ART procedure details. Distractors describe other ART techniques — GIFT (gamete transfer), IUT (embryo transfer to uterus), natural fertilization. The key distinction is in vitro fertilization followed by zygote transfer to the fallopian tube. Hard because it requires precise knowledge of multiple ART procedures and their differences.',
    },
    {
      stem: 'Which of the following is a sexually transmitted disease caused by a bacterium?',
      options: ['HIV/AIDS', 'Hepatitis B', 'Syphilis', 'Genital herpes'],
      correctAnswer: 2,
      explanation: 'Syphilis is a sexually transmitted disease caused by the bacterium Treponema pallidum. HIV/AIDS is caused by a virus (HIV), hepatitis B is caused by the hepatitis B virus, and genital herpes is caused by the herpes simplex virus (HSV). Syphilis is treated with antibiotics (penicillin).',
      difficulty: 'easy',
      subtopic: 'Sexually transmitted diseases (STDs): syphilis, gonorrhoea, HIV/AIDS, hepatitis-B',
      designNote: 'Tests classification of STDs by causative agent. Distractors are viral STDs — HIV/AIDS (retrovirus), hepatitis B (hepadnavirus), genital herpes (herpesvirus). Syphilis is the only bacterial option. Easy because it requires matching an STD to its causative agent type.',
    },
    {
      stem: 'Amniocentesis is a technique used for:',
      options: ['Inducing abortion', 'Detecting genetic disorders in the fetus', 'Treating infertility', 'Preventing sexually transmitted diseases'],
      correctAnswer: 1,
      explanation: 'Amniocentesis is a prenatal diagnostic technique in which a small sample of amniotic fluid is withdrawn from the amniotic sac surrounding the fetus using a fine needle. The fetal cells in the fluid are analyzed for chromosomal abnormalities (such as Down syndrome), genetic disorders, and neural tube defects.',
      difficulty: 'medium',
      subtopic: 'Medical termination of pregnancy (MTP)',
      designNote: 'Tests purpose of amniocentesis. Distrators describe unrelated procedures — abortion induction (MTP methods), infertility treatment (ART), STD prevention (barrier methods). Medium because it requires knowing the diagnostic purpose of amniocentesis and distinguishing it from other reproductive health procedures.',
    },
    {
      stem: 'Which of the following statements about oral contraceptive pills is CORRECT?',
      options: ['They contain only progesterone', 'They prevent fertilization by creating a physical barrier', 'They primarily work by inhibiting ovulation through hormonal feedback', 'They are effective only when taken immediately before intercourse'],
      correctAnswer: 2,
      explanation: 'Combined oral contraceptive pills contain synthetic estrogen and progesterone analogues. They primarily work by inhibiting ovulation through negative feedback on the hypothalamus and pituitary, suppressing the LH surge required for ovulation. They also thicken cervical mucus (inhibiting sperm entry) and alter the endometrium (reducing implantation likelihood). They must be taken daily to maintain effective hormone levels.',
      difficulty: 'hard',
      subtopic: 'Contraceptive methods: natural, barrier, IUDs, oral pills, injectables, implants, surgical methods',
      designNote: 'Tests mechanism of oral contraceptives. Distractors contain common misconceptions — they contain both hormones (not just progesterone), they are not physical barriers, and they require daily use (not just before intercourse). Hard because it requires understanding the hormonal feedback mechanism and correcting multiple misconceptions.',
    },
  ],

  // ── Class 12: Evolution ──
  'Evolution': [
    {
      stem: 'The forelimbs of whale, bat, cheetah, and human are examples of:',
      options: ['Convergent evolution', 'Divergent evolution', 'Adaptive radiation', 'Parallel evolution'],
      correctAnswer: 1,
      explanation: 'The forelimbs of whale, bat, cheetah, and human are homologous organs that demonstrate divergent evolution. They share the same basic pentadactyl limb plan (same origin) but have been modified for different functions — swimming (whale), flying (bat), running (cheetah), and grasping (human).',
      difficulty: 'medium',
      subtopic: 'Evolution: evidences from comparative anatomy, embryology, molecular biology, paleontology',
      designNote: 'Tests evolutionary pattern recognition. Distractors describe different evolutionary patterns — convergent (analogous structures, different origin same function), adaptive radiation (rapid speciation from common ancestor), parallel evolution (independent similar changes in related species). Medium because it requires distinguishing between evolutionary patterns using a classic example.',
    },
    {
      stem: 'The Hardy-Weinberg equilibrium is disturbed by:',
      options: ['Random mating', 'Absence of mutation', 'Absence of gene flow', 'Natural selection'],
      correctAnswer: 3,
      explanation: 'Natural selection disturbs Hardy-Weinberg equilibrium by favoring certain alleles over others, changing allele frequencies in a population. Random mating, absence of mutation, absence of gene flow, and large population size are all assumptions required to MAINTAIN Hardy-Weinberg equilibrium, not conditions that disturb it.',
      difficulty: 'hard',
      subtopic: 'Mechanism of evolution: Hardy-Weinberg principle, genetic drift, mutation, gene flow',
      designNote: 'Tests understanding of Hardy-Weinberg equilibrium conditions. Distractors are all conditions that MAINTAIN equilibrium (random mating, no mutation, no gene flow, large population). The question requires identifying which factor VIOLATES an equilibrium assumption. Hard because it requires careful reading — students often confuse maintaining vs. disturbing factors.',
    },
    {
      stem: 'Which of the following is NOT evidence supporting biological evolution?',
      options: ['Homologous organs', 'Analogous organs', 'Vestigial organs', 'Fossil records'],
      correctAnswer: 1,
      explanation: 'Analogous organs (such as wings of insects and birds) do NOT support common ancestry because they arise from different ancestral structures through convergent evolution. They represent similar solutions to similar environmental pressures, not shared evolutionary history. Homologous organs, vestigial organs, and fossil records all provide evidence for evolution.',
      difficulty: 'hard',
      subtopic: 'Evolution: evidences from comparative anatomy, embryology, molecular biology, paleontology',
      designNote: 'Tests critical analysis of evolutionary evidence. Analogous organs result from convergent evolution, not common ancestry. Distractors are all valid evidence types for evolution. Hard because it requires understanding why analogous structures do not indicate common descent.',
    },
    {
      stem: 'According to Darwin\'s theory of natural selection, the primary driving force of evolution is:',
      options: ['Inheritance of acquired characteristics', 'Struggle for existence and differential survival', 'Random genetic drift in small populations', 'Spontaneous generation of new traits'],
      correctAnswer: 1,
      explanation: "Darwin's theory of natural selection proposes that evolution occurs through: (1) overproduction of offspring leading to a struggle for existence, (2) variation among individuals, (3) differential survival and reproduction of better-adapted individuals (survival of the fittest), and (4) inheritance of advantageous traits. The inheritance of acquired characteristics is Lamarck's theory, random genetic drift is a separate evolutionary mechanism, and spontaneous generation is not part of evolutionary theory.",
      difficulty: 'medium',
      subtopic: 'Biological evolution: Lamarckism, Darwinism, natural selection',
      designNote: "Tests core tenets of Darwin's theory. Distractors are other evolutionary concepts — Lamarckism (acquired characteristics), genetic drift (neutral evolution), spontaneous generation (disproven pre-evolutionary concept). Medium because it requires distinguishing Darwin's natural selection from other mechanisms.",
    },
    {
      stem: 'Industrial melanism in the peppered moth (Biston betularia) is an example of:',
      options: ['Mutation-driven evolution without selection pressure', 'Directional selection due to environmental change', 'Genetic drift in a small, isolated population', 'Stabilizing selection maintaining the mean phenotype'],
      correctAnswer: 1,
      explanation: 'Industrial melanism in the peppered moth is a classic example of directional selection. Before the Industrial Revolution, light-colored moths were common and camouflaged against light tree trunks. After industrial pollution darkened tree trunks with soot, dark (melanic) moths had a survival advantage because they were better camouflaged against predators. This directional shift in phenotype frequency was driven by a change in the environment.',
      difficulty: 'medium',
      subtopic: 'Adaptive radiation',
      designNote: 'Tests understanding of selection types using a classic example. Distractors describe other evolutionary mechanisms — mutation alone (not the primary driver here), genetic drift (the population was large), stabilizing selection (this was a shift away from the mean, not maintenance of it). Medium because it requires connecting an environmental change to the type of natural selection it produces.',
    },
  ],

  // ── Class 12: Human Health and Disease ──
  'Human Health and Disease': [
    {
      stem: 'Which cells are primarily targeted and destroyed by the Human Immunodeficiency Virus (HIV)?',
      options: ['B-lymphocytes', 'Helper T-cells (CD4+ T-lymphocytes)', 'Cytotoxic T-cells (CD8+)', 'Natural killer cells'],
      correctAnswer: 1,
      explanation: 'HIV primarily infects and destroys helper T-cells (CD4+ T-lymphocytes) by binding to the CD4 receptor and CCR5/CXCR4 co-receptors on their surface. The progressive depletion of CD4+ T-cells weakens the immune system, leading to opportunistic infections and the development of AIDS (Acquired Immunodeficiency Syndrome).',
      difficulty: 'medium',
      subtopic: 'AIDS, cancer, drugs and alcohol abuse',
      designNote: 'Tests HIV pathogenesis. Distractors are other immune cells with different roles — B-lymphocytes (antibody production), cytotoxic T-cells (kill infected cells), NK cells (innate immunity). Medium because it requires knowing the specific cellular target of HIV and the CD4 receptor specificity.',
    },
    {
      stem: 'Passive immunity is acquired through:',
      options: ['Vaccination with attenuated pathogens', 'Transfer of pre-formed antibodies from mother to fetus', 'Natural infection with a pathogen', 'Exposure to environmental antigens'],
      correctAnswer: 1,
      explanation: 'Passive immunity is acquired by the transfer of pre-formed antibodies from one individual to another. Examples include maternal antibodies (IgG) crossing the placenta to the fetus, colostral antibodies (IgA) in breast milk, and administration of antiserum or immunoglobulin. It provides immediate but temporary protection as the recipient does not produce their own antibodies.',
      difficulty: 'medium',
      subtopic: 'Immunity: innate and acquired, active and passive',
      designNote: 'Tests distinction between active and passive immunity. Distractors describe active immunity mechanisms — vaccination (artificial active), natural infection (natural active), environmental antigen exposure (natural active). Medium because it requires understanding the fundamental difference between producing one\'s own antibodies vs. receiving pre-formed antibodies.',
    },
    {
      stem: 'Which of the following is NOT a method of cancer treatment?',
      options: ['Surgery', 'Radiotherapy', 'Antibiotic therapy', 'Chemotherapy'],
      correctAnswer: 2,
      explanation: 'Antibiotic therapy is used to treat bacterial infections, not cancer. Cancer treatment modalities include surgery (removal of tumor), radiotherapy (use of ionizing radiation to destroy cancer cells), chemotherapy (use of cytotoxic drugs), immunotherapy (stimulating the immune system), and targeted therapy (drugs targeting specific molecular pathways in cancer cells).',
      difficulty: 'easy',
      subtopic: 'AIDS, cancer, drugs and alcohol abuse',
      designNote: 'Tests exception-finding in cancer treatment. Antibiotic therapy targets bacteria, not cancer cells. Distractors are all standard cancer treatments. Easy because it requires recognizing that antibiotics are for infections, not cancer.',
    },
    {
      stem: 'Innate immunity differs from acquired immunity in that innate immunity:',
      options: ['Is specific to particular pathogens and has memory', 'Requires prior exposure to the pathogen', 'Is present from birth and provides immediate, non-specific defense', 'Depends entirely on antibody production'],
      correctAnswer: 2,
      explanation: 'Innate immunity is the inborn, non-specific defense mechanism present from birth that provides immediate protection against a wide range of pathogens. It includes physical barriers (skin, mucous membranes), cellular defenses (phagocytes, NK cells), and chemical defenses (complement system, interferons). Acquired (adaptive) immunity is pathogen-specific, requires prior exposure, and has immunological memory.',
      difficulty: 'medium',
      subtopic: 'Immunity: innate and acquired, active and passive',
      designNote: 'Tests distinction between innate and acquired immunity. Distractors describe acquired immunity features — specificity, memory, prior exposure requirement, antibody dependence. Medium because it requires understanding the fundamental differences between the two arms of the immune system.',
    },
    {
      stem: 'A vaccine works by stimulating:',
      options: ['Passive transfer of antibodies', 'The innate immune response only', 'Active immunity and immunological memory', 'Immediate allergic response'],
      correctAnswer: 2,
      explanation: 'A vaccine works by introducing a weakened, killed, or inactivated pathogen (or its components such as proteins or polysaccharides) into the body. This stimulates active immunity by triggering the production of antibodies and memory B-cells and T-cells without causing the disease. Upon subsequent exposure to the actual pathogen, the immune system mounts a rapid and robust secondary response due to immunological memory.',
      difficulty: 'medium',
      subtopic: 'Basic concepts of immunology: antigens, antibodies, B-cells, T-cells, vaccines',
      designNote: 'Tests vaccine mechanism of action. Distrators describe incorrect mechanisms — passive transfer (antiserum, not vaccine), innate immunity only (vaccines specifically target adaptive immunity), allergic response (not the intended effect). Medium because it requires understanding that vaccines stimulate active immunity and memory formation.',
    },
  ],

  // ── Class 12: Biotechnology: Principles and Processes ──
  'Biotechnology: Principles and Processes': [
    {
      stem: 'Restriction enzymes belong to which class of enzymes?',
      options: ['Ligases', 'Nucleases', 'Polymerases', 'Transferases'],
      correctAnswer: 1,
      explanation: 'Restriction enzymes (restriction endonucleases) belong to the class of nucleases — enzymes that cleave nucleic acids. They recognize specific DNA sequences (recognition sites or restriction sites) and cut the DNA at or near these sites. They are essential tools in recombinant DNA technology.',
      difficulty: 'easy',
      subtopic: 'Tools of recombinant DNA technology: restriction enzymes, ligase, vectors (plasmids, bacteriophages)',
      designNote: 'Tests enzyme classification. Distractors are other enzyme classes — ligases (join DNA fragments), polymerases (synthesize DNA), transferases (transfer functional groups). Easy because restriction enzymes are a well-known example of nucleases.',
    },
    {
      stem: 'In recombinant DNA technology, a "vector" refers to:',
      options: ['A restriction enzyme', 'A plasmid or viral DNA molecule used to carry foreign DNA into a host cell', 'DNA polymerase enzyme', 'The host bacterium itself'],
      correctAnswer: 1,
      explanation: 'A vector is a DNA molecule (such as a plasmid, bacteriophage, cosmid, or artificial chromosome) that is used as a vehicle to carry foreign genetic material into a host cell. Vectors have an origin of replication, selectable markers (such as antibiotic resistance genes), and multiple cloning sites for inserting foreign DNA.',
      difficulty: 'easy',
      subtopic: 'Tools of recombinant DNA technology: restriction enzymes, ligase, vectors (plasmids, bacteriophages)',
      designNote: 'Tests definition of a vector in rDNA technology. Distractors are other components of the rDNA system — restriction enzyme (cutting tool), DNA polymerase (synthesis enzyme), host bacterium (expression system). Easy because it is a fundamental definition.',
    },
    {
      stem: 'Which of the following is NOT required for PCR (Polymerase Chain Reaction)?',
      options: ['Template DNA', 'Taq DNA polymerase', 'Restriction enzymes', 'Deoxynucleotide triphosphates (dNTPs)'],
      correctAnswer: 2,
      explanation: 'Restriction enzymes are NOT required for PCR. PCR requires: template DNA (containing the target sequence to be amplified), two oligonucleotide primers complementary to the flanking regions of the target sequence, Taq DNA polymerase (a thermostable enzyme), and deoxynucleotide triphosphates (dNTPs — dATP, dGTP, dCTP, dTTP) as building blocks for DNA synthesis.',
      difficulty: 'medium',
      subtopic: 'PCR, gel electrophoresis',
      designNote: 'Tests PCR components. Distractors are all required PCR components — template DNA, Taq polymerase, dNTPs. Restriction enzymes are used in cloning, not PCR. Medium because it requires knowing the specific reagents needed for PCR and distinguishing them from other molecular biology tools.',
    },
    {
      stem: 'The role of DNA ligase in recombinant DNA technology is to:',
      options: ['Cut DNA at specific sequences', 'Join DNA fragments by forming phosphodiester bonds', 'Synthesize new DNA strands', 'Separate DNA strands by breaking hydrogen bonds'],
      correctAnswer: 1,
      explanation: 'DNA ligase catalyzes the formation of phosphodiester bonds between adjacent nucleotides, thereby joining DNA fragments. In recombinant DNA technology, it is used to ligate (join) the gene of interest into the vector DNA after both have been cut with restriction enzymes. It is often called the "molecular glue" of genetic engineering.',
      difficulty: 'medium',
      subtopic: 'Tools of recombinant DNA technology: restriction enzymes, ligase, vectors (plasmids, bacteriophages)',
      designNote: 'Tests function of DNA ligase. Distrators describe other enzyme functions — restriction enzymes (cut DNA), DNA polymerase (synthesize DNA), helicase (separate strands). Medium because it requires distinguishing between the roles of different enzymes in rDNA technology.',
    },
    {
      stem: 'Competent host cells for transformation are cells that:',
      options: ['Are resistant to all antibiotics', 'Have the ability to take up extracellular DNA', 'Can produce restriction enzymes', 'Are capable of phagocytosis'],
      correctAnswer: 1,
      explanation: 'Competent host cells are bacterial cells that have been treated (chemically with CaCl₂ or by electroporation) to make them capable of taking up extracellular DNA from their environment. This process is called transformation. Once the recombinant plasmid enters the competent cell, it can replicate and express the foreign gene.',
      difficulty: 'medium',
      subtopic: 'Competent host cells',
      designNote: 'Tests definition of competent cells in transformation. Distractors describe unrelated properties — antibiotic resistance (a selectable marker, not competence), restriction enzyme production (would destroy foreign DNA), phagocytosis (a eukaryotic process, not bacterial transformation). Medium because it requires understanding the specific meaning of "competence" in bacterial genetics.',
    },
  ],

  // ── Class 12: Biotechnology and Its Applications ──
  'Biotechnology and Its Applications': [
    {
      stem: 'Bt cotton is resistant to bollworm pests because it produces:',
      options: ['Insulin', 'Cry (Crystal) proteins', 'Growth hormone', 'Antibiotics'],
      correctAnswer: 1,
      explanation: 'Bt cotton is genetically modified to produce Cry (Crystal) proteins derived from the bacterium Bacillus thuringiensis. When bollworm larvae feed on Bt cotton plants, the Cry proteins are solubilized in the alkaline pH of the insect gut, activated by proteases, and bind to specific receptors in the midgut epithelium, causing pore formation, cell lysis, and insect death.',
      difficulty: 'easy',
      subtopic: 'Biotechnological applications in agriculture: Bt crops, RNAi, pest-resistant plants',
      designNote: 'Tests basic knowledge of Bt cotton mechanism. Distractors are other biotech products — insulin (transgenic bacteria), growth hormone (transgenic animals), antibiotics (microbial products). Easy because Cry protein production is the defining feature of Bt crops.',
    },
    {
      stem: 'RNA interference (RNAi) is used in biotechnology to:',
      options: ['Increase gene expression', 'Silence specific genes', 'Speed up transcription', 'Enhance translation efficiency'],
      correctAnswer: 1,
      explanation: 'RNA interference (RNAi) is a cellular mechanism that silences specific genes by degrading their corresponding mRNA molecules. In biotechnology, it is used to create pest-resistant crops (e.g., by silencing essential genes in nematodes), develop gene therapy approaches, and study gene function. Short dsRNA molecules are processed into siRNA or miRNA that guide the RNA-induced silencing complex (RISC) to target mRNA for degradation.',
      difficulty: 'medium',
      subtopic: 'Biotechnological applications in agriculture: Bt crops, RNAi, pest-resistant plants',
      designNote: 'Tests RNAi mechanism and application. Distractors describe opposite or unrelated processes — increased expression (RNAi decreases it), speeding transcription (RNAi acts post-transcriptionally), enhancing translation (RNAi blocks it). Medium because it requires understanding the gene-silencing mechanism of RNAi.',
    },
    {
      stem: 'Genetically engineered human insulin is produced using which host organism?',
      options: ['Saccharomyces cerevisiae (baker\'s yeast)', 'Escherichia coli', 'Both E. coli and Saccharomyces cerevisiae', 'Mycobacterium tuberculosis'],
      correctAnswer: 2,
      explanation: 'Genetically engineered human insulin is produced using both E. coli and Saccharomyces cerevisiae (baker\'s yeast) as host organisms. Insulin produced in E. coli requires in vitro folding of A and B chains, while yeast can produce proinsulin that is correctly folded and processed. Recombinant human insulin (brands like Humulin) was the first FDA-approved genetically engineered pharmaceutical.',
      difficulty: 'medium',
      subtopic: 'Biotechnological applications in medicine: genetically engineered insulin, gene therapy, molecular diagnosis (PCR, ELISA)',
      designNote: 'Tests practical knowledge of insulin production. Distractors include one correct host (yeast or E. coli individually) and a pathogenic bacterium. The most complete answer is that both are used commercially. Medium because it requires knowing the biotechnological process of recombinant insulin production.',
    },
    {
      stem: 'Which of the following is NOT an application of PCR in molecular diagnosis?',
      options: ['Detecting viral infections (HIV, hepatitis)', 'Genetic testing for inherited disorders', 'DNA fingerprinting in forensic science', 'Synthesizing therapeutic proteins in bulk'],
      correctAnswer: 3,
      explanation: 'Synthesizing therapeutic proteins in bulk is NOT an application of PCR. PCR (Polymerase Chain Reaction) is used to amplify DNA segments for detection and analysis. Applications include detecting viral infections (by amplifying viral DNA/RNA), genetic testing (amplifying disease-associated gene regions), and DNA fingerprinting (amplifying STR loci). Therapeutic protein synthesis requires recombinant DNA technology and expression systems, not PCR.',
      difficulty: 'medium',
      subtopic: 'Biotechnological applications in medicine: genetically engineered insulin, gene therapy, molecular diagnosis (PCR, ELISA)',
      designNote: 'Tests scope of PCR applications. Distractors are all legitimate PCR applications — viral detection, genetic testing, DNA fingerprinting. Protein synthesis is done through expression systems, not PCR. Medium because it requires understanding what PCR does (DNA amplification) vs. what it cannot do (protein synthesis).',
    },
    {
      stem: 'Gene therapy for ADA (Adenosine Deaminase) deficiency involves:',
      options: ['Replacing the defective ADA gene in all body cells', 'Introducing a functional ADA gene into lymphocyte stem cells', 'Administering ADA enzyme orally', 'Removing the mutant ADA gene from the genome'],
      correctAnswer: 1,
      explanation: 'Gene therapy for ADA deficiency (a form of Severe Combined Immunodeficiency, SCID) involves introducing a functional ADA gene into lymphocyte stem cells or T-lymphocytes using a retroviral vector. The first gene therapy clinical trial was for ADA deficiency in 1990. Since not all cells need the gene (only lymphocytes are affected), targeted delivery to hematopoietic stem cells is sufficient. Oral enzyme administration is ineffective because proteins are digested in the GI tract.',
      difficulty: 'hard',
      subtopic: 'Biotechnological applications in medicine: genetically engineered insulin, gene therapy, molecular diagnosis (PCR, ELISA)',
      designNote: 'Tests gene therapy mechanism for a specific disorder. Distrators describe impractical or incorrect approaches — replacing genes in all cells (inefficient and unnecessary), oral enzyme administration (proteins digested), gene removal (not how gene therapy works). Hard because it requires understanding the targeted nature of gene delivery and the biological basis of ADA deficiency treatment.',
    },
  ],
}

// ───────────────────────────────────────────────────────────────
// Utility: Shuffle array in-place (Fisher-Yates)
// ───────────────────────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr] // don't mutate original
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ───────────────────────────────────────────────────────────────
// Utility: Get current timestamp as ISO string
// ───────────────────────────────────────────────────────────────
function now(): string {
  return new Date().toISOString()
}

// ───────────────────────────────────────────────────────────────
// Utility: Generate unique question ID
// ───────────────────────────────────────────────────────────────
let idCounter = 0
function generateId(): string {
  idCounter++
  return `q-${Date.now()}-${idCounter}-${Math.random().toString(36).slice(2, 6)}`
}

// ───────────────────────────────────────────────────────────────
// OpenAI client initialization
// ───────────────────────────────────────────────────────────────
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn('[question-generator] OPENAI_API_KEY not set, falling back to fallback questions')
    return null
  }
  return new OpenAI({ apiKey })
}

// ───────────────────────────────────────────────────────────────
// Fallback: Generate diverse questions without OpenAI
// Uses a template pool with 5 questions per chapter
// Key improvements over old mock system:
//   - 5 questions per chapter (not 2!)
//   - Shuffled selection — different questions each time
//   - No repeated questions in a single paper
//   - Even distribution across selected chapters
//   - Difficulty matching based on blueprint split
// ───────────────────────────────────────────────────────────────
function generateFallbackQuestions(blueprint: PaperBlueprint): Question[] {
  const questions: Question[] = []

  // Determine how many of each difficulty we need
  const targetEasy = Math.round(blueprint.numQuestions * blueprint.difficultySplit.easy / 100)
  const targetMedium = Math.round(blueprint.numQuestions * blueprint.difficultySplit.medium / 100)
  const targetHard = blueprint.numQuestions - targetEasy - targetMedium

  // Get chapter names from blueprint topics, or fall back to all chapters for the class
  const chapterNames = blueprint.weeklyTopics.length > 0
    ? blueprint.weeklyTopics
    : zoologySyllabus
        .filter((s) => s.classLevel === blueprint.classLevel)
        .map((s) => s.name)

  // Build a pool of all available templates from selected chapters
  // Each template is tagged with its chapter so we can distribute evenly
  interface TaggedTemplate {
    template: FallbackTemplate
    chapter: string
  }

  const allTemplates: TaggedTemplate[] = []
  for (const chapter of chapterNames) {
    const chapterTemplates = fallbackTemplates[chapter]
    if (chapterTemplates) {
      for (const template of chapterTemplates) {
        allTemplates.push({ template, chapter })
      }
    }
  }

  // If no templates matched the selected chapters (shouldn't happen), use all templates
  if (allTemplates.length === 0) {
    for (const [chapter, templates] of Object.entries(fallbackTemplates)) {
      for (const template of templates) {
        allTemplates.push({ template, chapter })
      }
    }
  }

  // Separate templates by difficulty
  const easyPool = shuffleArray(allTemplates.filter((t) => t.template.difficulty === 'easy'))
  const mediumPool = shuffleArray(allTemplates.filter((t) => t.template.difficulty === 'medium'))
  const hardPool = shuffleArray(allTemplates.filter((t) => t.template.difficulty === 'hard'))

  // Helper to pick questions from a pool, distributing across chapters evenly
  function pickFromPool(pool: TaggedTemplate[], count: number): Question[] {
    const picked: Question[] = []
    const usedIndices = new Set<number>()
    let attempts = 0

    while (picked.length < count && attempts < pool.length * 3) {
      // Round-robin through chapters to ensure even distribution
      for (let chapterIdx = 0; chapterIdx < chapterNames.length && picked.length < count; chapterIdx++) {
        const targetChapter = chapterNames[chapterIdx]

        // Find an unused template from this chapter
        for (let i = 0; i < pool.length; i++) {
          if (usedIndices.has(i)) continue
          if (pool[i].chapter === targetChapter) {
            usedIndices.add(i)
            const { template, chapter } = pool[i]
            picked.push({
              id: generateId(),
              stem: template.stem,
              options: [...template.options],
              correctAnswer: template.correctAnswer,
              explanation: template.explanation,
              chapter: chapter,
              subtopic: template.subtopic,
              difficulty: template.difficulty,
              neetRelevance: 4,
              usageCount: 0,
              lastUsed: null,
              status: 'draft',
              designNote: template.designNote,
              createdAt: now(),
              classLevel: blueprint.classLevel,
            })
            break
          }
        }
      }
      attempts++

      // If round-robin didn't fill, pick any remaining unused template
      if (picked.length < count) {
        for (let i = 0; i < pool.length && picked.length < count; i++) {
          if (!usedIndices.has(i)) {
            usedIndices.add(i)
            const { template, chapter } = pool[i]
            picked.push({
              id: generateId(),
              stem: template.stem,
              options: [...template.options],
              correctAnswer: template.correctAnswer,
              explanation: template.explanation,
              chapter: chapter,
              subtopic: template.subtopic,
              difficulty: template.difficulty,
              neetRelevance: 4,
              usageCount: 0,
              lastUsed: null,
              status: 'draft',
              designNote: template.designNote,
              createdAt: now(),
              classLevel: blueprint.classLevel,
            })
          }
        }
      }
    }

    return picked
  }

  // Pick questions for each difficulty level
  const easyQuestions = pickFromPool(easyPool, targetEasy)
  const mediumQuestions = pickFromPool(mediumPool, targetMedium)
  const hardQuestions = pickFromPool(hardPool, targetHard)

  // Combine and shuffle so difficulties are mixed
  questions.push(...shuffleArray([...easyQuestions, ...mediumQuestions, ...hardQuestions]))

  // If we still don't have enough questions, fill remaining slots
  // by repeating from the full shuffled pool (should be rare with 5 per chapter)
  if (questions.length < blueprint.numQuestions) {
    const remaining = blueprint.numQuestions - questions.length
    console.warn(`[question-generator] Fallback pool exhausted. Filling ${remaining} questions by repeating templates.`)

    const allShuffled = shuffleArray([...allTemplates])
    for (let i = 0; i < remaining; i++) {
      const { template, chapter } = allShuffled[i % allShuffled.length]
      questions.push({
        id: generateId(),
        stem: template.stem + ' (Variation)',
        options: [...template.options],
        correctAnswer: template.correctAnswer,
        explanation: template.explanation,
        chapter: chapter,
        subtopic: template.subtopic,
        difficulty: template.difficulty,
        neetRelevance: 4,
        usageCount: 0,
        lastUsed: null,
        status: 'draft',
        designNote: template.designNote,
        createdAt: now(),
        classLevel: blueprint.classLevel,
      })
    }
  }

  return questions.slice(0, blueprint.numQuestions)
}

// ───────────────────────────────────────────────────────────────
// Main: Generate questions using OpenAI GPT-4o-mini
// ───────────────────────────────────────────────────────────────
async function generateWithOpenAI(blueprint: PaperBlueprint): Promise<Question[]> {
  const openai = getOpenAIClient()
  if (!openai) {
    return generateFallbackQuestions(blueprint)
  }

  // Calculate exact numbers per difficulty
  const numEasy = Math.round(blueprint.numQuestions * blueprint.difficultySplit.easy / 100)
  const numMedium = Math.round(blueprint.numQuestions * blueprint.difficultySplit.medium / 100)
  const numHard = blueprint.numQuestions - numEasy - numMedium

  // Build detailed syllabus context for the prompt
  const topicsList = blueprint.weeklyTopics.join(', ')

  // Look up subtopic details from the syllabus for richer context
  const syllabusContext: string[] = []
  for (const topic of blueprint.weeklyTopics) {
    const node = zoologySyllabus.find((s) => s.name === topic)
    if (node) {
      syllabusContext.push(
        `- ${node.name} (Class ${node.classLevel}, ${node.unit}): ${node.subtopics.join('; ')}`
      )
    }
  }

  const systemPrompt = `You are an expert NEET Zoology question paper setter with 20 years of experience creating high-quality, syllabus-aligned multiple choice questions for NEET (National Eligibility cum Entrance Test) in India.

CRITICAL RULES:
1. Each question MUST be unique — never repeat a question stem or similar wording
2. Each question must have exactly 4 options (A, B, C, D) with exactly ONE correct answer
3. Distractors (wrong options) must be plausible — they should relate to the topic but be clearly wrong upon careful analysis
4. Difficulty levels:
   - EASY: Direct concept recall, one-step reasoning, definitions
   - MEDIUM: Two-step reasoning, comparison between concepts, application of knowledge
   - HARD: Multi-step reasoning, exceptions, cross-topic linkage, clinical application
5. Questions must test CONCEPTUAL UNDERSTANDING, not rote memorization
6. Use Indian English conventions and NEET-appropriate terminology
7. Each question must include a detailed explanation (2-3 sentences) that teaches the concept
8. For each question, provide a "designNote" field explaining: what concept it tests, why the correct answer is right, why each distractor is wrong, and what makes it the claimed difficulty level
9. Every question must have a "subtopic" field indicating which specific subtopic within the chapter it tests

OUTPUT FORMAT: Return a JSON object with a single key "questions" containing an array of question objects. Each question object must have these exact fields:
- "stem": string (the question text)
- "options": string[] (exactly 4 options)
- "correctAnswer": number (0-indexed: 0=A, 1=B, 2=C, 3=D)
- "explanation": string (2-3 sentence explanation)
- "difficulty": string (one of "easy", "medium", "hard")
- "subtopic": string (which subtopic this question tests)
- "designNote": string (pedagogical explanation)`

  const userPrompt = `Generate ${blueprint.numQuestions} NEET Zoology MCQs for Class ${blueprint.classLevel} covering the following chapters: ${topicsList}.

DIFFICULTY DISTRIBUTION (generate EXACTLY this many of each):
- EASY: ${numEasy} questions
- MEDIUM: ${numMedium} questions  
- HARD: ${numHard} questions

SYLLABUS CONTEXT:
${syllabusContext.join('\n')}

INSTRUCTIONS:
1. Distribute questions evenly across the listed chapters
2. Within each chapter, test DIFFERENT subtopics — no two questions should test the same subtopic
3. Use varied question styles: direct recall, comparison ("which of the following"), exception-finding ("which is NOT"), application-based, and analytical reasoning
4. Each question must feel fresh and unique — avoid formulaic patterns
5. Distractors should be educationally valuable — each wrong option should reflect a common misconception or closely related concept
6. Explanations should teach the underlying concept, not just state the correct answer
7. Design notes should justify the difficulty level and explain the pedagogical intent`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
      max_tokens: 8000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI returned empty content')
    }

    // Parse JSON response
    let parsed: { questions?: Array<Record<string, unknown>> }
    try {
      parsed = JSON.parse(content)
    } catch (parseErr) {
      console.error('[question-generator] Failed to parse OpenAI JSON response:', parseErr)
      throw new Error('Invalid JSON from OpenAI')
    }

    if (!parsed.questions || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error('OpenAI response missing questions array')
    }

    // Validate and convert each question to the Question type
    const validated: Question[] = []
    for (const q of parsed.questions) {
      // Validate required fields
      if (typeof q.stem !== 'string' || q.stem.trim().length === 0) {
        console.warn('[question-generator] Skipping question with invalid stem')
        continue
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        console.warn('[question-generator] Skipping question with invalid options:', q.options)
        continue
      }
      const correctAnswer = Number(q.correctAnswer)
      if (Number.isNaN(correctAnswer) || correctAnswer < 0 || correctAnswer > 3) {
        console.warn('[question-generator] Skipping question with invalid correctAnswer:', q.correctAnswer)
        continue
      }
      if (typeof q.explanation !== 'string' || q.explanation.trim().length === 0) {
        console.warn('[question-generator] Skipping question with invalid explanation')
        continue
      }
      const difficulty = q.difficulty as string
      if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
        console.warn('[question-generator] Skipping question with invalid difficulty:', difficulty)
        continue
      }

      // Determine chapter — try to match from weeklyTopics, otherwise use first topic
      const subtopic = typeof q.subtopic === 'string' ? q.subtopic : ''
      const chapter = blueprint.weeklyTopics.find((t) =>
        subtopic.toLowerCase().includes(t.toLowerCase()) ||
        (q.stem as string).toLowerCase().includes(t.toLowerCase())
      ) || blueprint.weeklyTopics[0] || 'General'

      validated.push({
        id: generateId(),
        stem: q.stem as string,
        options: q.options as string[],
        correctAnswer: correctAnswer,
        explanation: q.explanation as string,
        chapter: chapter,
        subtopic: subtopic,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        neetRelevance: 4,
        usageCount: 0,
        lastUsed: null,
        status: 'draft',
        designNote: typeof q.designNote === 'string' ? q.designNote : `Tests ${subtopic || chapter}.`,
        createdAt: now(),
        classLevel: blueprint.classLevel,
      })
    }

    if (validated.length === 0) {
      throw new Error('No valid questions after validation')
    }

    // If OpenAI returned fewer questions than requested, fill remaining with fallback
    if (validated.length < blueprint.numQuestions) {
      console.warn(`[question-generator] OpenAI returned ${validated.length}/${blueprint.numQuestions} valid questions. Filling remainder with fallback.`)
      const remainderBlueprint = { ...blueprint, numQuestions: blueprint.numQuestions - validated.length }
      const fallback = generateFallbackQuestions(remainderBlueprint)
      return [...validated, ...fallback]
    }

    return validated.slice(0, blueprint.numQuestions)
  } catch (error) {
    console.error('[question-generator] OpenAI generation failed:', error)
    throw error // Let the caller handle fallback
  }
}

// ───────────────────────────────────────────────────────────────
// Public API: Generate questions (OpenAI primary, fallback backup)
// ───────────────────────────────────────────────────────────────
export async function generateQuestions(blueprint: PaperBlueprint): Promise<Question[]> {
  try {
    return await generateWithOpenAI(blueprint)
  } catch (error) {
    console.error('[question-generator] OpenAI generation failed, using fallback:', error)
    return generateFallbackQuestions(blueprint)
  }
}

// ───────────────────────────────────────────────────────────────
// createBlueprint: preserved from original (works fine as-is)
// ───────────────────────────────────────────────────────────────
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
    chapterIds: formData.weeklyTopics
      .map((t) => {
        const ch = zoologySyllabus.find(
          (s) => s.name === t || s.subtopics.includes(t)
        )
        return ch?.id || ''
      })
      .filter(Boolean),
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
