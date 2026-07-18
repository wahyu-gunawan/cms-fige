'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  endpoint: string;
  id: string;
  label?: string;
  iconOnly?: boolean;
}

export default function DeleteButton({ endpoint, id, label, iconOnly = true }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setShowConfirm(false);
        router.refresh();
      } else {
        alert('Gagal menghapus data');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        className={iconOnly ? "btn-icon delete" : "admin-btn-secondary"} 
        onClick={() => setShowConfirm(true)}
        title="Hapus"
        style={!iconOnly ? { color: 'var(--admin-danger)', borderColor: 'var(--admin-danger)' } : {}}
      >
        🗑️ {label}
      </button>

      {showConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              Konfirmasi Hapus
            </div>
            <div className="admin-modal-content">
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </div>
            <div className="admin-modal-actions">
              <button 
                className="admin-btn-secondary" 
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
              >
                Batal
              </button>
              <button 
                className="admin-btn-primary" 
                style={{ backgroundColor: 'var(--admin-danger)' }}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
