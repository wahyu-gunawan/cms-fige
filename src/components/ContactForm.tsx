'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Note: In a real app, you would fetch to your API route
      // For this demo, we'll simulate an API call
      
      // const res = await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // if (!res.ok) throw new Error('Gagal mengirim pesan');

      setSubmitStatus({
        type: 'success',
        message: 'Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitStatus.type && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1.5rem', 
          borderRadius: '4px',
          backgroundColor: submitStatus.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${submitStatus.type === 'success' ? '#10B981' : '#EF4444'}`,
          color: submitStatus.type === 'success' ? '#34D399' : '#F87171'
        }}>
          {submitStatus.message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name" className="form-label">Nama Lengkap *</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">Nomor Telepon *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="form-label">Subjek / Keperluan *</label>
        <select
          id="subject"
          name="subject"
          className="form-control"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          style={{ appearance: 'none' }}
        >
          <option value="" disabled>Pilih Keperluan</option>
          <option value="Konsultasi Umum">Konsultasi Umum</option>
          <option value="Hukum Perdata">Hukum Perdata</option>
          <option value="Hukum Pidana">Hukum Pidana</option>
          <option value="Hukum Perusahaan">Hukum Perusahaan</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Pesan Anda *</label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Jelaskan secara singkat permasalahan hukum yang Anda hadapi..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  );
}
