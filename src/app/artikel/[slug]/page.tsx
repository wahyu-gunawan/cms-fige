import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getPublishedArticles } from '@/lib/db';
import { simpleMarkdown, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Not Found' };
  
  return {
    title: `${article.title} | Artikel Hukum`,
    description: article.excerpt,
  };
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  
  const htmlContent = simpleMarkdown(article.content);
  
  // Get related articles (same category, excluding current)
  const allArticles = await getPublishedArticles();
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <>
      <div className="page-header">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            <Link href="/">Beranda</Link>
            <span>/</span>
            <Link href="/artikel">Artikel</Link>
            <span>/</span>
            <span className="text-gray">{article.category}</span>
          </div>
          
          <div className="text-center">
            <span className="badge">{article.category}</span>
            <h1 style={{ fontSize: '3rem', margin: '1.5rem 0' }}>{article.title}</h1>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--gray-300)', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="text-gold">✍️</span> {article.author}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="text-gold">📅</span> {formatDate(article.createdAt.toString())}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Article Image */}
          <div style={{ 
            width: '100%', 
            height: '400px', 
            backgroundColor: 'var(--navy-lighter)',
            borderRadius: '12px',
            marginBottom: '3rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}></div>

          {/* Article Content */}
          <div className="glass-card" style={{ padding: '3rem' }}>
            <div 
              className="prose"
              style={{ fontSize: '1.1rem' }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            
            {/* Share & Tags */}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong className="text-white" style={{ marginRight: '1rem' }}>Bagikan:</strong>
                <a href="#" style={{ marginRight: '1rem', fontSize: '1.2rem' }}>📱</a>
                <a href="#" style={{ marginRight: '1rem', fontSize: '1.2rem' }}>🐦</a>
                <a href="#" style={{ fontSize: '1.2rem' }}>✉️</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section section-bg-light">
          <div className="container" style={{ maxWidth: '1000px' }}>
            <h2 className="section-heading text-center" style={{ marginBottom: '3rem' }}>Artikel Terkait</h2>
            <div className="grid grid-cols-2">
              {relatedArticles.map(rel => (
                <div key={rel.id} className="glass-card article-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="article-image-ph" style={{ height: '200px' }}></div>
                  <div className="article-content">
                    <h3 className="article-title">
                      <Link href={`/artikel/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="article-excerpt">{rel.excerpt}</p>
                    <Link href={`/artikel/${rel.slug}`} className="read-more">
                      Baca Selengkapnya <span style={{ fontSize: '1.2rem' }}>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
