import React, { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Order, STATUSES, STATUS_COLORS, PRODUCTS, OrderStatus, buildWhatsApp } from "./dashboardData";

interface Props {
  orders: Order[];
  onRefresh: () => void;
  onWhatsApp: (text: string, phone: string) => void;
}

const OrdersTab = ({ orders, onRefresh, onWhatsApp }: Props) => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ dealer: "", phone: "", product: PRODUCTS[0], qty: 1, width: 30, height: 84, urgent: false, notes: "" });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    production: orders.filter(o => o.status === "Production").length,
    ready: orders.filter(o => o.status === "Ready").length,
    dispatched: orders.filter(o => o.status === "Dispatched").length,
    urgent: orders.filter(o => o.urgent && o.status !== "Dispatched").length,
  };

  const filtered = filterStatus === "All" ? orders : orders.filter(o => o.status === filterStatus);

  const advanceStatus = async (id: string, current: string) => {
    const idx = STATUSES.indexOf(current as OrderStatus);
    const next = STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
    await supabase.from("orders").update({ status: next }).eq("id", id);
    toast.success("Status updated!");
    onRefresh();
  };

  const deleteOrder = async (id: string) => {
    await supabase.from("orders").delete().eq("id", id);
    toast.success("Order deleted");
    onRefresh();
  };

  const addOrder = async () => {
    if (!form.dealer || !form.phone) return;
    const num = `ORD-${String(orders.length + 1).padStart(3, "0")}`;
    await supabase.from("orders").insert({
      order_number: num, dealer: form.dealer, phone: form.phone, product: form.product,
      qty: form.qty, width: form.width, height: form.height, urgent: form.urgent, notes: form.notes,
    });
    setShowForm(false);
    setForm({ dealer: "", phone: "", product: PRODUCTS[0], qty: 1, width: 30, height: 84, urgent: false, notes: "" });
    toast.success("Order added! 🎉");
    onRefresh();
  };

  const statCards = [
    { label: "Total", value: stats.total, color: "text-teal-400", icon: "📋" },
    { label: "Pending", value: stats.pending, color: "text-yellow-400", icon: "⏳" },
    { label: "Production", value: stats.production, color: "text-blue-400", icon: "⚙️" },
    { label: "Ready", value: stats.ready, color: "text-emerald-400", icon: "✅" },
    { label: "Dispatched", value: stats.dispatched, color: "text-gray-400", icon: "🚚" },
    { label: "Urgent", value: stats.urgent, color: "text-red-400", icon: "🚨" },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-5">
        {statCards.map(s => (
          <div key={s.label} className="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters + Add */}
      <div className="flex gap-2 mb-3.5 flex-wrap items-center">
        {["All", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              filterStatus === s ? "border-teal-500 bg-teal-500/20 text-teal-400" : "border-white/10 text-gray-500"
            }`}>
            {s}
          </button>
        ))}
        <button onClick={() => setShowForm(true)}
          className="ml-auto px-4 py-2 bg-gradient-to-br from-teal-700 to-teal-600 rounded-xl text-white font-bold text-xs">
          + New Order
        </button>
      </div>

      {/* Add Order Form */}
      {showForm && (
        <div className="bg-[#1a2d40] rounded-2xl p-4 mb-4 border border-teal-500/30">
          <div className="font-bold text-sm mb-3.5 text-teal-400">➕ Add New Order</div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Dealer Name *</label>
              <input value={form.dealer} onChange={e => setForm({ ...form, dealer: e.target.value })}
                placeholder="e.g. Rajesh Hardware, Surat"
                className="w-full px-2.5 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Phone *</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full px-2.5 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Product</label>
              <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
                className="w-full px-2.5 py-2 bg-[#1a2d40] border border-white/10 rounded-lg text-white text-sm">
                {PRODUCTS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Quantity</label>
              <input type="number" value={form.qty} onChange={e => setForm({ ...form, qty: +e.target.value })}
                className="w-full px-2.5 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Width (inches)</label>
              <input type="number" value={form.width} onChange={e => setForm({ ...form, width: +e.target.value })}
                className="w-full px-2.5 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Height (inches)</label>
              <input type="number" value={form.height} onChange={e => setForm({ ...form, height: +e.target.value })}
                className="w-full px-2.5 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" checked={form.urgent} onChange={e => setForm({ ...form, urgent: e.target.checked })} id="urgent" />
              <label htmlFor="urgent" className="text-sm text-red-300 cursor-pointer">🚨 Urgent</label>
            </div>
          </div>
          <div className="mt-2.5">
            <label className="text-[11px] text-gray-500 mb-1 block">Notes</label>
            <input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Special instructions..."
              className="w-full px-2.5 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm" />
          </div>
          <div className="flex gap-2.5 mt-3.5">
            <button onClick={addOrder} className="flex-1 py-2.5 bg-gradient-to-br from-teal-700 to-teal-600 rounded-xl text-white font-bold text-sm">✅ Add Order</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-white/[0.06] rounded-xl text-gray-400 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 && <div className="text-center text-gray-600 py-10 text-sm">No orders found.</div>}
        {filtered.map(order => {
          const sc = STATUS_COLORS[order.status as OrderStatus] || STATUS_COLORS.Pending;
          const sqft = ((order.width / 12) * (order.height / 12)).toFixed(1);
          const nextIdx = STATUSES.indexOf(order.status as OrderStatus) + 1;
          const nextStatus = nextIdx < STATUSES.length ? STATUSES[nextIdx] : null;
          const msgType = order.status === "Ready" ? "ready" : order.status === "Dispatched" ? "dispatch" : "pending";
          return (
            <div key={order.id} className={`bg-white/[0.04] border rounded-2xl p-3.5 ${order.urgent && order.status !== "Dispatched" ? "border-red-500/40" : "border-white/[0.08]"}`}>
              <div className="flex items-start justify-between gap-2.5 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-extrabold text-teal-400 text-sm">{order.order_number}</span>
                    {order.urgent && order.status !== "Dispatched" && (
                      <span className="bg-red-500/20 text-red-300 px-2 py-px rounded-full text-[10px] font-bold">🚨 URGENT</span>
                    )}
                    <span className={`${sc.bg} ${sc.text} border ${sc.border} px-2.5 py-px rounded-full text-[11px] font-bold`}>{order.status}</span>
                  </div>
                  <div className="font-bold text-sm">{order.dealer}</div>
                  <div className="text-xs text-emerald-400/80">📱 {order.phone}</div>
                  <div className="text-xs text-blue-300/70 mt-1">
                    🚪 {order.product} &nbsp;|&nbsp; Qty: <strong className="text-white">{order.qty}</strong> &nbsp;|&nbsp; {order.width}"×{order.height}" ({sqft} sq.ft)
                  </div>
                  {order.notes && <div className="text-[11px] text-gray-500 mt-1">📝 {order.notes}</div>}
                  <div className="text-[11px] text-gray-600 mt-1">📅 {order.order_date}</div>
                </div>
                <div className="flex flex-col gap-1.5 items-end">
                  {nextStatus && (
                    <button onClick={() => advanceStatus(order.id, order.status)}
                      className="px-3 py-1.5 bg-gradient-to-br from-teal-700 to-teal-600 rounded-lg text-white font-bold text-[11px]">
                      → {nextStatus}
                    </button>
                  )}
                  <button onClick={() => onWhatsApp(buildWhatsApp(order, msgType as any), order.phone)}
                    className="px-3 py-1.5 bg-[#25D366]/15 border border-[#25D366]/40 rounded-lg text-[#25D366] font-bold text-[11px]">
                    💬 WhatsApp
                  </button>
                  <button onClick={() => deleteOrder(order.id)}
                    className="px-2.5 py-1 bg-red-500/10 rounded-lg text-red-300 text-[11px]">
                    🗑
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersTab;
