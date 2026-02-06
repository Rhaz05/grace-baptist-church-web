import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChurch, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "The email or password you entered is incorrect."
          : authError.message,
      );
      setLoading(false);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-church-red/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-inner">
              <FaChurch className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
              Admin Portal
            </h2>
            <p className="text-gray-300 text-sm font-medium">
              Secure access for GBC staff
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-church-red transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-church-red/50 focus:border-church-red/50 transition-all"
                  placeholder="pastor@gbclucena.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Access Password
              </label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-church-red transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-church-red/50 focus:border-church-red/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs py-3 px-4 rounded-xl text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden group py-4 bg-church-red text-white font-black uppercase text-sm tracking-widest rounded-2xl shadow-xl shadow-church-red/20 hover:shadow-church-red/40 transition-all disabled:opacity-70"
            >
              <span
                className={`flex items-center justify-center gap-3 transition-all ${loading ? "opacity-0" : "opacity-100"}`}
              >
                Sign In to Dashboard
              </span>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaSpinner className="animate-spin text-xl" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Protected by Supabase Auth
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
