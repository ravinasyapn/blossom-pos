import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Mail, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot")({ component: Forgot });

function Forgot() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <AuthLayout>
        <div className="text-center py-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-olive/20 flex items-center justify-center mb-4">
            <CheckCircle2 className="text-olive" size={36} />
          </div>
          <h2 className="font-display text-3xl text-maroon font-bold mb-2">Email Terkirim!</h2>
          <p className="text-sm text-maroon/80 mb-6">
            Kami telah mengirim tautan konfirmasi ke<br/>
            <b className="text-maroon">{email}</b>
          </p>
          <p className="text-xs text-maroon/60 mb-6">
            Cek kotak masuk atau folder spam kamu, lalu klik tautan untuk mengatur ulang password.
          </p>
          <button onClick={() => nav({ to: "/login" })} className="btn-olive w-full">
            Kembali ke Masuk
          </button>
          <button onClick={() => setSent(false)} className="text-xs text-maroon font-semibold mt-3 hover:underline">
            Kirim ulang ke email lain
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <div className="mx-auto h-14 w-14 rounded-full bg-pink-deep/20 flex items-center justify-center mb-3">
          <Mail className="text-maroon" size={28} />
        </div>
        <h2 className="font-display text-3xl text-maroon font-bold">Lupa Password?</h2>
        <p className="text-sm text-maroon/70 mt-2">Masukkan email akunmu untuk menerima tautan reset password.</p>
      </div>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div>
          <label className="block text-sm font-semibold text-maroon mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-pill"
            placeholder="Masukan email kamu"
            required
          />
        </div>
        <button type="submit" className="btn-olive w-full">Kirim Tautan</button>
        <p className="text-center text-sm">
          <Link to="/login" className="text-maroon font-semibold hover:underline">Kembali ke Masuk</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
