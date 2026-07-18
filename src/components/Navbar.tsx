'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Tim Kami', path: '/tim' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link href="/" className="logo">
          FIGE <span className="text-gold">&</span> REKAN
        </Link>

        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/admin" className="nav-link text-gray" style={{ fontSize: '0.8rem' }}>
            Admin
          </Link>
        </div>

        <button 
          className="menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
