import Question from "../models/question.js";

const allowedCategories = [
  "Zoology",
  "Botany",
  "Ecology",
  "Genetics",
  "Microbiology",
  "Human Biology",
  "Evolution",
  "Cell Biology",
];

const allowedDifficulties = ["Easy", "Medium", "Hard"];

export async function getQuestions(req, res, next) {
  try {
    const questions = await Question.findAll({ order: [["id", "ASC"]] });
    res.json(questions);
  } catch (error) {
    next(error);
  }
}

export async function createQuestion(req, res, next) {
  const { category, difficulty, question, answer, explanation } = req.body;

  try {
    if (!category || !difficulty || !question || !answer) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty" });
    }

    const newQuestion = await Question.create({
      category,
      difficulty,
      question,
      answer,
      explanation: explanation || "",
      createdBy: req.user.id,
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    next(error);
  }
}
