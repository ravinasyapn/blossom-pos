import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { register } from "@/lib/api";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", password_confirmation: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) { setForm({ ...form, [k]: v }); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      setError("Konfirmasi password tidak sesuai.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register(form);
      nav({ to: "/login" });
    } catch (err: any) {
      setError(err?.message ?? "Gagal mendaftar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h2 className="font-display text-3xl text-maroon font-bold text-center mb-6">Silahkan Daftarkan Akunmu!</h2>
      <form className="space-y-4" onSubmit={submit}>
        {error && <div className="bg-destructive/10 text-destructive text-sm rounded-xl px-4 py-2.5 border border-destructive/30">{error}</div>}
        <div>
          <label className="block text-sm font-semibold text-maroon mb-1.5">Nama</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className="input-pill" placeholder="Masukan nama lengkap kamu" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input-pill" placeholder="Masukan email kamu" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-1.5">No. Telepon</label>
          <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input-pill" placeholder="Masukan nomor telepon kamu" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-1.5">Password</label>
          <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} className="input-pill" placeholder="Masukan password" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-1.5">Konfirmasi Password</label>
          <input type="password" value={form.password_confirmation} onChange={(e) => set("password_confirmation", e.target.value)} className="input-pill" placeholder="Masukan password" required />
        </div>
        <button type="submit" disabled={loading} className="btn-olive w-full mt-2 disabled:opacity-60">
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>
        <p className="text-center text-sm text-maroon">
          Sudah punya akun? <Link to="/login" className="text-pink-deep font-bold">Masuk</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
