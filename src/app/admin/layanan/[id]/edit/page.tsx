'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditLayananPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    icon: '',
    order: 0,
    published: true,
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            slug: data.slug,
            description: data.description,
            content: data.content,
            icon: data.icon,
            order: data.order,
            published: data.published,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    
    fetchService();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/layanan');
        router.refresh();
      } else {
        alert('Gagal mengupdate layanan');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ padding: '2rem' }}>Memuat data...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Edit Layanan</h2>
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
              Publish
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Update Layanan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
