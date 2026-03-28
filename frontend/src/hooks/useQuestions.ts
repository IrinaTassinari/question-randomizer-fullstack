import { useEffect, useCallback, useState } from "react";
import { fetchQuestions } from "@/lib/auth-api";
import { type Category, type Difficulty, type Question } from "@/data/questions";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lastQuestionId, setLastQuestionId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const result = await fetchQuestions();
        setQuestions(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load questions");
        }
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const questionCount = questions.length;

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


  return {
    questions,
    setQuestions,
    getRandomQuestion,
    questionCount,
    loading,
    error,
  };
}
