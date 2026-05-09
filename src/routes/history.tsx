import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore, formatIDR } from "@/lib/store";
import { History as HistoryIcon, Search, Receipt as RIcon } from "lucide-react";

export const Route = createFileRoute("/history")({ component: History });

function History() {
  const { transactions } = useStore();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<typeof transactions[0] | null>(null);

  const filtered = useMemo(() =>
    transactions.filter((t) => t.customer.toLowerCase().includes(q.toLowerCase()) || t.id.includes(q)),
    [transactions, q]
  );
  const total = filtered.reduce((s, t) => s + t.subtotal, 0);

  return (
    <AppShell>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-maroon flex items-center gap-2"><HistoryIcon /> Riwayat Transaksi</h1>
            <p className="text-maroon/70 text-sm mt-1">{filtered.length} transaksi · Total {formatIDR(total)}</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama atau ID" className="input-pill pl-10" />
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-maroon">
              <tr>
                <th className="text-left p-4">Tanggal</th>
                <th className="text-left p-4">Pelanggan</th>
                <th className="text-left p-4">Item</th>
                <th className="text-left p-4">Metode</th>
                <th className="text-right p-4">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-border text-maroon hover:bg-secondary/40">
                  <td className="p-3">{new Date(t.date).toLocaleString("id-ID")}</td>
                  <td className="p-3 font-semibold">{t.customer}</td>
                  <td className="p-3">{t.items.length} item</td>
                  <td className="p-3"><span className="text-xs px-2 py-1 rounded-full bg-secondary">{t.method}</span></td>
                  <td className="p-3 text-right font-bold">{formatIDR(t.subtotal)}</td>
                  <td className="p-3 text-right"><button onClick={() => setSelected(t)} className="btn-maroon text-xs py-1.5 px-3">Detail</button></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-maroon/60">Belum ada transaksi.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-3xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto scroll-pretty">
            <div className="text-center border-b border-dashed border-border pb-3 mb-3">
              <RIcon className="mx-auto text-maroon mb-1" />
              <h3 className="font-display text-xl font-bold text-maroon">Detail Transaksi</h3>
              <p className="text-xs text-maroon/60 font-mono">{selected.id.slice(0, 8)}</p>
            </div>
            <div className="text-xs space-y-1 text-maroon mb-3">
              <div className="flex justify-between"><span>Tanggal</span><span>{new Date(selected.date).toLocaleString("id-ID")}</span></div>
              <div className="flex justify-between"><span>Pelanggan</span><span>{selected.customer}</span></div>
              <div className="flex justify-between"><span>Metode</span><span>{selected.method}</span></div>
            </div>
            <div className="border-t border-dashed border-border pt-3 space-y-2 text-sm">
              {selected.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-maroon">
                  <div><p className="font-semibold">{i.name}</p><p className="text-xs text-maroon/60">{i.qty} × {formatIDR(i.price)}</p></div>
                  <p className="font-semibold">{formatIDR(i.qty * i.price)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-border mt-3 pt-3 space-y-1 text-sm text-maroon">
              <div className="flex justify-between font-bold"><span>Total</span><span>{formatIDR(selected.subtotal)}</span></div>
              <div className="flex justify-between"><span>Bayar</span><span>{formatIDR(selected.paid)}</span></div>
              <div className="flex justify-between"><span>Kembali</span><span>{formatIDR(selected.change)}</span></div>
            </div>
            <button onClick={() => setSelected(null)} className="btn-maroon w-full mt-5">Tutup</button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
