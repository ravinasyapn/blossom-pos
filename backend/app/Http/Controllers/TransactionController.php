<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        return Transaction::with('items')->orderByDesc('created_at')->get();
    }

    public function store(Request $r)
    {
        $d = $r->validate([
            'customer' => 'nullable|string|max:255',
            'method' => 'required|in:Tunai,QRIS',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.unit' => 'nullable|string',
            'subtotal' => 'required|numeric|min:0',
            'paid' => 'required|numeric|min:0',
            'change' => 'required|numeric',
        ]);

        return DB::transaction(function () use ($d) {
            $tx = Transaction::create([
                'customer' => $d['customer'] ?? 'Pelanggan',
                'method' => $d['method'],
                'subtotal' => $d['subtotal'],
                'paid' => $d['paid'],
                'change' => $d['change'],
            ]);
            foreach ($d['items'] as $i) {
                $tx->items()->create($i);
            }
            return $tx->load('items');
        });
    }
}
