import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  Edit3,
  Trash2,
  FileText,
  Tag,
  ExternalLink,
  Search,
  FileCode,
  Filter,
} from "lucide-react";

const AdminResources = ({ onEdit }) => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Extract unique categories for the filter dropdown
  const categories = ["All", ...new Set(resources.map((r) => r.category))];

  const getFileName = (url) => {
    if (!url) return "Unknown File";
    try {
      const decodedUrl = decodeURIComponent(url);
      return decodedUrl.split("/").pop().split("?")[0];
    } catch {
      return "Resource File";
    }
  };

  const filteredResources = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.description &&
        r.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || r.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this resource?")) return;
    await supabase.from("resources").delete().eq("id", id);
    fetchResources();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Search title or description..."
            className="w-full bg-[#1c2128] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-church-red transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={16} className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1c2128] border border-white/5 rounded-xl py-2 px-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-church-red transition-all cursor-pointer min-w-[180px]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#1c2128]">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Table */}
      <div className="bg-[#1c2128] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Resource Info</th>
              <th className="px-6 py-4">File Details</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredResources.length > 0 ? (
              filteredResources.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4 max-w-xs">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-white/5 text-gray-500 shrink-0 mt-1">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">
                          {item.title}
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                          {item.description || "No description provided."}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-[11px] text-gray-400 flex items-center gap-1 font-mono truncate max-w-[180px]">
                        <FileCode size={12} className="text-gray-600" />
                        {getFileName(item.file_url)}
                      </div>
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-church-red flex items-center gap-1 uppercase font-black hover:underline tracking-tighter"
                      >
                        <ExternalLink size={10} /> View File
                      </a>
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-12 text-center text-gray-500 italic text-sm"
                >
                  No resources found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminResources;
