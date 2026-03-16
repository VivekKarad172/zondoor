import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import OrdersTab from "@/components/dashboard/OrdersTab";
import InventoryTab from "@/components/dashboard/InventoryTab";
import WhatsAppTab from "@/components/dashboard/WhatsAppTab";
import WhatsAppModal from "@/components/dashboard/WhatsAppModal";
import type { Order, InventoryItem } from "@/components/dashboard/dashboardData";

const TABS = [
  { key: "orders", label: "📦 Orders" },
  { key: "inventory", label: "🏭 Inventory" },
  { key: "whatsapp", label: "💬 WhatsApp" },
] as const;

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [whatsapp, setWhatsapp] = useState<{ text: string; phone: string } | null>(null);

  useEffect(() => {
    if (!user) { navigate("/blog-management"); return; }
    checkAdmin();
  }, [user]);

  const checkAdmin = async () => {
    if (!user) return;
    const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
    if (!data) { toast.error("Admin access required"); navigate("/"); return; }
    setIsAdmin(true);
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    const [{ data: o }, { data: i }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("inventory").select("*").order("name"),
    ]);
    setOrders((o as Order[]) || []);
    setInventory((i as InventoryItem[]) || []);
    setLoading(false);
  };

  const lowStockCount = inventory.filter(i => i.stock <= i.min_stock).length;

  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1b2a] text-teal-400 text-lg font-sans">
      Checking access...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-gray-200 flex flex-col font-sans">
      {whatsapp && <WhatsAppModal text={whatsapp.text} phone={whatsapp.phone} onClose={() => setWhatsapp(null)} />}

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-sky-800 px-5 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚪</span>
          <div>
            <div className="font-extrabold text-base tracking-wide">Z-ON DOOR</div>
            <div className="text-[10px] opacity-75">Production Management Dashboard</div>
          </div>
        </div>
        {lowStockCount > 0 && (
          <button onClick={() => setTab("inventory")}
            className="bg-red-500/20 border border-red-500/50 rounded-full px-3.5 py-1 text-xs text-red-300 font-semibold">
            🚨 {lowStockCount} Low Stock Alert{lowStockCount > 1 ? "s" : ""}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-[#0a1422] border-b border-white/[0.07]">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-sm font-bold tracking-wide transition-all border-b-2 ${
              tab === t.key ? "text-teal-400 border-teal-400" : "text-gray-600 border-transparent"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-teal-400">Loading...</div>
        ) : (
          <>
            {tab === "orders" && <OrdersTab orders={orders} onRefresh={fetchData} onWhatsApp={(t, p) => setWhatsapp({ text: t, phone: p })} />}
            {tab === "inventory" && <InventoryTab inventory={inventory} onRefresh={fetchData} onWhatsApp={(t, p) => setWhatsapp({ text: t, phone: p })} />}
            {tab === "whatsapp" && <WhatsAppTab orders={orders} inventory={inventory} onWhatsApp={(t, p) => setWhatsapp({ text: t, phone: p })} />}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
