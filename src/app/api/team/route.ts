import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getTeamMembers, getPublishedTeamMembers, createTeamMember } from '@/lib/db';
import { generateId, generateSlug } from '@/lib/utils';
import { TeamMember } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('published') === 'true';

    if (publishedOnly) {
      const team = await getPublishedTeamMembers();
      return NextResponse.json(team);
    } else {
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const team = await getTeamMembers();
      return NextResponse.json(team);
    }
  } catch (error) {
    console.error('Failed to get team members:', error);
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
    const id = generateId('team');
    const slug = data.slug || generateSlug(data.name);
    const now = new Date().toISOString();

    const newMember: TeamMember = {
      ...data,
      id,
      slug,
      createdAt: now,
      updatedAt: now,
    };

    const created = await createTeamMember(newMember);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Failed to create team member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
