import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getPublishedServices } from '@/lib/db';
import { simpleMarkdown } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Not Found' };
  
  return {
    title: `${service.title} | Layanan FIGE & Rekan`,
    description: service.description,
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  
  const allServices = await getPublishedServices();
  const htmlContent = simpleMarkdown(service.content);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span>/</span>
            <Link href="/layanan">Layanan</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <span className="service-icon" style={{ fontSize: '3rem', margin: 0 }}>{service.icon}</span>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{service.title}</h1>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: '1fr 300px' }}>
            {/* Main Content */}
            <div className="glass-card">
              <div 
                className="prose"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              
              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h3>Butuh Bantuan dalam Area Ini?</h3>
                <p className="text-gray" style={{ marginBottom: '1.5rem' }}>
                  Tim advokat kami siap memberikan konsultasi dan representasi hukum yang Anda butuhkan.
                </p>
                <Link href="/kontak" className="btn btn-primary">
                  Jadwalkan Konsultasi
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                  Layanan Lainnya
                </h3>
                <ul style={{ listStyle: 'none' }}>
                  {allServices.map(s => (
                    <li key={s.id} style={{ marginBottom: '0.75rem' }}>
                      <Link 
                        href={`/layanan/${s.slug}`}
                        className={`text-gray hover:text-gold ${s.slug === service.slug ? 'text-gold' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}
                      >
                        <span>{s.icon}</span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
