import React from 'react';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/db';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function TimPage() {
  const team = await getTeamMembers();
  const sortedTeam = [...team].sort((a, b) => a.order - b.order);
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Kelola Tim</h2>
        <Link href="/admin/tim/baru" className="admin-btn-primary">
          ➕ Tambah Anggota
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Posisi</th>
              <th>Spesialisasi</th>
              <th>Urutan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeam.length > 0 ? sortedTeam.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.position}</td>
                <td>{member.specialization}</td>
                <td>{member.order}</td>
                <td>
                  <span className={`admin-badge ${member.published ? 'admin-badge-success' : 'admin-badge-default'}`}>
                    {member.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link href={`/admin/tim/${member.id}/edit`} className="btn-icon edit" title="Edit">
                      ✏️
                    </Link>
                    <DeleteButton endpoint="/api/team" id={member.id} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>Belum ada anggota tim</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
