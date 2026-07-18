import { getSettings } from '@/lib/db';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Hubungi Kami | Kantor Hukum FIGE & Rekan',
  description: 'Hubungi Kantor Hukum FIGE & Rekan untuk konsultasi dan bantuan hukum.',
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Hubungi Kami</h1>
          <p className="text-gray" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Tim kami siap mendengarkan masalah hukum Anda dan memberikan solusi yang tepat. Jadwalkan konsultasi sekarang.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2" style={{ gap: '4rem' }}>
            {/* Contact Form */}
            <div className="glass-card animate-fade-in-up">
              <h2 style={{ marginBottom: '2rem' }}>Kirim Pesan</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in-up animate-delay-1">
              <h2 style={{ marginBottom: '2rem' }}>Informasi Kontak</h2>
              
              <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem 2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="text-gold" style={{ fontSize: '2rem' }}>📍</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Alamat Kantor</h3>
                    <p className="text-gray" style={{ lineHeight: 1.6 }}>
                      {settings.address || 'Jl. Keadilan No. 45, Jakarta Selatan, 12190'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="text-gold" style={{ fontSize: '2rem' }}>📞</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Telepon</h3>
                    <p className="text-gray">
                      {settings.phone || '(021) 1234-5678'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="text-gold" style={{ fontSize: '2rem' }}>📱</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>WhatsApp</h3>
                    <p className="text-gray">
                      {settings.whatsapp || '+62 812-3456-7890'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div className="text-gold" style={{ fontSize: '2rem' }}>✉️</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Email</h3>
                    <p className="text-gray">
                      {settings.email || 'info@figelaw.com'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem 2rem', backgroundColor: 'var(--gold)', color: 'var(--navy)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--navy)' }}>Jam Operasional</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong>Senin - Jumat:</strong>
                  <span>09:00 - 17:00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong>Sabtu:</strong>
                  <span>Dengan Perjanjian</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Minggu & Hari Libur:</strong>
                  <span>Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Placeholder */}
      <div style={{ width: '100%', height: '400px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-gray" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>[Peta Lokasi Kantor]</p>
      </div>
    </>
  );
}
