import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBookOpen, FaFilePdf, FaEye, FaDownload, FaSpinner } from 'react-icons/fa'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const BibleReadingGuide = () => {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuides()
  }, [])

  async function fetchGuides() {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('category', 'Bible Reading Guide')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGuides(data || [])
    } catch (err) {
      console.error('Error fetching reading guides:', err)
    } finally {
      setLoading(false)
    }
  }

  // Split into Featured (Latest) and Previous guides
  const featuredGuide = guides[0]
  const previousGuides = guides.slice(1)

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-24 md:pt-32">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- HEADER --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-l-4 border-church-red pl-6"
        >
          <div className="inline-flex items-center gap-2 bg-church-red/10 text-church-red px-4 py-2 rounded-full mb-4">
            <FaBookOpen className="text-sm" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Daily Devotion
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-2">
            Bible Reading <span className="text-church-red">Guide</span>
          </h1>
          <p className="text-lg text-white font-medium max-w-2xl">
            Download our curated reading plans and journey through the Scriptures with us. Let God's
            Word guide your daily path.
          </p>
        </motion.section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
            <FaSpinner className="animate-spin text-church-red text-4xl mb-4" />
            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
              Loading Guides...
            </p>
          </div>
        ) : guides.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 text-3xl mb-4">
              <FaBookOpen />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Guides Available</h3>
            <p className="text-gray-500">
              We are currently preparing our next reading plan. Check back soon!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {/* --- FEATURED GUIDE (Golden Ratio 7:5 Split) --- */}
            {featuredGuide && (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="bg-[#1c2128] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-800"
              >
                {/* Left Side: Content (7 Columns) */}
                <div className="lg:w-7/12 p-8 md:p-14 flex flex-col justify-center">
                  <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-church-red animate-pulse"></span>{' '}
                    Current Plan
                  </p>

                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                    {featuredGuide.title}
                  </h2>

                  <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-xl">
                    {featuredGuide.description ||
                      'Join us in our latest reading guide. Download the PDF below to follow along with our daily scripture schedule.'}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-4">
                    <a
                      href={featuredGuide.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 bg-church-red text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-lg hover:shadow-church-red/20 group"
                    >
                      <FaEye className="text-sm group-hover:scale-110 transition-transform" />
                      Read Online
                    </a>
                    <a
                      href={featuredGuide.file_url}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all group"
                    >
                      <FaDownload className="text-sm group-hover:-translate-y-1 transition-transform" />
                      Download PDF
                    </a>
                  </div>
                </div>

                {/* Right Side: Visual (5 Columns) */}
                <div className="lg:w-5/12 h-75 lg:h-auto relative overflow-hidden bg-gray-900 border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center p-8 group">
                  {featuredGuide.image_url ? (
                    <img
                      src={featuredGuide.image_url}
                      alt={featuredGuide.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-xl"
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center">
                      <div className="w-32 h-32 bg-white/5 rounded-4xl flex items-center justify-center text-church-red/80 mb-6 shadow-inner transform group-hover:rotate-12 transition-transform duration-500">
                        <FaFilePdf className="text-6xl drop-shadow-lg" />
                      </div>
                      <span className="text-white/30 font-black uppercase tracking-[0.3em] text-xs">
                        PDF Document
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* --- PREVIOUS GUIDES GRID --- */}
            {previousGuides.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                    Previous <span className="text-church-red">Guides</span>
                  </h3>
                  <div className="h-px bg-gray-200 grow ml-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {previousGuides.map((guide, index) => (
                      <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-4xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-church-red/30 transition-all duration-300 flex flex-col h-full group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-church-red text-2xl group-hover:bg-church-red group-hover:text-white transition-colors duration-300">
                            <FaFilePdf />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-lg leading-tight mb-1 group-hover:text-church-red transition-colors line-clamp-2">
                              {guide.title}
                            </h4>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                              Added{' '}
                              {new Date(guide.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-500 text-sm line-clamp-3 mb-6 grow">
                          {guide.description || 'A reading plan to help you grow in your faith.'}
                        </p>

                        <a
                          href={guide.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-auto flex items-center justify-center gap-2 w-full bg-gray-50 text-gray-900 px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-church-red hover:text-white transition-all group-hover:shadow-md"
                        >
                          <FaEye className="text-sm" /> View PDF
                        </a>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BibleReadingGuide
