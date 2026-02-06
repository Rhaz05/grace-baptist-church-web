import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Edit3, Trash2, Youtube, Calendar, User, Search } from "lucide-react";

const AdminSermons = ({ onEdit }) => {
  const [sermons, setSermons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSermons();
    window.addEventListener("refreshData", fetchSermons);
    return () => window.removeEventListener("refreshData", fetchSermons);
  }, []);

  const fetchSermons = async () => {
    const { data } = await supabase
      .from("sermons")
      .select("*")
      .order("date_preached", { ascending: false });
    setSermons(data || []);
  };

  const getYoutubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const filteredSermons = sermons.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.preacher &&
        s.preacher.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleDelete = async (id) => {
    if (!confirm("Delete this sermon?")) return;
    await supabase.from("sermons").delete().eq("id", id);
    fetchSermons();
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={16}
        />
        <input
          type="text"
          placeholder="Search sermons..."
          className="w-full bg-[#1c2128] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-church-red transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#1c2128] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Sermon Info</th>
              <th className="px-6 py-4">Date Preached</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredSermons.map((s) => {
              const vidId = getYoutubeId(s.video_url);
              return (
                <tr
                  key={s.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-12 rounded bg-black flex-shrink-0 overflow-hidden border border-white/10">
                        {vidId ? (
                          <img
                            src={`https://i.ytimg.com/vi/${vidId}/mqdefault.jpg`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Youtube size={20} />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm line-clamp-1">
                          {s.title}
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center gap-1 uppercase tracking-wider">
                          <User size={10} /> {s.preacher || "GBC Preacher"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                    {new Date(s.date_preached).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(s)}
                        className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSermons;
