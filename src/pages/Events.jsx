import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
} from 'react-icons/fa'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const [viewDate, setViewDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const today = new Date()

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  const currentMonth = viewDate.getMonth()
  const currentYear = viewDate.getFullYear()
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const changeMonth = (offset) => {
    setViewDate(new Date(currentYear, currentMonth + offset, 1))
  }

  const handleDayClick = (day) => {
    if (
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    ) {
      setSelectedDate(null)
    } else {
      setSelectedDate(new Date(currentYear, currentMonth, day))
    }
  }

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // --- FILTERING LOGIC ---
  const featuredEvent = events[0]
  const upcomingEvents = events.slice(1)

  const selectedDateEvents = selectedDate
    ? events.filter((e) => {
        const eDate = new Date(e.event_date)
        return (
          eDate.getDate() === selectedDate.getDate() &&
          eDate.getMonth() === selectedDate.getMonth() &&
          eDate.getFullYear() === selectedDate.getFullYear()
        )
      })
    : []

  return (
    <div className="pt-25 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- HEADER --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 bg-black/30 p-10 rounded-xl backdrop-blur-sm border-l-4 border-church-red"
        >
          <h1 className="text-5xl font-black uppercase text-church-red tracking-tighter mb-4">
            Church Events
          </h1>
          <p className="text-lg text-white mx-auto font-medium max-w-2xl">
            Stay connected with what's happening in our community. Join us in fellowship, worship,
            and service.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* --- LEFT COLUMN: EVENTS LIST (Golden Ratio Primary - 8 Columns) --- */}
          <div className="lg:col-span-8 flex flex-col gap-8 min-h-125">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-red mb-4"></div>
                <p className="text-gray-500 font-medium">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-500 font-medium h-full flex items-center justify-center">
                No upcoming events scheduled at the moment.
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {/* VIEW A: A SPECIFIC DATE IS SELECTED */}
                {selectedDate ? (
                  <motion.div
                    key="selected-date-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Filter Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-4xl shadow-sm border border-gray-100 gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                          Events on{' '}
                          <span className="text-church-red">
                            {selectedDate.toLocaleDateString('default', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium mt-1">
                          {selectedDateEvents.length} event
                          {selectedDateEvents.length !== 1 ? 's' : ''} found
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedDate(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-church-red hover:text-white text-gray-600 rounded-full text-sm font-bold transition-colors"
                      >
                        <FaTimes /> Clear Filter
                      </button>
                    </div>

                    {/* Filtered Events List */}
                    {selectedDateEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedDateEvents.map((event, index) => (
                          <EventCard key={event.id} event={event} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 bg-white rounded-4xl shadow-sm border border-gray-100">
                        <FaCalendarAlt className="mx-auto text-4xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-400 mb-2">No Events Found</h3>
                        <p className="text-gray-500 text-sm">
                          There are no events scheduled for this specific date.
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* VIEW B: DEFAULT VIEW (Featured + Upcoming) */
                  <motion.div
                    key="default-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-8"
                  >
                    {/* 1. Featured Next Event */}
                    {featuredEvent && (
                      <div className="group bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 cursor-pointer flex flex-col md:flex-row h-auto md:h-85">
                        {/* Image Side */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
                          <img
                            src={
                              featuredEvent.image_url ||
                              'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop'
                            }
                            alt={featuredEvent.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg text-center transform group-hover:-translate-y-1 transition-transform">
                            <span className="block text-church-red font-black text-2xl leading-none mb-0.5">
                              {new Date(featuredEvent.event_date).getDate()}
                            </span>
                            <span className="block text-gray-900 font-bold text-[10px] uppercase tracking-widest">
                              {new Date(featuredEvent.event_date).toLocaleString('default', {
                                month: 'short',
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                          <div className="flex items-center gap-2 text-church-red font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                            <FaCalendarAlt /> Up Next
                          </div>
                          <h2 className="text-3xl font-black text-gray-900 leading-tight mb-4 group-hover:text-church-red transition-colors">
                            {featuredEvent.title}
                          </h2>
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                              <FaClock className="text-church-red shrink-0" />
                              {new Date(featuredEvent.event_date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-500 uppercase tracking-wide">
                              <FaMapMarkerAlt className="text-church-red shrink-0" />
                              <span className="truncate">{featuredEvent.location}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {featuredEvent.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 2. Sub-grid for remaining events */}
                    {upcomingEvents.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingEvents.map((event, index) => (
                          <EventCard key={event.id} event={event} index={index} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* --- RIGHT COLUMN: CALENDAR (Golden Ratio Secondary - 4 Columns) --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-30">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-4xl shadow-xl p-8 border border-gray-100"
            >
              {/* Nav */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => changeMonth(-1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-church-red hover:text-white transition-all shadow-sm"
                >
                  <FaChevronLeft size={12} />
                </button>
                <h4 className="font-black text-gray-900 uppercase tracking-widest text-lg">
                  {monthNames[currentMonth]} {currentYear}
                </h4>
                <button
                  onClick={() => changeMonth(1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-church-red hover:text-white transition-all shadow-sm"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>

              {/* Header */}
              <div className="grid grid-cols-7 gap-2 mb-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2">
                {blanks.map((b) => (
                  <div key={`blank-${b}`} className="aspect-square" />
                ))}

                {days.map((d) => {
                  const isToday =
                    today.getDate() === d &&
                    today.getMonth() === currentMonth &&
                    today.getFullYear() === currentYear

                  const isSelected =
                    selectedDate &&
                    selectedDate.getDate() === d &&
                    selectedDate.getMonth() === currentMonth &&
                    selectedDate.getFullYear() === currentYear

                  // Check if this day has an event
                  const hasEvent = events.some((e) => {
                    const eDate = new Date(e.event_date)
                    return (
                      eDate.getDate() === d &&
                      eDate.getMonth() === currentMonth &&
                      eDate.getFullYear() === currentYear
                    )
                  })

                  // Determine CSS classes based on state
                  let dayStyles = 'bg-gray-50 text-gray-600 hover:bg-gray-200 hover:shadow-sm' // Default

                  if (isSelected) {
                    dayStyles = 'bg-church-red text-white shadow-md scale-105'
                  } else if (isToday) {
                    dayStyles = 'bg-gray-900 text-white shadow-md'
                  } else if (hasEvent) {
                    dayStyles =
                      'bg-gray-50 text-gray-900 hover:bg-gray-200 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]'
                  }

                  return (
                    <div
                      key={d}
                      onClick={() => handleDayClick(d)}
                      className={`relative aspect-square flex items-center justify-center rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 ${dayStyles}`}
                    >
                      {d}

                      {/* Event Dot Indicator */}
                      {hasEvent && (
                        <div
                          className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${isSelected || isToday ? 'bg-white' : 'bg-church-red'}`}
                        ></div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Calendar Legend */}
              <div className="mt-8 flex items-center justify-center gap-6 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-church-red"></div> Event
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-md bg-gray-900"></div> Today
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- SUB-COMPONENT: EVENT CARD ---
const EventCard = ({ event, index }) => {
  const date = new Date(event.event_date)
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase()
  const day = date.getDate()
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            event.image_url ||
            'https://images.unsplash.com/photo-1511632765486-a01c80cb8fa6?q=80&w=1000&auto=format&fit=crop'
          }
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-xl shadow-md text-center transform group-hover:-translate-y-1 transition-transform">
          <span className="block text-church-red font-black text-lg leading-none">{day}</span>
          <span className="block text-gray-500 font-bold text-[9px] uppercase tracking-widest mt-0.5">
            {month}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="font-black text-gray-900 text-xl mb-3 leading-tight group-hover:text-church-red transition-colors line-clamp-2">
          {event.title}
        </h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <FaClock className="text-church-red text-sm shrink-0" /> {time}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <FaMapMarkerAlt className="text-church-red text-sm shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mt-auto">
          {event.description}
        </p>
      </div>
    </motion.div>
  )
}

export default Events
