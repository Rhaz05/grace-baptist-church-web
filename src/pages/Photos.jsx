import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase' // Adjust path if necessary
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaCamera,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExpandAlt,
  FaSpinner,
} from 'react-icons/fa'

const CATEGORIES = ['All', 'General', 'Worship', 'Youth', 'Events', 'Community', 'Missions']

const Photos = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0)

  // Gallery State
  const [activeCategory, setActiveCategory] = useState('All')

  // Modal State
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // --- 1. Fetch Data from Supabase ---
  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPhotos(data || [])
    } catch (err) {
      console.error('Error fetching photos:', err)
    } finally {
      setLoading(false)
    }
  }

  // --- 2. Derived State ---
  // Featured photos for the hero carousel (either marked as thumbnail, or just the 3 newest)
  const featuredPhotos = photos.filter((p) => p.is_thumbnail)
  const carouselPhotos = featuredPhotos.length > 0 ? featuredPhotos : photos.slice(0, 3)

  // Filtered photos for the masonry/golden-ratio gallery
  const filteredPhotos = photos.filter((p) =>
    activeCategory === 'All' ? true : p.category === activeCategory,
  )

  // --- 3. Carousel Auto-Slide ---
  useEffect(() => {
    if (carouselPhotos.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselPhotos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [carouselPhotos.length])

  const nextSlide = () => setCurrentIndex((currentIndex + 1) % carouselPhotos.length)
  const prevSlide = () =>
    setCurrentIndex((currentIndex - 1 + carouselPhotos.length) % carouselPhotos.length)

  if (loading) {
    return (
      <div className="min-h-screen pt-[80px] flex items-center justify-center bg-[#0f1115]">
        <FaSpinner className="animate-spin text-church-red text-4xl" />
      </div>
    )
  }

  return (
    <div className="pt-[120px] pb-24 overflow-hidden  min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl space-y-24">
        {/* --- HEADER --- */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-black/40 p-10 md:p-16 rounded-[3rem] backdrop-blur-xl border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-church-red/20 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-6 tracking-tighter">
            Our <span className="text-church-red">Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Capturing the moments that define our community, worship, and faith.
          </p>
        </motion.section>

        {/* --- HIGHLIGHT CAROUSEL --- */}
        {carouselPhotos.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(15, 17, 21, 1) 0%, rgba(15, 17, 21, 0.2) 50%, rgba(15, 17, 21, 0.6) 100%), url('${carouselPhotos[currentIndex]?.image_url}')`,
                  backgroundColor: '#1c2128',
                }}
              >
                {!carouselPhotos[currentIndex]?.image_url && (
                  <div className="flex items-center justify-center h-full text-white/10">
                    <FaCamera size={80} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Caption */}
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-12 left-8 md:left-16 max-w-2xl"
            >
              <span className="inline-block px-3 py-1 mb-4 bg-church-red text-white text-xs font-bold uppercase tracking-widest rounded-lg">
                Featured {carouselPhotos[currentIndex]?.category}
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 drop-shadow-lg">
                {carouselPhotos[currentIndex]?.title || 'Untitled Moment'}
              </h3>
              {carouselPhotos[currentIndex]?.description && (
                <p className="text-gray-300 font-medium text-lg drop-shadow-md line-clamp-2">
                  {carouselPhotos[currentIndex].description}
                </p>
              )}
            </motion.div>

            {/* Controls */}
            {carouselPhotos.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-church-red hover:border-church-red transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-church-red hover:border-church-red transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}
          </motion.section>
        )}

        {/* --- DYNAMIC GALLERY --- */}
        <section>
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-church-red text-white shadow-lg shadow-church-red/20 scale-105'
                    : 'bg-black/35 text-white hover:bg-church-red/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Golden Ratio / Bento Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 bg-white/2 rounded-[3rem] border border-white/5">
              <FaCamera className="mx-auto text-4xl text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-400">No photos found in this category.</h3>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]"
            >
              <AnimatePresence>
                {filteredPhotos.map((photo, index) => {
                  // Golden Ratio Layout Logic: First item spans 2 rows & 2 cols, others are standard.
                  const isFeatured = index === 0

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className={`relative group rounded-[2rem] overflow-hidden bg-[#1c2128] cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-white/5 hover:border-church-red/50 ${
                        isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                      }`}
                    >
                      <img
                        src={photo.image_url}
                        alt={photo.title || 'Gallery image'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-church-red text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 block">
                            {photo.category}
                          </span>
                          <h4 className="text-white font-bold text-lg md:text-2xl truncate">
                            {photo.title || 'Untitled'}
                          </h4>
                        </div>

                        {/* Expand Icon */}
                        <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity delay-100 hover:bg-church-red">
                          <FaExpandAlt />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-church-red text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <FaTimes size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              className="w-full max-w-6xl flex flex-col lg:flex-row bg-[#161920] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl max-h-[90vh]"
            >
              {/* Image Container */}
              <div className="flex-grow bg-black relative flex items-center justify-center min-h-[40vh] lg:min-h-[70vh]">
                <img
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              {/* Details Sidebar */}
              <div className="w-full lg:w-96 p-8 md:p-10 flex flex-col justify-center bg-[#161920] shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 overflow-y-auto">
                <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-church-red text-xs font-black uppercase tracking-[0.2em] rounded-lg w-max mb-6">
                  {selectedPhoto.category}
                </span>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
                  {selectedPhoto.title || 'Untitled Moment'}
                </h3>

                {selectedPhoto.description ? (
                  <p className="text-gray-400 leading-relaxed font-medium">
                    {selectedPhoto.description}
                  </p>
                ) : (
                  <p className="text-gray-600 italic text-sm">No description provided.</p>
                )}

                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    Added on {new Date(selectedPhoto.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Photos
