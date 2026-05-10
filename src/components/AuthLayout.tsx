import { type ReactNode } from "react";
import logo from "@/assets/logo.jpeg";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pink-soft flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 p-6">
      <div className="text-center lg:text-left lg:flex-1 max-w-xl flex flex-col items-center lg:items-start gap-4">
        <img src={logo} alt="Gurita Bouquet" className="w-32 md:w-40 lg:w-48 rounded-3xl shadow-lg" />
        <h1 className="font-display font-bold text-maroon leading-none text-5xl md:text-6xl lg:text-7xl">
          GURITA<br/>BOUQUET.
        </h1>
        <p className="font-display italic text-maroon/80 text-xl md:text-2xl">by Gurita House</p>
      </div>
      <div className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}
