import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { FaUserFriends, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [selectedInterests, setSelectedInterests] = useState([])

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle checkbox toggles
  const handleCheckboxChange = (option) => {
    if (selectedInterests.includes(option)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== option))
    } else {
      setSelectedInterests([...selectedInterests, option])
    }
  }

  // Handle form submission to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('connections').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          interests: selectedInterests,
          status: 'new', // Sets default status for your admin dashboard
        },
      ])

      if (error) throw error

      // Show success message and clear form
      setIsSuccess(true)
      setFormData({ name: '', phone: '', email: '', message: '' })
      setSelectedInterests([])

      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-church-dark py-20 lg:py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-church-red/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* --- LEFT COLUMN --- */}
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

            <div className="space-y-4">
              <p className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-4">
                I'd like to learn more about:
              </p>
              <div className="flex flex-wrap gap-3">
                {options.map((opt) => (
                  <label key={opt} className="cursor-pointer group relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={selectedInterests.includes(opt)}
                      onChange={() => handleCheckboxChange(opt)}
                    />
                    <span className="inline-block px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium peer-checked:bg-church-red peer-checked:text-white peer-checked:border-church-red hover:border-white/30 transition-all shadow-sm select-none">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#1c2128]/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-[#1c2128]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                  >
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400">
                      Thank you for reaching out. A member of our team will contact you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
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
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      required
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                    Your Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-church-red hover:text-white transition-all duration-300 shadow-xl hover:shadow-church-red/20 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <FaSpinner className="animate-spin text-lg" />
                    ) : (
                      <FaUserFriends className="text-lg group-hover:scale-110 transition-transform" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Submit Connection'}
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
