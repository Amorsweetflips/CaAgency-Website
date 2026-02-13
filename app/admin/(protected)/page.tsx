'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Image from 'next/image'

interface Talent {
  id: string
  name: string
  imageUrl: string
  category: string
  instagramUrl?: string | null
  tiktokUrl?: string | null
  youtubeUrl?: string | null
  twitchUrl?: string | null
  kickUrl?: string | null
  order: number
}

type FormData = {
  name: string
  imageUrl: string
  category: string
  instagramUrl: string
  tiktokUrl: string
  youtubeUrl: string
  twitchUrl: string
  kickUrl: string
  order: number
}

const emptyFormData: FormData = {
  name: '',
  imageUrl: '',
  category: 'instagram',
  instagramUrl: '',
  tiktokUrl: '',
  youtubeUrl: '',
  twitchUrl: '',
  kickUrl: '',
  order: 0,
}

export default function AdminPage() {
  const router = useRouter()
  const [talents, setTalents] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTalent, setEditingTalent] = useState<Talent | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyFormData)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchTalents = useCallback(async () => {
    try {
      const res = await fetch('/api/talents')
      if (res.ok) {
        const data = await res.json()
        setTalents(data)
      } else if (res.status === 401) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching talents:', error)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchTalents()
  }, [fetchTalents])

  const resetForm = () => {
    setFormData(emptyFormData)
    setShowAddForm(false)
    setEditingTalent(null)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError(null)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({ ...prev, imageUrl: data.url }))
      } else {
        const error = await res.json()
        setUploadError(error.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleAddTalent = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.imageUrl) {
      setUploadError('Please upload an image')
      return
    }

    try {
      const res = await fetch('/api/talents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          instagramUrl: formData.instagramUrl || null,
          tiktokUrl: formData.tiktokUrl || null,
          youtubeUrl: formData.youtubeUrl || null,
          twitchUrl: formData.twitchUrl || null,
          kickUrl: formData.kickUrl || null,
        }),
      })

      if (res.ok) {
        resetForm()
        fetchTalents()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to add talent')
      }
    } catch (error) {
      console.error('Error adding talent:', error)
      alert('Failed to add talent')
    }
  }

  const handleEditClick = (talent: Talent) => {
    setShowAddForm(false)
    setEditingTalent(talent)
    setUploadError(null)
    setFormData({
      name: talent.name,
      imageUrl: talent.imageUrl,
      category: talent.category,
      instagramUrl: talent.instagramUrl || '',
      tiktokUrl: talent.tiktokUrl || '',
      youtubeUrl: talent.youtubeUrl || '',
      twitchUrl: talent.twitchUrl || '',
      kickUrl: talent.kickUrl || '',
      order: talent.order,
    })
  }

  const handleUpdateTalent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTalent) return

    if (!formData.imageUrl) {
      setUploadError('Please upload an image')
      return
    }

    setSavingId(editingTalent.id)
    try {
      const res = await fetch(`/api/talents/${editingTalent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          instagramUrl: formData.instagramUrl || null,
          tiktokUrl: formData.tiktokUrl || null,
          youtubeUrl: formData.youtubeUrl || null,
          twitchUrl: formData.twitchUrl || null,
          kickUrl: formData.kickUrl || null,
        }),
      })

      if (res.ok) {
        resetForm()
        fetchTalents()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to update talent')
      }
    } catch (error) {
      console.error('Error updating talent:', error)
      alert('Failed to update talent')
    } finally {
      setSavingId(null)
    }
  }

  const handleDeleteTalent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this talent?')) {
      return
    }

    setDeletingId(id)
    try {
      const res = await fetch(`/api/talents/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchTalents()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to delete talent')
      }
    } catch (error) {
      console.error('Error deleting talent:', error)
      alert('Failed to delete talent')
    } finally {
      setDeletingId(null)
    }
  }

  const handleAddClick = () => {
    setEditingTalent(null)
    setFormData(emptyFormData)
    setUploadError(null)
    setShowAddForm(!showAddForm)
  }

  const instagramTalents = talents.filter((t) => t.category === 'instagram')
  const youtubeTalents = talents.filter((t) => t.category === 'youtube')

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-white/70">Loading...</p>
      </div>
    )
  }

  const TalentForm = ({ isEdit }: { isEdit: boolean }) => (
    <div className="bg-background-dark border border-foreground-white/20 rounded-lg p-6 mb-8">
      <Heading as="h3" color="white" className="mb-4 text-xl">
        {isEdit ? `Edit: ${editingTalent?.name}` : 'Add New Talent'}
      </Heading>
      <form onSubmit={isEdit ? handleUpdateTalent : handleAddTalent} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              Photo *
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className={`w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white/70 text-center transition-colors ${uploading ? 'opacity-50' : 'hover:border-accent-red hover:text-foreground-white'}`}>
                  {uploading ? 'Uploading...' : formData.imageUrl ? 'Change Photo' : 'Upload Photo'}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
            {uploadError && (
              <p className="text-red-400 text-sm mt-1">{uploadError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red"
            >
              <option value="instagram">Instagram & TikTok</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red"
            />
          </div>
          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              value={formData.instagramUrl}
              onChange={(e) =>
                setFormData({ ...formData, instagramUrl: e.target.value })
              }
              placeholder="https://instagram.com/username"
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red placeholder:text-foreground-white/30"
            />
          </div>
          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              TikTok URL
            </label>
            <input
              type="url"
              value={formData.tiktokUrl}
              onChange={(e) =>
                setFormData({ ...formData, tiktokUrl: e.target.value })
              }
              placeholder="https://tiktok.com/@username"
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red placeholder:text-foreground-white/30"
            />
          </div>
          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              value={formData.youtubeUrl}
              onChange={(e) =>
                setFormData({ ...formData, youtubeUrl: e.target.value })
              }
              placeholder="https://youtube.com/@channel"
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red placeholder:text-foreground-white/30"
            />
          </div>
          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              Twitch URL
            </label>
            <input
              type="url"
              value={formData.twitchUrl}
              onChange={(e) =>
                setFormData({ ...formData, twitchUrl: e.target.value })
              }
              placeholder="https://twitch.tv/username"
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red placeholder:text-foreground-white/30"
            />
          </div>
          <div>
            <label className="block text-sm text-foreground-white/70 mb-2">
              Kick URL
            </label>
            <input
              type="url"
              value={formData.kickUrl}
              onChange={(e) =>
                setFormData({ ...formData, kickUrl: e.target.value })
              }
              placeholder="https://kick.com/username"
              className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-hidden focus:border-accent-red placeholder:text-foreground-white/30"
            />
          </div>
        </div>

        {/* Image preview */}
        {formData.imageUrl && (
          <div className="mt-4">
            <label className="block text-sm text-foreground-white/70 mb-2">
              Photo Preview
            </label>
            <div className="relative w-32 h-40 rounded-lg overflow-hidden border border-foreground-white/20">
              <Image
                src={formData.imageUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            disabled={savingId === editingTalent?.id || uploading}
          >
            {isEdit
              ? (savingId === editingTalent?.id ? 'Saving...' : 'Save Changes')
              : 'Add Talent'
            }
          </Button>
          <Button
            type="button"
            variant="dark"
            onClick={resetForm}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )

  const TalentCard = ({ talent }: { talent: Talent }) => (
    <div className="bg-background-dark border border-foreground-white/20 rounded-lg overflow-hidden">
      <div className="relative aspect-3/4">
        <Image
          src={talent.imageUrl}
          alt={talent.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-background-dark/80 px-2 py-1 rounded-sm text-xs text-foreground-white/70">
          #{talent.order}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-anegra text-lg font-semibold text-foreground-white mb-2">
          {talent.name}
        </h4>
        <div className="flex flex-wrap gap-2 text-xs text-foreground-white/70 mb-4">
          {talent.instagramUrl && <span className="bg-foreground-white/10 px-2 py-1 rounded-sm">Instagram</span>}
          {talent.tiktokUrl && <span className="bg-foreground-white/10 px-2 py-1 rounded-sm">TikTok</span>}
          {talent.youtubeUrl && <span className="bg-foreground-white/10 px-2 py-1 rounded-sm">YouTube</span>}
          {talent.twitchUrl && <span className="bg-foreground-white/10 px-2 py-1 rounded-sm">Twitch</span>}
          {talent.kickUrl && <span className="bg-foreground-white/10 px-2 py-1 rounded-sm">Kick</span>}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleEditClick(talent)}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteTalent(talent.id)}
            variant="dark"
            size="sm"
            className="flex-1"
            disabled={deletingId === talent.id}
          >
            {deletingId === talent.id ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading as="h2" color="white">
          Talent Management
        </Heading>
        <div className="flex gap-4">
          <Button onClick={() => router.push('/admin/blog')} variant="dark">
            Blog Management
          </Button>
          <Button
            onClick={handleAddClick}
            variant="primary"
          >
            {showAddForm ? 'Cancel' : 'Add Talent'}
          </Button>
        </div>
      </div>

      {showAddForm && <TalentForm isEdit={false} />}
      {editingTalent && <TalentForm isEdit={true} />}

      <div className="space-y-8">
        <div>
          <Heading as="h3" color="white" className="mb-4 text-xl">
            Instagram & TikTok Talents ({instagramTalents.length})
          </Heading>
          {instagramTalents.length === 0 ? (
            <p className="text-foreground-white/50 text-sm">No talents in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {instagramTalents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          )}
        </div>

        <div>
          <Heading as="h3" color="white" className="mb-4 text-xl">
            YouTube Talents ({youtubeTalents.length})
          </Heading>
          {youtubeTalents.length === 0 ? (
            <p className="text-foreground-white/50 text-sm">No talents in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {youtubeTalents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
