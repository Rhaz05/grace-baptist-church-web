import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  FolderTree,
  LogOut,
  Plus,
} from "lucide-react";

import AdminEvents from "../pages/admin/AdminEvents";
import AdminSermons from "../pages/admin/AdminSermons";
import AdminResources from "../pages/admin/AdminResources";
import AdminModal from "../pages/admin/AdminModal";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    if (payload.image_url === "") payload.image_url = null;

    try {
      if (editingItem) {
        await supabase.from(activeTab).update(payload).eq("id", editingItem.id);
      } else {
        await supabase.from(activeTab).insert([payload]);
      }

      setModalOpen(false);
      window.dispatchEvent(new Event("refreshData"));
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-red"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 flex">
      <aside className="w-64 bg-[#161920] border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white flex items-center gap-2">
            <LayoutDashboard className="text-church-red" /> GBC Admin
          </h2>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarLink
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
            icon={<Calendar size={20} />}
            label="Events"
          />
          <SidebarLink
            active={activeTab === "sermons"}
            onClick={() => setActiveTab("sermons")}
            icon={<BookOpen size={20} />}
            label="Sermons"
          />
          <SidebarLink
            active={activeTab === "resources"}
            onClick={() => setActiveTab("resources")}
            icon={<FolderTree size={20} />}
            label="Resources"
          />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-all font-bold"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow ml-64 p-8">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold capitalize">
              {activeTab} Management
            </h1>
            <p className="text-gray-500 font-medium">
              Create, update, and manage your website content.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setModalOpen(true);
            }}
            className="bg-church-red px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg shadow-red-900/20"
          >
            <Plus size={20} /> Add New {activeTab.slice(0, -1)}
          </button>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "events" && (
              <AdminEvents
                onEdit={(item) => {
                  setEditingItem(item);
                  setModalOpen(true);
                }}
              />
            )}
            {activeTab === "sermons" && (
              <AdminSermons
                onEdit={(item) => {
                  setEditingItem(item);
                  setModalOpen(true);
                }}
              />
            )}
            {activeTab === "resources" && (
              <AdminResources
                onEdit={(item) => {
                  setEditingItem(item);
                  setModalOpen(true);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <AdminModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          type={activeTab}
          data={editingItem}
          loading={formLoading}
        />
      </main>
    </div>
  );
};

const SidebarLink = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
      active
        ? "bg-church-red text-white shadow-lg shadow-red-900/20"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    {icon} {label}
  </button>
);

export default Admin;
