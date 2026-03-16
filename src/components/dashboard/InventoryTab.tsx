import React, { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { InventoryItem, buildAlertMsg } from "./dashboardData";

interface Props {
  inventory: InventoryItem[];
  onRefresh: () => void;
  onWhatsApp: (text: string, phone: string) => void;
}

const InventoryTab = ({ inventory, onRefresh, onWhatsApp }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", unit: "pcs", stock: 0, min_stock: 0, reorder_qty: 0 });
  const lowStock = inventory.filter(i => i.stock <= i.min_stock);

  const updateStock = async (id: string, delta: number) => {
    const item = inventory.find(i => i.id === id);
    if (!item) return;
    await supabase.from("inventory").update({ stock: Math.max(0, item.stock + delta) }).eq("id", id);
    onRefresh();
  };

  const addItem = async () => {
    if (!form.name) return;
    await supabase.from("inventory").insert(form);
    setShowForm(false);
    setForm({ name: "", unit: "pcs", stock: 0, min_stock: 0, reorder_qty: 0 });
    toast.success("Material added!");
    onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <div className="font-extrabold text-base">🏭 Raw Material Inventory</div>
          {lowStock.length > 0 && <div className="text-red-300 text-xs mt-0.5">🚨 {lowStock.length} item{lowStock.length > 1 ? "s" : ""} below minimum!</div>}
        </div>
        <button onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gradient-to-br from-teal-700 to-teal-600 rounded-xl text-white font-bold text-xs">
          + Add Material
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1a2d40] rounded-2xl p-4 mb-4 border border-teal-500/30">
          <div className="font-bold text-sm mb-3.5 text-teal-400">➕ Add Material</div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["Material Name *", "name", "text", "e.g. PVC Foam Board"],
              ["Unit", "unit", "text", "pcs / rolls / sheets"],
              ["Current Stock", "stock", "number", ""],
              ["Min Stock", "min_stock", "number", ""],
              ["Reorder Qty", "reorder_qty", "number", ""],
            ].map(([lbl, key, type, ph]) => (
              <div key={key}>
                <label className="text-[11px] text-gray-500 mb-1 block">{lbl}</label>
                <input type={type} value={(form as any)[key]} placeholder={ph as string}
                  onChange={e => setForm({ ...form, [key]: type === "number" ? +e.target.value : e.target.value })}
                  className="w-full px-2.5 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm" />
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 mt-3.5">
            <button onClick={addItem} className="flex-1 py-2.5 bg-gradient-to-br from-teal-700 to-teal-600 rounded-xl text-white font-bold text-sm">✅ Add</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-white/[0.06] rounded-xl text-gray-400 text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {inventory.map(item => {
          const pct = Math.min(100, (item.stock / Math.max(item.min_stock * 1.5, 1)) * 100);
          const isLow = item.stock <= item.min_stock;
          const isCritical = item.stock <= item.min_stock * 0.5;
          const barColor = isCritical ? "bg-red-500" : isLow ? "bg-yellow-400" : "bg-teal-500";
          return (
            <div key={item.id} className={`bg-white/[0.04] border rounded-xl p-3 ${isLow ? (isCritical ? "border-red-500/40" : "border-yellow-400/30") : "border-white/[0.07]"}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold text-sm">
                    {isCritical ? "🔴" : isLow ? "🟡" : "🟢"} {item.name}
                  </div>
                  {isLow && <div className={`text-[11px] mt-0.5 ${isCritical ? "text-red-300" : "text-yellow-400"}`}>
                    {isCritical ? "⚠️ CRITICAL – Reorder NOW!" : "⚠️ Low Stock – Reorder Soon"}
                  </div>}
                </div>
                <div className="text-right">
                  <div className={`text-lg font-extrabold ${isCritical ? "text-red-300" : isLow ? "text-yellow-400" : "text-teal-400"}`}>{item.stock}</div>
                  <div className="text-[10px] text-gray-500">{item.unit}</div>
                </div>
              </div>
              <div className="bg-white/[0.06] rounded-md h-1.5 mb-2.5 overflow-hidden">
                <div className={`h-full ${barColor} rounded-md transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[11px] text-gray-500">Min: {item.min_stock} | Reorder: {item.reorder_qty} {item.unit}</div>
                <div className="flex gap-1.5 items-center">
                  <button onClick={() => updateStock(item.id, -1)} className="w-6 h-6 bg-red-500/15 rounded-md text-red-300 font-bold text-sm">−</button>
                  <button onClick={() => updateStock(item.id, 1)} className="w-6 h-6 bg-emerald-500/15 rounded-md text-emerald-400 font-bold text-sm">+</button>
                  <button onClick={() => updateStock(item.id, item.reorder_qty)} className="px-2.5 py-1 bg-teal-500/15 border border-teal-500/30 rounded-md text-teal-400 text-[10px] font-bold">+ Restock</button>
                  {isLow && (
                    <button onClick={() => onWhatsApp(buildAlertMsg(item), "")}
                      className="px-2.5 py-1 bg-[#25D366]/10 border border-[#25D366]/30 rounded-md text-[#25D366] text-[10px] font-bold">
                      💬 Alert
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryTab;
