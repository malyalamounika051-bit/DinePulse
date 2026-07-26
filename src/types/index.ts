export type Role = 'customer' | 'kitchen' | 'server' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Mains' | 'Desserts' | 'Beverages' | 'Chef Specials';
  isAvailable: boolean;
  isLowStock?: boolean;
  prepTimeMinutes: number;
  image: string;
  tags: string[];
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  marginPercent: number;
  calories?: number;
  aiRecommended?: boolean;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  specialNotes?: string;
  status: 'pending' | 'preparing' | 'ready' | 'served';
}

export interface Order {
  id: string;
  orderNumber: string;
  tableId: string;
  tableName: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'paid';
  subtotal: number;
  tax: number;
  tip: number;
  totalAmount: number;
  paymentMethod?: 'card' | 'cash' | 'split' | 'pending';
  createdAt: string;
  estimatedReadyTime?: string;
  notes?: string;
}

export type TableStatus = 'available' | 'reserved' | 'occupied' | 'billing' | 'cleaning';

export interface Table {
  id: string;
  tableNumber: string;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  section: 'Main Dining' | 'Patio Deck' | 'VIP Lounge' | 'Chef Bar';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Proteins' | 'Produce' | 'Dairy & Dry' | 'Beverages & Spirits' | 'Spices';
  currentStock: number;
  unit: 'kg' | 'lbs' | 'liters' | 'units' | 'bottles';
  minThreshold: number;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
  status: 'optimal' | 'low' | 'critical';
  predictedDepletionDays?: number;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  partySize: number;
  date: string;
  time: string;
  tableId?: string;
  status: 'confirmed' | 'seated' | 'cancelled' | 'waitlist';
  specialRequests?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Manager' | 'Head Chef' | 'Sous Chef' | 'Head Waiter' | 'Server' | 'Host';
  email: string;
  phone: string;
  isClockedIn: boolean;
  assignedTables: string[];
  ordersCompletedToday: number;
  performanceRating: number; // 1 to 5
  shiftTime: string;
  avatar: string;
}

export interface CRMGuest {
  id: string;
  name: string;
  phone: string;
  email: string;
  isVIP: boolean;
  totalVisits: number;
  totalSpent: number;
  favoriteDishes: string[];
  dietaryRestrictions: string[];
  lastVisit: string;
}

export interface AnalyticsSummary {
  todayRevenue: number;
  revenueChangePercent: number;
  activeOrders: number;
  tableOccupancyPercent: number;
  avgPreparationTimeMinutes: number;
  customerSatisfactionRating: number;
}

export interface HourlySales {
  hour: string;
  sales: number;
  ordersCount: number;
}
