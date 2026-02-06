import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaCalendarAlt,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 6;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const Preaching = () => {
  const [allSermons, setAllSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [featuredSermon, setFeaturedSermon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getThumbnail = (url, quality = "maxresdefault") => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://i.ytimg.com/vi/${match[2]}/${quality}.jpg`
      : null;
  };

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const { data, error } = await supabase
          .from("sermons")
          .select("*")
          .order("date_preached", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setAllSermons(data);
          setFilteredSermons(data);
          setFeaturedSermon(data[0]);
        }
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSermons();
  }, []);

  useEffect(() => {
    let results = allSermons;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          (s.description && s.description.toLowerCase().includes(term)),
      );
    }
    if (selectedDate) {
      results = results.filter((s) => s.date_preached === selectedDate);
    }
    setFilteredSermons(results);
    setCurrentPage(1);
  }, [searchTerm, selectedDate, allSermons]);

  const totalPages = Math.ceil(filteredSermons.length / ITEMS_PER_PAGE);
  const displayedSermons = filteredSermons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="pt-[80px] pb-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- PAGE HEADER --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16 bg-black/40 p-10 rounded-[2.5rem] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-black uppercase text-white mb-4 tracking-tighter drop-shadow-2xl">
            Preaching <span className="text-church-red">Library</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Watch and listen to messages of hope, faith, and the Word of God.
          </p>
        </motion.div>

        {/* --- HERO: LATEST SERMON --- */}
        <AnimatePresence>
          {!searchTerm && !selectedDate && featuredSermon && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20 rounded-[3rem] overflow-hidden shadow-2xl relative group border border-white/5 h-[500px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${getThumbnail(featuredSermon.video_url)}')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/40 to-transparent"></div>

              <div className="relative z-10 p-10 md:p-20 flex flex-col justify-center h-full md:w-2/3">
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-4 py-1.5 bg-church-red text-white text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6 w-fit shadow-lg"
                >
                  Featured Message
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                  {featuredSermon.title}
                </h2>
                <p className="text-gray-300 mb-10 line-clamp-2 text-xl font-medium max-w-xl">
                  {featuredSermon.description}
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={featuredSermon.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest w-fit hover:bg-church-red hover:text-white transition-all shadow-2xl"
                >
                  <FaPlay /> Watch Now
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- CONTROLS SECTION --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black/60 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/20 mb-16"
        >
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="w-full md:flex-grow">
              <label className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-3 block ml-2">
                Search Library
              </label>
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-church-red/50 transition-all font-medium"
                  placeholder="Title, topic, or scripture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <label className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-3 block ml-2">
                Date Filter
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="date"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-church-red/50 transition-all font-medium [color-scheme:dark]"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- SERMON GRID --- */}
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-church-red mb-4"></div>
            <p className="text-white font-bold uppercase tracking-widest text-xs">
              Opening Archive...
            </p>
          </div>
        ) : displayedSermons.length > 0 ? (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {displayedSermons.map((sermon) => (
                <SermonCard
                  key={sermon.id}
                  sermon={sermon}
                  thumbnail={getThumbnail(sermon.video_url, "mqdefault")}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-20 gap-4">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-church-red disabled:opacity-20 transition-all shadow-xl"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex items-center px-8 font-black text-white text-sm tracking-widest bg-black/40 rounded-2xl border border-white/10 backdrop-blur-md">
                  PAGE {currentPage} / {totalPages}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-church-red disabled:opacity-20 transition-all shadow-xl"
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
            className="text-center py-32 bg-white/5 rounded-[3rem] border border-white/10 border-dashed"
          >
            <FaVideo className="mx-auto text-5xl text-gray-700 mb-6" />
            <p className="text-gray-400 text-xl font-medium">
              No messages match your search.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDate("");
              }}
              className="mt-6 text-church-red font-black uppercase tracking-widest text-xs hover:underline"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SermonCard = ({ sermon, thumbnail }) => {
  const dateStr = new Date(sermon.date_preached).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col group h-full border border-gray-100"
    >
      <div className="relative h-56 bg-zinc-900 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={sermon.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-800">
            <FaVideo size={48} />
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-church-red shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <FaPlay className="ml-1 text-xl" />
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-lg">
          <p className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
            <FaCalendarAlt className="text-church-red" /> {dateStr}
          </p>
        </div>
      </div>

      <div className="p-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-zinc-900 mb-4 leading-tight group-hover:text-church-red transition-colors line-clamp-2">
          {sermon.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow font-medium">
          {sermon.description ||
            "Join us as we dive into the Word of God and explore Biblical truths for our daily lives."}
        </p>

        <a
          href={sermon.video_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-zinc-900 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-church-red transition-all shadow-xl shadow-zinc-900/20"
        >
          Watch Full Message
        </a>
      </div>
    </motion.div>
  );
};

export default Preaching;
