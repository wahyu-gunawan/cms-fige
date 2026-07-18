'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContactMessage } from '@/lib/types';
import DeleteButton from '@/components/admin/DeleteButton';
import { formatDate } from '@/lib/utils';

export default function PesanPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    if (currentStatus) return; // Already read
    
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      
      if (res.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage({ ...selectedMessage, read: true });
        }
        router.refresh(); // Update the notification badge in layout
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRowClick = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      handleMarkAsRead(msg.id, msg.read);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Memuat pesan...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Pesan Masuk</h2>
        <p style={{ color: 'var(--admin-text-muted)' }}>Kelola pesan dari pengunjung website</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pengirim</th>
                <th>Subjek</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? messages.map(msg => (
                <tr 
                  key={msg.id} 
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: selectedMessage?.id === msg.id ? 'rgba(255,255,255,0.05)' : (!msg.read ? 'rgba(201, 168, 76, 0.05)' : 'transparent'),
                    fontWeight: !msg.read ? '600' : 'normal'
                  }}
                  onClick={() => handleRowClick(msg)}
                >
                  <td>{msg.name}</td>
                  <td>{msg.subject}</td>
                  <td>{formatDate(msg.createdAt)}</td>
                  <td>
                    <span className={`admin-badge ${msg.read ? 'admin-badge-default' : 'admin-badge-warning'}`}>
                      {msg.read ? 'Dibaca' : 'Baru'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions" onClick={e => e.stopPropagation()}>
                      <DeleteButton endpoint="/api/messages" id={msg.id} />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>Belum ada pesan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedMessage && (
          <div className="admin-message-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Detail Pesan</h3>
              <button 
                className="btn-icon" 
                onClick={() => setSelectedMessage(null)}
                style={{ border: 'none' }}
              >
                ✕
              </button>
            </div>
            
            <div className="admin-message-meta">
              <div className="admin-message-sender">
                <h4>{selectedMessage.name}</h4>
                <p>📧 {selectedMessage.email}</p>
                <p>📱 {selectedMessage.phone}</p>
              </div>
              <div className="admin-message-date">
                {new Date(selectedMessage.createdAt).toLocaleString('id-ID')}
              </div>
            </div>
            
            <h4 className="admin-message-subject">Subjek: {selectedMessage.subject}</h4>
            
            <div className="admin-message-body">
              {selectedMessage.message}
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
               <a 
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="admin-btn-primary"
               >
                 Balas Email
               </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
