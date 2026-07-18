'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PengaturanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const [formData, setFormData] = useState({
    siteName: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    heroTitle: '',
    heroSubtitle: '',
    yearsExperience: '',
    casesHandled: '',
    clientSatisfaction: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification('Pengaturan berhasil disimpan!', 'success');
        router.refresh();
      } else {
        showNotification('Gagal menyimpan pengaturan', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ padding: '2rem' }}>Memuat pengaturan...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Pengaturan Website</h2>
      </div>

      {notification.show && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '2rem', 
          borderRadius: '8px',
          backgroundColor: notification.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${notification.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
          color: notification.type === 'success' ? 'var(--admin-success)' : 'var(--admin-danger)'
        }}>
          {notification.message}
        </div>
      )}

      <div className="admin-form-container" style={{ maxWidth: '100%' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">Informasi Umum</h3>
            <div className="admin-settings-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Nama Website / Kantor</label>
                <input
                  type="text"
                  name="siteName"
                  className="admin-form-input"
                  value={formData.siteName || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  className="admin-form-input"
                  value={formData.tagline || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Deskripsi Singkat (SEO & Footer)</label>
              <textarea
                name="description"
                className="admin-form-textarea"
                style={{ minHeight: '80px' }}
                value={formData.description || ''}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="admin-settings-section">
            <h3 className="admin-settings-title">Kontak & Alamat</h3>
            <div className="admin-settings-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Email Utama</label>
                <input
                  type="email"
                  name="email"
                  className="admin-form-input"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Nomor Telepon</label>
                <input
                  type="text"
                  name="phone"
                  className="admin-form-input"
                  value={formData.phone || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Alamat Kantor</label>
              <textarea
                name="address"
                className="admin-form-textarea"
                style={{ minHeight: '80px' }}
                value={formData.address || ''}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="admin-settings-section">
            <h3 className="admin-settings-title">Media Sosial</h3>
            <div className="admin-settings-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Nomor WhatsApp (Format: 628...)</label>
                <input
                  type="text"
                  name="whatsapp"
                  className="admin-form-input"
                  value={formData.whatsapp || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Instagram URL</label>
                <input
                  type="url"
                  name="instagram"
                  className="admin-form-input"
                  value={formData.instagram || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Facebook URL</label>
                <input
                  type="url"
                  name="facebook"
                  className="admin-form-input"
                  value={formData.facebook || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="admin-settings-section">
            <h3 className="admin-settings-title">Halaman Beranda & Statistik</h3>
            <div className="admin-settings-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Hero Title (Judul Banner)</label>
                <input
                  type="text"
                  name="heroTitle"
                  className="admin-form-input"
                  value={formData.heroTitle || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Hero Subtitle</label>
                <input
                  type="text"
                  name="heroSubtitle"
                  className="admin-form-input"
                  value={formData.heroSubtitle || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Statistik: Pengalaman (Tahun)</label>
                <input
                  type="text"
                  name="yearsExperience"
                  className="admin-form-input"
                  value={formData.yearsExperience || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Statistik: Kasus Ditangani</label>
                <input
                  type="text"
                  name="casesHandled"
                  className="admin-form-input"
                  value={formData.casesHandled || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Statistik: Kepuasan Klien</label>
                <input
                  type="text"
                  name="clientSatisfaction"
                  className="admin-form-input"
                  value={formData.clientSatisfaction || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
