import Link from 'next/link';
import { getPublishedTeamMembers } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tim Advokat | Kantor Hukum FIGE & Rekan',
  description: 'Mengenal tim advokat dan konsultan hukum dari Kantor Hukum FIGE & Rekan',
};

export default async function TeamPage() {
  const teamMembers = await getPublishedTeamMembers();

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Tim Advokat Kami</h1>
          <p className="text-gray" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Para profesional hukum yang berpengalaman, berdedikasi, dan berkomitmen penuh untuk melindungi kepentingan hukum Anda.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-3">
            {teamMembers.map((member, i) => (
              <div key={member.id} className="team-card glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, padding: 0 }}>
                <Link href={`/tim/${member.slug}`}>
                  <div className="team-image-ph">
                    {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                </Link>
                <div className="team-info" style={{ padding: '1.5rem' }}>
                  <h3 className="team-name">
                    <Link href={`/tim/${member.slug}`}>{member.name}</Link>
                  </h3>
                  <div className="team-position">{member.position}</div>
                  <p className="text-gray" style={{ marginTop: '1rem', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    <strong>Spesialisasi:</strong> {member.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="section section-bg-light text-center">
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Bergabung dengan Tim Kami?</h2>
          <p className="text-gray" style={{ marginBottom: '2rem' }}>
            Kami selalu mencari bakat hukum terbaik untuk berkembang bersama.
          </p>
          <Link href="/kontak" className="btn btn-outline">
            Kirimkan CV Anda
          </Link>
        </div>
      </section>
    </>
  );
}
