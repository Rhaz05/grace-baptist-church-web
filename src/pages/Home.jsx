import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaLock,
  FaHeartbeat,
  FaBus,
  FaPlay,
  FaChevronRight,
  FaRegClock,
  FaInfoCircle,
} from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  const [sermon, setSermon] = useState(null);
  const [events, setEvents] = useState([]);
  const [loadingSermon, setLoadingSermon] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const getThumbnail = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://i.ytimg.com/vi/${match[2]}/maxresdefault.jpg`
      : null;
  };

  useEffect(() => {
    const fetchSermon = async () => {
      try {
        const { data } = await supabase
          .from("sermons")
          .select("*")
          .order("date_preached", { ascending: false })
          .limit(1);
        if (data && data.length > 0) setSermon(data[0]);
      } catch (error) {
        console.error("Error fetching sermon:", error);
      } finally {
        setLoadingSermon(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const { data } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: true })
          .limit(4);
        if (data) setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchSermon();
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-20 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-center container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
              “But grow in grace, and in the knowledge of our Lord and Saviour
              Jesus Christ.”
            </p>
            <p className="text-[#ff1111] font-black uppercase tracking-[0.3em] text-sm">
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



      {/* --- SERVICES INFO --- */}
      <section className="text-center mb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 md:p-16 shadow-2xl mx-auto max-w-4xl border-t-8 border-church-red relative z-10"
        >
          <div className="flex justify-center mb-8 -mt-24">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="bg-church-red p-6 rounded-3xl shadow-2xl shadow-red-900/40 text-white"
            >
              <FaRegClock className="text-5xl" />
            </motion.div>
          </div>
          <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
            Services
          </h3>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            We invite you to join us for our weekly services. Whether you are
            looking for a Sunday school class, traditional worship, or midweek
            prayer, there is a place for you here.
          </p>
        </motion.div>
      </section>

      {/* --- SCHEDULE GRID --- */}
      <section className="max-w-5xl mx-auto mb-28">
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
            className="bg-white rounded-b-3xl rounded-tr-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-50"
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-zinc-900 text-white font-black text-sm px-8 py-3 rounded-t-2xl tracking-[0.3em] inline-block uppercase shadow-lg">
            Wednesdays
          </div>
          <motion.div
            variants={staggerContainer}
            className="bg-white rounded-b-3xl rounded-tr-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-50"
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

      {/* --- LATEST SERMON --- */}
      <div className="container mx-auto px-4">
        {loadingSermon ? (
          <div className="h-[500px] bg-white flex items-center justify-center rounded-3xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#8B0000]"></div>
          </div>
        ) : (
          sermon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Visual Side */}
                <div className="lg:w-1/2 h-[300px] lg:h-auto relative overflow-hidden group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${getThumbnail(sermon.video_url)}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                  <p className="text-[#8B0000] font-black text-xs uppercase tracking-[0.3em] mb-4">
                    Featured Message
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
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
      <div className="container mx-auto px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-4xl font-black text-[#8B0000] uppercase tracking-tighter">
              Upcoming Events
            </h2>
            <p className="text-white mt-2 font-medium">
              To encourage you and connect with others
            </p>
          </div>
          <Link
            to="/events"
            className="text-[#8B0000] font-bold uppercase tracking-widest flex items-center gap-2 group"
          >
            All Events{" "}
            <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {loadingEvents ? (
            <div className="col-span-full py-20 text-center">
              <FaSpinner className="animate-spin text-[#8B0000] mx-auto text-3xl" />
            </div>
          ) : (
            events.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeInUp}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 group transition-all hover:shadow-xl"
              >
                <div className="h-56 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: event.image_url
                        ? `url('${event.image_url}')`
                        : `linear-gradient(135deg, #f3f4f6, #e5e7eb)`,
                    }}
                  />
                </div>
                <div className="p-8">
                  <p className="text-[#8B0000] font-bold text-xs uppercase tracking-widest mb-2">
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-[#8B0000] transition-colors">
                    {event.title}
                  </h3>
                  <Link
                    to="/events"
                    className="inline-block border-2 border-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest hover:border-[#8B0000] hover:text-[#8B0000] transition-all"
                  >
                    Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, desc }) => (
  <motion.div
    variants={fadeInUp}
    className="text-center flex flex-col items-center group"
  >
    <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#8B0000] text-3xl mb-6 group-hover:bg-[#8B0000] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[#8B0000]/20">
      {icon}
    </div>
    <h5 className="text-gray-900 font-black mb-2 text-xl tracking-tight">
      {title}
    </h5>
    <p className="text-gray-500 text-sm font-medium px-4">{desc}</p>
  </motion.div>
);

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
);

const ScheduleItem = ({ time, title, desc }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ backgroundColor: "#fff5f5" }}
    className="p-10 transition-colors group cursor-default"
  >
    <div className="flex items-center gap-3 mb-3">
      <FaInfoCircle className="text-church-red text-xl group-hover:rotate-12 transition-transform" />
      <span className="font-black text-zinc-900 text-2xl tracking-tighter">
        {time}
      </span>
    </div>
    <h4 className="font-bold text-gray-800 text-lg mb-1">{title}</h4>
    <p className="text-gray-500 font-medium">{desc}</p>
  </motion.div>
);

export default Home;
