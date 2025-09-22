import React, { useState, useEffect } from 'react'
import './Newsletter.css'
import axios from 'axios'

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const url = import.meta?.env?.VITE_API_URL || 'http://localhost:4000'

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/newsletter/subscribers`)
      if (response.data.success) {
        setSubscribers(response.data.data)
      } else {
        setError('Failed to fetch subscribers')
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error)
      setError('Error fetching subscribers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Subscribed Date'],
      ...subscribers.map(sub => [sub.email, formatDate(sub.subscribedAt)])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="newsletter-page">
        <div className="newsletter-header">
          <h1>Newsletter Subscriptions</h1>
        </div>
        <div className="loading">Loading subscribers...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="newsletter-page">
        <div className="newsletter-header">
          <h1>Newsletter Subscriptions</h1>
        </div>
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="newsletter-page">
      <div className="newsletter-header">
        <h1>Newsletter Subscriptions</h1>
        <div className="newsletter-actions">
          <div className="subscriber-count">
            Total Subscribers: {subscribers.length}
          </div>
          <button onClick={exportToCSV} className="export-btn">
            Export CSV
          </button>
          <button onClick={fetchSubscribers} className="refresh-btn">
            Refresh
          </button>
        </div>
      </div>

      <div className="newsletter-content">
        {subscribers.length === 0 ? (
          <div className="no-subscribers">
            <p>No newsletter subscribers found.</p>
          </div>
        ) : (
          <div className="subscribers-table">
            <div className="table-header">
              <div className="header-cell email-col">Email Address</div>
              <div className="header-cell date-col">Subscribed Date</div>
            </div>
            
            {subscribers.map((subscriber, index) => (
              <div key={subscriber._id || index} className="table-row">
                <div className="table-cell email-cell">
                  {subscriber.email}
                </div>
                <div className="table-cell date-cell">
                  {formatDate(subscriber.subscribedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Newsletter
