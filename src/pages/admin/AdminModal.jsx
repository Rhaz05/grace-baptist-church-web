import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";

const AdminModal = ({ isOpen, onClose, onSubmit, type, data, loading }) => {
  if (!isOpen) return null;

  const isEdit = !!data;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#1c2128] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-xl font-bold text-white">
              {isEdit ? "Edit" : "Add New"} {type.slice(0, -1)}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="p-8 space-y-5">
            {type === "events" && (
              <>
                <Input
                  label="Event Title"
                  name="title"
                  defaultValue={data?.title}
                  required
                />
                <Input
                  label="Location"
                  name="location"
                  defaultValue={data?.location}
                  required
                />
                <Input
                  label="Date & Time"
                  name="event_date"
                  type="datetime-local"
                  defaultValue={data?.event_date?.slice(0, 16)}
                  required
                />
                <Input
                  label="Image URL (Optional)"
                  name="image_url"
                  defaultValue={data?.image_url}
                />
                <Textarea
                  label="Description"
                  name="description"
                  defaultValue={data?.description}
                />
              </>
            )}

            {type === "sermons" && (
              <>
                <Input
                  label="Sermon Title"
                  name="title"
                  defaultValue={data?.title}
                  required
                />
                <Input
                  label="Preacher"
                  name="preacher"
                  defaultValue={data?.preacher}
                />
                <Input
                  label="Date Preached"
                  name="date_preached"
                  type="date"
                  defaultValue={data?.date_preached}
                  required
                />
                <Input
                  label="YouTube URL"
                  name="video_url"
                  defaultValue={data?.video_url}
                  required
                />
                <Textarea
                  label="Description"
                  name="description"
                  defaultValue={data?.description}
                />
              </>
            )}

            {type === "resources" && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Resource Category
                  </label>
                  <div className="relative group">
                    <select
                      name="category"
                      defaultValue={data?.category || "Sunday School"}
                      className="w-full appearance-none bg-black/40 border border-white/10 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-church-red/50 focus:border-church-red/50 outline-none transition-all cursor-pointer hover:bg-black/60"
                    >
                      <option
                        value="Sunday School"
                        className="bg-[#1c2128] text-white"
                      >
                        Sunday School
                      </option>
                      <option
                        value="Sermon Archive"
                        className="bg-[#1c2128] text-white"
                      >
                        Sermon Archive
                      </option>
                      <option
                        value="Discipleship"
                        className="bg-[#1c2128] text-white"
                      >
                        Discipleship
                      </option>
                      <option
                        value="Bible Reading Guide"
                        className="bg-[#1c2128] text-white"
                      >
                        Bible Reading Guide
                      </option>
                    </select>

                    {/* Custom Chevron Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-church-red transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <Input
                  label="Resource Title"
                  name="title"
                  defaultValue={data?.data?.title}
                  required
                />
                <Input
                  label="Google Drive Link"
                  name="file_url"
                  defaultValue={data?.file_url}
                  required
                />
                <Input
                  label="Cover Image URL (Optional)"
                  name="image_url"
                  defaultValue={data?.image_url}
                />
                <Textarea
                  label="Description"
                  name="description"
                  defaultValue={data?.description}
                />
              </>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl font-bold bg-white/5 text-gray-400 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl font-bold bg-church-red text-white hover:bg-red-600 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Save size={18} /> {isEdit ? "Update" : "Save"}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white placeholder-gray-700 focus:ring-2 focus:ring-church-red outline-none transition-all"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
      {label}
    </label>
    <textarea
      {...props}
      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white placeholder-gray-700 focus:ring-2 focus:ring-church-red outline-none transition-all h-24 resize-none"
    />
  </div>
);

export default AdminModal;
