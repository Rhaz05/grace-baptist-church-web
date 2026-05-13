import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Mail, Phone, CheckCircle2, Trash2, Clock } from 'lucide-react'

const AdminConnections = () => {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setConnections(data || [])
    } catch (err) {
      console.error('Error fetching connections:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'new' ? 'contacted' : 'new'

    try {
      const { error } = await supabase
        .from('connections')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      // Update local state to reflect change instantly
      setConnections(
        connections.map((conn) => (conn.id === id ? { ...conn, status: newStatus } : conn)),
      )
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Failed to update status.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request? This cannot be undone.'))
      return

    try {
      const { error } = await supabase.from('connections').delete().eq('id', id)
      if (error) throw error

      setConnections(connections.filter((conn) => conn.id !== id))
    } catch (err) {
      console.error('Error deleting connection:', err)
      alert('Failed to delete connection.')
    }
  }

  if (loading) {
    return <div className="text-gray-400 text-sm animate-pulse">Loading connections...</div>
  }

  return (
    <div className="bg-[#1c2128] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Status / Date</th>
              <th className="px-6 py-4">Contact Info</th>
              <th className="px-6 py-4">Interests</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {connections.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No connection requests found.
                </td>
              </tr>
            ) : (
              connections.map((conn) => (
                <tr
                  key={conn.id}
                  className={`transition-colors ${conn.status === 'new' ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'opacity-60 hover:opacity-100 hover:bg-white/[0.02]'}`}
                >
                  {/* Status & Date */}
                  <td className="px-6 py-4 align-top">
                    <div className="flex flex-col gap-2 items-start">
                      {conn.status === 'new' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          <Clock size={12} /> New
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-gray-500/20 text-gray-400 border border-gray-500/20">
                          <CheckCircle2 size={12} /> Contacted
                        </span>
                      )}
                      <span className="text-gray-500 text-xs">
                        {new Date(conn.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4 align-top">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-white text-base">{conn.name}</span>
                      <a
                        href={`mailto:${conn.email}`}
                        className="text-gray-400 hover:text-church-red transition-colors flex items-center gap-2 text-xs"
                      >
                        <Mail size={12} /> {conn.email}
                      </a>
                      <a
                        href={`tel:${conn.phone}`}
                        className="text-gray-400 hover:text-church-red transition-colors flex items-center gap-2 text-xs"
                      >
                        <Phone size={12} /> {conn.phone}
                      </a>
                    </div>
                  </td>

                  {/* Interests (Tags) */}
                  <td className="px-6 py-4 align-top max-w-[200px]">
                    <div className="flex flex-wrap gap-1.5">
                      {conn.interests && conn.interests.length > 0 ? (
                        conn.interests.map((interest, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded text-[10px] font-bold tracking-wide bg-white/5 text-gray-300 border border-white/5"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-600 italic text-xs">None specified</span>
                      )}
                    </div>
                  </td>

                  {/* Message */}
                  <td className="px-6 py-4 align-top max-w-xs">
                    <p className="text-gray-400 text-xs leading-relaxed whitespace-pre-wrap">
                      {conn.message || (
                        <span className="text-gray-600 italic">No message provided.</span>
                      )}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleUpdateStatus(conn.id, conn.status)}
                        title={conn.status === 'new' ? 'Mark as Contacted' : 'Mark as New'}
                        className={`p-2 rounded-lg transition-all ${
                          conn.status === 'new'
                            ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <CheckCircle2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(conn.id)}
                        title="Delete Request"
                        className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
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

export default AdminConnections
