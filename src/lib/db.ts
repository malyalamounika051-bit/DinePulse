import { MenuItem, Table, Order, InventoryItem, Reservation, StaffMember, CRMGuest, AnalyticsSummary, HourlySales } from '@/types';

export const initialMenuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'Truffle Glazed Wagyu Ribeye',
    description: 'Aged A5 Wagyu ribeye, black truffle demi-glace, charred asparagus & garlic butter mash.',
    price: 68.00,
    category: 'Mains',
    isAvailable: true,
    prepTimeMinutes: 22,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    tags: ['Chef Special', 'Gluten-Free', 'High Margin'],
    isGlutenFree: true,
    marginPercent: 72,
    calories: 850,
    aiRecommended: true,
  },
  {
    id: 'm2',
    name: 'Pan-Seared Chilean Sea Bass',
    description: 'Wild sea bass, saffron beurre blanc, baby bok choy, wild rice pilaf.',
    price: 48.00,
    category: 'Mains',
    isAvailable: true,
    prepTimeMinutes: 18,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    tags: ['Seafood', 'Gluten-Free'],
    isGlutenFree: true,
    marginPercent: 68,
    calories: 620,
    aiRecommended: true,
  },
  {
    id: 'm3',
    name: 'Artisanal Burrata & Heirloom Tomato',
    description: 'Fresh Puglia burrata, organic heirloom tomatoes, basil pesto, 25-yr aged balsamic reduction.',
    price: 22.00,
    category: 'Appetizers',
    isAvailable: true,
    prepTimeMinutes: 10,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?w=600&auto=format&fit=crop&q=80',
    tags: ['Vegetarian', 'Quick Prep'],
    isVegan: false,
    isGlutenFree: true,
    marginPercent: 82,
    calories: 410,
  },
  {
    id: 'm4',
    name: 'Crispy Firecracker Calamari',
    description: 'Flash-fried calamari rings, shishito peppers, spicy yuzu aioli dip.',
    price: 24.00,
    category: 'Appetizers',
    isAvailable: true,
    prepTimeMinutes: 12,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    tags: ['Spicy', 'Popular'],
    spicyLevel: 2,
    marginPercent: 78,
    calories: 530,
  },
  {
    id: 'm5',
    name: 'Smoked Wild Mushroom Risotto',
    description: 'Arborio rice, porcini, chanterelles, shaved parmesan, truffle oil drizzle.',
    price: 32.00,
    category: 'Mains',
    isAvailable: true,
    isLowStock: true,
    prepTimeMinutes: 20,
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop&q=80',
    tags: ['Vegetarian', 'Comfort Food'],
    isVegan: false,
    marginPercent: 75,
    calories: 680,
  },
  {
    id: 'm6',
    name: 'Deconstructed Passionfruit Tart',
    description: 'Tangy passionfruit curd, toasted Italian meringue, sable cookie crumble, mango sorbet.',
    price: 16.00,
    category: 'Desserts',
    isAvailable: true,
    prepTimeMinutes: 8,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    tags: ['Sweet', 'House Signature'],
    marginPercent: 85,
    calories: 380,
  },
  {
    id: 'm7',
    name: 'Smoked Old Fashioned',
    description: 'Bourbon, Angostura bitters, Luxardo cherry, infused with hickory smoke under glass cloche.',
    price: 18.00,
    category: 'Beverages',
    isAvailable: true,
    prepTimeMinutes: 5,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80',
    tags: ['Craft Cocktail', 'Showcase'],
    marginPercent: 88,
    calories: 210,
  },
  {
    id: 'm8',
    name: 'Dragonfruit Botanical Spritz',
    description: 'Sparkling botanical water, red dragonfruit puree, lime, mint sprig (Non-Alcoholic).',
    price: 12.00,
    category: 'Beverages',
    isAvailable: true,
    prepTimeMinutes: 4,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    tags: ['Mocktail', 'Vegan', 'Refreshing'],
    isVegan: true,
    isGlutenFree: true,
    marginPercent: 90,
    calories: 110,
  },
  {
    id: 'm9',
    name: 'Charred Octopus Carpaccio',
    description: 'Spanish octopus, pickled shallots, caperberries, lemon-infused extra virgin olive oil.',
    price: 26.00,
    category: 'Chef Specials',
    isAvailable: false, // Sold Out for live toggling demo
    prepTimeMinutes: 15,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    tags: ['Sold Out', 'Seafood'],
    marginPercent: 65,
    calories: 340,
  }
];

