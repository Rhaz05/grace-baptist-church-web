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
  FaMicrophoneAlt,
} from "react-icons/fa";

const SermonArchive = () => {
  const [allArchives, setAllArchives] = useState([]);
  const [filteredArchives, setFilteredArchives] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Helper: Google Drive Link Fixer
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
    const fetchArchives = async () => {
      try {
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .eq("category", "Sermon Archive");
        if (error) throw error;
        setAllArchives(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArchives();
  }, []);

  useEffect(() => {
    let results = [...allArchives];

    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    results.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredArchives(results);
  }, [searchTerm, sortOrder, allArchives]);

  return (
    <div className="pt-[70px] pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- DYNAMIC HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6 bg-black/40 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-2 tracking-tighter">
              Sermon <span className="text-church-red">Archive</span>
            </h1>
            <p className="text-gray-300 font-medium">
              Access {allArchives.length} recorded outlines, sermon notes, and
              audio transcripts from our past services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-grow sm:w-64">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search archives..."
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-church-red transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-church-dark font-bold rounded-xl hover:bg-church-red hover:text-white transition-all shadow-lg whitespace-nowrap"
            >
              {sortOrder === "newest" ? (
                <FaSortAmountDown />
              ) : (
                <FaSortAmountUp />
              )}
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        {loading ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-church-red mx-auto mb-4"></div>
            <p className="text-white font-bold tracking-widest uppercase text-sm">
              Indexing Archives...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArchives.map((item, index) => (
                <ArchiveCard
                  key={item.id}
                  item={item}
                  index={index}
                  getLink={getDirectDownloadLink}
                />
              ))}
            </AnimatePresence>

            {filteredArchives.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-32 bg-white/5 rounded-3xl"
              >
                <FaInfoCircle className="mx-auto text-5xl text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Archives Found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search filters.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ArchiveCard = ({ item, index, getLink }) => {
  const date = new Date(item.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500 border border-gray-100 group h-full"
    >
      <div className="h-52 relative overflow-hidden bg-gray-50">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
            <FaMicrophoneAlt className="text-gray-300 text-6xl mb-2" />
          </div>
        )}
        <div className="absolute top-4 right-4 px-3 py-1 bg-church-red/90 text-white font-bold text-[10px] uppercase rounded-full shadow-lg">
          {date}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative">
        <h3 className="font-extrabold text-gray-900 text-xl mb-3 leading-tight group-hover:text-church-red transition-colors">
          {item.title}
        </h3>

        <p className="text-gray-500 text-sm mb-10 flex-grow leading-relaxed line-clamp-3">
          {item.description ||
            "Access the full summary and study notes for this powerful message."}
        </p>

        <a
          href={getLink(item.file_url)}
          className="group/btn relative flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl bg-church-dark text-white font-black uppercase text-xs tracking-widest hover:bg-church-red transition-all shadow-xl"
        >
          <FaDownload className="group-hover/btn:animate-bounce" />
          Download Archive
        </a>
      </div>
    </motion.div>
  );
};

export default SermonArchive;
