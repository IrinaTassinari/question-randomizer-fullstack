'use strict';

const defaultQuestions = [
  { category: 'Zoology', difficulty: 'Easy', question: 'What class of animals do whales belong to?', answer: 'Mammals', explanation: 'Whales breathe air and nurse their young.' },
  { category: 'Zoology', difficulty: 'Easy', question: 'What type of animal is a dolphin?', answer: 'Mammal', explanation: 'Dolphins breathe air and nurse their young.' },
  { category: 'Zoology', difficulty: 'Easy', question: 'How many legs does an insect have?', answer: 'Six', explanation: 'All insects have three pairs of legs.' },
  { category: 'Zoology', difficulty: 'Medium', question: 'What is the largest organ of a fish used for breathing?', answer: 'Gills', explanation: 'Gills extract dissolved oxygen from water.' },
  { category: 'Zoology', difficulty: 'Medium', question: 'What is the term for animals that eat both plants and meat?', answer: 'Omnivores', explanation: 'Examples include bears, pigs, and humans.' },
  { category: 'Zoology', difficulty: 'Hard', question: 'What is the phylum of animals with a notochord?', answer: 'Chordata', explanation: 'Chordates include vertebrates and some invertebrates like lancelets.' },
  { category: 'Zoology', difficulty: 'Hard', question: 'What structure do arthropods have instead of an internal skeleton?', answer: 'Exoskeleton', explanation: 'The exoskeleton is made of chitin and provides structural support.' },
  { category: 'Botany', difficulty: 'Easy', question: 'What process allows plants to make food using sunlight?', answer: 'Photosynthesis', explanation: 'Plants convert sunlight, water, and carbon dioxide into glucose.' },
  { category: 'Botany', difficulty: 'Easy', question: 'What part of the plant absorbs water from the soil?', answer: 'Roots', explanation: 'Roots anchor the plant and absorb water and minerals.' },
  { category: 'Botany', difficulty: 'Easy', question: 'What gas do plants release during photosynthesis?', answer: 'Oxygen', explanation: 'Oxygen is a byproduct of the light reactions in photosynthesis.' },
  { category: 'Botany', difficulty: 'Medium', question: 'What is the green pigment in plants that captures light energy?', answer: 'Chlorophyll', explanation: 'Chlorophyll absorbs red and blue light, reflecting green.' },
  { category: 'Botany', difficulty: 'Medium', question: 'What is the process by which water moves up through a plant?', answer: 'Transpiration', explanation: 'Water evaporates from leaves, pulling more water up from roots.' },
  { category: 'Botany', difficulty: 'Hard', question: 'What are the two main stages of photosynthesis?', answer: 'Light-dependent reactions and the Calvin cycle', explanation: 'Light reactions occur in thylakoids; the Calvin cycle occurs in the stroma.' },
  { category: 'Botany', difficulty: 'Hard', question: 'What tissue transports sugars in vascular plants?', answer: 'Phloem', explanation: 'Phloem moves dissolved sugars from leaves to other parts of the plant.' },
  { category: 'Ecology', difficulty: 'Easy', question: 'What do we call a community of living organisms and their environment?', answer: 'Ecosystem', explanation: 'An ecosystem includes both biotic and abiotic components.' },
  { category: 'Ecology', difficulty: 'Easy', question: 'What is the primary source of energy for most ecosystems?', answer: 'The Sun', explanation: 'Sunlight drives photosynthesis, which is the base of most food chains.' },
  { category: 'Ecology', difficulty: 'Easy', question: 'What do herbivores eat?', answer: 'Plants', explanation: 'Herbivores are primary consumers in a food chain.' },
  { category: 'Ecology', difficulty: 'Medium', question: 'What is the term for the role an organism plays in its ecosystem?', answer: 'Niche', explanation: "A niche includes an organism's habitat, diet, and interactions." },
  { category: 'Ecology', difficulty: 'Medium', question: 'What is biodiversity?', answer: 'The variety of life in a particular ecosystem or on Earth', explanation: 'Higher biodiversity generally means a more resilient ecosystem.' },
  { category: 'Ecology', difficulty: 'Hard', question: 'What is the term for the maximum population size an environment can sustain?', answer: 'Carrying capacity', explanation: 'It is determined by available resources like food, water, and space.' },
  { category: 'Ecology', difficulty: 'Hard', question: 'What type of ecological relationship benefits one organism while harming the other?', answer: 'Parasitism', explanation: 'The parasite benefits at the expense of the host.' },
  { category: 'Genetics', difficulty: 'Easy', question: 'What does DNA stand for?', answer: 'Deoxyribonucleic acid', explanation: 'DNA is the molecule that carries genetic instructions.' },
  { category: 'Genetics', difficulty: 'Easy', question: 'Where is DNA found in a cell?', answer: 'In the nucleus', explanation: "The nucleus stores and protects the cell's genetic material." },
  { category: 'Genetics', difficulty: 'Medium', question: 'What molecule carries genetic information in living organisms?', answer: 'DNA', explanation: 'DNA stores hereditary information in its sequence of bases.' },
  { category: 'Genetics', difficulty: 'Medium', question: 'What are the four bases found in DNA?', answer: 'Adenine, Thymine, Guanine, Cytosine', explanation: 'A pairs with T, and G pairs with C.' },
  { category: 'Genetics', difficulty: 'Medium', question: 'What is a gene?', answer: 'A segment of DNA that codes for a protein', explanation: 'Genes determine traits by directing protein synthesis.' },
  { category: 'Genetics', difficulty: 'Hard', question: 'What is the difference between genotype and phenotype?', answer: 'Genotype is the genetic makeup; phenotype is the observable trait', explanation: 'Phenotype results from the interaction of genotype and environment.' },
  { category: 'Genetics', difficulty: 'Hard', question: 'What is a mutation?', answer: 'A change in the DNA sequence', explanation: 'Mutations can be harmful, neutral, or beneficial.' },
  { category: 'Microbiology', difficulty: 'Easy', question: 'What are bacteria?', answer: 'Single-celled microorganisms without a nucleus', explanation: 'Bacteria are prokaryotes found nearly everywhere on Earth.' },
  { category: 'Microbiology', difficulty: 'Easy', question: 'Are all bacteria harmful?', answer: 'No', explanation: 'Many bacteria are beneficial, such as those in the gut microbiome.' },
  { category: 'Microbiology', difficulty: 'Medium', question: 'What is the main difference between bacteria and viruses?', answer: 'Bacteria are living cells; viruses need a host to reproduce', explanation: 'Viruses cannot replicate on their own without a host cell.' },
  { category: 'Microbiology', difficulty: 'Medium', question: 'What tool is used to observe microorganisms?', answer: 'Microscope', explanation: 'Light and electron microscopes allow us to see tiny organisms.' },
  { category: 'Microbiology', difficulty: 'Medium', question: 'What is an antibiotic?', answer: 'A substance that kills or inhibits bacteria', explanation: 'Antibiotics are used to treat bacterial infections, not viral ones.' },
  { category: 'Microbiology', difficulty: 'Hard', question: 'What is binary fission?', answer: 'Asexual reproduction in bacteria where a cell divides into two', explanation: 'Binary fission is rapid and does not involve meiosis.' },
  { category: 'Microbiology', difficulty: 'Hard', question: 'What is a bacteriophage?', answer: 'A virus that infects bacteria', explanation: 'Bacteriophages are the most abundant biological entities on Earth.' },
  { category: 'Human Biology', difficulty: 'Easy', question: 'What organ pumps blood through the body?', answer: 'The heart', explanation: 'The heart is a muscular organ in the circulatory system.' },
  { category: 'Human Biology', difficulty: 'Easy', question: 'How many bones are in the adult human body?', answer: '206', explanation: 'Babies are born with about 270 bones, which fuse over time.' },
  { category: 'Human Biology', difficulty: 'Easy', question: 'What is the largest organ of the human body?', answer: 'The skin', explanation: 'Skin protects internal organs and regulates temperature.' },
  { category: 'Human Biology', difficulty: 'Medium', question: 'What system in the body fights infections?', answer: 'The immune system', explanation: 'White blood cells are key components of the immune response.' },
  { category: 'Human Biology', difficulty: 'Medium', question: 'What is the function of red blood cells?', answer: "To carry oxygen to the body's tissues", explanation: 'Hemoglobin in red blood cells binds oxygen.' },
  { category: 'Human Biology', difficulty: 'Hard', question: 'What part of the brain controls balance and coordination?', answer: 'Cerebellum', explanation: 'The cerebellum fine-tunes motor activity and posture.' },
  { category: 'Human Biology', difficulty: 'Hard', question: 'What is homeostasis?', answer: "The body's ability to maintain stable internal conditions", explanation: 'Examples include temperature regulation and blood sugar balance.' },
  { category: 'Evolution', difficulty: 'Easy', question: 'Who is known as the father of evolution?', answer: 'Charles Darwin', explanation: 'Darwin proposed the theory of natural selection.' },
  { category: 'Evolution', difficulty: 'Easy', question: 'What is a fossil?', answer: 'Preserved remains of ancient organisms', explanation: 'Fossils provide evidence of life from millions of years ago.' },
  { category: 'Evolution', difficulty: 'Medium', question: 'What is natural selection?', answer: 'The process where organisms better adapted to their environment survive and reproduce', explanation: "Also known as 'survival of the fittest'." },
  { category: 'Evolution', difficulty: 'Medium', question: 'What is adaptation?', answer: "A trait that improves an organism's survival in its environment", explanation: 'Adaptations develop over many generations through natural selection.' },
  { category: 'Evolution', difficulty: 'Hard', question: 'What is speciation?', answer: 'The formation of new and distinct species through evolution', explanation: 'Speciation can occur through geographic isolation or other mechanisms.' },
  { category: 'Evolution', difficulty: 'Hard', question: 'What is convergent evolution?', answer: 'When unrelated organisms evolve similar traits independently', explanation: 'Example: wings in bats and birds evolved independently.' },
  { category: 'Cell Biology', difficulty: 'Easy', question: 'What is the basic unit of life?', answer: 'The cell', explanation: 'All living organisms are made up of one or more cells.' },
  { category: 'Cell Biology', difficulty: 'Easy', question: 'What structure surrounds a cell?', answer: 'Cell membrane', explanation: 'The cell membrane controls what enters and leaves the cell.' },
  { category: 'Cell Biology', difficulty: 'Medium', question: 'What organelle is the powerhouse of the cell?', answer: 'Mitochondria', explanation: 'Mitochondria produce ATP through cellular respiration.' },
  { category: 'Cell Biology', difficulty: 'Medium', question: 'What is the difference between plant and animal cells?', answer: 'Plant cells have a cell wall, chloroplasts, and a large vacuole', explanation: 'Animal cells lack these structures but have centrioles.' },
  { category: 'Cell Biology', difficulty: 'Hard', question: 'What is the function of the endoplasmic reticulum?', answer: 'Synthesis and transport of proteins and lipids', explanation: 'Rough ER has ribosomes; smooth ER synthesizes lipids.' },
  { category: 'Cell Biology', difficulty: 'Hard', question: 'What is mitosis?', answer: 'Cell division that produces two identical daughter cells', explanation: 'Mitosis is used for growth and repair in organisms.' },
  { category: 'Cell Biology', difficulty: 'Hard', question: 'What is the role of the Golgi apparatus?', answer: 'Modifying, packaging, and shipping proteins', explanation: 'The Golgi apparatus processes proteins from the ER for export.' },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      'SELECT id FROM auth_users ORDER BY id ASC LIMIT 1;'
    );

    if (!users.length) {
      throw new Error('Seed requires at least one user in auth_users. Register a teacher first, then run db:seed:all.');
    }

    const createdBy = users[0].id;
    const now = new Date();

    await queryInterface.bulkInsert(
      'questions',
      defaultQuestions.map((item) => ({
        ...item,
        createdBy,
        createdAt: now,
        updatedAt: now,
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {});
  },
};
