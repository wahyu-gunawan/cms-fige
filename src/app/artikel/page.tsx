import Link from 'next/link';
import { getPublishedArticles } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Artikel & Informasi Hukum | Kantor Hukum FIGE & Rekan',
  description: 'Artikel, berita, dan pandangan hukum terbaru dari tim advokat FIGE & Rekan',
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Artikel & Informasi Hukum</h1>
          <p className="text-gray" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Wawasan, analisis, dan pembaruan terkini seputar dunia hukum di Indonesia.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2">
            {articles.map((article, i) => (
              <div key={article.id} className="glass-card article-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, padding: 0, overflow: 'hidden' }}>
                <div className="article-image-ph" style={{ height: '250px' }}></div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="badge" style={{ marginBottom: 0 }}>{article.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center' }}>{formatDate(article.createdAt.toString())}</span>
                  </div>
                  <h3 className="article-title" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                    <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="article-excerpt" style={{ fontSize: '1rem' }}>{article.excerpt}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="text-gray" style={{ fontSize: '0.9rem' }}>
                      Oleh: <span className="text-white">{article.author}</span>
                    </div>
                    <Link href={`/artikel/${article.slug}`} className="read-more">
                      Baca <span style={{ fontSize: '1.2rem' }}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
