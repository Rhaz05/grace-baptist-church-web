import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollTop";
// Layouts
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoutes";

// Public Pages
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import About from "./pages/About";
import Preaching from "./pages/Preaching";
import Staff from "./pages/Staff";
import Events from "./pages/Events";
import SundaySchool from "./pages/resources/SundaySchool";
import SermonArchive from "./pages/resources/SermonArchive";
import Login from "./pages/auth/Login";
import Missions from "./pages/Missions";
import Photos from "./pages/Photos";

// Admin Pages
import Admin from "./pages/Admin";

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
          <Route
            path="/bible-reading"
            element={<Placeholder title="Bible Reading Guide" />}
          />
          <Route
            path="/discipleship"
            element={<Placeholder title="Discipleship" />}
          />
          <Route
            path="/jeepney-ministry"
            element={<Placeholder title="Jeepney Ministry" />}
          />
          <Route
            path="/music"
            element={<Placeholder title="Music Ministry" />}
          />
          <Route
            path="/youth"
            element={<Placeholder title="Youth Ministry" />}
          />
          <Route
            path="/children-ministry"
            element={<Placeholder title="Children Ministry" />}
          />
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
            <div className="text-center py-20 text-3xl text-white">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
