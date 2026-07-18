import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/db';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function LayananPage() {
  const services = await getServices();
  const sortedServices = [...services].sort((a, b) => a.order - b.order);
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Kelola Layanan</h2>
        <Link href="/admin/layanan/baru" className="admin-btn-primary">
          ➕ Tambah Layanan
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ikon</th>
              <th>Judul</th>
              <th>Urutan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedServices.length > 0 ? sortedServices.map(service => (
              <tr key={service.id}>
                <td style={{ fontSize: '1.5rem' }}>{service.icon}</td>
                <td>{service.title}</td>
                <td>{service.order}</td>
                <td>
                  <span className={`admin-badge ${service.published ? 'admin-badge-success' : 'admin-badge-default'}`}>
                    {service.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link href={`/admin/layanan/${service.id}/edit`} className="btn-icon edit" title="Edit">
                      ✏️
                    </Link>
                    <DeleteButton endpoint="/api/services" id={service.id} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>Belum ada layanan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
