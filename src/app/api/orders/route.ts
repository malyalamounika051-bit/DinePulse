import { NextResponse } from 'next/server';
import { initialOrders } from '@/lib/db';
import { Order } from '@/types';

let ordersStore: Order[] = [...initialOrders];

export async function GET() {
  return NextResponse.json({ success: true, data: ordersStore });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder: Order = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      orderNumber: `#${Math.floor(100 + Math.random() * 900)}`,
      tableId: body.tableId || 't1',
      tableName: body.tableName || 'Table 1',
      customerName: body.customerName || 'Guest Diner',
      customerPhone: body.customerPhone || '',
      items: body.items || [],
      status: 'pending',
      subtotal: body.subtotal || 0,
      tax: body.tax || 0,
      tip: body.tip || 0,
      totalAmount: body.totalAmount || 0,
      createdAt: new Date().toISOString(),
      estimatedReadyTime: '15 mins',
      paymentMethod: body.paymentMethod || 'pending'
    };

    ordersStore.unshift(newOrder);
    return NextResponse.json({ success: true, data: newOrder });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, paymentMethod } = body;

    const orderIndex = ordersStore.findIndex(o => o.id === id);
    if (orderIndex !== -1) {
      if (status) ordersStore[orderIndex].status = status;
      if (paymentMethod) ordersStore[orderIndex].paymentMethod = paymentMethod;
      return NextResponse.json({ success: true, data: ordersStore[orderIndex] });
    }
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid update' }, { status: 400 });
  }
}
