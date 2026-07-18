import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-4">
          <div className="footer-col">
            <Link href="/" className="logo" style={{ marginBottom: '1.5rem', display: 'block' }}>
              FIGE <span className="text-gold">&</span> REKAN
            </Link>
            <p className="text-gray" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Kantor hukum profesional dan terpercaya yang berdedikasi untuk memberikan solusi hukum terbaik bagi setiap klien.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" className="text-gray hover:text-gold text-xl">📘</a>
              <a href="#" className="text-gray hover:text-gold text-xl">📸</a>
              <a href="#" className="text-gray hover:text-gold text-xl">📱</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Tautan Cepat</h4>
            <ul className="footer-links">
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/layanan">Layanan Kami</Link></li>
              <li><Link href="/tim">Tim Advokat</Link></li>
              <li><Link href="/artikel">Artikel Hukum</Link></li>
              <li><Link href="/kontak">Hubungi Kami</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Area Praktik</h4>
            <ul className="footer-links">
              <li><Link href="/layanan/hukum-perdata">Hukum Perdata</Link></li>
              <li><Link href="/layanan/hukum-pidana">Hukum Pidana</Link></li>
              <li><Link href="/layanan/hukum-perusahaan">Hukum Perusahaan</Link></li>
              <li><Link href="/layanan/hukum-keluarga">Hukum Keluarga</Link></li>
              <li><Link href="/layanan/sengketa-bisnis">Sengketa Bisnis</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kontak Info</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span className="text-gold">📍</span>
                <span className="text-gray">Jl. Keadilan No. 45, Jakarta Selatan, 12190</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="text-gold">📞</span>
                <span className="text-gray">(021) 1234-5678</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="text-gold">✉️</span>
                <span className="text-gray">info@figelaw.com</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="text-gold">📱</span>
                <span className="text-gray">+62 812-3456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Kantor Hukum FIGE & Rekan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
