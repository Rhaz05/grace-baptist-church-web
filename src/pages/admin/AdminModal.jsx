import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Loader2, ImagePlus, Trash2, CheckCircle2 } from 'lucide-react'
import { categories } from '../../util/helper.util'

// ─── Cloudinary config ────────────────────────────────────────────────────────
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// Updated with your sanitized name format, passing 'type' to organize folders
const uploadToCloudinary = async (file, folderName) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const sanitizedName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
  formData.append('public_id', `${folderName}/${sanitizedName}`)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error('Cloudinary upload failed')
  const data = await res.json()
  return data.secure_url
}

// ─── Component ────────────────────────────────────────────────────────────────
const AdminModal = ({ isOpen, onClose, onSubmit, type, data, loading }) => {
  const isEdit = !!data
  const fileInputRef = useRef(null)

  // Image state — used for events and photos
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [existingImageUrl, setExistingImageUrl] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Sync image state when modal opens/switches item
  useEffect(() => {
    if (isOpen) {
      setImageFile(null)
      setImagePreview(null)
      setExistingImageUrl(data?.image_url || null)
    }
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [isOpen, data])

  if (!isOpen) return null

  // ── Image handlers ──────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleRemoveNewImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemoveExistingImage = () => {
    setExistingImageUrl(null)
  }

  // ── Form submit ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)

    // Parse checkboxes manually
    if (type === 'photos') {
      payload.is_thumbnail = formData.get('is_thumbnail') === 'on'
    }

    // Handle image uploads for both events and photos
    if (type === 'events' || type === 'photos') {
      try {
        setUploadingImage(true)

        if (imageFile) {
          // New file selected — upload to Cloudinary (passes the current type as the folder name)
          payload.image_url = await uploadToCloudinary(imageFile, type)
        } else if (existingImageUrl) {
          // Kept existing image
          payload.image_url = existingImageUrl
        } else {
          // Image was removed or never set
          payload.image_url = null
        }
      } catch (err) {
        alert('Image upload failed. Please try again.')
        setUploadingImage(false)
        return
      } finally {
        setUploadingImage(false)
      }
    }

    if (payload.image_url === '') payload.image_url = null

    // Pass resolved payload up to Admin.jsx
    onSubmit(payload)
  }

  const isSubmitting = loading || uploadingImage
  const displayImage = imagePreview || existingImageUrl

  // Shared generic image uploader block
  const renderImageUploader = (label) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
        {label}
      </label>

      {displayImage ? (
        // Preview
        <div className="relative group rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black">
          <img src={displayImage} alt="Preview" className="w-full h-full object-cover" />
          {/* Hover actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <ImagePlus size={14} /> Replace
            </button>
            <button
              type="button"
              onClick={imagePreview ? handleRemoveNewImage : handleRemoveExistingImage}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs font-semibold rounded-lg transition-colors"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
          {/* New image badge */}
          {imagePreview && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full">
              <CheckCircle2 size={10} /> New image ready
            </div>
          )}
        </div>
      ) : (
        // Drop zone
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 hover:border-white/20 bg-white/2 hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
            <ImagePlus
              size={20}
              className="text-gray-500 group-hover:text-gray-300 transition-colors"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
              Click to upload image
            </p>
            <p className="text-xs text-gray-600 mt-0.5">PNG, JPG, WEBP — uploads to Cloudinary</p>
          </div>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        // If it's the 'photos' type, require it unless editing an existing photo
        required={type === 'photos' && !displayImage}
      />
    </div>
  )

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
              {isEdit ? 'Edit' : 'Add New'} {type === 'photos' ? 'Photo' : type.slice(0, -1)}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* ── PHOTOS ── */}
            {type === 'photos' && (
              <>
                {renderImageUploader('Photo')}
                <Input label="Title (Optional)" name="title" defaultValue={data?.title} />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Category
                  </label>
                  <div className="relative group">
                    <select
                      name="category"
                      defaultValue={data?.category || 'General'}
                      className="w-full appearance-none bg-black/40 border border-white/10 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-church-red/50 focus:border-church-red/50 outline-none transition-all cursor-pointer hover:bg-black/60"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#1c2128] text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Textarea
                  label="Description (Optional)"
                  name="description"
                  defaultValue={data?.description}
                />

                <label className="flex items-center gap-3 p-4 border border-white/10 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    name="is_thumbnail"
                    defaultChecked={data?.is_thumbnail}
                    className="w-5 h-5 accent-church-red"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">Feature as Thumbnail</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Show this image on index/cover pages
                    </p>
                  </div>
                </label>
              </>
            )}

            {/* ── EVENTS ── */}
            {type === 'events' && (
              <>
                <Input label="Event Title" name="title" defaultValue={data?.title} required />
                <Input label="Location" name="location" defaultValue={data?.location} required />
                <Input
                  label="Date & Time"
                  name="event_date"
                  type="datetime-local"
                  defaultValue={data?.event_date?.slice(0, 16)}
                  required
                />
                <Textarea label="Description" name="description" defaultValue={data?.description} />
                {renderImageUploader('Event Image (Optional)')}
              </>
            )}

            {/* ── SERMONS ── */}
            {type === 'sermons' && (
              <>
                <Input label="Sermon Title" name="title" defaultValue={data?.title} required />
                <Input label="Preacher" name="preacher" defaultValue={data?.preacher} />
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
                <Textarea label="Description" name="description" defaultValue={data?.description} />
              </>
            )}

            {/* ── RESOURCES ── */}
            {type === 'resources' && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Resource Category
                  </label>
                  <div className="relative group">
                    <select
                      name="category"
                      defaultValue={data?.category || 'Sunday School'}
                      className="w-full appearance-none bg-black/40 border border-white/10 rounded-2xl p-4 text-white font-medium focus:ring-2 focus:ring-church-red/50 focus:border-church-red/50 outline-none transition-all cursor-pointer hover:bg-black/60"
                    >
                      <option value="Sunday School" className="bg-[#1c2128] text-white">
                        Sunday School
                      </option>
                      <option value="Sermon Archive" className="bg-[#1c2128] text-white">
                        Sermon Archive
                      </option>
                      <option value="Discipleship" className="bg-[#1c2128] text-white">
                        Discipleship
                      </option>
                      <option value="Bible Reading Guide" className="bg-[#1c2128] text-white">
                        Bible Reading Guide
                      </option>
                    </select>
                  </div>
                </div>
                <Input label="Resource Title" name="title" defaultValue={data?.title} required />
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
                <Textarea label="Description" name="description" defaultValue={data?.description} />
              </>
            )}

            {/* Footer */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl font-bold bg-white/5 text-gray-400 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl font-bold bg-church-red text-white hover:bg-red-600 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    {uploadingImage ? 'Uploading...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <Save size={18} /> {isEdit ? 'Update' : 'Save'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

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
)

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
)

export default AdminModal
