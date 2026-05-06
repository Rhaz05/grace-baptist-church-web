import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Edit3, Trash2, Search, Image, Star } from 'lucide-react'
import { categories } from '../../util/helper.util'

const AdminPhotos = ({ onEdit }) => {
  const [photos, setPhotos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetchPhotos()
    window.addEventListener('refreshData', fetchPhotos)
    return () => window.removeEventListener('refreshData', fetchPhotos)
  }, [])

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
    setPhotos(data || [])
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this photo?')) return
    await supabase.from('photos').delete().eq('id', id)
    fetchPhotos()
  }

  const allCategories = ['All', ...categories]

  const filtered = photos.filter((p) => {
    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      {/* Search + Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search photos..."
            className="w-full bg-[#1c2128] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-church-red transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-church-red text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c2128] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Thumbnail</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-600 text-sm">
                  No photos found.
                </td>
              </tr>
            ) : (
              filtered.map((photo) => (
                <tr key={photo.id} className="hover:bg-white/2 transition-colors group">
                  {/* Photo + title */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-gray-800 overflow-hidden shrink-0 border border-white/5">
                        {photo.image_url ? (
                          <img
                            src={photo.image_url}
                            alt={photo.title || 'Photo'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/150/1c2128/6b7280?text=Error'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <Image size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          {photo.title || <span className="text-gray-600 italic">Untitled</span>}
                        </p>
                        {photo.description && (
                          <p className="text-xs text-gray-500 mt-0.5 max-w-xs truncate">
                            {photo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold bg-white/5 text-gray-300 px-2.5 py-1 rounded-lg">
                      {photo.category}
                    </span>
                  </td>

                  {/* Thumbnail badge */}
                  <td className="px-6 py-4">
                    {photo.is_thumbnail ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg">
                        <Star size={11} className="fill-yellow-400" /> Thumbnail
                      </span>
                    ) : (
                      <span className="text-xs text-gray-600">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(photo)}
                        className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPhotos
