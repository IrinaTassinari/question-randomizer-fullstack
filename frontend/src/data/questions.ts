export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category =
  | "Zoology"
  | "Botany"
  | "Ecology"
  | "Genetics"
  | "Microbiology"
  | "Human Biology"
  | "Evolution"
  | "Cell Biology";

export interface Question {
  id: number;
  category: Category;
  difficulty: Difficulty;
  question: string;
  answer: string;
  explanation: string;
}

export const categories: Category[] = [
  "Zoology",
  "Botany",
  "Ecology",
  "Genetics",
  "Microbiology",
  "Human Biology",
  "Evolution",
  "Cell Biology",
];

export const defaultQuestions: Question[] = [
  // ZOOLOGY - Easy
  { id: 1, category: "Zoology", difficulty: "Easy", question: "What class of animals do whales belong to?", answer: "Mammals", explanation: "Whales breathe air and nurse their young." },
  { id: 2, category: "Zoology", difficulty: "Easy", question: "What type of animal is a dolphin?", answer: "Mammal", explanation: "Dolphins breathe air and nurse their young." },
  { id: 3, category: "Zoology", difficulty: "Easy", question: "How many legs does an insect have?", answer: "Six", explanation: "All insects have three pairs of legs." },
  // ZOOLOGY - Medium
  { id: 4, category: "Zoology", difficulty: "Medium", question: "What is the largest organ of a fish used for breathing?", answer: "Gills", explanation: "Gills extract dissolved oxygen from water." },
  { id: 5, category: "Zoology", difficulty: "Medium", question: "What is the term for animals that eat both plants and meat?", answer: "Omnivores", explanation: "Examples include bears, pigs, and humans." },
  // ZOOLOGY - Hard
  { id: 6, category: "Zoology", difficulty: "Hard", question: "What is the phylum of animals with a notochord?", answer: "Chordata", explanation: "Chordates include vertebrates and some invertebrates like lancelets." },
  { id: 7, category: "Zoology", difficulty: "Hard", question: "What structure do arthropods have instead of an internal skeleton?", answer: "Exoskeleton", explanation: "The exoskeleton is made of chitin and provides structural support." },

  // BOTANY - Easy
  { id: 8, category: "Botany", difficulty: "Easy", question: "What process allows plants to make food using sunlight?", answer: "Photosynthesis", explanation: "Plants convert sunlight, water, and carbon dioxide into glucose." },
  { id: 9, category: "Botany", difficulty: "Easy", question: "What part of the plant absorbs water from the soil?", answer: "Roots", explanation: "Roots anchor the plant and absorb water and minerals." },
  { id: 10, category: "Botany", difficulty: "Easy", question: "What gas do plants release during photosynthesis?", answer: "Oxygen", explanation: "Oxygen is a byproduct of the light reactions in photosynthesis." },
  // BOTANY - Medium
  { id: 11, category: "Botany", difficulty: "Medium", question: "What is the green pigment in plants that captures light energy?", answer: "Chlorophyll", explanation: "Chlorophyll absorbs red and blue light, reflecting green." },
  { id: 12, category: "Botany", difficulty: "Medium", question: "What is the process by which water moves up through a plant?", answer: "Transpiration", explanation: "Water evaporates from leaves, pulling more water up from roots." },
  // BOTANY - Hard
  { id: 13, category: "Botany", difficulty: "Hard", question: "What are the two main stages of photosynthesis?", answer: "Light-dependent reactions and the Calvin cycle", explanation: "Light reactions occur in thylakoids; the Calvin cycle occurs in the stroma." },
  { id: 14, category: "Botany", difficulty: "Hard", question: "What tissue transports sugars in vascular plants?", answer: "Phloem", explanation: "Phloem moves dissolved sugars from leaves to other parts of the plant." },

  // ECOLOGY - Easy
  { id: 15, category: "Ecology", difficulty: "Easy", question: "What do we call a community of living organisms and their environment?", answer: "Ecosystem", explanation: "An ecosystem includes both biotic and abiotic components." },
  { id: 16, category: "Ecology", difficulty: "Easy", question: "What is the primary source of energy for most ecosystems?", answer: "The Sun", explanation: "Sunlight drives photosynthesis, which is the base of most food chains." },
  { id: 17, category: "Ecology", difficulty: "Easy", question: "What do herbivores eat?", answer: "Plants", explanation: "Herbivores are primary consumers in a food chain." },
  // ECOLOGY - Medium
  { id: 18, category: "Ecology", difficulty: "Medium", question: "What is the term for the role an organism plays in its ecosystem?", answer: "Niche", explanation: "A niche includes an organism's habitat, diet, and interactions." },
  { id: 19, category: "Ecology", difficulty: "Medium", question: "What is biodiversity?", answer: "The variety of life in a particular ecosystem or on Earth", explanation: "Higher biodiversity generally means a more resilient ecosystem." },
  // ECOLOGY - Hard
  { id: 20, category: "Ecology", difficulty: "Hard", question: "What is the term for the maximum population size an environment can sustain?", answer: "Carrying capacity", explanation: "It is determined by available resources like food, water, and space." },
  { id: 21, category: "Ecology", difficulty: "Hard", question: "What type of ecological relationship benefits one organism while harming the other?", answer: "Parasitism", explanation: "The parasite benefits at the expense of the host." },

  // GENETICS - Easy
  { id: 22, category: "Genetics", difficulty: "Easy", question: "What does DNA stand for?", answer: "Deoxyribonucleic acid", explanation: "DNA is the molecule that carries genetic instructions." },
  { id: 23, category: "Genetics", difficulty: "Easy", question: "Where is DNA found in a cell?", answer: "In the nucleus", explanation: "The nucleus stores and protects the cell's genetic material." },
  // GENETICS - Medium
  { id: 24, category: "Genetics", difficulty: "Medium", question: "What molecule carries genetic information in living organisms?", answer: "DNA", explanation: "DNA stores hereditary information in its sequence of bases." },
  { id: 25, category: "Genetics", difficulty: "Medium", question: "What are the four bases found in DNA?", answer: "Adenine, Thymine, Guanine, Cytosine", explanation: "A pairs with T, and G pairs with C." },
  { id: 26, category: "Genetics", difficulty: "Medium", question: "What is a gene?", answer: "A segment of DNA that codes for a protein", explanation: "Genes determine traits by directing protein synthesis." },
  // GENETICS - Hard
  { id: 27, category: "Genetics", difficulty: "Hard", question: "What is the difference between genotype and phenotype?", answer: "Genotype is the genetic makeup; phenotype is the observable trait", explanation: "Phenotype results from the interaction of genotype and environment." },
  { id: 28, category: "Genetics", difficulty: "Hard", question: "What is a mutation?", answer: "A change in the DNA sequence", explanation: "Mutations can be harmful, neutral, or beneficial." },

  // MICROBIOLOGY - Easy
  { id: 29, category: "Microbiology", difficulty: "Easy", question: "What are bacteria?", answer: "Single-celled microorganisms without a nucleus", explanation: "Bacteria are prokaryotes found nearly everywhere on Earth." },
  { id: 30, category: "Microbiology", difficulty: "Easy", question: "Are all bacteria harmful?", answer: "No", explanation: "Many bacteria are beneficial, such as those in the gut microbiome." },
  // MICROBIOLOGY - Medium
  { id: 31, category: "Microbiology", difficulty: "Medium", question: "What is the main difference between bacteria and viruses?", answer: "Bacteria are living cells; viruses need a host to reproduce", explanation: "Viruses cannot replicate on their own without a host cell." },
  { id: 32, category: "Microbiology", difficulty: "Medium", question: "What tool is used to observe microorganisms?", answer: "Microscope", explanation: "Light and electron microscopes allow us to see tiny organisms." },
  { id: 33, category: "Microbiology", difficulty: "Medium", question: "What is an antibiotic?", answer: "A substance that kills or inhibits bacteria", explanation: "Antibiotics are used to treat bacterial infections, not viral ones." },
  // MICROBIOLOGY - Hard
  { id: 34, category: "Microbiology", difficulty: "Hard", question: "What is binary fission?", answer: "Asexual reproduction in bacteria where a cell divides into two", explanation: "Binary fission is rapid and does not involve meiosis." },
  { id: 35, category: "Microbiology", difficulty: "Hard", question: "What is a bacteriophage?", answer: "A virus that infects bacteria", explanation: "Bacteriophages are the most abundant biological entities on Earth." },

  // HUMAN BIOLOGY - Easy
  { id: 36, category: "Human Biology", difficulty: "Easy", question: "What organ pumps blood through the body?", answer: "The heart", explanation: "The heart is a muscular organ in the circulatory system." },
  { id: 37, category: "Human Biology", difficulty: "Easy", question: "How many bones are in the adult human body?", answer: "206", explanation: "Babies are born with about 270 bones, which fuse over time." },
  { id: 38, category: "Human Biology", difficulty: "Easy", question: "What is the largest organ of the human body?", answer: "The skin", explanation: "Skin protects internal organs and regulates temperature." },
  // HUMAN BIOLOGY - Medium
  { id: 39, category: "Human Biology", difficulty: "Medium", question: "What system in the body fights infections?", answer: "The immune system", explanation: "White blood cells are key components of the immune response." },
  { id: 40, category: "Human Biology", difficulty: "Medium", question: "What is the function of red blood cells?", answer: "To carry oxygen to the body's tissues", explanation: "Hemoglobin in red blood cells binds oxygen." },
  // HUMAN BIOLOGY - Hard
  { id: 41, category: "Human Biology", difficulty: "Hard", question: "What part of the brain controls balance and coordination?", answer: "Cerebellum", explanation: "The cerebellum fine-tunes motor activity and posture." },
  { id: 42, category: "Human Biology", difficulty: "Hard", question: "What is homeostasis?", answer: "The body's ability to maintain stable internal conditions", explanation: "Examples include temperature regulation and blood sugar balance." },

  // EVOLUTION - Easy
  { id: 43, category: "Evolution", difficulty: "Easy", question: "Who is known as the father of evolution?", answer: "Charles Darwin", explanation: "Darwin proposed the theory of natural selection." },
  { id: 44, category: "Evolution", difficulty: "Easy", question: "What is a fossil?", answer: "Preserved remains of ancient organisms", explanation: "Fossils provide evidence of life from millions of years ago." },
  // EVOLUTION - Medium
  { id: 45, category: "Evolution", difficulty: "Medium", question: "What is natural selection?", answer: "The process where organisms better adapted to their environment survive and reproduce", explanation: "Also known as 'survival of the fittest'." },
  { id: 46, category: "Evolution", difficulty: "Medium", question: "What is adaptation?", answer: "A trait that improves an organism's survival in its environment", explanation: "Adaptations develop over many generations through natural selection." },
  // EVOLUTION - Hard
  { id: 47, category: "Evolution", difficulty: "Hard", question: "What is speciation?", answer: "The formation of new and distinct species through evolution", explanation: "Speciation can occur through geographic isolation or other mechanisms." },
  { id: 48, category: "Evolution", difficulty: "Hard", question: "What is convergent evolution?", answer: "When unrelated organisms evolve similar traits independently", explanation: "Example: wings in bats and birds evolved independently." },

  // CELL BIOLOGY - Easy
  { id: 49, category: "Cell Biology", difficulty: "Easy", question: "What is the basic unit of life?", answer: "The cell", explanation: "All living organisms are made up of one or more cells." },
  { id: 50, category: "Cell Biology", difficulty: "Easy", question: "What structure surrounds a cell?", answer: "Cell membrane", explanation: "The cell membrane controls what enters and leaves the cell." },
  // CELL BIOLOGY - Medium
  { id: 51, category: "Cell Biology", difficulty: "Medium", question: "What organelle is the powerhouse of the cell?", answer: "Mitochondria", explanation: "Mitochondria produce ATP through cellular respiration." },
  { id: 52, category: "Cell Biology", difficulty: "Medium", question: "What is the difference between plant and animal cells?", answer: "Plant cells have a cell wall, chloroplasts, and a large vacuole", explanation: "Animal cells lack these structures but have centrioles." },
  // CELL BIOLOGY - Hard
  { id: 53, category: "Cell Biology", difficulty: "Hard", question: "What is the function of the endoplasmic reticulum?", answer: "Synthesis and transport of proteins and lipids", explanation: "Rough ER has ribosomes; smooth ER synthesizes lipids." },
  { id: 54, category: "Cell Biology", difficulty: "Hard", question: "What is mitosis?", answer: "Cell division that produces two identical daughter cells", explanation: "Mitosis is used for growth and repair in organisms." },
  { id: 55, category: "Cell Biology", difficulty: "Hard", question: "What is the role of the Golgi apparatus?", answer: "Modifying, packaging, and shipping proteins", explanation: "The Golgi apparatus processes proteins from the ER for export." },
];
