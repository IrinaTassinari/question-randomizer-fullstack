import { useNavigate } from "react-router-dom";
import { categories, type Category } from "@/data/questions";
import { motion } from "framer-motion";
import { Beaker, Leaf, TreePine, Dna, Bug, Heart, Shuffle, Microscope } from "lucide-react";
import { getCurrentUser, getToken, removeToken } from "@/lib/auth";

const categoryIcons: Record<Category, React.ReactNode> = {
  Zoology: <Beaker className="w-7 h-7" />,
  Botany: <Leaf className="w-7 h-7" />,
  Ecology: <TreePine className="w-7 h-7" />,
  Genetics: <Dna className="w-7 h-7" />,
  Microbiology: <Bug className="w-7 h-7" />,
  "Human Biology": <Heart className="w-7 h-7" />,
  Evolution: <Shuffle className="w-7 h-7" />,
  "Cell Biology": <Microscope className="w-7 h-7" />,
};

const categoryColors: Record<Category, string> = {
  Zoology: "from-amber-500 to-orange-600",
  Botany: "from-emerald-500 to-green-600",
  Ecology: "from-teal-500 to-cyan-600",
  Genetics: "from-violet-500 to-purple-600",
  Microbiology: "from-rose-500 to-pink-600",
  "Human Biology": "from-red-500 to-rose-600",
  Evolution: "from-indigo-500 to-blue-600",
  "Cell Biology": "from-sky-500 to-blue-600",
};

const Index = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getCurrentUser();

  const handleCategory = (category: Category) => {
    navigate(`/quiz/${encodeURIComponent(category)}`);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-3">
          Biology Question Randomizer
        </h1>
        <p className="text-lg md:text-xl text-slate-300">Select a Category</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl w-full">
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategory(cat)}
            className={`bg-gradient-to-br ${categoryColors[cat]} text-white rounded-2xl p-6 md:p-8 flex flex-col items-center gap-3 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer`}
          >
            {categoryIcons[cat]}
            <span className="font-bold text-base md:text-lg text-center leading-tight">{cat}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        {user?.role === "teacher" && (
          <button
            onClick={() => navigate("/add")}
            className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
          >
            Add Questions
          </button>
        )}

        {!token ? (
          <>
            <button
              onClick={() => navigate("/signin")}
              className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/register")}
              className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Logout
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
