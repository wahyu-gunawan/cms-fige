import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTeamMemberBySlug } from '@/lib/db';
import { simpleMarkdown } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return { title: 'Not Found' };
  
  return {
    title: `${member.name} - ${member.position} | FIGE & Rekan`,
    description: `Profil ${member.name}, ${member.position} di Kantor Hukum FIGE & Rekan.`,
  };
}

export default async function TeamMemberDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) notFound();
  
  const bioHtml = simpleMarkdown(member.bio);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span>/</span>
            <Link href="/tim">Tim Kami</Link>
            <span>/</span>
            <span className="text-white">{member.name}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="team-detail-grid">
            {/* Left Column - Image & Quick Info */}
            <div>
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
                <div style={{ 
                  height: '400px', 
                  backgroundColor: 'var(--navy-lighter)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  color: 'rgba(255,255,255,0.1)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              </div>
              
              <div className="glass-card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                  Informasi Kontak
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span className="text-gold text-xl">✉️</span>
                  <a href={`mailto:${member.email}`} className="text-gray hover:text-gold">{member.email}</a>
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                  <Link href="/kontak" className="btn btn-primary" style={{ width: '100%' }}>
                    Hubungi {member.name.split(' ')[0]}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="glass-card">
              <span className="badge">{member.specialization}</span>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{member.name}</h1>
              <div className="text-gold" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>
                {member.position}
              </div>

              <div className="prose" style={{ marginBottom: '3rem' }} dangerouslySetInnerHTML={{ __html: bioHtml }} />

              <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>Pendidikan</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {member.education.map((edu, i) => (
                      <li key={i} style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem' }}>
                        <span style={{ position: 'absolute', left: 0, top: '5px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold)' }}></span>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>Pengalaman</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {member.experience.map((exp, i) => (
                      <li key={i} style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem' }}>
                        <span style={{ position: 'absolute', left: 0, top: '5px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold)' }}></span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
