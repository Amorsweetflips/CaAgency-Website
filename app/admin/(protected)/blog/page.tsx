'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  featuredImage?: string | null
  status: string
  publishedAt?: string | null
  author: string
  categories: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

type PostFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  status: string
  publishedAt: string
  author: string
  categories: string
  tags: string
}

const emptyFormData: PostFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  status: 'draft',
  publishedAt: '',
  author: 'CA Agency',
  categories: '',
  tags: '',
}

export default function BlogAdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState<PostFormData>(emptyFormData)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/posts?status=all')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const categories = formData.categories
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
      const tags = formData.tags.split(',').map((t) => t.trim()).filter(Boolean)

      const payload = {
        ...formData,
        categories,
        tags,
        publishedAt: formData.publishedAt || null,
      }

      if (editingPost) {
        // Update existing post
        const response = await fetch(`/api/posts/${editingPost.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error('Failed to update post')
      } else {
        // Create new post
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) throw new Error('Failed to create post')
      }

      setFormData(emptyFormData)
      setShowAddForm(false)
      setEditingPost(null)
      fetchPosts()
    } catch (err) {
      console.error('Error saving post:', err)
      setError(err instanceof Error ? err.message : 'Failed to save post')
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImage: post.featuredImage || '',
      status: post.status,
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : '',
      author: post.author,
      categories: post.categories.join(', '),
      tags: post.tags.join(', '),
    })
    setShowAddForm(true)
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')
      fetchPosts()
    } catch (err) {
      console.error('Error deleting post:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete post')
    }
  }

  const handleCancel = () => {
    setFormData(emptyFormData)
    setShowAddForm(false)
    setEditingPost(null)
    setError(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Heading as="h1" color="white" className="text-[40px]">
            Blog Management
          </Heading>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/admin')} variant="dark">
              Back to Talents
            </Button>
            {!showAddForm && (
              <Button onClick={() => setShowAddForm(true)}>Add New Post</Button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-sm mb-6">
            {error}
          </div>
        )}

        {showAddForm && (
          <form onSubmit={handleSubmit} className="bg-white/5 rounded-lg p-6 mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-white mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                rows={10}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Published Date</label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Categories (comma-separated)</label>
                <input
                  type="text"
                  value={formData.categories}
                  onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                  placeholder="Marketing, Strategy, Tips"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white"
                  placeholder="influencer marketing, social media"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">{editingPost ? 'Update Post' : 'Create Post'}</Button>
              <Button type="button" onClick={handleCancel} variant="dark">
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="bg-white/5 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Published</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-white/10">
                  <td className="px-6 py-4 text-white">{post.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        post.status === 'published'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : 'Not published'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
