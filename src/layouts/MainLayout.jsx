import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import churchVideo from "../assets/video/gbc.mp4";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-transparent">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          id="video-background"
          className="absolute w-full h-full object-cover"
        >
          <source src={churchVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Header />

      <main className="grow container mx-auto px-4 py-8 relative z-10 text-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
