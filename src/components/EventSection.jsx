import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { FaChevronRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const EventsSection = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })
        .limit(3)
      if (data) setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  if (loading || events.length === 0) return null

  // Separate the featured event (latest) from the secondary events
  const featuredEvent = events[0]
  const secondaryEvents = events.slice(1)

  return (
    <div className="bg-[#fafafa] py-16 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-3">
              Upcoming <span className="text-church-red">Events</span>
            </h2>
            <p className="text-gray-500 text-base font-medium">
              Join us in our community activities and gatherings.
            </p>
          </div>
          <Link
            to="/events"
            className="group flex items-center gap-3 bg-white border border-gray-200 px-5 py-2.5 rounded-full text-gray-900 font-bold uppercase tracking-widest text-xs hover:border-church-red hover:text-church-red transition-all shadow-sm hover:shadow-md"
          >
            See All Events
            <span className="bg-gray-100 group-hover:bg-church-red/10 p-1.5 rounded-full transition-colors">
              <FaChevronRight className="text-[10px]" />
            </span>
          </Link>
        </div>

        {/* Golden Ratio Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FEATURED EVENT (Golden Ratio Primary - 66.6% width) */}
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 group cursor-pointer flex flex-col h-full"
            >
              <div className="relative w-full h-[300px] lg:h-[380px] overflow-hidden rounded-[2.5rem] shadow-xl mb-6 border border-gray-200/50">
                <img
                  src={
                    featuredEvent.image_url ||
                    'https://images.unsplash.com/photo-1511632765486-a01c80cb8fa6?q=80&w=1000&auto=format&fit=crop'
                  }
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Date Badge */}
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-3xl shadow-lg text-center border border-white/20 transform group-hover:-translate-y-1 transition-transform">
                  <span className="block text-church-red font-black text-2xl leading-none mb-1">
                    {new Date(featuredEvent.event_date).getDate()}
                  </span>
                  <span className="block text-gray-900 font-bold text-[10px] uppercase tracking-widest">
                    {new Date(featuredEvent.event_date).toLocaleDateString('en-US', {
                      month: 'short',
                    })}
                  </span>
                </div>
              </div>

              <div className="px-2 md:px-4">
                <div className="flex flex-wrap items-center gap-4 text-church-red font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt /> Featured Event
                  </span>
                  {featuredEvent.location && (
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <FaMapMarkerAlt /> {featuredEvent.location}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-3 group-hover:text-church-red transition-colors">
                  {featuredEvent.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed line-clamp-2 mb-6 max-w-2xl">
                  {featuredEvent.description ||
                    'Join us for this special gathering as we grow together in faith and fellowship.'}
                </p>
                <Link
                  to={`/events`}
                  className="inline-block border-2 border-gray-200 text-gray-900 px-8 py-3 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-church-red hover:border-church-red hover:text-white transition-all shadow-sm"
                >
                  Event Details
                </Link>
              </div>
            </motion.div>
          )}

          {/* SECONDARY EVENTS (Golden Ratio Secondary - 33.3% width stacked) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {secondaryEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer bg-white rounded-[2rem] p-3.5 shadow-md border border-gray-100 hover:shadow-xl hover:border-church-red/20 transition-all flex flex-col h-full"
              >
                <div className="relative w-full h-40 overflow-hidden rounded-[1.5rem] mb-4">
                  <img
                    src={
                      event.image_url ||
                      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop'
                    }
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Smaller Date Badge */}
                  <div className="absolute top-3 left-3 bg-white px-2.5 py-1.5 rounded-xl shadow-md text-center">
                    <span className="block text-church-red font-black text-base leading-none">
                      {new Date(event.event_date).getDate()}
                    </span>
                    <span className="block text-gray-500 font-bold text-[9px] uppercase tracking-tighter">
                      {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                </div>

                <div className="px-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 group-hover:text-church-red transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                      {event.description ||
                        'A wonderful opportunity to connect and grow with our community.'}
                    </p>
                  </div>
                  <Link
                    to={`/events`}
                    className="inline-flex items-center gap-1.5 text-church-red font-bold uppercase tracking-widest text-[10px] hover:text-red-700 transition-colors"
                  >
                    Learn More <FaChevronRight className="text-[9px]" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsSection
