import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa'

import photo1 from '../assets/images/RodolfoOCalaya.jpg'

const staffMembers = [
  { photo: photo1, name: 'Rodolfo O. Calayan', role: 'Head Pastor' },
  { photo: '', name: 'Bro. Jayvee Tarranco', role: 'Sunday School Administrator' },
  { photo: '', name: 'Alma Leah Nabella', role: 'Media Director' },
  { photo: '', name: 'Bro. Ronel Nieva', role: 'Youth Leader' },
  { photo: '', name: 'Bro. Paolo Narzoles', role: 'Jeep Director' },
  { photo: '', name: 'Bro. Michael Alub', role: 'Maintenance Director' },
]

const Staff = () => {
  return (
    <div className="pt-70px pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* --- PAGE HEADER --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 bg-black/40 p-10 rounded-xl backdrop-blur-sm border-l-4 border-church-red"
        >
          <h1 className="text-4xl font-bold uppercase text-church-red mb-4 tracking-wide">
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                “To glorify God by preaching the Gospel, winning souls to Christ, discipling
                believers, and strengthening families through the teaching of God's Word and
                faithful Christian service.”
              </p>
              <p className="italic border-t border-gray-100 pt-4">
                "Go ye therefore, and teach all nations, baptizing them in the name of the Father,
                and of the Son, and of the Holy Ghost : Matthew 28:19 kjv
              </p>
            </div>
          </div>
        </motion.section>

        {/* --- TEAM GRID --- */}
        <section className="relative z-10">
          <h2 className="text-center text-3xl font-bold text-white mb-12 drop-shadow-lg">
            Our Team
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-50 shadow-inner overflow-hidden group-hover:border-church-red/20 transition-colors duration-300">
                      <img src={member.photo} alt="" />
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
  )
}

export default Staff
