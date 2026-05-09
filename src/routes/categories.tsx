import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore, actions } from "@/lib/store";
import { Plus, Pencil, Trash2, Boxes } from "lucide-react";

export const Route = createFileRoute("/categories")({ component: Categories });

function Categories() {
  const { categories, products } = useStore();
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    actions.addCategory(name.trim());
    setName("");
  }

  return (
    <AppShell>
      <div className="p-8 space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-3xl font-bold text-maroon flex items-center gap-2"><Boxes /> Daftar Kategori</h1>
          <p className="text-maroon/70 text-sm mt-1">Atur kategori produk kamu</p>
        </div>

        <form onSubmit={add} className="bg-card rounded-2xl p-4 flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kategori baru" className="input-pill flex-1" />
          <button className="btn-maroon flex items-center gap-2"><Plus size={16}/> Tambah</button>
        </form>

        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {categories.map((c) => {
            const count = products.filter((p) => p.categoryId === c.id).length;
            const editing = editId === c.id;
            return (
              <div key={c.id} className="flex items-center justify-between p-4 border-b border-border last:border-0">
                {editing ? (
                  <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} className="input-pill mr-3" />
                ) : (
                  <div>
                    <p className="font-semibold text-maroon">{c.name}</p>
                    <p className="text-xs text-maroon/60">{count} produk</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {editing ? (
                    <>
                      <button onClick={() => { actions.updateCategory(c.id, editName); setEditId(null); }} className="btn-maroon py-1.5 px-4 text-xs">Simpan</button>
                      <button onClick={() => setEditId(null)} className="btn-olive py-1.5 px-4 text-xs">Batal</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(c.id); setEditName(c.name); }} className="text-maroon"><Pencil size={16}/></button>
                      <button onClick={() => confirm(`Hapus kategori "${c.name}" dan semua produknya?`) && actions.deleteCategory(c.id)} className="text-destructive"><Trash2 size={16}/></button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {categories.length === 0 && <p className="p-8 text-center text-maroon/60">Belum ada kategori.</p>}
        </div>
      </div>
    </AppShell>
  );
}
