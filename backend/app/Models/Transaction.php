<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['customer', 'method', 'subtotal', 'paid', 'change'];
    public function items() { return $this->hasMany(TransactionItem::class); }
}
