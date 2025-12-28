'use client'

import { useEffect, useState } from 'react'
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

export default function AdminPage() {
  const router = useRouter()
  const [talents, setTalents] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    category: 'instagram',
    instagramUrl: '',
    tiktokUrl: '',
    youtubeUrl: '',
    twitchUrl: '',
    kickUrl: '',
    order: 0,
  })

  useEffect(() => {
    fetchTalents()
  }, [])

  const fetchTalents = async () => {
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
  }

  const handleAddTalent = async (e: React.FormEvent) => {
    e.preventDefault()
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
        setShowAddForm(false)
        setFormData({
          name: '',
          imageUrl: '',
          category: 'instagram',
          instagramUrl: '',
          tiktokUrl: '',
          youtubeUrl: '',
          twitchUrl: '',
          kickUrl: '',
          order: 0,
        })
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

  const instagramTalents = talents.filter((t) => t.category === 'instagram')
  const youtubeTalents = talents.filter((t) => t.category === 'youtube')

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-white/70">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading as="h2" color="white">
          Talent Management
        </Heading>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="primary"
        >
          {showAddForm ? 'Cancel' : 'Add Talent'}
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-background-dark border border-foreground-white/20 rounded-lg p-6 mb-8">
          <Heading as="h3" color="white" className="mb-4 text-xl">
            Add New Talent
          </Heading>
          <form onSubmit={handleAddTalent} className="space-y-4">
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground-white/70 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
                />
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
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
                  className="w-full px-4 py-2 bg-background-dark border border-foreground-white/20 rounded-lg text-foreground-white focus:outline-none focus:border-accent-red"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit" variant="primary">
                Add Talent
              </Button>
              <Button
                type="button"
                variant="dark"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <Heading as="h3" color="white" className="mb-4 text-xl">
            Instagram & TikTok Talents ({instagramTalents.length})
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instagramTalents.map((talent) => (
              <div
                key={talent.id}
                className="bg-background-dark border border-foreground-white/20 rounded-lg overflow-hidden"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={talent.imageUrl}
                    alt={talent.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-anegra text-lg font-semibold text-foreground-white mb-2">
                    {talent.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs text-foreground-white/70 mb-4">
                    {talent.instagramUrl && <span>Instagram</span>}
                    {talent.tiktokUrl && <span>TikTok</span>}
                    {talent.youtubeUrl && <span>YouTube</span>}
                  </div>
                  <Button
                    onClick={() => handleDeleteTalent(talent.id)}
                    variant="dark"
                    size="sm"
                    className="w-full"
                    disabled={deletingId === talent.id}
                  >
                    {deletingId === talent.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Heading as="h3" color="white" className="mb-4 text-xl">
            YouTube Talents ({youtubeTalents.length})
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeTalents.map((talent) => (
              <div
                key={talent.id}
                className="bg-background-dark border border-foreground-white/20 rounded-lg overflow-hidden"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={talent.imageUrl}
                    alt={talent.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-anegra text-lg font-semibold text-foreground-white mb-2">
                    {talent.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs text-foreground-white/70 mb-4">
                    {talent.youtubeUrl && <span>YouTube</span>}
                    {talent.instagramUrl && <span>Instagram</span>}
                    {talent.tiktokUrl && <span>TikTok</span>}
                    {talent.twitchUrl && <span>Twitch</span>}
                    {talent.kickUrl && <span>Kick</span>}
                  </div>
                  <Button
                    onClick={() => handleDeleteTalent(talent.id)}
                    variant="dark"
                    size="sm"
                    className="w-full"
                    disabled={deletingId === talent.id}
                  >
                    {deletingId === talent.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
