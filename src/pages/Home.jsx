import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { FaPlay, FaRegClock, FaInfoCircle, FaChevronRight } from 'react-icons/fa'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const Home = () => {
  const [sermon, setSermon] = useState(null)
  const [events, setEvents] = useState([])
  const [loadingSermon, setLoadingSermon] = useState(true)
  const [loadingEvents, setLoadingEvents] = useState(true)

  const getThumbnail = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11
      ? `https://i.ytimg.com/vi/${match[2]}/maxresdefault.jpg`
      : null
  }

  useEffect(() => {
    const fetchSermon = async () => {
      try {
        const { data } = await supabase
          .from('sermons')
          .select('*')
          .order('date_preached', { ascending: false })
          .limit(1)
        if (data && data.length > 0) setSermon(data[0])
      } catch (error) {
        console.error('Error fetching sermon:', error)
      } finally {
        setLoadingSermon(false)
      }
    }

    const fetchEvents = async () => {
      try {
        const { data } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true })
          .limit(4)
        if (data) setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoadingEvents(false)
      }
    }

    fetchSermon()
    fetchEvents()
  }, [])

  return (
    <div className="flex flex-col gap-12 pb-20 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-center container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-gray-400/17 border border-gray-900/20 backdrop-blur-[3px] p-12 md:p-20 rounded-[3rem] shadow-xl max-w-5xl w-full relative overflow-hidden"
        >
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-5xl md:text-7xl font-black text-gray-900 leading-tight uppercase tracking-tighter mb-8"
          >
            Welcome to <br />
            <span className="text-[#8B0000]">Grace</span> Baptist
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-xl md:text-2xl text-gray-200 font-serif italic leading-relaxed mb-4">
              “But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ.”
            </p>
            <p className="text-[#bd1616] font-black uppercase tracking-[0.3em] text-m">
              — 2 Peter 3:18 (KJV)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/about"
              className="inline-block bg-[#8B0000] text-white px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-red-800 transition-all shadow-lg transform hover:-translate-y-1"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="xl:flex justify-center gap-3 mb-28 ">
        {/* --- SERVICES INFO --- */}
        <section className="mt-8 text-center px-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 pb-3 md:p-10 shadow-2xl mx-auto max-w-7xl xl:w-screen border-t-8 border-church-red relative z-10"
          >
            <div className="flex justify-center mb-8 -mt-24">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="bg-church-red p-7 rounded-3xl shadow-2xl shadow-red-900/40 text-white"
              >
                <FaRegClock className="text-5xl" />
              </motion.div>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Services</h3>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto my-16 leading-relaxed font-medium">
              We invite you to join us for our weekly services. Whether you are looking for a Sunday
              school class, traditional worship, or midweek prayer, there is a place for you here.
            </p>
            {/* --- SCHEDULE GRID --- */}
            <section className="xl:flex justify-center gap-5 px-10 max-w-7xl mx-auto">
              {/* SUNDAYS */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="bg-church-red text-white font-black text-sm px-8 py-3 rounded-t-2xl tracking-[0.3em] inline-block uppercase shadow-lg">
                  Sundays
                </div>
                <motion.div
                  variants={staggerContainer}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden grid xl:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-50"
                >
                  <ScheduleItem
                    time="9:00 AM"
                    title="Sunday School"
                    desc="Bible study for all ages"
                  />
                  <ScheduleItem
                    time="10:00 AM"
                    title="Morning Worship"
                    desc="Main Service & Preaching"
                  />
                  <ScheduleItem
                    time="4:00 PM"
                    title="Afternoon Service"
                    desc="Evening Praise & Worship"
                  />
                </motion.div>
              </motion.div>

              {/* WEDNESDAYS */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="bg-zinc-900 text-white font-black text-sm px-8 py-3 rounded-t-2xl tracking-[0.3em] inline-block uppercase shadow-lg">
                  Wednesdays
                </div>
                <motion.div
                  variants={staggerContainer}
                  className="bg-white rounded-b-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-1 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-50"
                >
                  <ScheduleItem
                    time="5:30 PM"
                    title="Prayer Meeting"
                    desc="Midweek Devotion & Prayer"
                  />
                  <div className="hidden md:block bg-gray-50/50"></div>
                  <div className="hidden md:block bg-gray-50/50"></div>
                </motion.div>
              </motion.div>
            </section>
          </motion.div>
        </section>
      </div>

      {/* --- LATEST SERMON --- */}
      <div className="container mx-auto px-4">
        {loadingSermon ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#8B0000]"></div>
          </div>
        ) : (
          sermon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#3601019c] backdrop-blur-[70px] rounded-[3rem] overflow-hidden shadow-xl border border-gray-800"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-300px lg:h-auto relative overflow-hidden group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${getThumbnail(sermon.video_url)}')` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                  <p className="text-[#dfca15] font-black text-sm uppercase tracking-[0.3em] mb-4">
                    Featured Message
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-200 mb-8 tracking-tighter leading-tight">
                    {sermon.title}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={sermon.video_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 bg-[#8B0000] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-red-800 transition-all shadow-md"
                    >
                      <FaPlay className="text-sm" /> Watch Now
                    </a>
                    <Link
                      to="/preaching"
                      className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
                    >
                      View Archive
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* --- EVENTS SECTION --- */}
    </div>
  )
}

const InfoCard = ({ icon, title, desc }) => (
  <motion.div variants={fadeInUp} className="text-center flex flex-col items-center group">
    <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#8B0000] text-3xl mb-6 group-hover:bg-[#8B0000] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[#8B0000]/20">
      {icon}
    </div>
    <h5 className="text-gray-900 font-black mb-2 text-xl tracking-tight">{title}</h5>
    <p className="text-gray-500 text-sm font-medium px-4">{desc}</p>
  </motion.div>
)

const FaSpinner = ({ className }) => (
  <svg className={`${className} animate-spin`} viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const ScheduleItem = ({ time, title, desc }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ backgroundColor: '#fff5f5' }}
    className="xl:h-90 xl:py-20 md:pt-20  sm:py-10 px-4 transition-colors group cursor-default"
  >
    <div className="flex flex-col items-center mb-7">
      <span className="pb-8 font-black text-zinc-900 text-center text-3xl tracking-tighter">
        {time}
      </span>
      <h4 className="font-bold text-gray-800 text-center text-xl mb-1">{title}</h4>
      <p className="text-gray-500 text-center font-medium">{desc}</p>
      <FaInfoCircle className="text-church-red xl:absolute xl:bottom-30 sm:mt-10 text-xl group-hover:rotate-12 transition-transform" />
    </div>
  </motion.div>
)

export default Home
