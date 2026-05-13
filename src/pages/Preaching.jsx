import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSearch,
  FaCalendarAlt,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
} from 'react-icons/fa'

const ITEMS_PER_PAGE = 6

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const Preaching = () => {
  const [allSermons, setAllSermons] = useState([])
  const [filteredSermons, setFilteredSermons] = useState([])
  const [featuredSermon, setFeaturedSermon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const getThumbnail = (url, quality = 'maxresdefault') => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11
      ? `https://i.ytimg.com/vi/${match[2]}/${quality}.jpg`
      : null
  }

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const { data, error } = await supabase
          .from('sermons')
          .select('*')
          .order('date_preached', { ascending: false })

        if (error) throw error
        if (data && data.length > 0) {
          setAllSermons(data)
          setFilteredSermons(data)
          setFeaturedSermon(data[0])
        }
      } catch (error) {
        console.error('Error fetching sermons:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSermons()
  }, [])

  useEffect(() => {
    let results = allSermons
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          (s.description && s.description.toLowerCase().includes(term)),
      )
    }
    if (selectedDate) {
      results = results.filter((s) => s.date_preached === selectedDate)
    }
    setFilteredSermons(results)
    setCurrentPage(1)
  }, [searchTerm, selectedDate, allSermons])

  const totalPages = Math.ceil(filteredSermons.length / ITEMS_PER_PAGE)
  const displayedSermons = filteredSermons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <div className="pt-30 pb-24 overflow-hidden min-h-screen relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-black/70 backdrop-blur-xl border border-white/10 rounded-4xl p-8 md:p-10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8"
        >
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-2">
              Preaching <span className="text-church-red">Library</span>
            </h1>
            <p className="text-gray-300 font-medium">
              Watch and listen to messages of hope, faith, and the Word of God.
            </p>
          </div>

          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-4 justify-start lg:justify-end">
            <div className="relative w-full sm:w-auto sm:min-w-62.5">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-church-red transition-all font-medium shadow-inner"
                placeholder="Find a sermon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="date"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-transparent rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-church-red transition-all font-bold shadow-lg [scheme:light]"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {!searchTerm && !selectedDate && featuredSermon && currentPage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
            >
              {/* Image Side (7 Columns) */}
              <div className="lg:col-span-7 h-87.5 md:h-112.5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group border border-white/10">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${getThumbnail(featuredSermon.video_url)}')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                {/* Floating Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-church-red/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <FaPlay className="ml-2 text-2xl" />
                  </div>
                </div>
              </div>

              {/* Content Side (5 Columns) */}
              <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-church-red/5 rounded-full blur-3xl"></div>

                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-church-red text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-church-red animate-pulse"></span> Latest
                  Message
                </motion.span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tighter line-clamp-3">
                  {featuredSermon.title}
                </h2>

                <div className="space-y-1 mb-6">
                  {featuredSermon.preacher && (
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                      By {featuredSermon.preacher}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                    {new Date(featuredSermon.date_preached).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <p className="text-gray-600 mb-8 line-clamp-3 text-base leading-relaxed">
                  {featuredSermon.description ||
                    'Join us as we dive into the Word of God and explore Biblical truths for our daily lives.'}
                </p>

                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href={featuredSermon.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto flex items-center justify-center gap-3 bg-church-red text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg shadow-church-red/20 w-full md:w-auto"
                >
                  <FaPlay /> Watch Now
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- SERMON GRID --- */}
        {loading ? (
          <div className="flex flex-col items-center py-20 bg-black/40 backdrop-blur-md rounded-[2.5rem] border border-white/10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-red mb-4"></div>
            <p className="text-white font-bold uppercase tracking-widest text-xs">
              Opening Archive...
            </p>
          </div>
        ) : displayedSermons.length > 0 ? (
          <>
            <motion.div
              key={`page-${currentPage}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedSermons.map((sermon) => (
                <SermonCard
                  key={sermon.id}
                  sermon={sermon}
                  thumbnail={getThumbnail(sermon.video_url, 'mqdefault')}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16 gap-4">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1))
                    window.scrollTo({ top: 300, behavior: 'smooth' })
                  }}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-church-red hover:text-white hover:border-church-red disabled:opacity-30 transition-all shadow-xl"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex items-center px-6 font-black text-gray-900 text-xs tracking-widest bg-white rounded-xl shadow-xl">
                  PAGE {currentPage} / {totalPages}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                    window.scrollTo({ top: 300, behavior: 'smooth' })
                  }}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-church-red hover:text-white hover:border-church-red disabled:opacity-30 transition-all shadow-xl"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-black/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <FaVideo className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No messages found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              We couldn't find any sermons matching your current search or date filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedDate('')
              }}
              className="mt-6 text-white font-black uppercase tracking-widest text-[10px] hover:bg-church-red hover:border-church-red border border-white/20 px-6 py-2.5 rounded-full transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// --- SERMON CARD ---
const SermonCard = ({ sermon, thumbnail }) => {
  const dateStr = new Date(sermon.date_preached).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="bg-white rounded-4xl shadow-xl overflow-hidden flex flex-col group h-full border border-gray-100 hover:border-church-red/30 transition-all duration-300"
    >
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={sermon.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <FaVideo size={48} />
          </div>
        )}

        {/* Hover Play Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-church-red rounded-full flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <FaPlay className="ml-1 text-lg" />
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
          <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-1.5">
            <FaCalendarAlt className="text-church-red" /> {dateStr}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-church-red transition-colors line-clamp-2">
          {sermon.title}
        </h3>

        {sermon.preacher && (
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            By {sermon.preacher}
          </p>
        )}

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 grow font-medium">
          {sermon.description ||
            'Join us as we dive into the Word of God and explore Biblical truths for our daily lives.'}
        </p>

        <a
          href={sermon.video_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 text-gray-900 font-black uppercase text-[10px] tracking-widest hover:bg-church-red hover:text-white transition-all border border-gray-100 group-hover:border-church-red shadow-sm"
        >
          <FaPlay /> Watch Message
        </a>
      </div>
    </motion.div>
  )
}

export default Preaching
