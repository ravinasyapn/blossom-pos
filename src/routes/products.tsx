import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore, actions, formatIDR, type Product } from "@/lib/store";
import { Plus, Pencil, Trash2, Package } from "lucide-react";

export const Route = createFileRoute("/products")({ component: Products });

function Products() {
  const { products, categories } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <AppShell>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-maroon flex items-center gap-2"><Package /> Daftar Produk</h1>
            <p className="text-maroon/70 text-sm mt-1">Kelola produk bunga & wrapping kamu</p>
          </div>
          <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-maroon flex items-center gap-2"><Plus size={18}/> Tambah Produk</button>
        </div>

        <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-maroon">
              <tr>
                <th className="text-left p-4">Produk</th>
                <th className="text-left p-4">Kategori</th>
                <th className="text-left p-4">Harga</th>
                <th className="text-left p-4">Stok</th>
                <th className="text-right p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="border-t border-border text-maroon">
                    <td className="p-3 flex items-center gap-3">
                      <img src={p.image} className="h-12 w-12 rounded-lg object-cover" alt="" />
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-maroon/60">per {p.unit}</p>
                      </div>
                    </td>
                    <td className="p-3">{cat?.name ?? "-"}</td>
                    <td className="p-3 font-semibold">{formatIDR(p.price)}</td>
                    <td className="p-3">{p.stock}</td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => { setEditing(p); setOpen(true); }} className="inline-flex items-center gap-1 text-maroon hover:underline"><Pencil size={14}/></button>
                      <button onClick={() => confirm("Hapus produk ini?") && actions.deleteProduct(p.id)} className="inline-flex items-center gap-1 text-destructive hover:underline"><Trash2 size={14}/></button>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-maroon/60">Belum ada produk.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {open && <ProductModal initial={editing} onClose={() => setOpen(false)} />}
    </AppShell>
  );
}

function ProductModal({ initial, onClose }: { initial: Product | null; onClose: () => void }) {
  const { categories } = useStore();
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [unit, setUnit] = useState(initial?.unit ?? "tangkai");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
  const [stock, setStock] = useState(String(initial?.stock ?? "0"));
  const [image, setImage] = useState(initial?.image ?? "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { name, price: parseInt(price) || 0, unit, categoryId, stock: parseInt(stock) || 0, image };
    if (initial) actions.updateProduct(initial.id, payload);
    else actions.addProduct(payload);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-card rounded-3xl p-6 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto scroll-pretty">
        <h3 className="font-display text-xl font-bold text-maroon">{initial ? "Edit" : "Tambah"} Produk</h3>
        <div><label className="text-sm font-semibold text-maroon">Nama</label><input className="input-pill mt-1" value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div className="grid grid-cols-2 gap-2">
          <div><label className="text-sm font-semibold text-maroon">Harga</label><input className="input-pill mt-1" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} required /></div>
          <div><label className="text-sm font-semibold text-maroon">Satuan</label><input className="input-pill mt-1" value={unit} onChange={(e) => setUnit(e.target.value)} required /></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-semibold text-maroon">Kategori</label>
            <select className="input-pill mt-1" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div><label className="text-sm font-semibold text-maroon">Stok</label><input className="input-pill mt-1" inputMode="numeric" value={stock} onChange={(e) => setStock(e.target.value.replace(/\D/g, ""))} /></div>
        </div>
        <div><label className="text-sm font-semibold text-maroon">URL Gambar</label><input className="input-pill mt-1" value={image} onChange={(e) => setImage(e.target.value)} /></div>
        <img src={image} alt="" className="w-full h-32 object-cover rounded-xl" />
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="btn-olive flex-1">Batal</button>
          <button type="submit" className="btn-maroon flex-1">Simpan</button>
        </div>
      </form>
    </div>
  );
}
