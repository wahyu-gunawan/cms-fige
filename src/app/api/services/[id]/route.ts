import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getServiceById, updateService, deleteService } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const service = await getServiceById(id);
    if (!service) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error('Failed to get service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const updates = await req.json();
    
    const updated = await updateService(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await deleteService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
