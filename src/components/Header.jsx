import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChurch,
  FaBookOpen,
  FaBookReader,
  FaHandsHelping,
  FaUsers,
  FaImages,
  FaMusic,
  FaCalendarAlt,
  FaGlobe,
  FaChevronDown,
  FaHeart,
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const base = import.meta.env.BASE_URL

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const toggleSubMenu = (key) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#ecfeffa2] border-b-4 border-church-red backdrop-blur-[50px] shadow-lg">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-7 text-decoration-none group">
            <div className="h-18 w-auto">
              <img src={`${base}img/church_logo.png`} alt="Logo" className="h-full w-auto" />
            </div>
            <div className="flex flex-col text-church-dark stroke-white leading-tight">
              <span className="font-extrabold stroke-5 text-2xl uppercase tracking-wide">
                Grace Baptist Church
              </span>
              <span className="text-lg font-medium text-gray-600 hover:text-red-800 transition-colors hidden sm:block">
                The Friendliest Church in Town
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/donate"
              className="hidden md:flex items-center gap-2 bg-church-red text-white px-5 py-2 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-red-800 transition-all shadow-md shadow-red-900/20"
            >
              <FaHeart className="text-sm" />
              Give
            </Link>

            <button
              onClick={toggleMenu}
              className="text-church-red hover:text-church-accent transition-transform hover:scale-110 p-2"
            >
              <FaBars size={24} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/70 z-60"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-[#ecfeffa2] text-[#910b0b] backdrop-blur-[50px] z-70 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h5 className="font-bold text-lg">Menu</h5>
                <button onClick={toggleMenu} className="text-church-red hover:text-white">
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <NavLink to="/" icon={<FaHome />} label="Home" onClick={toggleMenu} />
                <NavLink to="/about" icon={<FaChurch />} label="About Us" onClick={toggleMenu} />
                <NavLink
                  to="/preaching"
                  icon={<FaBookOpen />}
                  label="Preaching"
                  onClick={toggleMenu}
                />

                <CollapsibleMenu
                  title="Resources"
                  icon={<FaBookReader />}
                  isOpen={expandedMenus['resources']}
                  onToggle={() => toggleSubMenu('resources')}
                >
                  <SubLink to="/bible-reading" label="Bible Reading Guide" onClick={toggleMenu} />
                  <SubLink to="/discipleship" label="Discipleship Lesson" onClick={toggleMenu} />
                  <SubLink to="/sunday-school" label="Sunday School Lesson" onClick={toggleMenu} />
                  <SubLink to="/sermon-archive" label="Sermon Archive" onClick={toggleMenu} />
                </CollapsibleMenu>

                <CollapsibleMenu
                  title="Ministries"
                  icon={<FaHandsHelping />}
                  isOpen={expandedMenus['ministries']}
                  onToggle={() => toggleSubMenu('ministries')}
                >
                  <SubLink to="/ministries/bob" label="Band of Brothers" onClick={toggleMenu} />
                  <SubLink to="/ministries/cavalry" label="2nd Cavalry Squadron" onClick={toggleMenu} />
                  <SubLink
                    to="/ministries/children"
                    label="Children Ministry"
                    onClick={toggleMenu}
                  />
                  <SubLink to="/ministries/choir" label="Choir" onClick={toggleMenu} />
                  <SubLink to="/ministries/jeepney" label="Jeepney" onClick={toggleMenu} />
                  <SubLink to="/ministries/kitchen" label="Kitchen" onClick={toggleMenu} />
                  <SubLink to="/ministries/log" label="Log" onClick={toggleMenu} />
                  <SubLink
                    to="/ministries/multimedia"
                    label="Multimedia Team"
                    onClick={toggleMenu}
                  />
                  <SubLink to="/ministries/nursery" label="Nursery" onClick={toggleMenu} />
                  <SubLink
                    to="/ministries/strings-of-grace"
                    label="Strings of Grace"
                    onClick={toggleMenu}
                  />
                  <SubLink to="/ministries/youth" label="Youth" onClick={toggleMenu} />
                </CollapsibleMenu>

                <NavLink to="/staff" icon={<FaUsers />} label="Staff" onClick={toggleMenu} />
                <NavLink to="/photos" icon={<FaImages />} label="Photos" onClick={toggleMenu} />
                <NavLink
                  to="/events"
                  icon={<FaCalendarAlt />}
                  label="Events"
                  onClick={toggleMenu}
                />
                <NavLink to="/missions" icon={<FaGlobe />} label="Missions" onClick={toggleMenu} />

                <Link
                  to="/donate"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 px-3 py-4 mt-6 rounded-xl bg-church-red text-white font-black uppercase tracking-widest hover:bg-red-800 transition-all shadow-lg shadow-red-900/20"
                >
                  <FaHeart />
                  Give Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const NavLink = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 hover:text-church-red hover:pl-5 transition-all duration-200 text-church-dark font-medium"
  >
    <span className="text-church-red opacity-80">{icon}</span>
    {label}
  </Link>
)

const SubLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 px-2 text-sm text-church-dark hover:text-church-red hover:bg-white/5 rounded transition-colors"
  >
    {label}
  </Link>
)

const CollapsibleMenu = ({ title, icon, isOpen, onToggle, children }) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 hover:text-church-red hover:pl-5 transition-all duration-200 text-church-dark font-medium"
    >
      <div className="flex items-center gap-3">
        <span className="text-church-red opacity-80">{icon}</span>
        {title}
      </div>
      <FaChevronDown
        className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-church-red' : ''}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="ml-9 pl-2 border-l border-gray-700 flex flex-col gap-1 py-1">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export default Header
