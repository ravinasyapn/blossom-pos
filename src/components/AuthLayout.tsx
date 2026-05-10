import { type ReactNode } from "react";
import logo from "@/assets/logo.jpeg";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pink-soft flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 p-6">
      <div className="text-center lg:text-left lg:flex-1 max-w-xl flex flex-col items-center lg:items-start">
        <img src={logo} alt="Gurita Bouquet" className="w-48 md:w-64 lg:w-80 rounded-3xl shadow-lg" />
      </div>
      <div className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}
