import React from "react";
import { Order, InventoryItem, buildWhatsApp, buildAlertMsg } from "./dashboardData";

interface Props {
  orders: Order[];
  inventory: InventoryItem[];
  onWhatsApp: (text: string, phone: string) => void;
}

const WhatsAppTab = ({ orders, inventory, onWhatsApp }: Props) => {
  const lowStock = inventory.filter(i => i.stock <= i.min_stock);

  return (
    <div>
      <div className="font-extrabold text-base mb-1.5">💬 WhatsApp Message Templates</div>
      <div className="text-xs text-gray-500 mb-5">Click any template to preview and send instantly.</div>

      {lowStock.length > 0 && (
        <div className="bg-red-500/[0.07] border border-red-500/20 rounded-2xl p-4 mb-5">
          <div className="font-bold text-red-300 mb-2.5 text-sm">🚨 Pending Inventory Alerts ({lowStock.length})</div>
          <div className="flex flex-col gap-2">
            {lowStock.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white/[0.04] rounded-xl p-2.5">
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-[11px] text-red-300">Stock: {item.stock} / Min: {item.min_stock} {item.unit}</div>
                </div>
                <button onClick={() => onWhatsApp(buildAlertMsg(item), "")}
                  className="px-3 py-1.5 bg-[#25D366] rounded-lg text-white font-bold text-xs">
                  💬 Send Alert
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="font-bold text-sm mb-2.5 text-teal-400">📦 Order Status Messages</div>
      <div className="flex flex-col gap-2">
        {orders.filter(o => o.status !== "Dispatched").slice(0, 10).map(order => (
          <div key={order.id} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="font-bold text-sm">{order.dealer}</div>
                <div className="text-[11px] text-emerald-400/70">📱 {order.phone} | {order.order_number} | {order.product}</div>
              </div>
              <div className="flex gap-1.5">
                {(["pending", "ready", "dispatch"] as const).map(type => (
                  <button key={type} onClick={() => onWhatsApp(buildWhatsApp(order, type), order.phone)}
                    className={`px-2.5 py-1 border rounded-lg text-[10px] font-bold capitalize ${
                      type === "ready" ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                      : type === "dispatch" ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                      : "bg-white/[0.06] border-white/10 text-gray-400"
                    }`}>
                    {type === "pending" ? "📋 Received" : type === "ready" ? "✅ Ready" : "🚚 Dispatch"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppTab;
