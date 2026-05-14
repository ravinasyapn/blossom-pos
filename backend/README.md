# Backend — Laravel API Gurita Bouquet

Template endpoint Laravel yang dipakai frontend. Salin file pada folder ini ke
project Laravel Anda (atau buat baru via `composer create-project laravel/laravel gurita-api`).

## 1. Setup awal

```bash
composer create-project laravel/laravel gurita-api
cd gurita-api
composer require laravel/sanctum
php artisan install:api
```

## 2. Konfigurasi `.env`

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gurita_bouquet
DB_USERNAME=root
DB_PASSWORD=
```

Buat database:
```sql
CREATE DATABASE gurita_bouquet;
```

## 3. Salin file dari folder ini

- `routes/api.php`               → `routes/api.php`
- `app/Http/Controllers/*.php`   → `app/Http/Controllers/`
- `app/Models/*.php`             → `app/Models/`
- `database/migrations/*.php`    → `database/migrations/`
- `config/cors.php`              → `config/cors.php`

## 4. Migrasi & jalankan

```bash
php artisan migrate
php artisan serve            # http://127.0.0.1:8000
ngrok http 8000              # tunnel publik untuk frontend
```

Update `API_BASE` di `src/lib/api.ts` (frontend) bila URL ngrok berubah.

## 5. Buat user kasir pertama

```bash
php artisan tinker
>>> User::create(['name'=>'Kasir','email'=>'kasir@gurita.com','password'=>bcrypt('password123')]);
```

Login dari frontend: `kasir@gurita.com` / `password123`.

## Endpoint

| Method | Path                 | Auth | Keterangan         |
|--------|----------------------|------|--------------------|
| POST   | /api/register        | -    | Daftar user        |
| POST   | /api/login           | -    | Login (return token)|
| POST   | /api/logout          | ✓    | Logout             |
| POST   | /api/forgot-password | -    | Kirim email reset  |
| GET/POST/PUT/DELETE | /api/categories[/{id}]   | ✓ | CRUD kategori |
| GET/POST/PUT/DELETE | /api/products[/{id}]     | ✓ | CRUD produk   |
| GET/POST            | /api/transactions        | ✓ | List & buat transaksi |
