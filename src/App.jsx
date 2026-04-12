import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import ScrollToTop from './components/ScrollTop'
// Layouts
import MainLayout from './layouts/MainLayout'
import MinistryLayout from './layouts/MinistryLayout'
import ProtectedRoute from './components/ProtectedRoutes'

// Public Pages
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import About from './pages/About'
import Preaching from './pages/Preaching'
import Staff from './pages/Staff'
import Events from './pages/Events'
import SundaySchool from './pages/resources/SundaySchool'
import SermonArchive from './pages/resources/SermonArchive'
import Login from './pages/auth/Login'
import Missions from './pages/Missions'
import Photos from './pages/Photos'
import DonationPage from './pages/DonationPage'

// Admin Pages
import Admin from './pages/Admin'

// Ministries
import BandOfBrother from './pages/ministries/BandOfBrother'
import Cavalry from './pages/ministries/Cavalry'
import Children from './pages/ministries/Children'
import Choir from './pages/ministries/Choir'
import Jeepney from './pages/ministries/Jeepney'
import Kitchen from './pages/ministries/Kitchen'
import Log from './pages/ministries/Log'
import MultimediaTeam from './pages/ministries/MultimediaTeam'
import Nursery from './pages/ministries/Nursery'
import StringsOfGrace from './pages/ministries/StringsOfGrace'
import Youth from './pages/ministries/Youth'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/preaching" element={<Preaching />} />
          <Route path="/events" element={<Events />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/login" element={<Login />} />

          {/* Resources */}
          <Route path="/sunday-school" element={<SundaySchool />} />
          <Route path="/sermon-archive" element={<SermonArchive />} />

          <Route path="/missions" element={<Missions title="Missions" />} />
          <Route path="/photos" element={<Photos title="Photo Gallery" />} />
          <Route path="/contact" element={<Placeholder title="Contact Us" />} />
          <Route path="/bible-reading" element={<Placeholder title="Bible Reading Guide" />} />
          <Route path="/discipleship" element={<Placeholder title="Discipleship" />} />
          <Route path="/music" element={<Placeholder title="Music Ministry" />} />
          <Route path="/donate" element={<DonationPage title="Youth Ministry" />} />
        </Route>

        <Route element={<MinistryLayout />}>
          <Route path="/ministries/bob" element={<BandOfBrother title="Bob Ministry" />} />
          <Route path="/ministries/cavalry" element={<Cavalry title="Cavalry Ministry" />} />
          <Route path="/ministries/children" element={<Children title="Children Ministry" />} />
          <Route path="/ministries/choir" element={<Choir title="Choir Ministry" />} />
          <Route path="/ministries/jeepney" element={<Jeepney title="Jeepney Ministry" />} />
          <Route path="/ministries/kitchen" element={<Kitchen title="Kitchen Ministry" />} />
          <Route path="/ministries/log" element={<Log title="Log Ministry" />} />
          <Route
            path="/ministries/multimedia"
            element={<MultimediaTeam title="Multimedia Ministry" />}
          />
          <Route path="/ministries/nursery" element={<Nursery title="Nursery Ministry" />} />
          <Route
            path="/ministries/strings-of-grace"
            element={<StringsOfGrace title="Strings of Grace Ministry" />}
          />
          <Route path="/ministries/youth" element={<Youth title="Youth Ministry" />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<Navigate to="/login" replace />} />

        <Route
          path="*"
          element={
            <div className="text-center py-20 text-3xl text-white">404 - Page Not Found</div>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export default App
