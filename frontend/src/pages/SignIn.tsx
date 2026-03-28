import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { signInUser } from "@/lib/auth-api";
import { setCurrentUser, setToken } from "@/lib/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInUser({ email, password });
      setToken(result.token);
      setCurrentUser(result.user);
      navigate("/profile");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center px-4 py-8">
      <div className="max-w-lg w-full">
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <h1 className="text-3xl font-extrabold text-white mb-2">Sign In</h1>
        <p className="text-slate-400 mb-8 text-sm">
          Enter your email and password to access your profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-slate-300 text-sm font-semibold block mb-1">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm font-semibold block mb-1">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-70 text-white font-bold text-lg rounded-xl px-8 py-4 shadow-lg transition-colors cursor-pointer"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-6 text-center">
          No account yet?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-sky-400 hover:text-sky-300 underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
