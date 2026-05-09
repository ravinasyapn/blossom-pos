import { type ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pink-soft flex flex-col lg:flex-row items-center justify-center gap-12 p-6">
      <div className="text-center lg:text-left lg:flex-1 max-w-xl">
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-maroon font-extrabold leading-none drop-shadow-lg">
          GURITA<br/>BOUQUET.
        </h1>
        <p className="font-display italic text-3xl text-maroon/70 mt-4">by Gurita House</p>
      </div>
      <div className="w-full max-w-md bg-card rounded-3xl shadow-xl p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}
