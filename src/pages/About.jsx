import { motion } from "framer-motion";
import {
  FaRegPlayCircle,
  FaRegClock,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

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

const About = () => {
  return (
    <div className="pt-[40px] pb-20 container mx-auto px-4 max-w-6xl overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[450px]">
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
            <div className="lg:col-span-7 h-[500px] bg-zinc-200 grayscale hover:grayscale-0 transition-all duration-700">
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
