'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    published: true,
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            author: data.author,
            published: data.published,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    
    fetchArticle();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/artikel');
        router.refresh();
      } else {
        alert('Gagal mengupdate artikel');
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
        <h2>Edit Artikel</h2>
        <Link href="/admin/artikel" className="admin-btn-secondary">
          Batal
        </Link>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Judul Artikel</label>
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
            <label className="admin-form-label">Kategori</label>
            <select
              name="category"
              className="admin-form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Hukum Pidana">Hukum Pidana</option>
              <option value="Hukum Perdata">Hukum Perdata</option>
              <option value="Hukum Bisnis">Hukum Bisnis</option>
              <option value="Hukum Keluarga">Hukum Keluarga</option>
              <option value="Hukum Properti">Hukum Properti</option>
              <option value="Hukum Ketenagakerjaan">Hukum Ketenagakerjaan</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Penulis</label>
            <input
              type="text"
              name="author"
              className="admin-form-input"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Ringkasan (Excerpt)</label>
            <textarea
              name="excerpt"
              className="admin-form-textarea"
              value={formData.excerpt}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Konten</label>
            <textarea
              name="content"
              className="admin-form-textarea large"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
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
              {loading ? 'Menyimpan...' : 'Update Artikel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
