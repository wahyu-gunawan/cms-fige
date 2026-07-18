'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateSlug } from '@/lib/utils';

export default function BaruTimPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    position: '',
    specialization: '',
    bio: '',
    education: '',
    experience: '',
    email: '',
    order: 0,
    published: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value };
      if (name === 'name' && !prev.slug) {
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

    const dataToSubmit = {
      ...formData,
      education: formData.education.split(',').map(item => item.trim()).filter(Boolean),
      experience: formData.experience.split(',').map(item => item.trim()).filter(Boolean),
    };

    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (res.ok) {
        router.push('/admin/tim');
        router.refresh();
      } else {
        alert('Gagal menyimpan anggota tim');
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
        <h2>Tambah Anggota Tim Baru</h2>
        <Link href="/admin/tim" className="admin-btn-secondary">
          Batal
        </Link>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              className="admin-form-input"
              value={formData.name}
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
            <label className="admin-form-label">Posisi</label>
            <input
              type="text"
              name="position"
              className="admin-form-input"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="e.g. Managing Partner"
            />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Spesialisasi</label>
            <input
              type="text"
              name="specialization"
              className="admin-form-input"
              value={formData.specialization}
              onChange={handleChange}
              required
              placeholder="e.g. Corporate Law, Litigation"
            />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              name="email"
              className="admin-form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Biografi</label>
            <textarea
              name="bio"
              className="admin-form-textarea"
              value={formData.bio}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Pendidikan (Pisahkan dengan koma)</label>
            <textarea
              name="education"
              className="admin-form-textarea"
              style={{ minHeight: '80px' }}
              value={formData.education}
              onChange={handleChange}
              placeholder="S1 Hukum Universitas Indonesia, S2 Hukum Harvard University"
            ></textarea>
          </div>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Pengalaman (Pisahkan dengan koma)</label>
            <textarea
              name="experience"
              className="admin-form-textarea"
              style={{ minHeight: '80px' }}
              value={formData.experience}
              onChange={handleChange}
              placeholder="10+ Tahun di Hukum Korporasi, Mantan Hakim"
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
              {loading ? 'Menyimpan...' : 'Simpan Anggota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
