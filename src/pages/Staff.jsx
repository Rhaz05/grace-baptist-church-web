import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const staffMembers = [
  { name: "Rodolfo O. Calayan", role: "Head Pastor" },
  { name: "Bro. Jayvee Tarranco", role: "Sunday School Administrator" },
  { name: "Bro. Harold Paycao", role: "Music Director" },
  { name: "Bro. Allan Chester Lagrason", role: "Media Director" },
  { name: "Bro. Ronel Nieva", role: "Youth Leader" },
  { name: "Bro. Paolo Narzoles", role: "Jeep Director" },
  { name: "Sis. Gloriefel Paycao", role: "Ladies Director" },
  { name: "Bro. Michael Alub", role: "Maintenance Director" },
];

const Staff = () => {
  return (
    <div className="pt-[70px] pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* --- PAGE HEADER --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 bg-black/40 p-10 rounded-xl backdrop-blur-sm border-l-4 border-church-red"
        >
          <h1 className="text-4xl font-bold uppercase text-white mb-4 tracking-wide">
            Meet The Staff
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Dedicated to serving our community and leading in faith.
          </p>
        </motion.section>

        {/* --- MISSION SECTION --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-16 border border-white/20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Our Mission
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Egestas elit dui scelerisque ut eu purus aliquam vitae
                habitasse. Egestas elit dui scelerisque ut eu purus aliquam
                vitae habitasse. Egestas elit dui scelerisque ut eu purus
                aliquam vitae habitasse.
              </p>
              <p className="italic border-t border-gray-100 pt-4">
                Excepteur efficient emerging, minim veniam enim aute carefully
                curated Ginza conversation exquisite perfect nostrud nisi
                intricate Content.
              </p>
            </div>
          </div>
        </motion.section>

        {/* --- TEAM GRID --- */}
        <section className="relative z-10">
          <h2 className="text-center text-3xl font-bold text-white mb-12 drop-shadow-lg">
            Our Team
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {staffMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center h-full shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  {/* Photo Wrapper */}
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-50 shadow-inner group-hover:border-church-red/20 transition-colors duration-300">
                      <FaUser className="text-gray-300 text-4xl group-hover:text-church-red transition-colors duration-300" />
                    </div>
                  </div>

                  <h5 className="font-bold text-gray-800 text-lg mb-1 leading-tight">
                    {member.name}
                  </h5>
                  <p className="text-church-red text-xs uppercase font-black tracking-widest">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Staff;
