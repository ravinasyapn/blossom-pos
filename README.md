# Gurita Bouquet — Sistem Kasir

Repo ini berisi **frontend** aplikasi kasir Gurita Bouquet. Backend Laravel berada
pada folder terpisah `backend/` (sebagai referensi/template) atau project Laravel
mandiri Anda.

```
.
├── src/                ← Frontend (React + TanStack Start)
├── backend/            ← Template Laravel API (routes, controllers, migrations)
└── README.md
```

## Frontend

- Stack: React 19, TanStack Start, Tailwind CSS v4
- Folder utama: `src/`
- API client: `src/lib/api.ts` (base URL: `https://distance-bulge-blot.ngrok-free.dev/api`)

Jalankan:
```bash
bun install
bun run dev
```

Ubah URL backend di `src/lib/api.ts` (`API_BASE`) bila ngrok / domain berubah.

## Backend

Lihat `backend/README.md` untuk panduan lengkap setup Laravel + MySQL,
termasuk migrasi tabel, controller CRUD, dan konfigurasi CORS.

## Data

Aplikasi **tidak lagi memuat data dummy**. Semua kategori, produk, dan transaksi
diambil langsung dari database MySQL via API Laravel. Silakan input data perdana
melalui menu **Kategori** dan **Produk** setelah login.