export const initialTables: Table[] = [
  { id: 't1', tableNumber: 'Table 1', capacity: 2, status: 'occupied', currentOrderId: 'ord-101', assignedStaffId: 'st-2', assignedStaffName: 'Elena Rostova', section: 'Main Dining' },
  { id: 't2', tableNumber: 'Table 2', capacity: 4, status: 'occupied', currentOrderId: 'ord-102', assignedStaffId: 'st-2', assignedStaffName: 'Elena Rostova', section: 'Main Dining' },
  { id: 't3', tableNumber: 'Table 3', capacity: 4, status: 'available', assignedStaffId: 'st-2', assignedStaffName: 'Elena Rostova', section: 'Main Dining' },
  { id: 't4', tableNumber: 'Table 4', capacity: 6, status: 'reserved', assignedStaffId: 'st-3', assignedStaffName: 'Marcus Vance', section: 'Main Dining' },
  { id: 't5', tableNumber: 'Table 5', capacity: 2, status: 'billing', currentOrderId: 'ord-103', assignedStaffId: 'st-3', assignedStaffName: 'Marcus Vance', section: 'Patio Deck' },
  { id: 't6', tableNumber: 'Table 6', capacity: 4, status: 'cleaning', assignedStaffId: 'st-3', assignedStaffName: 'Marcus Vance', section: 'Patio Deck' },
  { id: 't7', tableNumber: 'VIP 1', capacity: 8, status: 'occupied', currentOrderId: 'ord-104', assignedStaffId: 'st-1', assignedStaffName: 'Antoine Laurent', section: 'VIP Lounge' },
  { id: 't8', tableNumber: 'VIP 2', capacity: 6, status: 'available', assignedStaffId: 'st-1', assignedStaffName: 'Antoine Laurent', section: 'VIP Lounge' },
  { id: 't9', tableNumber: 'Bar 1', capacity: 2, status: 'available', section: 'Chef Bar' },
  { id: 't10', tableNumber: 'Bar 2', capacity: 2, status: 'available', section: 'Chef Bar' },
];

export const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: '#101',
    tableId: 't1',
    tableName: 'Table 1',
    customerName: 'Sophia Lin',
    customerPhone: '+1 (555) 234-5678',
    items: [
      { menuItemId: 'm1', name: 'Truffle Glazed Wagyu Ribeye', quantity: 1, price: 68.00, status: 'preparing', specialNotes: 'Medium Rare, extra demi-glace' },
      { menuItemId: 'm7', name: 'Smoked Old Fashioned', quantity: 2, price: 18.00, status: 'served' }
    ],
    status: 'preparing',
    subtotal: 104.00,
    tax: 9.36,
    tip: 20.80,
    totalAmount: 134.16,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    estimatedReadyTime: '12 mins'
  },
  {
    id: 'ord-102',
    orderNumber: '#102',
    tableId: 't2',
    tableName: 'Table 2',
    customerName: 'David Miller (VIP)',
    customerPhone: '+1 (555) 876-5432',
    items: [
      { menuItemId: 'm3', name: 'Artisanal Burrata & Heirloom Tomato', quantity: 2, price: 22.00, status: 'ready' },
      { menuItemId: 'm2', name: 'Pan-Seared Chilean Sea Bass', quantity: 2, price: 48.00, status: 'preparing' },
      { menuItemId: 'm8', name: 'Dragonfruit Botanical Spritz', quantity: 2, price: 12.00, status: 'served' }
    ],
    status: 'preparing',
    subtotal: 164.00,
    tax: 14.76,
    tip: 32.80,
    totalAmount: 211.56,
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    estimatedReadyTime: '5 mins'
  },
  {
    id: 'ord-103',
    orderNumber: '#103',
    tableId: 't5',
    tableName: 'Table 5',
    customerName: 'Emma Watson',
    items: [
      { menuItemId: 'm5', name: 'Smoked Wild Mushroom Risotto', quantity: 1, price: 32.00, status: 'served' },
      { menuItemId: 'm6', name: 'Deconstructed Passionfruit Tart', quantity: 1, price: 16.00, status: 'served' }
    ],
    status: 'served',
    subtotal: 48.00,
    tax: 4.32,
    tip: 10.00,
    totalAmount: 62.32,
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: 'ord-104',
    orderNumber: '#104',
    tableId: 't7',
    tableName: 'VIP 1',
    customerName: 'TechCorp Executive Party',
    items: [
      { menuItemId: 'm1', name: 'Truffle Glazed Wagyu Ribeye', quantity: 4, price: 68.00, status: 'pending' },
      { menuItemId: 'm4', name: 'Crispy Firecracker Calamari', quantity: 3, price: 24.00, status: 'preparing' },
      { menuItemId: 'm7', name: 'Smoked Old Fashioned', quantity: 6, price: 18.00, status: 'served' }
    ],
    status: 'pending',
    subtotal: 452.00,
    tax: 40.68,
    tip: 90.40,
    totalAmount: 583.08,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    estimatedReadyTime: '20 mins'
  }
];

