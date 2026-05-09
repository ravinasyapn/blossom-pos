import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useStore, formatIDR } from "@/lib/store";
import { Package, ShoppingCart, History as HistoryIcon, Boxes, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { products, categories, transactions } = useStore();
  const today = new Date().toDateString();
  const todays = transactions.filter((t) => new Date(t.date).toDateString() === today);
  const revenueToday = todays.reduce((s, t) => s + t.subtotal, 0);
  const totalRevenue = transactions.reduce((s, t) => s + t.subtotal, 0);

  const stats = [
    { label: "Pendapatan Hari Ini", value: formatIDR(revenueToday), icon: TrendingUp, color: "bg-maroon text-primary-foreground" },
    { label: "Transaksi Hari Ini", value: todays.length, icon: ShoppingCart, color: "bg-pink-deep text-maroon" },
    { label: "Total Produk", value: products.length, icon: Package, color: "bg-olive text-maroon" },
    { label: "Total Kategori", value: categories.length, icon: Boxes, color: "bg-accent text-maroon" },
  ];

  return (
    <AppShell>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="font-display text-4xl text-maroon font-bold">Beranda</h1>
          <p className="text-maroon/70 mt-1">Selamat datang kembali di Gurita Bouquet 🌸</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card rounded-2xl p-5 shadow-sm">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon size={20} />
                </div>
                <p className="mt-3 text-sm text-maroon/70">{s.label}</p>
                <p className="text-2xl font-bold text-maroon mt-1">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Link to="/pos" className="bg-gradient-to-br from-maroon to-pink-deep rounded-2xl p-8 text-primary-foreground hover:scale-[1.01] transition shadow-lg">
            <ShoppingCart size={32} />
            <h3 className="font-display text-2xl font-bold mt-4">Mulai Kasir</h3>
            <p className="text-sm opacity-90 mt-1">Buka point of sale untuk transaksi baru</p>
          </Link>
          <Link to="/history" className="bg-card rounded-2xl p-8 hover:scale-[1.01] transition shadow-sm">
            <HistoryIcon size={32} className="text-maroon" />
            <h3 className="font-display text-2xl font-bold mt-4 text-maroon">Riwayat Transaksi</h3>
            <p className="text-sm text-maroon/70 mt-1">{transactions.length} transaksi tercatat</p>
          </Link>
        </div>

        <div className="bg-card rounded-2xl p-6">
          <h3 className="font-display text-xl font-bold text-maroon mb-4">Transaksi Terbaru</h3>
          {transactions.length === 0 ? (
            <p className="text-sm text-maroon/60">Belum ada transaksi.</p>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 5).map((t) => (
                <div key={t.id} className="flex justify-between text-sm border-b border-border pb-2">
                  <div>
                    <p className="font-semibold text-maroon">{t.customer || "Pelanggan"}</p>
                    <p className="text-xs text-maroon/60">{new Date(t.date).toLocaleString("id-ID")}</p>
                  </div>
                  <p className="font-bold text-maroon">{formatIDR(t.subtotal)}</p>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-maroon/60 mt-4">Total pendapatan keseluruhan: <span className="font-bold">{formatIDR(totalRevenue)}</span></p>
        </div>
      </div>
    </AppShell>
  );
}
