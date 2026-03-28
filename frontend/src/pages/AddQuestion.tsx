/**
 * Что делает:
- страницу сможет использовать только teacher
- вопрос пойдёт в backend, а не в localStorage
- student при прямом заходе на /add будет отправлен назад
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, type Category, type Difficulty } from "@/data/questions";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { createQuestion } from "@/lib/auth-api";
import { getCurrentUser, getToken } from "@/lib/auth";

const AddQuestion = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getCurrentUser();

  const [category, setCategory] = useState<Category>(categories[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    if (user?.role !== "teacher") {
      navigate("/");
    }
  }, [navigate, token, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      navigate("/signin");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createQuestion(token, {
        category,
        difficulty,
        question: question.trim(),
        answer: answer.trim(),
        explanation: explanation.trim(),
      });

      setSaved(true);
      setQuestion("");
      setAnswer("");
      setExplanation("");
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save question");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </button>

        <h1 className="text-3xl font-extrabold text-white mb-2">Add a Question</h1>
        <p className="text-slate-400 mb-8 text-sm">Teachers can add new questions to the shared database.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-slate-300 text-sm font-semibold block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-800">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-300 text-sm font-semibold block mb-1">Difficulty</label>
            <div className="flex gap-3">
              {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-5 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
                    difficulty === d
                      ? "bg-sky-600 text-white"
                      : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-300 text-sm font-semibold block mb-1">Question *</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={3}
              className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              placeholder="Type the question..."
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm font-semibold block mb-1">Answer *</label>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Correct answer"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm font-semibold block mb-1">Explanation (optional)</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={2}
              className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              placeholder="Why is this the answer?"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 text-white font-bold text-lg rounded-xl px-8 py-4 shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <CheckCircle className="w-5 h-5" /> Saved!
              </>
            ) : loading ? (
              "Saving..."
            ) : (
              "Save Question"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddQuestion;
