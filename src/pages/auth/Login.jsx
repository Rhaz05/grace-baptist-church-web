import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChurch, FaEnvelope, FaLock, FaSpinner, FaArrowLeft } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(
        authError.message === 'Invalid login credentials'
          ? 'The email or password you entered is incorrect.'
          : authError.message,
      )
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 ">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex min-h-175">
        <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-[#1c2128]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop')",
            }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#1c2128] via-[#1c2128]/80 to-transparent"></div>

          <div className="relative z-10 w-full p-12 flex flex-col justify-center">
            <Link
              to="/"
              className="absolute top-10 left-12 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest w-fit"
            >
              <FaArrowLeft /> Back to Website
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8"
            >
              <div className="w-16 h-16 bg-church-red rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-church-red/20">
                <FaChurch className="text-white text-3xl" />
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                Grace Baptist <br />
                <span className="text-church-red">Admin</span>
              </h1>
              <p className="text-gray-400 text-base xl:text-lg font-medium max-w-md">
                Secure staff portal for managing church events, sermons, photos, and community
                resources.
              </p>

              <div className="mt-12 pt-12 border-t border-white/10">
                <p className="text-lg xl:text-xl text-gray-300 font-serif italic leading-relaxed mb-4">
                  "For the equipping of the saints for the work of ministry, for the edifying of the
                  body of Christ."
                </p>
                <p className="text-church-red font-black uppercase tracking-[0.2em] text-xs">
                  — Ephesians 4:12
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-16 bg-white">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-110"
          >
            <div className="lg:hidden text-center mb-10">
              <div className="w-16 h-16 bg-church-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-church-red/20">
                <FaChurch className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                Admin <span className="text-church-red">Portal</span>
              </h2>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2 hidden lg:block">
                Welcome Back
              </h2>
              <p className="text-gray-500 font-medium">Please sign in to access the dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-church-red transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-church-red/50 focus:border-church-red transition-all shadow-sm"
                    placeholder="name@gracebaptist.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-church-red transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-church-red/50 focus:border-church-red transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-100 text-red-600 text-sm py-3 px-4 rounded-xl text-center font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-church-red hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-xl shadow-red-900/10 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" /> Authenticating...
                  </>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            {/* Footer Footer */}
            <footer className="mt-12 text-center lg:text-left">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center justify-center lg:justify-start gap-2">
                Protected by Supabase Auth
              </span>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login
