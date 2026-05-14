<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'unit', 'category_id', 'stock', 'image'];
    public function category() { return $this->belongsTo(Category::class); }
}
