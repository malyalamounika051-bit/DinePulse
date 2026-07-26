import { NextResponse } from 'next/server';
import { initialTables } from '@/lib/db';
import { Table } from '@/types';

let tablesStore: Table[] = [...initialTables];

export async function GET() {
  return NextResponse.json({ success: true, data: tablesStore });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, currentOrderId } = body;

    const idx = tablesStore.findIndex(t => t.id === id);
    if (idx !== -1) {
      if (status) tablesStore[idx].status = status;
      if (currentOrderId !== undefined) tablesStore[idx].currentOrderId = currentOrderId;
      return NextResponse.json({ success: true, data: tablesStore[idx] });
    }
    return NextResponse.json({ success: false, error: 'Table not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid update' }, { status: 400 });
  }
}
