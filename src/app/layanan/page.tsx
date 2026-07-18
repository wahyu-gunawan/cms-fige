import Link from 'next/link';
import { getPublishedServices } from '@/lib/db';

export const metadata = {
  title: 'Layanan Kami | Kantor Hukum FIGE & Rekan',
  description: 'Berbagai layanan hukum dari Kantor Hukum FIGE & Rekan',
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Layanan Hukum Kami</h1>
          <p className="text-gray" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Kami menyediakan solusi hukum komprehensif untuk individu dan korporasi dengan standar profesionalisme tertinggi.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2">
            {services.map((service, i) => (
              <div key={service.id} className="glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div className="service-icon" style={{ fontSize: '3rem', margin: 0 }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="service-title" style={{ marginBottom: '0.75rem' }}>{service.title}</h3>
                    <p className="text-gray" style={{ marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {service.description}
                    </p>
                    <Link href={`/layanan/${service.slug}`} className="read-more">
                      Selengkapnya <span style={{ fontSize: '1.2rem' }}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-bg-light text-center">
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Tidak menemukan layanan yang Anda cari?</h2>
          <p className="text-gray" style={{ marginBottom: '2rem' }}>
            Hubungi kami untuk konsultasi khusus mengenai permasalahan hukum Anda.
          </p>
          <Link href="/kontak" className="btn btn-primary">
            Konsultasi Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
