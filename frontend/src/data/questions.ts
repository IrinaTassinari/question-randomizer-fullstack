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
