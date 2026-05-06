import React from 'react'
import { FaUserFriends, FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ConnectSection = () => {
  const options = [
    'Planning A Visit',
    'Salvation',
    'Baptism',
    'Joining The Church',
    'Volunteering',
    'Prayer Request',
    'Music Ministry',
  ]

  return (
    <div className="bg-church-dark py-20 lg:py-32 relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-church-red/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* --- LEFT COLUMN: Header & Options (Golden Ratio 5 Columns) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                Let's <span className="text-church-red">Connect</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We'd love to meet you in person! Let us know how we can serve you, and someone from
                our team will reach out soon.
              </p>
            </div>

            {/* Checkboxes transformed into modern selectable chips */}
            <div className="space-y-4">
              <p className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-4">
                I'd like to learn more about:
              </p>
              <div className="flex flex-wrap gap-3">
                {options.map((opt) => (
                  <label key={opt} className="cursor-pointer group relative">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="inline-block px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium peer-checked:bg-church-red peer-checked:text-white peer-checked:border-church-red hover:border-white/30 transition-all shadow-sm">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: Form Card (Golden Ratio 7 Columns) --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#1c2128]/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
              <form className="flex flex-col space-y-6">
                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Your Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      required
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Full Width */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all"
                  />
                </div>

                {/* Message Full Width */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-church-red hover:text-white transition-all duration-300 shadow-xl hover:shadow-church-red/20 group"
                  >
                    <FaUserFriends className="text-lg group-hover:scale-110 transition-transform" />
                    Submit Connection
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ConnectSection
