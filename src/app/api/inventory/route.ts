import { NextResponse } from 'next/server';
import { initialInventoryItems } from '@/lib/db';
import { InventoryItem } from '@/types';

let inventoryStore: InventoryItem[] = [...initialInventoryItems];

export async function GET() {
  return NextResponse.json({ success: true, data: inventoryStore });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, addStock } = body;

    const idx = inventoryStore.findIndex(i => i.id === id);
    if (idx !== -1) {
      if (addStock) {
        inventoryStore[idx].currentStock += addStock;
        inventoryStore[idx].lastRestocked = new Date().toISOString().split('T')[0];
        if (inventoryStore[idx].currentStock >= inventoryStore[idx].minThreshold) {
          inventoryStore[idx].status = 'optimal';
        }
      }
      return NextResponse.json({ success: true, data: inventoryStore[idx] });
    }
    return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid restock' }, { status: 400 });
  }
}
