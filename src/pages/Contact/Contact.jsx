import React, { useState, useEffect } from 'react'
import './Contact.css'
import axios from 'axios'

const Contact = ({ url }) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${url}/api/contact/list`)
      
      if (response.data.success) {
        setContacts(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (contactId, newStatus) => {
    try {
      const response = await axios.post(`${url}/api/contact/update-status`, {
        id: contactId,
        status: newStatus
      })

      if (response.data.success) {
        setContacts(contacts.map(contact => 
          contact._id === contactId ? { ...contact, status: newStatus } : contact
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await axios.post(`${url}/api/contact/delete`, {
          id: contactId
        })

        if (response.data.success) {
          setContacts(contacts.filter(contact => contact._id !== contactId))
        }
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }
  }

  const filteredContacts = contacts.filter(contact => {
    if (statusFilter === 'all') return true
    return contact.status === statusFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#FF6B6B'
      case 'read': return '#4ECDC4'
      case 'replied': return '#45B7D1'
      default: return '#9F9F9F'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'New'
      case 'read': return 'Read'
      case 'replied': return 'Replied'
      default: return 'Unknown'
    }
  }

  if (loading) {
    return (
      <div className="contact-page">
        <div className="loading">Loading contacts...</div>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Customer</h1>
        <div className="contact-filters">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Contacts</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      <div className="contact-stats">
        <div className="stat-card">
          <h3>Total Contacts</h3>
          <p>{contacts.length}</p>
        </div>
        <div className="stat-card">
          <h3>New Messages</h3>
          <p>{contacts.filter(c => c.status === 'new').length}</p>
        </div>
        <div className="stat-card">
          <h3>Read Messages</h3>
          <p>{contacts.filter(c => c.status === 'read').length}</p>
        </div>
        <div className="stat-card">
          <h3>Replied</h3>
          <p>{contacts.filter(c => c.status === 'replied').length}</p>
        </div>
      </div>

      <div className="contact-list">
        {filteredContacts.length === 0 ? (
          <div className="no-contacts">
            <p>No contacts found</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact._id} className="contact-item">
              <div className="contact-info">
                <div className="contact-header-info">
                  <h3>{contact.name}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(contact.status) }}
                  >
                    {getStatusText(contact.status)}
                  </span>
                </div>
                <p className="contact-email">{contact.email}</p>
                {contact.subject && <p className="contact-subject">Subject: {contact.subject}</p>}
                <p className="contact-message">{contact.message}</p>
                <p className="contact-date">
                  {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                </p>
              </div>
              
              <div className="contact-actions">
                <select 
                  value={contact.status}
                  onChange={(e) => updateStatus(contact._id, e.target.value)}
                  className="status-select"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
                
                <button 
                  className="delete-btn"
                  onClick={() => deleteContact(contact._id)}
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

export default Contact
