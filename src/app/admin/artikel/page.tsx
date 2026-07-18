import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ArtikelPage() {
  const articles = await getArticles();
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Kelola Artikel</h2>
        <Link href="/admin/artikel/baru" className="admin-btn-primary">
          ➕ Tambah Artikel
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Penulis</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? articles.map(article => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td>{article.author}</td>
                <td>
                  <span className={`admin-badge ${article.published ? 'admin-badge-success' : 'admin-badge-default'}`}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>{formatDate(article.createdAt)}</td>
                <td>
                  <div className="admin-actions">
                    <Link href={`/admin/artikel/${article.id}/edit`} className="btn-icon edit" title="Edit">
                      ✏️
                    </Link>
                    <DeleteButton endpoint="/api/articles" id={article.id} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>Belum ada artikel</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
