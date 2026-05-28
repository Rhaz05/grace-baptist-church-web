import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Heart, MapPin, Info, ChevronDown, Users, Church, Globe, Quote } from 'lucide-react'

const missionsData = [
  {
    id: 1,
    title: 'HOME MISSIONS',
    icon: <Users size={40} />,
    updates: [
      {
        title: 'Joel De Luna (Padre Brugo)',
        content: [
          'School Ministry',
          'Members spiritual growth',
          'BS salvation',
        ],
      },
      {
        title: 'Sony Guico (Padre Burgos)',
        content: [
          'Maturity of all members', 
          'Soul Winning',
          'Bible Studies',
          'Improvement of the Church Building',
          'Good Health',
          'Leardership',
        ],
      },
      {
        title: 'Jayson Rogador (Aurora',
        content: [
          'Service Vehicle', 
          'Music Ministry', 
          'Service Vehicle',
          'More Souls to be saved and faith workers'
        ],
      },
      {
        title: 'Angello Santoalla (Sta. Cruz)',
        content: [
          'Salvation BS', 
          'Church members growth', 
          'Financial provisions and Health',
          'Wisdom, Health'
        ],
      },
      {
        title: 'Emman Fortin (Pagbilao)',
        content: [
          'Salvation of BS&Jail Minisitry', 
          'Financial Provisions&Vehicle', 
          'Monthly mission and house rent',
          '1st Mission Anniversary'
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'FOREIGN MISSIONS',
    location: 'International',
    desc: 'Supporting missionaries around the world through prayer, financial aid, outreach programs, and community development projects.',
    icon: <Globe size={40} />,
    updates: [
      {
        title: 'Deal Lenge (Congo)',
        content: [
          'Congolese people to be saved', 
          'Printer for Gospel Tracks', 
          'Partnership and Consistent Support'
        ],
      },
      {
        title: 'Josephine Rivera (Tanzania)',
        content: [
          'More souls to be saved', 
          'Open door for ministry', 
          'More supporting churches'
        ],
      },
      {
        title: 'Jon Coronel (Tenzania)',
        content: [
          "God's Wisdom", 
          'Health', 
        ],
      },
      {
        title: 'Chritopher Mwamba (Zambia)',
        content: [
          'Provision for church building and air fare ticket', 
          'Bro. Amos Bwalya and Clever', 
          'Mulenga - Bible School next year'
        ],
      },
      {
        title: "Stephen Jay Araña (Nepal)",
        content: [
          'Provision for visa and protection',
          'More Nepalese to be saved',
          'Wisdom and Knowledge',
        ],
      },
      {
        title: 'Tychicus Mabangio (India)',
        content: [
          'Persecuted churches in India', 
          'Salvation of Indian people',
        ],
      },
      {
        title: 'Dean Alhim Medrano (Costa Rica)',
        content: [
          'Provision of ( plane tickets, visa expences, house rental)',
          'Last leg of Deputation', 
          'Study of language and culture'
        ],
      },
      {
        title: 'Mildred Agunod (Mexico)',
        content: [
          'Guidance, Provision and Wisdom',
          'More contact mission work',
        ],
      },
      {
        title: 'Jireh Matembo (Canada)',
        content: [
        ],
      },
    ],
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

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
                "Go therefore and make disciples of all nations, baptizing them in the name of the
                Father and of the Son and of the Spirit."
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
  )
}

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
      <div className="flex justify-center flex-col lg:flex-row">
        {/* Content Side */}
        <div className="lg:w-4/3 justify-center p-10 md:p-14 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              {mission.title}
            </h3>
          </div>

          <div className="flex md:justify-center md:flex-row ">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mission.updates.map((update, uIdx) => (
                <AccordionItem key={uIdx} title={update.title} content={update.content} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// --- SUB-COMPONENT: CUSTOM ACCORDION ---
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-church-red shadow-lg bg-red-50/30' : 'border-gray-100 bg-gray-50'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left outline-none"
      >
        <span className="flex items-center gap-3 font-bold text-gray-800 text-sm uppercase tracking-wider">
          <Info size={16} className={isOpen ? 'text-church-red' : 'text-gray-400'} />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={isOpen ? 'text-church-red' : 'text-gray-400'}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-church-red/10 pt-4">
              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm leading-relaxed">
                {content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Missions
