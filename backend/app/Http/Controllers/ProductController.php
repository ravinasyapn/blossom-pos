<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() { return Product::orderBy('name')->get(); }

    public function store(Request $r)
    {
        $d = $r->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'stock' => 'nullable|integer|min:0',
            'image' => 'nullable|string',
        ]);
        return Product::create($d);
    }

    public function update(Request $r, Product $product)
    {
        $d = $r->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'category_id' => 'sometimes|exists:categories,id',
            'stock' => 'nullable|integer|min:0',
            'image' => 'nullable|string',
        ]);
        $product->update($d);
        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
