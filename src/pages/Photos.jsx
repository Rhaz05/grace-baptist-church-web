import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCamera,
  FaImages,
  FaChevronLeft,
  FaChevronRight,
  FaFolderOpen,
} from "react-icons/fa";

const highlights = [
  {
    img: "/img/sample1.jpg",
    title: "Community Baptism",
    desc: "Celebrating new life in Christ at the river.",
  },
  {
    img: "/img/sample2.jpg",
    title: "Youth Summer Camp",
    desc: "A week of fun, fellowship, and spiritual growth.",
  },
  {
    img: "/img/sample3.jpg",
    title: "Christmas Service",
    desc: "Our candlelight service remembering the birth of our Savior.",
  },
];

const recentAlbums = [
  { title: "Sunday Service", count: "12 Photos" },
  { title: "Kids Ministry", count: "24 Photos" },
  { title: "Outreach Day", count: "8 Photos" },
  { title: "Mens Breakfast", count: "15 Photos" },
  { title: "Womens Retreat", count: "30 Photos" },
  { title: "Picnic", count: "42 Photos" },
];

const archives = ["2024", "2023", "2022", "2021", "2020", "2019"];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Photos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentIndex((currentIndex + 1) % highlights.length);
  const prevSlide = () =>
    setCurrentIndex((currentIndex - 1 + highlights.length) % highlights.length);

  return (
    <div className="pt-[80px] pb-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- HEADER --- */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16 bg-black/40 p-10 rounded-[2.5rem] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-black uppercase text-white mb-4 tracking-tighter">
            Photo <span className="text-church-red">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Capturing the moments that define our community and faith.
          </p>
        </motion.section>

        {/* --- HIGHLIGHT CAROUSEL --- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${highlights[currentIndex].img}')`,
                backgroundColor: "#1a1a1a", // Fallback
              }}
            >
              {!highlights[currentIndex].img.includes("sample") ? null : (
                <div className="flex items-center justify-center h-full text-white/10">
                  <FaCamera size={120} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Glass Caption */}
          <motion.div
            key={`caption-${currentIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-2/3 bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-center"
          >
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">
              {highlights[currentIndex].title}
            </h3>
            <p className="text-gray-300 font-medium">
              {highlights[currentIndex].desc}
            </p>
          </motion.div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-church-red transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-church-red transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight />
          </button>
        </motion.section>

        {/* --- RECENT ALBUMS --- */}
        <section className="mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              Recent Albums
            </h2>
            <div className="h-px flex-grow mx-8 bg-white/10 hidden md:block"></div>
            <FaImages className="text-church-red text-2xl" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentAlbums.map((album, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group cursor-pointer shadow-xl hover:shadow-church-red/20 transition-all border border-transparent hover:border-church-red/30 h-64"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-6 group-hover:bg-church-red group-hover:text-white transition-all duration-500 shadow-inner">
                  <FaFolderOpen size={28} />
                </div>
                <h4 className="text-xl font-black text-zinc-900 uppercase tracking-tighter mb-1">
                  {album.title}
                </h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {album.count}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- ARCHIVE SECTION --- */}
        <section className="mt-24 mb-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-sm font-black text-white uppercase tracking-[0.4em] mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Explore History
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {archives.map((year, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#8b0000",
                  color: "#ffffff",
                }}
                className="bg-black/60 backdrop-blur-md border border-white/20 py-8 rounded-2xl flex items-center justify-center cursor-pointer transition-all group"
              >
                <h4 className="text-2xl font-black text-white tracking-tighter group-hover:text-white">
                  {year}
                </h4>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Photos;
