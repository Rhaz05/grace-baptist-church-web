import { motion,AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaRegPlayCircle,
  FaRegClock,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
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

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const missionsData = [
  {
    id: 1,
    title: "GBC Church Covenant",
    desc: "Having been led, as we believe, by the Spirit of God, to receive the Lord Jesus Christ as our Savior, and on the profession of our faith, having been baptized in the name of the Father, and of the Son, and of the Holy Ghost, we do now in the presence of God, angels and this assembly, most solemnly and joyfully enter into covenant with one another as one body in Christ.We engage, therefore, by the aid of the Holy Spirit, to walk together in Christian love; to strive for the advancement of this church in knowledge, holiness, and comfort; to promote its prosperity and spirituality; to sustain its worship, ordinances, discipline and doctrines; to contribute cheerfully and regularly to the support of the ministry, the expense of the church, the relief of the poor and the spread of the gospel through all nations.We also engage to maintain family and secret devotions; to religiously educate our children; to seek the salvation of our kindred and acquaintances; to walk circumspectly in the world; to be just in our dealings, faithful in our engagements and exemplary in our deportment; to avoid all tattling, backbiting and excessive anger; to abstain from the sale and use of intoxicating drink as a beverage; and to be zealous in our efforts to advance the kingdom of our Savior.We further engage to watch over one another in brotherly love; to remember each other in prayer; to aid each other in sickness and distress; to cultivate Christian sympathy in feeling ",
    icon: <Users size={40} />,
    updates: [
      {
        title: "1. The Holy Scriptures",
        content:
          "We believe that the Holy Bible was written by men divinely inspired and is the preserved, infallible Word of God, and that the King James Version is the faithful English translation for the English-speaking people. It is the final authority in all matters of faith and practice.]",
        reference1: "2 Timothy 3:16-17 - “All scripture is given by inspiration of God…”",
        reference2: "Psalm 12:6-7",
      },
      {
        title: "2. The True God",
        content:
          "We believe in one living and true God, eternally existing in three Persons: the Father, the Son, and the Holy Ghost; equal in every divine perfection.",
        reference1: "Deuteronomy 6:4",
        reference2: "Matthew 28:19",
        reference3: "1 John 5:7",
      },
      {
        title: "3. The Lord Jesus Christ",
        content:
          "We believe that Jesus Christ is the eternal Son of God, conceived by the Holy Ghost, born of the virgin Mary, lived a sinless life, died on the cross as the substitutionary sacrifice for sinners, rose bodily from the grave, ascended into heaven, and will personally return.",
        reference1: "Isaiah 7:14",
        reference2: "1 Corinthians 15:3-4",
        reference3: "Acts 1:11",
      },
      {
        title: "4. The Holy Ghost",
        content:
          "We believe the Holy Ghost convicts the world of sin, regenerates the believing sinner, indwells every believer, and empowers believers for godly living and service.",
        reference1: "John 16:8",
        reference2: "Romans 8:9",
        reference3: "Ephesians 1:13",
      },
      {
        title: "5. Man",
        content:
          "We believe that man was created in the image of God but through Adam’s fall became sinful by nature and choice, and is therefore under condemnation without salvation in Christ.",
        reference1: "Genesis 1:27",
        reference2: "Romans 3:23",
        reference3: "Romans 5:12",
      },
      {
        title: "6. Salvation",
        content:
          "We believe that salvation is by grace through faith alone in the Lord Jesus Christ, apart from works, and that all who truly believe are eternally secure.",
        reference1: "Ephesians 2:8-9",
        reference2: "John 3:16",
        reference3: "John 10:28-29",
      },
      {
        title: "7. The Church",
        content:
          "We believe that a New Testament Baptist church is a local assembly of baptized believers, associated by covenant in the faith and fellowship of the Gospel, observing the ordinances of Christ, and governed by His Word.",
        reference1: "Acts 2:41-42",
        reference2: "Colossians 1:18",
      },
      {
        title: "8. Baptism and the Lord's Supper",
        content:[
          "We believe that: ",
          
          "Baptism is for believers only, administered by immersion, as a testimony of faith in Christ.",
          "The Lord's Supper is a memorial ordinance, commemorating Christ's death.",
        ],
        reference1: "Colossians 1:18",
        reference2: "Romans 6:3-4",
        reference3: "1 Corinthians 11:23-26",
      },
      {
        title: "9. Christian Living",
        content:
          "We believe that all believers are called to live holy, separated, and obedient lives, glorifying God through faithful service and Gospel witness.",
        reference1: "Romans 12:1-2",
        reference2: "2 Corinthians 6:17",
      },
      {
        title: "10. Last Things",
        content:
          "We believe that all believers are called to live holy, separated, and obedient lives, glorifying God through faithful service and Gospel witness.",
        reference1: "John 5:28-29",
        reference2: "Revelation 20:11-15",
      },
      {
        title: "11. Religious Liberty",
        content:
          "We believe in soul liberty and the separation of church and state, that every person is accountable to God alone in matters of faith.",
        reference1: "Romans 14:12",
        reference2: "Matthew 22:21",
      },
    ],
  },
];

const About = () => {
  return (
    <div className="pt-40px pb-20 container mx-auto md:px-4 max-w-6xl overflow-hidden">
      {/* --- PAGE HEADER --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-center mb-16 bg-black/40 backdrop-blur-md p-10 rounded-2xl border-l-8 border-church-red max-w-4xl mx-auto shadow-2xl"
      >
        <h1 className="text-5xl font-black uppercase text-white mb-4 tracking-tighter drop-shadow-lg">
          About Us
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
          A community committed to sharing the love of Jesus Christ and serving
          our city.
        </p>
      </motion.section>

      {/* --- HISTORY SECTION --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl mb-20 border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-450px">
          {/* Text Content */}
          <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
              Our History
            </h2>
            <p className="text-church-red mb-8 italic font-serif text-xl font-medium">
              A legacy of faith and community
            </p>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Grace Baptist Church has been serving the Lucena City community
              for decades. We started as a small bible study group and have
              grown into a vibrant congregation dedicated to worship,
              discipleship, and outreach.
            </p>

            <motion.div
              whileHover={{ x: 10 }}
              className="border-l-4 border-church-red/30 pl-6 py-3 bg-gray-50 rounded-r-xl"
            >
              <p className="text-md text-gray-500 italic font-medium">
                "For where two or three are gathered in my name, there am I
                among them." <br />{" "}
                <span className="text-church-red not-italic font-bold">
                  — Matthew 18:20
                </span>
              </p>
            </motion.div>
          </div>

          {/* Image / Video Placeholder */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-5 bg-zinc-900 flex items-center justify-center group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-church-red/10 group-hover:bg-church-red/20 transition-colors"></div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FaRegPlayCircle className="text-8xl text-white/20 group-hover:text-church-red transition-all transform group-hover:scale-110 z-10" />
            </motion.div>
            <p className="absolute bottom-10 text-white/40 font-black tracking-[0.3em] text-xs uppercase group-hover:text-white transition-colors">
              Watch Our Story
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* --- GBC CHURCH COVENANT SECTION --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl mb-20 border border-gray-100"
      >
        <div className="space-y-10">
          {missionsData.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>
      </motion.div>

      {/* --- MAP & CONTACT SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 p-12 md:p-16 flex flex-col justify-center bg-gray-50/50">
              <h3 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tighter border-b-4 border-church-red pb-4 w-fit">
                Visit Us
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-10"
              >
                <ContactItem
                  icon={<FaMapMarkerAlt />}
                  title="Address"
                  text="Lot 1, Block 41 Citta Grande 3, Lucena City, 4301 Quezon"
                />
                <ContactItem
                  icon={<FaPhone />}
                  title="Phone"
                  text="042-784-4032"
                />
                <ContactItem
                  icon={<FaEnvelope />}
                  title="Email"
                  text="info@gracebaptist.com"
                />
              </motion.div>
            </div>

            {/* Google Map */}
            <div className="lg:col-span-7 h-500px bg-zinc-200 grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.671048873403!2d121.61177637591325!3d13.935639191062925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd4c8c7f3b8b1b%3A0x6b4b4b4b4b4b4b4b!2sLucena%20City%2C%20Quezon!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.section>
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
      <div className="flex flex-col justify-center lg:flex-row">
        {/* Content Side */}
        <div className="lg:w-4/5 p-10 md:p-14 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-3xl m-auto font-black text-gray-900 tracking-tight uppercase">
              {mission.title}
            </h3>
          </div>

          <p className="text-gray-500 text-justify text-lg leading-relaxed mb-10 font-medium">
            {mission.desc}
          </p>

          <div className="space-y-4">
            {mission.updates.map((update, uIdx) => (
              <AccordionItem
                key={uIdx}
                title={update.title}
                content={update.content}
                reference1={update.reference1}
                reference2={update.reference2}
                reference3={update.reference3}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENT: CUSTOM ACCORDION ---
const AccordionItem = ({
  title,
  content,
  reference1,
  reference2,
  reference3,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl transition-all duration-300 ${
        isOpen
          ? "border-church-red shadow-lg bg-red-50/30"
          : "border-gray-100 bg-gray-50"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left outline-none"
      >
        <span className="flex items-center md:pl-3 font-bold text-gray-800 text-sm uppercase tracking-wider">
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
            <div className="px-5 pb-5 pt-4 text-gray-600 text-sm leading-relaxed">
              
              {/* Content */}
              <div className="mt-3">
                {Array.isArray(content) ? (
                  <>
                    {/* First paragraph (non-bullet) */}
                    <p className="mb-4">{content[0]}</p>

                    {/* Bullet points */}
                    <ul className="list-disc pl-6 space-y-3">
                      {content.slice(1).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>{content}</p>
                )}
              </div>    

              {/* References */}
              <div className="mt-5 space-y-2 font-bold">
                {reference1 && <p>{reference1}</p>}
                {reference2 && <p>{reference2}</p>}
                {reference3 && <p>{reference3}</p>}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ANIMATED HELPER COMPONENTS ---

const ContactItem = ({ icon, title, text }) => (
  <motion.div variants={fadeInUp} className="flex gap-6 group">
    <div className="text-church-red text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div>
      <h5 className="font-black text-zinc-900 uppercase text-xs tracking-[0.2em] mb-2 opacity-50">
        {title}
      </h5>
      <p className="text-gray-600 font-bold text-lg leading-snug">{text}</p>
    </div>
  </motion.div>
);

export default About;
