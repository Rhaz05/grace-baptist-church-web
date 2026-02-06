import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  Edit3,
  Trash2,
  FileText,
  Tag,
  ExternalLink,
  Search,
} from "lucide-react";

const AdminResources = ({ onEdit }) => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchResources();
    window.addEventListener("refreshData", fetchResources);
    return () => window.removeEventListener("refreshData", fetchResources);
  }, []);

  const fetchResources = async () => {
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    setResources(data || []);
  };

  const filteredResources = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this resource?")) return;
    await supabase.from("resources").delete().eq("id", id);
    fetchResources();
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
          placeholder="Search resources..."
          className="w-full bg-[#1c2128] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-church-red transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#1c2128] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredResources.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-white/5 text-gray-500">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {item.title}
                      </div>
                      <a
                        href={item.file_url}
                        target="_blank"
                        className="text-[10px] text-church-red flex items-center gap-1 uppercase font-black hover:underline tracking-tighter"
                      >
                        <ExternalLink size={10} /> View File
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase rounded-full flex items-center gap-1 w-fit">
                    <Tag size={10} /> {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

export default AdminResources;
