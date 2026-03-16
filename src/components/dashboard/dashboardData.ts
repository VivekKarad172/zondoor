export const STATUSES = ["Pending", "Production", "Ready", "Dispatched"] as const;
export type OrderStatus = (typeof STATUSES)[number];

export const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  Pending:    { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/40" },
  Production: { bg: "bg-blue-500/15",   text: "text-blue-400",   border: "border-blue-500/40" },
  Ready:      { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/40" },
  Dispatched: { bg: "bg-gray-500/12",   text: "text-gray-400",   border: "border-gray-500/30" },
};

export const PRODUCTS = [
  "ZN-01 (Foil 7)","ZN-02 (Foil 11)","ZN-03 (Foil 12)","ZN-04 (Foil 8)",
  "ZN-05 (Foil 13)","ZN-06 (Foil 11)","ZN-07 (Foil 13)","ZN-08 (Foil 8)",
  "ZN-09 (Foil 4)","ZN-10 (Foil 7)","ZN-11 (Foil 9)","ZN-12 (Foil 11)",
  "ZN-13 (Foil 2)","ZN-14 (Foil 7)","ZN-15 (Foil 4)","ZN-16 (Foil 3)","ZN PLAIN",
  "WPC-101 (Foil 7)","WPC-102 (Foil 8)","WPC-103 (Foil 9)","WPC-104 (Foil 2)",
  "WPC-105 (Foil 4)","WPC-106 (Foil 11)","WPC-107 (Foil 9)","WPC-108 (Foil 13)",
  "WPC-109 (Foil 4)","WPC-110 (Foil 9)",
];

export interface Order {
  id: string;
  order_number: string;
  dealer: string;
  phone: string;
  product: string;
  qty: number;
  width: number;
  height: number;
  status: string;
  order_date: string;
  urgent: boolean;
  notes: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  stock: number;
  min_stock: number;
  reorder_qty: number;
}

export const buildWhatsApp = (order: Order, type: "pending" | "ready" | "dispatch") => {
  const dealerName = order.dealer.split(",")[0];
  if (type === "ready")
    return `🚪 *Z-ON DOOR* – Order Ready!\n\nNamaste ${dealerName}! 🙏\n\nYour order is ready for dispatch:\n\n📦 *Order:* ${order.order_number}\n🚪 *Product:* ${order.product}\n🔢 *Qty:* ${order.qty} doors\n📐 *Size:* ${order.width}" × ${order.height}"\n\nPlease confirm delivery address and we'll dispatch today.\n\n📞 Z-ON DOOR | www.zondoor.com`;
  if (type === "dispatch")
    return `🚚 *Z-ON DOOR* – Dispatched!\n\nNamaste ${dealerName}! 🙏\n\nYour order has been dispatched:\n\n📦 *Order:* ${order.order_number}\n🚪 *Product:* ${order.product}\n🔢 *Qty:* ${order.qty} doors\n\nExpected delivery: 1-2 days.\nFor queries: 📞 Call/WhatsApp us\n\n– Z-ON DOOR Team 🚪`;
  return `📋 *Z-ON DOOR* – Order Received!\n\nNamaste ${dealerName}! 🙏\n\nWe've received your order:\n\n📦 *Order ID:* ${order.order_number}\n🚪 *Product:* ${order.product}\n🔢 *Qty:* ${order.qty} doors\n📐 *Size:* ${order.width}" × ${order.height}"\n⏱️ *Ready in:* 4-5 working days\n\nThank you for choosing Z-ON DOOR! 🙏\nwww.zondoor.com`;
};

export const buildAlertMsg = (item: InventoryItem) =>
  `⚠️ *Z-ON DOOR* – Low Stock Alert!\n\n🏭 Material: *${item.name}*\n📦 Current Stock: *${item.stock} ${item.unit}*\n🚨 Minimum Required: *${item.min_stock} ${item.unit}*\n\nPlease reorder *${item.reorder_qty} ${item.unit}* immediately to avoid production delay.\n\n– Z-ON DOOR Production Team`;
