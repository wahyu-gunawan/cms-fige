import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';
import { getArticles, getPublishedArticles, createArticle } from '@/lib/db';
import { generateId, generateSlug } from '@/lib/utils';
import { Article } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('published') === 'true';

    if (publishedOnly) {
      const articles = await getPublishedArticles();
      return NextResponse.json(articles);
    } else {
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const articles = await getArticles();
      return NextResponse.json(articles);
    }
  } catch (error) {
    console.error('Failed to get articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const id = generateId('art');
    const slug = data.slug || generateSlug(data.title);
    const now = new Date().toISOString();

    const newArticle: Article = {
      ...data,
      id,
      slug,
      image: data.image || '',
      createdAt: now,
      updatedAt: now,
    };

    const created = await createArticle(newArticle);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Failed to create article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
