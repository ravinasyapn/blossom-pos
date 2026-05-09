import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl text-maroon font-bold text-center mb-8">Silahkan Masuk!</h2>
      <form
        className="space-y-5"
        onSubmit={(e) => { e.preventDefault(); nav({ to: "/dashboard" }); }}
      >
        <div>
          <label className="block text-sm font-semibold text-maroon mb-2">Email / No. Telepon</label>
          <input className="input-pill" placeholder="Masukan email atau nomor telepon kamu" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-2">Password</label>
          <div className="relative">
            <input type={show ? "text" : "password"} className="input-pill pr-28" placeholder="Masukan password" required />
            <button type="button" onClick={() => setShow((s) => !s)} className="btn-olive absolute right-1 top-1/2 -translate-y-1/2 text-xs px-4 py-1.5">
              {show ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>
          <Link to="/forgot" className="block text-right text-xs font-semibold text-maroon mt-2">Lupa Password?</Link>
        </div>
        <button type="submit" className="btn-olive w-full">Masuk</button>
        <p className="text-center text-sm text-maroon">
          Belum punya akun? <Link to="/register" className="text-pink-deep font-bold">Daftar</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
