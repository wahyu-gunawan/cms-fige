'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditTimPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`/api/team/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name,
            slug: data.slug,
            position: data.position,
            specialization: data.specialization,
            bio: data.bio,
            education: data.education ? data.education.join(', ') : '',
            experience: data.experience ? data.experience.join(', ') : '',
            email: data.email || '',
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
    
    fetchMember();
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

    const dataToSubmit = {
      ...formData,
      education: formData.education.split(',').map(item => item.trim()).filter(Boolean),
      experience: formData.experience.split(',').map(item => item.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (res.ok) {
        router.push('/admin/tim');
        router.refresh();
      } else {
        alert('Gagal mengupdate anggota tim');
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
        <h2>Edit Anggota Tim</h2>
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
              {loading ? 'Menyimpan...' : 'Update Anggota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
