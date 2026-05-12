import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { login } from "@/lib/api";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      nav({ to: "/pos" });
    } catch (err: any) {
      setError(err?.message ?? "Gagal masuk. Periksa email & password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h2 className="font-display text-3xl text-maroon font-bold text-center mb-8">Silahkan Masuk!</h2>
      <form className="space-y-5" onSubmit={submit}>
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm rounded-xl px-4 py-2.5 border border-destructive/30">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-maroon mb-2">Email / No. Telepon</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-pill"
            placeholder="Masukan email atau nomor telepon kamu"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-2">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-pill pr-28"
              placeholder="Masukan password"
              required
              autoComplete="current-password"
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="btn-olive absolute right-1 top-1/2 -translate-y-1/2 text-xs px-4 py-1.5">
              {show ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>
          <Link to="/forgot" className="block text-right text-xs font-semibold text-maroon mt-2">Lupa Password?</Link>
        </div>
        <button type="submit" disabled={loading} className="btn-olive w-full disabled:opacity-60">
          {loading ? "Memproses..." : "Masuk"}
        </button>
        <p className="text-center text-sm text-maroon">
          Belum punya akun? <Link to="/register" className="text-pink-deep font-bold">Daftar</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
