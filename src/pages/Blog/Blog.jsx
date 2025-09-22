import React, { useState, useEffect } from 'react'
import './Blog.css'
import axios from 'axios'

const Blog = ({ url }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Design',
    author: 'Admin',
    status: 'published'
  })
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${url}/api/blog/admin/list`)
      if (response.data.success) {
        setBlogs(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('content', formData.content)
      submitData.append('excerpt', formData.excerpt)
      submitData.append('category', formData.category)
      submitData.append('author', formData.author)
      submitData.append('status', formData.status)
      
      if (image) {
        submitData.append('image', image)
      }

      let response
      if (editingBlog) {
        submitData.append('id', editingBlog._id)
        response = await axios.post(`${url}/api/blog/update`, submitData)
      } else {
        response = await axios.post(`${url}/api/blog/add`, submitData)
      }

      if (response.data.success) {
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          category: 'Design',
          author: 'Admin',
          status: 'published'
        })
        setImage(null)
        setEditingBlog(null)
        setShowAddForm(false)
        fetchBlogs()
      }
    } catch (error) {
      console.error('Error saving blog:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      author: blog.author,
      status: blog.status
    })
    setImage(null)
    setShowAddForm(true)
  }

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await axios.post(`${url}/api/blog/delete`, { id: blogId })
        if (response.data.success) {
          fetchBlogs()
        }
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="blog-admin-page">
        <div className="loading">Loading blogs...</div>
      </div>
    )
  }

  return (
    <div className="blog-admin-page">
      <div className="blog-header">
        <h1>Blog Management</h1>
        <button 
          className="add-blog-btn"
          onClick={() => {
            setShowAddForm(true)
            setEditingBlog(null)
            setFormData({
              title: '',
              content: '',
              excerpt: '',
              category: 'Design',
              author: 'Admin',
              status: 'published'
            })
            setImage(null)
          }}
        >
          Add New Blog Post
        </button>
      </div>

      {showAddForm && (
        <div className="blog-form-overlay">
          <div className="blog-form-container">
            <div className="form-header">
              <h2>{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingBlog(null)
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Brief description of the blog post"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="10"
                  required
                  placeholder="Write your blog post content here..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Design">Design</option>
                    <option value="Crafts">Crafts</option>
                    <option value="Handmade">Handmade</option>
                    <option value="Interior">Interior</option>
                    <option value="Wood">Wood</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Header Image *</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!editingBlog}
                />
                {editingBlog && !image && (
                  <p className="current-image">Current image: {editingBlog.image}</p>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingBlog(null)
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Create Blog')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="blog-list">
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <p>No blog posts found</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-item">
              <div className="blog-image">
                <img src={`${url}/images/${blog.image}`} alt={blog.title} />
              </div>
              <div className="blog-info">
                <div className="blog-meta">
                  <span className="status-badge" data-status={blog.status}>
                    {blog.status}
                  </span>
                  <span className="blog-date">{formatDate(blog.createdAt)}</span>
                  <span className="blog-category">{blog.category}</span>
                </div>
                <h3>{blog.title}</h3>
                <p className="blog-excerpt">
                  {blog.excerpt || blog.content.substring(0, 100) + '...'}
                </p>
                <div className="blog-stats">
                  <span>Views: {blog.views}</span>
                </div>
              </div>
              <div className="blog-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Blog
