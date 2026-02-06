import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDownload,
  FaFileAlt,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaInfoCircle,
} from "react-icons/fa";

const SundaySchool = () => {
  const [allLessons, setAllLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const getDirectDownloadLink = (url) => {
    if (!url) return "#";
    if (url.includes("drive.google.com") && url.includes("/file/d/")) {
      const idMatch = url.match(/\/d\/(.*?)\//);
      if (idMatch && idMatch[1])
        return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
    }
    return url;
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    let results = [...allLessons];

    if (searchTerm) {
      results = results.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (lesson.description &&
            lesson.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
      );
    }

    results.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredLessons(results);
  }, [searchTerm, sortOrder, allLessons]);

  async function fetchLessons() {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("category", "Sunday School");
      if (error) throw error;
      setAllLessons(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-[70px] pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 bg-black/40 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-2 tracking-tighter">
              Lesson <span className="text-church-red">Library</span>
            </h1>
            <p className="text-gray-300 font-medium">
              Access {allLessons.length} study materials specifically curated
              for our Sunday School curriculum.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:w-64">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Find a lesson..."
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-church-red transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-church-dark font-bold rounded-xl hover:bg-church-red hover:text-white transition-all shadow-lg"
            >
              {sortOrder === "newest" ? (
                <FaSortAmountDown />
              ) : (
                <FaSortAmountUp />
              )}
              {sortOrder === "newest" ? "Newest" : "Oldest"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-church-red mx-auto mb-4"></div>
            <p className="text-white font-bold tracking-widest uppercase text-sm">
              Synchronizing Library...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredLessons.map((item, index) => (
                <LessonCard
                  key={item.id}
                  item={item}
                  index={index}
                  getLink={getDirectDownloadLink}
                />
              ))}
            </AnimatePresence>

            {filteredLessons.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-32 bg-white/5 rounded-3xl"
              >
                <FaInfoCircle className="mx-auto text-5xl text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Matches Found
                </h3>
                <p className="text-gray-400">
                  Try searching for a different keyword or check your spelling.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-6 text-church-red font-bold underline underline-offset-4"
                >
                  Reset Search
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const LessonCard = ({ item, index, getLink }) => {
  const date = new Date(item.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col hover:-translate-y-3 transition-all duration-500 border border-gray-100 group h-full"
    >
      <div className="h-56 relative overflow-hidden bg-gray-100">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
            <FaFileAlt className="text-gray-300 text-6xl mb-2" />
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              Document
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur text-church-dark font-bold text-xs rounded-full shadow-lg">
          {date}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative">
        <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-church-red rounded-2xl rotate-12 flex items-center justify-center text-white shadow-xl shadow-red-900/40">
          <FaFileAlt />
        </div>

        <h3 className="font-extrabold text-gray-900 text-2xl mb-4 leading-tight group-hover:text-church-red transition-colors">
          {item.title}
        </h3>

        <p className="text-gray-500 text-base mb-10 flex-grow leading-relaxed line-clamp-3">
          {item.description ||
            "Spiritual nourishment and deep bible study materials provided by the Grace Baptist Sunday School department."}
        </p>

        <a
          href={getLink(item.file_url)}
          className="group/btn relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-church-dark text-white font-black uppercase text-sm tracking-tighter hover:bg-church-red transition-all shadow-xl shadow-black/10 hover:shadow-red-900/40"
        >
          <FaDownload className="group-hover/btn:animate-bounce" />
          Get Lesson Material
        </a>
      </div>
    </motion.div>
  );
};

export default SundaySchool;
