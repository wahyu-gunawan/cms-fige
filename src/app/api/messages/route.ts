import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';
import { getMessages, createMessage } from '@/lib/db';
import { generateId } from '@/lib/utils';
import { ContactMessage } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to get messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const id = generateId('msg');
    const now = new Date().toISOString();

    const newMessage: ContactMessage = {
      ...data,
      id,
      createdAt: now,
      read: false,
    };

    const created = await createMessage(newMessage);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Failed to create message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
