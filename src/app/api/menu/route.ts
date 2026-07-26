import { NextResponse } from 'next/server';
import { initialMenuItems } from '@/lib/db';
import { MenuItem } from '@/types';

// In-memory runtime state for fast interactive demo
let menuStore: MenuItem[] = [...initialMenuItems];

export async function GET() {
  return NextResponse.json({ success: true, data: menuStore });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, isAvailable, isLowStock } = body;

    const itemIndex = menuStore.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      if (isAvailable !== undefined) menuStore[itemIndex].isAvailable = isAvailable;
      if (isLowStock !== undefined) menuStore[itemIndex].isLowStock = isLowStock;
      return NextResponse.json({ success: true, data: menuStore[itemIndex] });
    }
    return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
