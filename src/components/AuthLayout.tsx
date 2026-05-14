import { type ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pink-soft flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-6">
      <div className="text-center lg:text-left lg:flex-1 max-w-xl flex flex-col items-center lg:items-start gap-2">
        <h1 className="font-display font-bold text-maroon leading-none text-5xl md:text-6xl lg:text-7xl">
          GURITA<br/>BOUQUET.
        </h1>
        <p className="font-display italic text-maroon/80 text-xl md:text-2xl mt-2">by Gurita House</p>
      </div>
      <div className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}
