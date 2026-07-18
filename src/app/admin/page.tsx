import React from 'react';
import Link from 'next/link';
import { getArticles, getServices, getTeamMembers, getMessages } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const articles = await getArticles();
  const services = await getServices();
  const team = await getTeamMembers();
  const messages = await getMessages();

  const unreadMessages = messages.filter(m => !m.read);
  const recentArticles = [...articles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentMessages = [...unreadMessages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div>
      <div className="admin-grid-4">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📝</div>
          <div className="admin-stat-content">
            <div className="admin-stat-label">Total Artikel</div>
            <div className="admin-stat-number">{articles.length}</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">⚖️</div>
          <div className="admin-stat-content">
            <div className="admin-stat-label">Total Layanan</div>
            <div className="admin-stat-number">{services.length}</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">👥</div>
          <div className="admin-stat-content">
            <div className="admin-stat-label">Anggota Tim</div>
            <div className="admin-stat-number">{team.length}</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ backgroundColor: unreadMessages.length > 0 ? 'rgba(239, 68, 68, 0.15)' : '', color: unreadMessages.length > 0 ? '#EF4444' : '' }}>✉️</div>
          <div className="admin-stat-content">
            <div className="admin-stat-label">Pesan Belum Dibaca</div>
            <div className="admin-stat-number" style={{ color: unreadMessages.length > 0 ? '#EF4444' : '' }}>{unreadMessages.length}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h3 className="admin-table-title">Artikel Terbaru</h3>
            <Link href="/admin/artikel" className="admin-btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
              Lihat Semua
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.length > 0 ? recentArticles.map(article => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>
                    <span className={`admin-badge ${article.published ? 'admin-badge-success' : 'admin-badge-default'}`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{formatDate(article.createdAt)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>Belum ada artikel</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-table-container">
          <div className="admin-table-header">
            <h3 className="admin-table-title">Pesan Belum Dibaca</h3>
            <Link href="/admin/pesan" className="admin-btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
              Lihat Semua
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pengirim</th>
                <th>Subjek</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.length > 0 ? recentMessages.map(msg => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.subject}</td>
                  <td>{formatDate(msg.createdAt)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>Tidak ada pesan baru</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
