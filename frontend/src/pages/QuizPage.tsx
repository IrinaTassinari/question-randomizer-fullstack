import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { type Category, type Difficulty, type Question } from "@/data/questions";
import { useQuestions } from "@/hooks/useQuestions";
import { ArrowLeft, Eye, RefreshCw } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";


const difficultyColors: Record<Difficulty, string> = {
  Easy: "from-green-500 to-emerald-600",
  Medium: "from-yellow-500 to-amber-600",
  Hard: "from-red-500 to-rose-600",
};

const QuizPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { getRandomQuestion, loading, error } = useQuestions();
  const user = getCurrentUser();


  const decodedCategory = decodeURIComponent(category || "") as Category;

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [noQuestions, setNoQuestions] = useState(false);

  const pickQuestion = (diff: Difficulty) => {
    const q = getRandomQuestion(decodedCategory, diff);
    if (!q) {
      setNoQuestions(true);
      setCurrentQuestion(null);
    } else {
      setNoQuestions(false);
      setCurrentQuestion(q);
      setQuestionCount((c) => c + 1);
    }
    setShowAnswer(false);
  };

  const handleDifficulty = (diff: Difficulty) => {
    setDifficulty(diff);
    pickQuestion(diff);
  };

  const handleNewQuestion = () => {
    if (difficulty) pickQuestion(difficulty);
  };

  if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <p className="text-slate-300 text-lg">Loading questions...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-red-300">
        {error}
      </div>
    </div>
  );
}


  // Difficulty selection
  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Category</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6">{decodedCategory}</h1>
          <p className="text-lg text-slate-300">Select Difficulty</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          {(["Easy", "Medium", "Hard"] as Difficulty[]).map((diff, i) => (
            <motion.button
              key={diff}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDifficulty(diff)}
              className={`bg-gradient-to-br ${difficultyColors[diff]} text-white font-bold text-xl md:text-2xl rounded-2xl px-12 py-6 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer`}
            >
              {diff}
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-10 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </button>
      </div>
    );
  }

  // Question display
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {decodedCategory}
            </span>
            <span className={`bg-gradient-to-r ${difficultyColors[difficulty]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {difficulty}
            </span>
          </div>
          <span className="text-slate-500 text-sm">#{questionCount}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {noQuestions ? (
            <motion.div
              key="no-q"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/5 rounded-3xl p-10 text-center"
            >
              <p className="text-slate-300 text-lg">No questions found for this category and difficulty.</p>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-8">
                {currentQuestion.question}
              </p>

              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 pt-6 mt-2">
                      <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Answer</p>
                      <p className="text-xl md:text-2xl font-bold text-emerald-400 mb-4">
                        {currentQuestion.answer}
                      </p>
                      {currentQuestion.explanation && (
                        <>
                          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Explanation</p>
                          <p className="text-slate-300 text-base leading-relaxed">
                            {currentQuestion.explanation}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mt-8 justify-center"
        >
          {!showAnswer && currentQuestion && (
            <button
              onClick={() => setShowAnswer(true)}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl px-8 py-4 shadow-lg transition-colors cursor-pointer"
            >
              <Eye className="w-5 h-5" /> Show Answer
            </button>
          )}
          <button
            onClick={handleNewQuestion}
            className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-lg rounded-xl px-8 py-4 shadow-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" /> New Question
          </button>
          {user?.role === "teacher" && (
            <button
              onClick={() => navigate("/add")}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl px-8 py-4 transition-colors cursor-pointer"
            >
              Add Question
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl px-8 py-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" /> Categories
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