export const initialInventoryItems: InventoryItem[] = [
  { id: 'inv-1', name: 'A5 Wagyu Beef Loin', category: 'Proteins', currentStock: 4.2, unit: 'kg', minThreshold: 5.0, costPerUnit: 180.00, supplier: 'Prime Meats Ltd.', lastRestocked: '2026-07-24', status: 'low', predictedDepletionDays: 1.5 },
  { id: 'inv-2', name: 'Black Truffle Oil', category: 'Spices', currentStock: 1.1, unit: 'liters', minThreshold: 2.0, costPerUnit: 95.00, supplier: 'Tuscan Gourmet Exports', lastRestocked: '2026-07-20', status: 'critical', predictedDepletionDays: 0.8 },
  { id: 'inv-3', name: 'Chilean Sea Bass Fillet', category: 'Proteins', currentStock: 12.5, unit: 'kg', minThreshold: 8.0, costPerUnit: 42.00, supplier: 'Ocean Fresh Seafood', lastRestocked: '2026-07-25', status: 'optimal', predictedDepletionDays: 4.0 },
  { id: 'inv-4', name: 'Puglia Artisanal Burrata', category: 'Dairy & Dry', currentStock: 28, unit: 'units', minThreshold: 15, costPerUnit: 6.50, supplier: 'La Latteria Imports', lastRestocked: '2026-07-25', status: 'optimal', predictedDepletionDays: 3.5 },
  { id: 'inv-5', name: 'Heirloom Organic Tomatoes', category: 'Produce', currentStock: 8.0, unit: 'kg', minThreshold: 10.0, costPerUnit: 7.20, supplier: 'Green Earth Farms', lastRestocked: '2026-07-23', status: 'low', predictedDepletionDays: 1.2 },
  { id: 'inv-6', name: 'Bourbon Reserve 12yr', category: 'Beverages & Spirits', currentStock: 14, unit: 'bottles', minThreshold: 5, costPerUnit: 55.00, supplier: 'Heritage Spirits Co.', lastRestocked: '2026-07-21', status: 'optimal', predictedDepletionDays: 8.0 },
  { id: 'inv-7', name: 'Fresh Dragonfruit', category: 'Produce', currentStock: 15, unit: 'units', minThreshold: 8, costPerUnit: 3.50, supplier: 'Exotic Fruit Co.', lastRestocked: '2026-07-25', status: 'optimal', predictedDepletionDays: 5.0 },
];

