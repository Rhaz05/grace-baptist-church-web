import React from 'react'
import { motion } from 'framer-motion'
import {
  FaHeart,
  FaHandHoldingHeart,
  FaAddressBook,
  FaUniversity,
  FaGlobeAmericas,
  FaHome,
  FaQrcode,
} from 'react-icons/fa'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const DonationPage = () => {
  return (
    // Added 'rounded-[2rem] md:rounded-[2.5rem]' here to fix the outer sharp corners!
    <div className="bg-[#fafafa] min-h-screen pb-24 overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
      {/* --- HERO SECTION --- */}
      <section className="bg-church-dark pt-40 pb-48 px-4 relative rounded-b-[4rem] lg:rounded-b-[6rem]">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-church-red/20 text-church-red px-5 py-2.5 rounded-full mb-8 border border-church-red/30"
          >
            <FaHeart className="text-sm" />
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
            className="text-xl md:text-2xl text-gray-300 italic font-serif max-w-3xl mx-auto leading-relaxed"
          >
            "Every man according as he purposeth in his heart, so let him give; not grudgingly, or
            of necessity: for God loveth a cheerful giver."
            <span className="block mt-6 text-church-red font-sans font-black not-italic text-sm tracking-[0.2em] uppercase">
              — 2 Corinthians 9:7
            </span>
          </motion.p>
        </div>

        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-church-red/5 blur-[120px] pointer-events-none" />
      </section>

      {/* --- MAIN CONTENT (Golden Ratio Layout) --- */}
      <section className="container mx-auto px-4 -mt-24 relative z-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT COLUMN: Transfer Details (7 Columns) */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-10 border border-gray-100">
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                  Transfer <span className="text-church-red">Details</span>
                </h2>
                <p className="text-gray-500 text-sm font-medium">
                  Choose your preferred method for local digital transfers.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {/* GCASH CARD */}
                <div className="bg-[#007dfe] rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <FaAddressBook className="text-[#007dfe] text-lg" />
                        </div>
                        <span className="font-black uppercase tracking-[0.2em] text-xs">GCash</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-1">
                        09XX XXX XXXX
                      </h3>
                      <p className="text-blue-100 text-sm font-medium tracking-wide">
                        Grace Baptist Church
                      </p>
                    </div>

                    <div className="shrink-0">
                      <div className="w-28 h-28 bg-white p-2 rounded-2xl shadow-xl transform transition-transform group-hover:scale-105 flex items-center justify-center">
                        <div className="w-full h-full bg-gray-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 text-gray-400 gap-1 hover:text-[#007dfe] hover:border-[#007dfe] transition-colors cursor-pointer">
                          <FaQrcode size={24} />
                          <span className="text-[8px] font-bold uppercase tracking-widest text-center px-1">
                            Scan QR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BANK TRANSFER CARD (BDO) */}
                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:border-church-red/30 hover:shadow-md transition-all">
                  <div className="bg-white w-20 h-20 shrink-0 rounded-[1.5rem] flex items-center justify-center text-church-red text-3xl shadow-sm border border-gray-100 group-hover:bg-church-red group-hover:text-white transition-all duration-500">
                    <FaUniversity />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-black uppercase text-church-red tracking-[0.2em] mb-1 block">
                      Bank Transfer (BDO)
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-1">
                      XXXX XXXX XXXX
                    </h3>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">
                      Grace Baptist Church Lucena
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 w-2 h-full bg-church-red"></div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                <div className="bg-gray-50 p-4 rounded-full text-church-red text-xl shrink-0">
                  <FaAddressBook />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold uppercase tracking-widest text-xs mb-2">
                    Acknowledge Your Gift
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    For local transfers, please send a screenshot of your transaction to{' '}
                    <b className="text-gray-900">info@gracebaptist.com</b> or our official Facebook
                    page so we can properly acknowledge and allocate your gift.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Where it Goes (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-10 border border-gray-100 h-full">
              <div className="mb-8">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                  Designations
                </h3>
                <p className="text-gray-500 text-sm">
                  How your faithful giving supports the ministry.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <FundRow
                  icon={<FaHandHoldingHeart />}
                  title="Offerings"
                  desc="Supporting the day-to-day ministry and operations of our local church."
                />
                <FundRow
                  icon={<FaGlobeAmericas />}
                  title="Missions Fund"
                  desc="Spreading the Gospel by supporting our missionaries locally and abroad."
                />
                <FundRow
                  icon={<FaHome />}
                  title="Building Fund"
                  desc="Contributions toward the maintenance and future expansion of our church facilities."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Redesigned for horizontal layout to fit the 5-column sidebar gracefully
const FundRow = ({ icon, title, desc }) => (
  <div className="bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100 flex items-start gap-5 group hover:bg-white hover:shadow-md hover:border-church-red/20 transition-all duration-300">
    <div className="w-14 h-14 shrink-0 bg-white rounded-xl flex items-center justify-center text-church-red text-xl shadow-sm border border-gray-100 group-hover:bg-church-red group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div>
      <h4 className="text-base font-black text-gray-900 uppercase tracking-tighter mb-1.5">
        {title}
      </h4>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
)

export default DonationPage
