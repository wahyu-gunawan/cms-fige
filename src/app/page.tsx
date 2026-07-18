import Link from 'next/link';
import StatsCounter from '@/components/StatsCounter';
import { getSettings, getPublishedServices, getPublishedArticles } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await getSettings();
  const services = await getPublishedServices();
  const articles = await getPublishedArticles();

  const previewServices = services.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              {settings.heroTitle || 'Advokasi Hukum Profesional & Terpercaya'}
            </h1>
            <p className="hero-subtitle">
              {settings.heroSubtitle || 'Kami memberikan solusi hukum strategis dan komprehensif untuk melindungi hak dan kepentingan Anda.'}
            </p>
            <div className="hero-actions">
              <Link href="/kontak" className="btn btn-primary">
                Konsultasi Gratis
              </Link>
              <Link href="/layanan" className="btn btn-outline">
                Layanan Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter 
        yearsExperience={settings.yearsExperience || 15}
        casesHandled={settings.casesHandled || 500}
        clientSatisfaction={settings.clientSatisfaction || 99}
      />

      {/* Services Preview */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 className="section-heading">Layanan Kami</h2>
              <p className="text-gray" style={{ maxWidth: '600px' }}>
                Kami menyediakan berbagai layanan hukum yang dirancang khusus untuk memenuhi kebutuhan Anda dengan pendekatan yang profesional dan berintegritas.
              </p>
            </div>
            <Link href="/layanan" className="btn btn-outline hidden-mobile">
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-3">
            {previewServices.map((service, i) => (
              <div key={service.id} className={`glass-card animate-fade-in-up animate-delay-${i+1}`}>
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="text-gray" style={{ marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {service.description}
                </p>
                <Link href={`/layanan/${service.slug}`} className="read-more">
                  Selengkapnya <span style={{ fontSize: '1.2rem' }}>→</span>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link href="/layanan" className="btn btn-outline hidden-desktop">
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
            <div className="glass-card animate-fade-in-up">
              <h2 className="section-heading">Tentang FIGE & Rekan</h2>
              <div className="prose">
                <p>
                  Didirikan oleh Geri, S.H., M.H., Kantor Hukum FIGE & Rekan telah mendedikasikan diri untuk memberikan pelayanan hukum berkualitas tinggi bagi klien individu maupun korporasi.
                </p>
                <p>
                  Dengan pemahaman mendalam tentang sistem hukum Indonesia dan komitmen pada etika profesi, kami memastikan setiap klien mendapatkan representasi hukum terbaik untuk mencapai hasil yang optimal.
                </p>
                <ul className="text-gray">
                  <li>Integritas dan Transparansi</li>
                  <li>Pendekatan Berorientasi Solusi</li>
                  <li>Responsif dan Komunikatif</li>
                </ul>
                <div style={{ marginTop: '2rem' }}>
                  <Link href="/tim" className="btn btn-primary">
                    Mengenal Tim Kami
                  </Link>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up animate-delay-1">
              <div style={{ 
                width: '100%', 
                height: '500px', 
                backgroundColor: 'var(--navy-lighter)',
                borderRadius: '8px',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem'
              }}>
                [Foto Tim / Kantor]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-center">Artikel & Wawasan Hukum</h2>
            <p className="text-gray" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
              Dapatkan pembaruan dan analisis terkini mengenai perkembangan hukum, regulasi baru, dan isu-isu hukum relevan.
            </p>
          </div>

          <div className="grid grid-cols-3">
            {latestArticles.map((article, i) => (
              <div key={article.id} className={`glass-card article-card animate-fade-in-up animate-delay-${i+1}`} style={{ padding: 0, overflow: 'hidden' }}>
                <div className="article-image-ph"></div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="text-gold">{article.category}</span>
                    <span>{formatDate(article.createdAt.toString())}</span>
                  </div>
                  <h3 className="article-title">
                    <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <Link href={`/artikel/${article.slug}`} className="read-more">
                    Baca Selengkapnya <span style={{ fontSize: '1.2rem' }}>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link href="/artikel" className="btn btn-outline">
              Lihat Semua Artikel
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-bg-light text-center">
        <div className="container glass-card animate-fade-in-up" style={{ maxWidth: '800px', padding: '4rem 2rem' }}>
          <h2 className="section-heading text-center" style={{ marginBottom: '1.5rem' }}>Butuh Bantuan Hukum?</h2>
          <p className="text-gray" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Jangan tunda lagi. Tim advokat kami siap mendengarkan masalah Anda dan memberikan solusi hukum yang tepat.
          </p>
          <Link href="/kontak" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Hubungi Kami Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
