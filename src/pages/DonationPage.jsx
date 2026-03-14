import React from 'react'
import { motion } from 'framer-motion'
import {
  FaHeart,
  FaHandHoldingHeart,
  FaAddressBook,
  FaUniversity,
  FaGlobeAmericas,
  FaHome,
  FaChevronRight,
} from 'react-icons/fa'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const DonationPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 overflow-hidden rounded-2xl">
      <section className="bg-church-dark pt-32 pb-40 px-4 relative rounded-2xl">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-church-red/20 text-church-red px-4 py-2 rounded-full mb-6 border border-church-red/30"
          >
            <FaHeart className="text-xs" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Generosity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8"
          >
            Giving to <span className="text-church-red">Grace</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 italic font-serif max-w-2xl mx-auto leading-relaxed"
          >
            "Every man according as he purposeth in his heart, so let him give; not grudgingly, or
            of necessity: for God loveth a cheerful giver."
            <span className="block mt-4 text-church-red font-sans font-black not-italic text-sm tracking-widest uppercase">
              — 2 Corinthians 9:7
            </span>
          </motion.p>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gray-50 rounded-t-[5rem]"></div>
      </section>

      <section className="container mx-auto px-4 -mt-24 relative z-20 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FundCard
            icon={<FaHandHoldingHeart />}
            title="Offerings"
            desc="Supporting the day-to-day ministry and operations of our local church."
          />
          <FundCard
            icon={<FaGlobeAmericas />}
            title="Missions Fund"
            desc="Spreading the Gospel by supporting our missionaries locally and abroad."
          />
          <FundCard
            icon={<FaHome />}
            title="Building Fund"
            desc="Contributions toward the maintenance and future expansion of our church facilities."
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="text-center mb-4">
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                Transfer <span className="text-church-red">Details</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Choose your preferred method for local transfers
              </p>
            </div>

            <div className="bg-[#007dfe] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                    <div className="bg-white p-2.5 rounded-xl shadow-lg">
                      <FaAddressBook className="text-[#007dfe] text-xl" />
                    </div>
                    <span className="font-black uppercase tracking-[0.2em] text-sm">GCash</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                    09XX XXX XXXX
                  </h3>
                  <p className="text-blue-100 font-medium">Account Name: Grace Baptist Church</p>
                </div>

                <div className="shrink-0">
                  <div className="w-32 h-32 bg-white p-3 rounded-2rem shadow-2xl transform transition-transform group-hover:scale-105">
                    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter text-center px-2">
                        Scan QR Code
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BANK TRANSFER CARD (BDO) */}
            <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl flex flex-col sm:flex-row items-center gap-8 group hover:border-church-red/30 transition-all">
              <div className="bg-gray-50 w-24 h-24 rounded-2rem flex items-center justify-center text-church-red text-4xl shadow-inner group-hover:bg-church-red group-hover:text-white transition-all duration-500">
                <FaUniversity />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase text-church-red tracking-[0.3em]">
                  Bank Transfer (BDO)
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 mb-1 tracking-tight">
                  XXXX XXXX XXXX
                </h3>
                <p className="text-gray-500 font-medium">Grace Baptist Church Lucena</p>
              </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-gray-100/50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-8">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="text-church-red text-xl">
                  <FaAddressBook />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                  For local transfers, please send a screenshot of your transaction to{' '}
                  <b className="text-gray-900">info@gracebaptist.com</b> or our official Facebook
                  page so we can properly acknowledge your gift.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const FundCard = ({ icon, title, desc }) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 text-center flex flex-col items-center group transition-all"
  >
    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-church-red text-3xl mb-6 group-hover:bg-church-red group-hover:text-white transition-all duration-500 shadow-sm">
      {icon}
    </div>
    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-4">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
)

export default DonationPage
