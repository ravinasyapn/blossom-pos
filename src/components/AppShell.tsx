import { Link, useLocation } from "@tanstack/react-router";
import { Home, Package, History, Settings as SettingsIcon, ChevronDown, LogOut } from "lucide-react";
import { useState, type ReactNode } from "react";

const navMain = [
  { to: "/dashboard", label: "Beranda", icon: Home },
];

const productSub = [
  { to: "/pos", label: "Point of Sale" },
  { to: "/products", label: "Daftar Produk" },
  { to: "/categories", label: "Daftar Kategori" },
  { to: "/stock", label: "Stok" },
];

const navTail = [
  { to: "/history", label: "Riwayat Transaksi", icon: History },
  { to: "/settings", label: "Pengaturan", icon: SettingsIcon },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isProductSection = productSub.some((s) => pathname.startsWith(s.to));
  const [open, setOpen] = useState(isProductSection);

  return (
    <div className="flex min-h-screen bg-pink-soft">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 bg-card border-r border-border flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="h-12 w-12 rounded-full bg-pink-deep flex items-center justify-center font-display text-maroon font-bold text-sm">GB</div>
          <div className="font-display text-maroon text-xl font-bold leading-tight">
            GURITA<br/>BOUQUET.
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navMain.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-5 py-3 rounded-full font-semibold transition ${
                  active ? "bg-maroon text-primary-foreground" : "text-maroon hover:bg-secondary"
                }`}
              >
                <Icon size={20} /> {item.label}
              </Link>
            );
          })}

          <button
            onClick={() => setOpen((v) => !v)}
            className={`w-full flex items-center justify-between px-5 py-3 rounded-full font-semibold transition ${
              isProductSection ? "bg-accent text-maroon" : "text-maroon hover:bg-secondary"
            }`}
          >
            <span className="flex items-center gap-3"><Package size={20} /> Manajemen Produk</span>
            <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="pl-6 space-y-1">
              {productSub.map((s) => {
                const active = pathname === s.to;
                return (
                  <Link
                    key={s.to}
                    to={s.to}
                    className={`block px-4 py-2 rounded-lg text-sm transition ${
                      active ? "text-maroon font-bold" : "text-maroon/80 hover:text-maroon"
                    }`}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          )}

          {navTail.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-5 py-3 rounded-full font-semibold transition ${
                  active ? "bg-maroon text-primary-foreground" : "text-maroon hover:bg-secondary"
                }`}
              >
                <Icon size={20} /> {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/login"
            className="flex items-center gap-3 px-5 py-3 rounded-full text-maroon hover:bg-secondary text-sm font-semibold"
          >
            <LogOut size={18} /> Keluar
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
