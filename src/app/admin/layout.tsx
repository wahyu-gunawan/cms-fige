'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname.replace(/\/$/, '') === '/admin/login';

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      window.location.href = '/admin/login';
    }
  }, [status, isLoginPage]);

  if (status === 'loading') {
    return <div className="admin-body" style={{ padding: '2rem', color: '#fff' }}>Memuat...</div>;
  }

  if (isLoginPage) {
    return <div className="admin-body">{children}</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="admin-body" style={{ padding: '2rem', color: '#fff' }}>Mengalihkan...</div>;
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/artikel', label: 'Artikel', icon: '📝' },
    { path: '/admin/layanan', label: 'Layanan', icon: '⚖️' },
    { path: '/admin/tim', label: 'Tim', icon: '👥' },
    { path: '/admin/pesan', label: 'Pesan', icon: '✉️' },
    { path: '/admin/pengaturan', label: 'Pengaturan', icon: '⚙️' },
  ];

  const getPageTitle = () => {
    const item = navItems.find((n) => pathname === n.path || (pathname.startsWith(n.path) && n.path !== '/admin'));
    return item ? item.label : 'Admin Panel';
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-body">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header">
            <div className="admin-logo">FIGE & REKAN</div>
            <button className="mobile-toggle" onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
          </div>
          <nav className="admin-nav">
            <ul className="admin-nav-list">
              {navItems.map((item) => {
                const isActive = item.path === '/admin' ? pathname === '/admin' : pathname.startsWith(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`admin-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="admin-nav-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="admin-main-wrapper">
          <header className="admin-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="mobile-toggle" onClick={() => setSidebarOpen(true)}>
                ☰
              </button>
              <h1 className="admin-header-title">{getPageTitle()}</h1>
            </div>
            <div className="admin-header-actions">
              <div className="admin-user-info">
                <div className="admin-avatar">
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <span className="hide-on-mobile">{session?.user?.name || 'Admin'}</span>
              </div>
              <button onClick={handleLogout} className="admin-logout-btn">
                Logout
              </button>
            </div>
          </header>
          <main className="admin-content">{children}</main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="admin-modal-overlay"
            onClick={() => setSidebarOpen(false)}
            style={{ zIndex: 99, background: 'rgba(0,0,0,0.5)' }}
          />
        )}
      </div>
    </div>
  );
}
