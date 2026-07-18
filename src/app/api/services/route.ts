import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getServices, getPublishedServices, createService } from '@/lib/db';
import { generateId, generateSlug } from '@/lib/utils';
import { Service } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('published') === 'true';

    if (publishedOnly) {
      const services = await getPublishedServices();
      return NextResponse.json(services);
    } else {
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const services = await getServices();
      return NextResponse.json(services);
    }
  } catch (error) {
    console.error('Failed to get services:', error);
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
    const id = generateId('svc');
    const slug = data.slug || generateSlug(data.title);
    const now = new Date().toISOString();

    const newService: Service = {
      ...data,
      id,
      slug,
      createdAt: now,
      updatedAt: now,
    };

    const created = await createService(newService);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
