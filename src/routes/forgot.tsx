import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/forgot")({ component: Forgot });

function Forgot() {
  const nav = useNavigate();
  const [s1, set1] = useState(false);
  const [s2, set2] = useState(false);
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl text-maroon font-bold text-center mb-8">Masukkan password baru</h2>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); nav({ to: "/login" }); }}>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-2">Password</label>
          <div className="relative">
            <input type={s1 ? "text" : "password"} className="input-pill pr-28" placeholder="Masukan password baru" required />
            <button type="button" onClick={() => set1((s) => !s)} className="btn-olive absolute right-1 top-1/2 -translate-y-1/2 text-xs px-4 py-1.5">Tampilkan</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-2">Konfirmasi Password</label>
          <div className="relative">
            <input type={s2 ? "text" : "password"} className="input-pill pr-28" placeholder="Masukan kembali password baru" required />
            <button type="button" onClick={() => set2((s) => !s)} className="btn-olive absolute right-1 top-1/2 -translate-y-1/2 text-xs px-4 py-1.5">Tampilkan</button>
          </div>
        </div>
        <button type="submit" className="btn-olive w-full">Ubah Password</button>
        <p className="text-center text-sm"><Link to="/login" className="text-maroon font-semibold">Kembali ke login</Link></p>
      </form>
    </AuthLayout>
  );
}
