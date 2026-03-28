import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProfile } from "@/lib/auth-api";
import { getToken, removeToken,  setCurrentUser } from "@/lib/auth";

type User = {
  id: number;
  username: string;
  email: string;
  role: "teacher" | "student";
};

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/signin");
      return;
    }

    const loadProfile = async () => {
      try {
        const result = await getProfile(token);
        setUser(result.user);
        setCurrentUser(result.user);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <p className="text-slate-300 text-lg">Loading...</p>
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <p className="text-slate-300 text-lg">No user data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center px-4 py-8">
      <div className="max-w-lg w-full">
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Profile</h1>
          <p className="text-slate-400 mb-8 text-sm">Your authenticated account details.</p>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Username</p>
              <p className="text-white text-lg font-semibold">{user.username}</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p>
              <p className="text-white text-lg font-semibold">{user.email}</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Role</p>
              <p className="text-white text-lg font-semibold capitalize">{user.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 bg-rose-600 hover:bg-rose-500 text-white font-bold text-lg rounded-xl px-8 py-4 shadow-lg transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
