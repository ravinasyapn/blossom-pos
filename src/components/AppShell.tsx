import { Link, useLocation } from "@tanstack/react-router";
import { Home, Package, History, Settings as SettingsIcon, ChevronDown, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import logo from "@/assets/logo.jpeg";

const navMain = [
  { to: "/pos", label: "Beranda", icon: Home },
];

const productSub = [
  { to: "/products", label: "Daftar Produk" },
  { to: "/categories", label: "Daftar Kategori" },
];

const navTail = [
  { to: "/history", label: "Riwayat Transaksi", icon: History },
  { to: "/settings", label: "Pengaturan", icon: SettingsIcon },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isProductSection = productSub.some((s) => pathname.startsWith(s.to));
  const [open, setOpen] = useState(isProductSection);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="flex min-h-screen bg-pink-soft">
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 h-14 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <button onClick={() => setMobileOpen(true)} className="text-maroon p-2 -ml-2" aria-label="Buka menu">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="h-8 w-8 rounded-full object-cover" />
          <span className="font-display text-maroon font-bold">GURITA BOUQUET.</span>
        </div>
        <span className="w-8" />
      </header>

      {/* Backdrop (mobile) */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="lg:hidden fixed inset-0 bg-black/40 z-40" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 shrink-0 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <img src={logo} alt="Gurita Bouquet" className="h-12 w-12 rounded-full object-cover shadow" />
          <div className="font-display text-maroon text-xl font-bold leading-tight flex-1">
            GURITA<br/>BOUQUET.
          </div>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-maroon p-1" aria-label="Tutup menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

      <main className="flex-1 min-w-0 pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
