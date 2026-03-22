import { useState, useCallback, useEffect } from "react";
import { Question, Category, Difficulty, defaultQuestions } from "@/data/questions";

const STORAGE_KEY = "biology-quiz-questions";

function loadQuestions(): Question[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultQuestions;
}

function saveQuestions(questions: Question[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>(loadQuestions);
  const [lastQuestionId, setLastQuestionId] = useState<number | null>(null);

  useEffect(() => {
    saveQuestions(questions);
  }, [questions]);

  const getRandomQuestion = useCallback(
    (category: Category, difficulty: Difficulty): Question | null => {
      const filtered = questions.filter(
        (q) => q.category === category && q.difficulty === difficulty
      );
      if (filtered.length === 0) return null;
      const available = filtered.filter((q) => q.id !== lastQuestionId);
      const pool = available.length > 0 ? available : filtered;
      const random = pool[Math.floor(Math.random() * pool.length)];
      setLastQuestionId(random.id);
      return random;
    },
    [questions, lastQuestionId]
  );

  const addQuestion = useCallback(
    (q: Omit<Question, "id">) => {
      const maxId = questions.reduce((max, cur) => Math.max(max, cur.id), 0);
      setQuestions((prev) => [...prev, { ...q, id: maxId + 1 }]);
    },
    [questions]
  );

  const questionCount = questions.length;

  return { questions, getRandomQuestion, addQuestion, questionCount };
}
