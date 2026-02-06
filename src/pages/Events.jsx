import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calendar State
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }

  // --- CALENDAR LOGIC ---
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const changeMonth = (offset) => {
    setViewDate(new Date(currentYear, currentMonth + offset, 1));
  };

  // Create array for empty starting slots
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  // Create array for actual days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="pt-[70px] pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* --- HEADER --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 bg-black/40 p-8 rounded-xl backdrop-blur-sm border-l-4 border-church-red"
        >
          <h1 className="text-4xl font-bold uppercase text-white mb-2 tracking-wide">
            Church Events
          </h1>
          <p className="text-lg text-gray-200">
            Stay connected with what's happening in our community.
          </p>
        </motion.section>

        {/* --- CALENDAR CARD --- */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-16"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
            {/* Nav */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-church-red hover:text-white transition-colors"
              >
                <FaChevronLeft />
              </button>
              <h4 className="font-bold text-gray-800 uppercase tracking-widest">
                {monthNames[currentMonth]} {currentYear}
              </h4>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-church-red hover:text-white transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Header */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-black text-gray-400 uppercase">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
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
                  today.getFullYear() === currentYear;
                return (
                  <div
                    key={d}
                    className={`aspect-square flex items-center justify-center rounded-lg font-bold text-sm cursor-pointer transition-all
                      ${isToday ? "bg-church-red text-white shadow-lg" : "bg-gray-50 text-gray-700 hover:bg-gray-200"}
                    `}
                  >
                    {d}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* --- UPCOMING EVENTS LIST --- */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-church-red rounded-xl text-white shadow-lg">
              <FaCalendarAlt size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Upcoming Events
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading events...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 bg-white/10 rounded-2xl text-white">
                    No upcoming events scheduled.
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: EVENT CARD ---
const EventCard = ({ event, index }) => {
  const date = new Date(event.event_date);
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = date.getDate();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      {event.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 flex gap-4">
        {/* Date Badge */}
        <div className="flex-shrink-0 text-center border border-gray-100 rounded-xl overflow-hidden h-fit shadow-sm">
          <div className="bg-church-red text-white text-[10px] font-black px-3 py-1">
            {month}
          </div>
          <div className="bg-white text-gray-800 text-2xl font-bold py-2">
            {day}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="font-bold text-gray-800 text-xl mb-3 leading-tight">
            {event.title}
          </h3>

          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              <FaClock className="text-church-red" /> {time}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              <FaMapMarkerAlt className="text-church-red" /> {event.location}
            </div>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed italic">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Events;
