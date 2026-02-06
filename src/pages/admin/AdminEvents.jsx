import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  Edit3,
  Trash2,
  Calendar as CalIcon,
  MapPin,
  Search,
} from "lucide-react";

const AdminEvents = ({ onEdit }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEvents();
    window.addEventListener("refreshData", fetchEvents);
    return () => window.removeEventListener("refreshData", fetchEvents);
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });
    setEvents(data || []);
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  return (
    <div className="space-y-4">
      {/* Search Bar Utility */}
      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={16}
        />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full bg-[#1c2128] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-church-red transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#1c2128] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Event Details</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredEvents.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 border border-white/5">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <CalIcon size={18} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white">{event.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={12} /> {event.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(event.event_date).toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(event)}
                      className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEvents;
