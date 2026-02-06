import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Heart,
  MapPin,
  Info,
  ChevronDown,
  Users,
  Church,
  Globe,
  Quote,
} from "lucide-react";

const missionsData = [
  {
    id: 1,
    title: "Local Community Outreach",
    location: "City Center",
    desc: "Our local outreach program focuses on feeding the homeless and providing essential supplies to families in need within our city. We believe in being the hands and feet of Jesus in our own backyard.",
    icon: <Users size={40} />,
    updates: [
      {
        title: "Current Needs",
        content:
          "We are currently collecting canned goods, warm coats, and hygiene products for the upcoming drive.",
      },
      {
        title: "Volunteer Opportunities",
        content:
          "Join us every Saturday morning at 9:00 AM at the Main Plaza for distribution.",
      },
    ],
  },
  {
    id: 2,
    title: "Church Planting Ministry",
    location: "Regional",
    desc: "Equipping pastors and leaders to plant new churches in underserved rural areas. Our goal is to ensure every community has access to a Gospel-preaching local church.",
    icon: <Church size={40} />,
    updates: [
      {
        title: "New Plant Launched",
        content:
          "We successfully launched a new fellowship in the northern district last month. 15 new families have joined!",
      },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Missions = () => {
  return (
    <div className="pt-[80px] pb-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* --- HEADER --- */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16 bg-black/40 p-10 rounded-[2.5rem] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-black uppercase text-white mb-4 tracking-tighter">
            Our <span className="text-church-red">Missions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Going into all the world to share the Gospel and serve others.
          </p>
        </motion.section>

        {/* --- THE GREAT COMMISSION --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl text-center relative overflow-hidden border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-2 bg-church-red"></div>
            <div className="flex justify-center mb-8">
              <div className="bg-church-red/10 p-5 rounded-3xl text-church-red">
                <Heart size={48} fill="currentColor" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight uppercase">
              The Great Commission
            </h2>

            <div className="max-w-3xl mx-auto relative">
              <Quote className="absolute -top-6 -left-8 text-gray-100 w-20 h-20 -z-10" />
              <p className="text-xl md:text-2xl text-gray-600 italic font-serif leading-relaxed mb-6">
                "Go therefore and make disciples of all nations, baptizing them
                in the name of the Father and of the Son and of the Spirit."
              </p>
              <p className="text-church-red font-black uppercase tracking-[0.3em] text-sm">
                — Matthew 28:19
              </p>
            </div>
          </div>
        </motion.section>

        {/* --- MISSION LIST --- */}
        <div className="space-y-10">
          {missionsData.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: MISSION CARD ---
const MissionCard = ({ mission, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 group"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Visual / Icon Side */}
        <div className="lg:w-1/3 bg-gray-50 flex flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-church-red/5 group-hover:bg-church-red/10 transition-colors"></div>
          <div className="relative z-10 text-gray-300 group-hover:text-church-red transition-all duration-500 transform group-hover:scale-110">
            {mission.icon}
          </div>
          <p className="mt-6 relative z-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-gray-600 transition-colors">
            Mission Field
          </p>
        </div>

        {/* Content Side */}
        <div className="lg:w-2/3 p-10 md:p-14 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              {mission.title}
            </h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-church-red/10 text-church-red rounded-full text-xs font-black uppercase tracking-widest w-fit">
              <MapPin size={14} /> {mission.location}
            </div>
          </div>

          <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
            {mission.desc}
          </p>

          <div className="space-y-4">
            {mission.updates.map((update, uIdx) => (
              <AccordionItem
                key={uIdx}
                title={update.title}
                content={update.content}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENT: CUSTOM ACCORDION ---
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl transition-all duration-300 ${isOpen ? "border-church-red shadow-lg bg-red-50/30" : "border-gray-100 bg-gray-50"}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left outline-none"
      >
        <span className="flex items-center gap-3 font-bold text-gray-800 text-sm uppercase tracking-wider">
          <Info
            size={16}
            className={isOpen ? "text-church-red" : "text-gray-400"}
          />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={isOpen ? "text-church-red" : "text-gray-400"}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-church-red/10 pt-4">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Missions;
