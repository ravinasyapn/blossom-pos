import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const nav = useNavigate();
  return (
    <AuthLayout>
      <h2 className="font-display text-3xl text-maroon font-bold text-center mb-6">Silahkan Daftarkan Akunmu!</h2>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nav({ to: "/login" }); }}>
        {[
          ["Nama", "Masukan nama lengkap kamu"],
          ["Email", "Masukan email kamu"],
          ["No. Telepon", "Masukan nomor telepon kamu"],
        ].map(([label, ph]) => (
          <div key={label}>
            <label className="block text-sm font-semibold text-maroon mb-1.5">{label}</label>
            <input className="input-pill" placeholder={ph} required />
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold text-maroon mb-1.5">Password</label>
          <input type="password" className="input-pill" placeholder="Masukan password" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-1.5">Konfirmasi Password</label>
          <input type="password" className="input-pill" placeholder="Masukan password" required />
        </div>
        <button type="submit" className="btn-olive w-full mt-2">Daftar</button>
        <p className="text-center text-sm text-maroon">
          Sudah punya akun? <Link to="/login" className="text-pink-deep font-bold">Masuk</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
