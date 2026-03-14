import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { FaChevronRight, FaCalendarAlt } from 'react-icons/fa'

const EventsSection = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
        .limit(3)
      if (data) setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  if (loading || events.length === 0) return null

  return (
    <div className="bg-white py-24 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            Upcoming <span className="text-church-red">Events</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium mb-4">
            Join us in our community activities
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-church-red font-bold uppercase tracking-widest text-sm hover:underline"
          >
            See All Events <FaChevronRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-[2.5rem] shadow-xl mb-8">
                <img
                  src={event.image_url || 'https://via.placeholder.com/400x500'}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-2xl shadow-lg text-center">
                  <span className="block text-church-red font-black text-xl leading-none">
                    {new Date(event.event_date).getDate()}
                  </span>
                  <span className="block text-gray-500 font-bold text-[10px] uppercase tracking-tighter">
                    {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
              </div>

              <div className="text-center px-4">
                <div className="flex items-center justify-center gap-2 text-church-red font-bold text-xs uppercase tracking-[0.2em] mb-3">
                  <FaCalendarAlt className="text-[10px]" />
                  Upcoming Event
                </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4 group-hover:text-church-red transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                  Join us for this special gathering as we grow together in faith and fellowship.
                </p>
                <Link
                  to="/events"
                  className="inline-block border-2 border-gray-100 text-gray-600 px-8 py-2 rounded-full font-bold uppercase text-xs tracking-widest hover:border-church-red hover:text-church-red transition-all"
                >
                  Event Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsSection
