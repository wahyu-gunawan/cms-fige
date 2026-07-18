'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateSlug } from '@/lib/utils';

export default function BaruLayananPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    icon: '⚖️',
    order: 0,
    published: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value };
      if (name === 'title' && !prev.slug) {
        newData.slug = generateSlug(value);
      }
      return newData;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/layanan');
        router.refresh();
      } else {
        alert('Gagal menyimpan layanan');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Tambah Layanan Baru</h2>
        <Link href="/admin/layanan" className="admin-btn-secondary">
          Batal
        </Link>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Judul Layanan</label>
            <input
              type="text"
              name="title"
              className="admin-form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Slug URL</label>
            <input
              type="text"
              name="slug"
              className="admin-form-input"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Ikon (Emoji)</label>
            <input
              type="text"
              name="icon"
              className="admin-form-input"
              value={formData.icon}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Deskripsi Singkat</label>
            <textarea
              name="description"
              className="admin-form-textarea"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Konten Lengkap</label>
            <textarea
              name="content"
              className="admin-form-textarea large"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Urutan Tampilan</label>
            <input
              type="number"
              name="order"
              className="admin-form-input"
              value={formData.order}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-checkbox">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
              />
              Publish langsung?
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Layanan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