export const initialReservations: Reservation[] = [
  { id: 'res-1', customerName: 'Alexander Wright', customerPhone: '+1 (555) 901-2345', customerEmail: 'alex.w@example.com', partySize: 4, date: '2026-07-26', time: '19:30', tableId: 't4', status: 'confirmed', specialRequests: 'Anniversary celebration, window seating requested.' },
  { id: 'res-2', customerName: 'Claire Bennet', customerPhone: '+1 (555) 345-6789', customerEmail: 'cbennet@example.com', partySize: 2, date: '2026-07-26', time: '20:00', tableId: 't8', status: 'confirmed', specialRequests: 'Quiet table preferred.' },
  { id: 'res-3', customerName: 'Dr. Robert Harrison', customerPhone: '+1 (555) 678-9012', customerEmail: 'rharrison@med.org', partySize: 6, date: '2026-07-26', time: '20:30', status: 'waitlist', specialRequests: 'Party ready in bar.' }
];

export const initialStaffMembers: StaffMember[] = [
  { id: 'st-1', name: 'Antoine Laurent', role: 'Head Waiter', email: 'antoine@dinepulse.com', phone: '+1 555-111-222', isClockedIn: true, assignedTables: ['t7', 't8'], ordersCompletedToday: 18, performanceRating: 4.9, shiftTime: '16:00 - 00:00', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'st-2', name: 'Elena Rostova', role: 'Server', email: 'elena@dinepulse.com', phone: '+1 555-333-444', isClockedIn: true, assignedTables: ['t1', 't2', 't3'], ordersCompletedToday: 24, performanceRating: 4.8, shiftTime: '15:00 - 23:00', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
  { id: 'st-3', name: 'Marcus Vance', role: 'Server', email: 'marcus@dinepulse.com', phone: '+1 555-555-666', isClockedIn: true, assignedTables: ['t4', 't5', 't6'], ordersCompletedToday: 19, performanceRating: 4.7, shiftTime: '17:00 - 01:00', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'st-4', name: 'Chef Kenji Sato', role: 'Head Chef', email: 'kenji@dinepulse.com', phone: '+1 555-777-888', isClockedIn: true, assignedTables: [], ordersCompletedToday: 65, performanceRating: 5.0, shiftTime: '14:00 - 23:00', avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80' },
];

export const initialCRMGuests: CRMGuest[] = [
  { id: 'crm-1', name: 'David Miller', phone: '+1 (555) 876-5432', email: 'david.m@vip.com', isVIP: true, totalVisits: 14, totalSpent: 2840.00, favoriteDishes: ['Truffle Glazed Wagyu Ribeye', 'Smoked Old Fashioned'], dietaryRestrictions: ['Nut Allergy'], lastVisit: '2026-07-26' },
  { id: 'crm-2', name: 'Sophia Lin', phone: '+1 (555) 234-5678', email: 'slin@design.co', isVIP: true, totalVisits: 9, totalSpent: 1420.00, favoriteDishes: ['Pan-Seared Chilean Sea Bass', 'Burrata'], dietaryRestrictions: ['Gluten-Free'], lastVisit: '2026-07-26' },
  { id: 'crm-3', name: 'Emma Watson', phone: '+1 (555) 432-1098', email: 'ewatson@film.org', isVIP: false, totalVisits: 3, totalSpent: 380.00, favoriteDishes: ['Smoked Wild Mushroom Risotto'], dietaryRestrictions: ['Vegetarian'], lastVisit: '2026-07-20' },
];

export const hourlySalesData: HourlySales[] = [
  { hour: '12 PM', sales: 420, ordersCount: 8 },
  { hour: '1 PM', sales: 680, ordersCount: 14 },
  { hour: '2 PM', sales: 350, ordersCount: 6 },
  { hour: '5 PM', sales: 520, ordersCount: 9 },
  { hour: '6 PM', sales: 1120, ordersCount: 18 },
  { hour: '7 PM', sales: 1840, ordersCount: 26 },
  { hour: '8 PM', sales: 2310, ordersCount: 31 },
  { hour: '9 PM', sales: 1650, ordersCount: 22 },
  { hour: '10 PM', sales: 890, ordersCount: 12 },
];
